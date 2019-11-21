import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { HexagonLayer, HeatmapLayer } from '@deck.gl/aggregation-layers';
import { ScatterplotLayer } from '@deck.gl/layers';

let sourceData = './gundata.json';

const heatmap = () => new HeatmapLayer({
    id: 'heat',
    data: sourceData,
    getPosition: d => [d.longitude, d.latitude],
    getWeight: d => d.n_killed + (d.n_injured * 0.5),
    radiusPixels: 60,
});

const scatterplot = () => new ScatterplotLayer({
    id: 'scatter',
    data: sourceData,
    opacity: 0.8,
    filled: true,
    radiusMinPixels: 2,
    radiusMinPixels: 5,
    getPosition: d => [d.longitude, d.latitude],
    getFillColor: d => d.n_killed > 0 ? [200, 0, 40, 150] : [255, 140, 0, 100], // A map fuc for the color of each value

    pickable: true,
    onHover: ({object, x, y}) => {
        console.log('seeing Hover!');
        const el = document.getElementById('tooltip');
        if (object){
            
            console.log('in callback!');
            const { n_killed, incident_id} = object;
            el.innerHTML = `<h1>${incident_id} Killed: ${n_killed}</h1>`,
            el.style.position = 'absolute'
            el.style.display = 'block',
            el.style.opacity = 0.9,
            el.style.left = x + 'px',
            el.style.top = y + 'px',
            el.style.backgroundColor = '#fff',
            el.style.zIndex = 9
        } else {
            
            console.log('in callback else!');
            el.style.opacity = 0.0;
        }
    }

});

window.initMap = () => {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 33.9551883, lng: -95.9808457},
        zoom: 5
    });

    const overlay = new GoogleMapsOverlay({
        layers: [
            //catterplot(),
            heatmap(),
        ],
    });

    overlay.setMap(map); 

}