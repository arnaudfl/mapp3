<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	import renderProfileCard from './ProfileCard';
	import type { FeatureGroup, MarkerOptions } from 'leaflet';

	interface CustomMarkerOptions extends MarkerOptions {
		'marker-options-id': any;
	}

	let mapElement: any;
	let map: any;

	onMount(async () => {
		if (browser) {
			const leaflet = await import('leaflet');
			const { MarkerClusterGroup }: any = await import('leaflet.markercluster');

			// config map
			let config = {
				minZoom: 6,
				maxZoom: 12
			};
			// magnification with which the map will start
			const zoom = 6;
			// co-ordinates
			const lat = 46.545;
			const lng = 2.527;

			map = leaflet.map(mapElement, config).setView([lat, lng], zoom);

			leaflet
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(map);

			// ------------------------------------------------------------
			// async function to get data from json
			async function fetchData(url: string) {
				try {
					const response = await fetch(url);
					const data = await response.json();
					return data;
				} catch (err) {
					console.error(err);
				}
			}

			// L.MarkerClusterGroup extends L.FeatureGroup
			// by clustering the markers contained within
			let markers = new MarkerClusterGroup();

			// --------------------------------------------------
			// button to close sidebar
			const buttonClose: Element | null = document.querySelector('.close-button');

			let featureGroups: any[] = [];
			let groupBounds: any;

			const iconRetinaUrl = './images/leaflet/marker-icon-2x.png';
			const iconUrl = './images/leaflet/marker-icon.png';
			const shadowUrl = './images/leaflet/marker-shadow.png';
			const iconDefault = leaflet.icon({
				iconRetinaUrl,
				iconUrl,
				shadowUrl,
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				tooltipAnchor: [16, -28],
				shadowSize: [41, 41]
			});

			// function to add markers to map
			fetchData('./places.json')
				.then((data) => {
					// create markers width "marker-options-id"
					data.map((marker: any) => {
						featureGroups.push(
							leaflet.marker(marker.coords, {
								icon: iconDefault,
								'marker-options-id': marker.id
							} as CustomMarkerOptions)
						);
					});
					return data;
				})
				.then((data) => {
					// create feature group
					// add markers to map
					featureGroups.map((marker) => {
						markers.addLayer(marker);
					});

					// Add all markers to map
					map.addLayer(markers);

					// create feature group with markers
					groupBounds = leaflet.featureGroup(featureGroups);

					// fitBounds of feature group to map
					map.fitBounds(groupBounds.getBounds(), {
						padding: [50, 50]
					});

					// add event listener to markers to open sidebar
					groupBounds.on('click', function (e: any) {
						if (e.layer instanceof leaflet.Marker) {
							showSidebarWidthText(e.layer.options['marker-options-id']);
						}
					});

					// add comment to sodebar depending on marker id
					function showSidebarWidthText(id: number) {
						const mapContainer: Element | null = document.querySelector('.map-container');
                        data.filter((marker: any) => {
                            if (marker.id === id) {
                                mapContainer?.classList.add('active-sidebar');
                                addContentToSidebar(marker);
                            }
                        });
					}
				});

			// --------------------------------------------------
			// close when click esc
			document.addEventListener('keydown', function (event) {
				// close sidebar when press esc
				if (event.key === 'Escape') {
					closeSidebar();
				}
			});

			// close sidebar when click on close button
            buttonClose?.addEventListener('click', () => {
                // close sidebar when click on close button
                closeSidebar();
            });

			// close sidebar when click outside
			// --------------------------------------------------
			// close sidebar
			function closeSidebar() {
				// remove class active-sidebar
				const mapContainer: Element | null = document.querySelector('.map-container');
				const sidebar: Element | null = document.querySelector('.sidebarm');
				if (mapContainer && sidebar) {
					mapContainer.classList.remove('active-sidebar');
					sidebar.classList.toggle('active');
				}

				// bounds map to default
				boundsMap();
			}

			// --------------------------------------------------
			// add content to sidebar
			function addContentToSidebar(marker: any) {
				// create sidebar content
				const sidebarTemplate = renderProfileCard(marker);

				const sidebar: Element | null = document.querySelector('.sidebarm');
				const sidebarContent = document.querySelector('.card');

				// always remove content before adding new one
				sidebar?.classList.remove('active');
				sidebarContent?.remove();

				// add content to sidebar
				sidebar?.classList.toggle('active');
				sidebar?.insertAdjacentHTML('beforeend', sidebarTemplate);

				// set bounds depending on marker coords
				boundsMap(marker.coords);
			}

			// --------------------------------------------------
			// bounds map when sidebar is open
			function boundsMap(coords?: any) {
				const sidebar = document.querySelector('.sidebarm') as HTMLElement;
				const sidebarWidth = sidebar?.offsetWidth;

				let group!: FeatureGroup<any>;
				if (coords) {
					const marker = leaflet.marker(coords);
					group = leaflet.featureGroup([marker]);
				}

				// bounds depending on whether we have a marker or not
				const bounds = coords ? group.getBounds() : groupBounds.getBounds();

				// set bounds of map depending on sidebar
				// width and feature group bounds
				map.fitBounds(bounds, {
					paddingTopLeft: [coords ? sidebarWidth : 0, 10]
				});
			}
		}
	});

	onDestroy(async () => {
		if (map) {
			console.log('Unloading Leaflet map.');
			map.remove();
		}
	});
</script>

<main class="map-container">
	<svg xmlns="http://www.w3.org/2000/svg" style="display: none">
		<symbol id="icon-clear" viewBox="0 0 24 24">
			<path
				d="M18.984 6.422 13.406 12l5.578 5.578-1.406 1.406L12 13.406l-5.578 5.578-1.406-1.406L10.594 12 5.016 6.422l1.406-1.406L12 10.594l5.578-5.578z"
			/>
		</symbol>
	</svg>

	<div class="sidebarm good">
		<button aria-label="close sidebar" type="button" class="close-button">
			<svg>
				<use xlink:href="#icon-clear" />
			</svg>
		</button>
	</div>
	<div id="map" bind:this={mapElement} />
</main>

<style>
	@import 'leaflet/dist/leaflet.css';
	@import '$lib/LeafletMap.css';
	@import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
</style>