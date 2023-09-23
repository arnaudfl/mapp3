<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    
    let mapElement: any;
    let map: any;
    
    onMount(async () => {
        if(browser) {
            const leaflet = await import('leaflet');
            const { MarkerClusterGroup }: any = await import('leaflet.markercluster')
            
            map = leaflet.map(mapElement).setView([46.545, 2.527], 6);
            
            leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
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
            let markers = new MarkerClusterGroup()
            
            let featureGroups: any[] = [];
            
            // function to add markers to map
            fetchData("./places.json")
            .then((data) => {
                data.map((marker: any) => {
                    featureGroups.push(
                    leaflet.marker(marker.coords, {
                        title: marker.title,
                    })
                    );
                })
                return data;
            })
            .then((data) => {
                featureGroups.map((marker) => {
                    markers.addLayer(marker);
                });
                
                // Add all markers to map
                map.addLayer(markers);
            });
        }
    });
    
    onDestroy(async () => {
        if(map) {
            console.log('Unloading Leaflet map.');
            map.remove();
        }
    });
</script>

<main>
    <div id="map" bind:this={mapElement}></div>
</main>

<style>
    @import 'leaflet/dist/leaflet.css';
    @import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
    #map {
        height: 800px;
        width: 800px;
    }
</style>