import React from "react";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { usePlacesWidget } from "react-google-autocomplete";
import { TextField } from "@mui/material";

export default function PlacesAutocomplete(props) {
  const center = { lat: 37.5407, lng: -77.436 };
  // Create a bounding box with sides ~10km away from the center point
  const defaultBounds = {
    north: center.lat + 1,
    south: center.lat - 1,
    east: center.lng + 1,
    west: center.lng - 1,
  };

  const { ref, autocompleteRef } = usePlacesWidget({
    apiKey: "AIzaSyCVxG0GoEjJ5pF8o9narcn3GQSeJJDEoeY",
    options: {
      bounds: defaultBounds,
      debounce: 500,
      componentRestrictions: { country: "us" },
      fields: ["address_components"],
      strictBounds: true,
      types: ["address"],
    },
    onPlaceSelected: (place) => {
      props.handleClick(place);
    },
  });

  return (
    // <Autocomplete
    //   apiKey={process.env.REACT_APP_GOOGLE}
    //   onPlaceSelected={(place) => {
    //     console.log(place);
    //   }}
    //   options={{
    //     bounds: defaultBounds,
    //     debounce: 500,
    //     componentRestrictions: { country: "us" },
    //     fields: ["address_components"],
    //     strictBounds: true,
    //     types: ["address"],
    //   }}
    // />
    <TextField inputRef={ref} {...props} />
  );
}
