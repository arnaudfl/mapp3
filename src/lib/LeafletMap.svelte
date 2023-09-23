<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';

    
    let mapElement: any;
    let map: any;
    
    onMount(async () => {
        if(browser) {
            const leaflet = await import('leaflet');
            
            // config map
            let config = {
                minZoom: 6,
                maxZoom: 18,
            };
            // magnification with which the map will start
            const zoom = 6;
            // co-ordinates
            const lat = 46.545;
            const lng = 2.527;
            
            map = leaflet.map(mapElement, config).setView([lat, lng], zoom);
            
            leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            // ------------------------------------------------------------
            // async function to get data from json
            async function fetchData(url: any) {
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    return data;
                } catch (err) {
                    console.error(err);
                }
            }
            
            // --------------------------------------------------
            // button to close sidebar
            const buttonClose: Element | null = document.querySelector(".close-button");
            
            let featureGroups: any[] = [];
            let groupBounds: any;
            let latlngs: any[] = [];
            
            // function to add markers to map
            fetchData("./places.json")
            .then((data) => {
                // create markers width "marker-options-id"
                data.map((marker: any) => {
                    featureGroups.push(
                    leaflet.marker(marker.coords, {
                        icon: leaflet.divIcon({
                            className: "leaflet-marker-icon",
                            html: `${marker.id}`,
                            iconSize: leaflet.point(30, 30),
                            popupAnchor: [3, -5],
                        }),
                        "marker-options-id": marker.id,
                    })
                    );
                    latlngs.push(marker.coords);
                });
                
                // add polyline to map
                leaflet.polyline(latlngs, {
                    color: "#ff3939",
                    weight: 2,
                }).addTo(map);
                
                return data;
            })
            .then((data) => {
                // create feature group
                // add markers to map
                featureGroups.map((marker) => {
                    marker.addTo(map);
                });
                
                // create feature group with markers
                groupBounds = new leaflet.featureGroup(featureGroups);
                
                // fitBounds of feature group to map
                map.fitBounds(groupBounds.getBounds(), {
                    padding: [50, 50],
                });
                
                // add event listener to markers to open sidebar
                groupBounds.on("click", function (e: any) {
                    if (e.layer instanceof leaflet.Marker) {
                        showSidebarWidthText(e.layer.options["marker-options-id"]);
                    }
                });
                
                // add comment to sodebar depending on marker id
                function showSidebarWidthText(id: any) {
                    const mapContainer: Element | null = document.querySelector(".map-container");
                    if (!!mapContainer) {
                        data.filter((marker: any) => {
                            if (marker.id === id) {
                                mapContainer.classList.add("active-sidebar");
                                addContentToSidebar(marker);
                            }
                        });
                    }
                }
            });
            
            // --------------------------------------------------
            // close when click esc
            document.addEventListener("keydown", function (event) {
                // close sidebar when press esc
                if (event.key === "Escape") {
                    closeSidebar();
                }
            });
            
            // close sidebar when click on close button
            if ( !!buttonClose ){
                buttonClose.addEventListener("click", () => {
                    // close sidebar when click on close button
                    closeSidebar();
                });
            }
            
            // close sidebar when click outside
            // document.addEventListener("click", (e) => {
                //   const target = e.target;
                //   if (
                //     !target.closest(".sidebar") &&
                //     !target.classList.contains("leaflet-marker-icon")
                //   ) {
                    //     closeSidebar();
                    //   }
                    // });
                    
                    // --------------------------------------------------
                    // close sidebar
                    
                    function closeSidebar() {
                        // remove class active-sidebar
                        const mapContainer: Element | null = document.querySelector(".map-container");
                        const sidebar: Element | null = document.querySelector(".sidebarm");
                        if (!!mapContainer && !!sidebar) {
                            mapContainer.classList.remove("active-sidebar");
                            sidebar.classList.toggle("active");
                        }
                        
                        // bounds map to default
                        boundsMap();
                    }
                    
                    // --------------------------------------------------
                    // add content to sidebar
                    
                    function addContentToSidebar(marker: any) {
                        const { id, title, small, description, img, coords } = marker;
                        const smallInfo = small !== undefined ? `<small>${small}</small>` : "";
                        
                        // create sidebar content
                        const sidebarTemplate = `
                        <div class="sidebar-content">
                            <h1>${title}</h1>
                            <div class="marker-id">${id}</div>
                            <div class="info-content">
                                <img class="img-zoom" src="${img.src}" alt="${img.alt}">
                                ${smallInfo}
                                <div class="info-description">${description}</div>
                            </div>
                        </div>
                        `;
                        
                        const sidebar: Element | null = document.querySelector(".sidebarm");
                        const sidebarContent = document.querySelector(".sidebar-content");
                        
                        // always remove content before adding new one
                        sidebarContent?.remove();
                        
                        // add content to sidebar
                        if (!!sidebar) {
                            sidebar.classList.toggle("active");
                            sidebar.insertAdjacentHTML("beforeend", sidebarTemplate);
                        }
                        
                        // set bounds depending on marker coords
                        boundsMap(coords);
                    }
                    
                    // --------------------------------------------------
                    // bounds map when sidebar is open
                    function boundsMap(coords?: any) {
                        const sidebar: HTMLElement | null = document.querySelector(".sidebarm");
                        if (!!sidebar) {
                            sidebar.offsetWidth
                        }
                        
                        const marker = leaflet.marker(coords);
                        const group = leaflet.featureGroup([marker]);
                        
                        // bounds depending on whether we have a marker or not
                        const bounds = coords ? group.getBounds() : groupBounds.getBounds();
                        
                        // set bounds of map depending on sidebar
                        // width and feature group bounds
                        map.fitBounds(bounds, {
                            paddingTopLeft: [coords ? sidebar : 0, 10],
                        });
                    }
                }
            });
            
            onDestroy(async () => {
                if(map) {
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
            <div id="map" bind:this={mapElement}></div>
        </main>
        
        <style>
            @import 'leaflet/dist/leaflet.css';
            @import '$lib/LeafletMap.css';
        </style>