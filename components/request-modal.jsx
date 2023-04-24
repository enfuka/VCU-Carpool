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
import InputAdornment from "@mui/material/InputAdornment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useEffect, useState, useReducer } from "react";
import toast from "react-hot-toast";

export default function RideModalBox(props) {
  const [ride, setRide] = useState(null);
  const [raw, setRaw] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleClose = () => {
    props.modalHandler(false);
  };

  var id = props.id;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/getaddresses`, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setAddresses(data);
        console.log(data);
      });
    fetch(`/api/admin/getdrivers`, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setDrivers(data);
        console.log(data);
      });
    fetch(`/api/admin/getvehicles`, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setVehicles(data);
        console.log(data);
      });
    fetch(`/api/admin/get${props.type}`, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        const rideData = data[0];
        const rawRideData = data[1];
        setRide(rideData);
        setFormInput(rawRideData);
        setRaw(rawRideData);
        setFormInput({
          time: dayjs(rawRideData.time).format("YYYY-MM-DD HH:mm:ss"),
        });
        setFormInput({
          fare: parseFloat(rawRideData.fare),
        });
        setLoading(false);
        console.log(rideData);
      });
  }, [id]);

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {}
  );

  const handleSubmit = () => {
    let data = { formInput };

    fetch(`/api/admin/update${props.type}`, {
      method: "POST",
      body: JSON.stringify(formInput),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => console.log("Success:", JSON.stringify(response)))
      .catch((error) => console.error("Error:", error));
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

  const handleTime = (newValue) => {
    setFormInput({ time: newValue.format("YYYY-MM-DD HH:mm:ss") });
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
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <DialogContent>
            <DialogContentText>{`ID: ${props.id}`}</DialogContentText>
            <br></br>
            <Autocomplete
              disablePortal
              isOptionEqualToValue={(option, value) => option.label == value}
              id="from"
              options={addresses}
              fullWidth
              sx={{ width: 300 }}
              defaultValue={ride.from}
              onChange={handleSelect}
              renderInput={(params) => <TextField {...params} label="From" />}
            />
            <br></br>
            <Autocomplete
              disablePortal
              isOptionEqualToValue={(option, value) => option.label == value}
              id="to"
              options={addresses}
              fullWidth
              value={ride.to}
              onChange={handleSelect}
              renderInput={(params) => <TextField {...params} label="To" />}
            />
            <br></br>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField {...props} sx={{ m: 10, width: 300 }} />
                  )}
                  //textFieldStyle={{ width: "100%" }}
                  name="picker"
                  label="Time"
                  margin="normal"
                  defaultValue={dayjs(ride.time)}
                  onChange={handleTime}
                  //onChange={(newValue) => setValue(newValue)}
                />
              </LocalizationProvider>
            </div>
            <br></br>
            <Autocomplete
              disablePortal
              isOptionEqualToValue={(option, value) => option.label == value}
              id="driver"
              margin="normal"
              options={drivers}
              fullWidth
              defaultValue={ride.driver}
              onChange={handleSelect}
              renderInput={(params) => (
                <TextField {...params} sx={{ mt: 2 }} label="Driver" />
              )}
            />
            <br></br>
            <Autocomplete
              disablePortal
              isOptionEqualToValue={(option, value) => option.label == value}
              id="vehicle"
              options={vehicles}
              fullWidth
              defaultValue={ride.vehicle}
              onChange={handleSelect}
              renderInput={(params) => (
                <TextField {...params} label="Vehicle" />
              )}
            />
            <br></br>
            <TextField
              autoFocus
              margin="normal"
              name="seats"
              label="Available Seats"
              type="number"
              InputProps={{
                inputProps: {
                  min: raw.seats,
                  step: 1,
                },
              }}
              defaultValue={raw.seats}
              onChange={handleSeats}
              fullWidth
            />
            <TextField
              autoFocus
              margin="normal"
              name="fare"
              label="Fare"
              type="number"
              InputProps={{
                inputProps: {
                  min: 0,
                  step: 0.01,
                },
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              defaultValue={ride.fare}
              onChange={handleFare}
              fullWidth
            />
            <InputLabel id="label">Status</InputLabel>
            <Select
              native
              labelId="label"
              fullWidth
              name="status"
              defaultValue={ride.status}
              onChange={handleInput}
            >
              <option value={"open"}>open</option>
              <option value={"closed"}>closed</option>
            </Select>
          </DialogContent>
        )}

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
              props.modalHandler(false);
              toast.success("Changes saved! Refreshing...");
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }}
            color="primary"
          >
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
