"use client";
import {
  Button,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  InputLabel,
  Autocomplete,
  // InputAdornment,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import React, { useEffect, useState, useReducer } from "react";
import Divider from "@mui/material/Divider";
import ProfileModalBox from "@/components/profile-edit-modal";
import useSWR from "swr";
import ThreeDots from "@/components/threedots";
import { Metric, Title, Subtitle, Bold, Italic, Text } from "@tremor/react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import PlaceIcon from "@mui/icons-material/Place";
import InputAdornment from "@mui/material/InputAdornment";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import PlacesAutocomplete from "./places-autocomplete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SendIcon from "@mui/icons-material/Send";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RideForm() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/user/getridevehicles`, {
      method: "POST",
      body: JSON.stringify({}),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length == 0) {
          toast.custom(
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              You have to add a vehicle to your profile to create a ride —{" "}
              <strong>redirecting to profile...</strong>
            </Alert>
          );
          setTimeout(() => {
            router.push("/protected/user/profile");
          }, 3000);
        } else {
          setVehicles(data);
          setFormInput({ vehicle: data[0].id });
        }
        setLoading(false);
        console.log(data);
      });
  }, []);

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { notes: "", fare: 0, seats: 1 }
  );

  function handleSource(place) {
    setIsSelected(true);
    console.log(place);
    try {
      var address = place.address_components;
      var street = (address[0].short_name || "").concat(
        " ",
        address[1].short_name || ""
      );
      var city = address[3].short_name || "";
      var state = address[4].short_name || "";
      var zip = address[6].short_name || "";
    } catch (error) {}
    setFormInput({
      source: { street: street, city: city, state: state, zip: zip },
    });
    console.log(formInput);
  }

  function handleDestination(place) {
    setIsSelected(true);
    console.log(place);
    try {
      var address = place.address_components;
      var street = (address[0].short_name || "").concat(
        " ",
        address[1].short_name || ""
      );
      var city = address[3].short_name || "";
      var state = address[4].short_name || "";
      var zip = address[6].short_name || "";
    } catch (error) {}
    setFormInput({
      destination: { street: street, city: city, state: state, zip: zip },
    });
    console.log(formInput);
  }

  const handleTampering = (evt) => {
    setIsSelected(false);
    console.log(formInput);
    console.log(isSelected);
  };

  const handleTime = (newValue) => {
    setFormInput({ time: newValue.format("YYYY-MM-DD HH:mm:ss") });
  };

  const handleSelect = (evt, newValue) => {
    try {
      const name = evt.target.id.split("-")[0];
      setFormInput({ [name]: newValue.id });
    } catch (error) {
      console.error(error);
    }
    console.log(newValue);
    console.log(formInput);
  };

  const handleFare = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: parseFloat(newValue) });
  };
  const handleSeats = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: parseInt(newValue) });
  };

  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
    console.log(formInput);
  };

  const handleSubmit = () => {
    fetch(`/api/user/createride`, {
      method: "POST",
      body: JSON.stringify(formInput),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        //console.log(response);
        setOpen(false);
        if (response.hasOwnProperty("error")) {
          toast.error(response.error);
        } else {
          toast.custom(
            <Alert severity="success">
              <AlertTitle>Success!</AlertTitle>
              Ride is created <strong>!</strong>
            </Alert>
          );
          setTimeout(() => {
            router.push("/protected/user/findride");
          }, 2000);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  if (isLoading)
    return (
      <div className="flex justify-center">
        <ThreeDots />
      </div>
    );

  return (
    <div className="flex flex-col w-full">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        //onClick={handleClose}
      >
        <CircularProgress color="inherit" />
        {/* <p>Loading..</p> */}
      </Backdrop>

      <PlacesAutocomplete
        autoFocus
        handleClick={handleSource}
        margin="normal"
        fullWidth
        name="source"
        label="Going from..."
        placeholder="Search address"
        onChange={handleTampering}
        InputProps={{
          // inputProps: {
          //   min: 0,
          //   step: 0.01,
          // },
          startAdornment: (
            <InputAdornment position="start">
              <PlaceIcon />
            </InputAdornment>
          ),
        }}
      />

      <PlacesAutocomplete
        handleClick={handleDestination}
        margin="normal"
        fullWidth
        name="destination"
        label="Going to..."
        placeholder="Search address"
        onChange={handleTampering}
        InputProps={{
          // inputProps: {
          //   min: 0,
          //   step: 0.01,
          // },
          startAdornment: (
            <InputAdornment position="start">
              <SportsScoreIcon />
            </InputAdornment>
          ),
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <br></br>
        <DateTimePicker
          disablePast={true}
          renderInput={(props) => <TextField {...props} sx={{ m: 50 }} />}
          //textFieldStyle={{ width: "100%" }}
          // defaultValue={dayjs(ride.time)}
          //onChange={(newValue) => setValue(newValue)}
          //margin="normal"
          name="picker"
          label="Departure Time"
          onChange={handleTime}
        />
      </LocalizationProvider>
      <Autocomplete
        disablePortal
        isOptionEqualToValue={(option, value) => option.label == value}
        id="vehicle"
        options={vehicles}
        fullWidth
        defaultValue={vehicles[0]}
        onChange={handleSelect}
        renderInput={(params) => (
          <TextField {...params} sx={{ my: 3 }} label="Vehicle" />
        )}
      />
      <div className="flex flex-row space-x-8 w-full">
        <TextField
          margin="normal"
          name="seats"
          label="Available Seats"
          type="number"
          InputProps={{
            inputProps: {
              min: 1,
              step: 1,
              max: 10,
            },
            startAdornment: (
              <InputAdornment position="start">
                <AirlineSeatReclineExtraIcon />
              </InputAdornment>
            ),
          }}
          defaultValue={1}
          onChange={handleSeats}
          fullWidth
        />
        <TextField
          margin="normal"
          name="fare"
          label="Fare"
          type="number"
          InputProps={{
            inputProps: {
              min: 0,
              step: 0.01,
            },
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          defaultValue={0}
          onChange={handleFare}
          fullWidth
        />
      </div>
      <TextField
        margin="normal"
        name="notes"
        label="Notes"
        type="text"
        // InputProps={{
        //   inputProps: {
        //     min: raw.seats,
        //     step: 1,
        //   },
        // }}
        onChange={handleInput}
        fullWidth
      />
      <br></br>
      <Button
        variant="contained"
        endIcon={<DirectionsCarIcon />}
        onClick={() => {
          setOpen(true);
          handleSubmit();
        }}
      >
        CREATE RIDE
      </Button>
    </div>
  );
}
