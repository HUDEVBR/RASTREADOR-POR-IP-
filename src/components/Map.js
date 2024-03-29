
import { TileLayer, MapContainer, Marker } from 'react-leaflet';
// import LocationIcon from '../assets/icon-location.svg';

import L from 'leaflet';
import { memo, useEffect, useState } from 'react';


const Map = ({ location, defaultPosition }) => {
    const [map, setMap] = useState(null);

    function handleSetView() {
        if (map && location){
            map.flyTo(location, 12, {
                duration: 4
            })
        }
    }

    useEffect(()  => handleSetView, [location]);

const icon = '<svg xmlns="http://www.w3.org/2000/svg" width="46" height="56"><path fill-rule="evenodd" d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"/></svg>';

const svgURL = "data:image/svg+xml;base64," + btoa(icon);

const markerIcon = new L.icon({
    iconUrl: svgURL,
    iconSize: [46, 56],
    iconAnchor: [18, 50]
})
    return (
        <MapContainer 
            center={defaultPosition} 
            zoom={12} 
            scrollWheelZoom={false} 
            style={{width: '100%', height: '100%'}}
            whenCreated={map => setMap(map)}
        >
            <TileLayer 
            attribution= '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contribuitors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
            <Marker position={location} icon={markerIcon}/>
        </MapContainer>
    )
}

export default memo(Map);