import React from "react";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";

export default function SimpleMap({ route }) {
  const [map, setMap] = useState({});

  const handleApiLoaded = (map, maps) => {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    setMap({ service: directionsService, renderer: directionsRenderer });

    const onChangeHandler = function () {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    };
  };

  useEffect(() => {
    calculateAndDisplayRoute();
    console.log(route);
  }, [route]);

  function calculateAndDisplayRoute() {
    try {
      map.service
        .route({
          origin: route.source,
          destination: route.destination,
          travelMode: google.maps.TravelMode.DRIVING,
        })
        .then((response) => {
          map.renderer.setDirections(response);
        })
        .catch((e) =>
          window.alert("Directions request failed due to " + status)
        );
    } catch (error) {}
  }

  const defaultProps = {
    center: {
      lat: 37.5407,
      lng: -77.436,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "30vh", width: "100%" }}>
      <GoogleMapReact
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      ></GoogleMapReact>
    </div>
  );
}
