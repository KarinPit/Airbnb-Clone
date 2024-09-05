import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from "../../../public/svg/MapMarker.svg";

const AnyReactComponent = ({ text }) => (
    <div className='map-marker'>
        <div className='chat-box'>
            <p>{text}</p>
            <div className="chat-arrow"></div>
        </div>
        <img src={MapMarker} alt="Map Marker" />
    </div>
);

export function MapView({ stay }) {
    const [defaultProps, setDefaultProps] = useState({
        center: { lat: 32.5, lng: 34.9 },
        zoom: 15
    });

    const handleApiLoaded = (map, maps) => {
        // use map and maps objects
    };

    useEffect(() => {
        if (stay) {
            const cleanLng = parseFloat(stay.address.location.coordinates[0].toString().replace(/\s+/g, ''));
            const cleanLat = parseFloat(stay.address.location.coordinates[1].toString().replace(/\s+/g, ''));

            setDefaultProps({
                center: { lat: cleanLat, lng: cleanLng },
                zoom: 15
            });
        }

    }, [stay]);

    return (
        <div className="map-container">
            <h2>Where you'll be</h2>
            <div style={{ height: '400px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDMl5nCzylGqvy3ogV2cL1CIxCl7X1b0vQ" }}
                    center={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                >
                    <AnyReactComponent
                        lat={defaultProps.center.lat}
                        lng={defaultProps.center.lng}
                        text="Exact location provided after booking."
                    />
                </GoogleMapReact>
            </div>

            <a href="#" className="show-more">Show more</a>
        </div>
    );
}
