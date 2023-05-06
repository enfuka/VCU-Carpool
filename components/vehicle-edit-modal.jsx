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
  Switch,
  // InputAdornment,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useEffect, useState, useReducer } from "react";
import toast from "react-hot-toast";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function VehicleEditModalBox(props) {
  const [vehicle, setVehicle] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);

  const handleClose = () => {
    props.modalHandler(false);
  };

  var id = props.id;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/user/getvehicle`, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        const vehicleData = data[0];
        setVehicle(vehicleData);
        setFormInput(vehicleData);
        setChecked(vehicleData.default == 1 ? true : false);
        setLoading(false);
        console.log(vehicleData);
      });
  }, [id]);

  const handleSubmit = () => {
    fetch(`/api/user/updatevehicle`, {
      method: "POST",
      body: JSON.stringify(formInput),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        //console.log(response);
        if (response.hasOwnProperty("error")) {
          toast.error(response.error);
        } else {
          toast.success("Vehicle is updated! Refreshing...");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {}
  );

  const handleYear = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: parseInt(newValue) });
  };

  const handleSwitch = (event) => {
    setChecked(event.target.checked);
    setFormInput({ isDefault: event.target.checked });
  };

  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
    console.log(formInput);
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
            <TextField
              margin="normal"
              name="license_plate"
              label="License Plate "
              type="text"
              defaultValue={vehicle.license_plate}
              onChange={handleInput}
              fullWidth
            />
            <TextField
              margin="normal"
              name="make"
              label="Make "
              type="text"
              defaultValue={vehicle.make}
              onChange={handleInput}
              fullWidth
            />
            <TextField
              margin="normal"
              name="model"
              label="Model"
              type="text"
              defaultValue={vehicle.model}
              onChange={handleInput}
              fullWidth
            />
            <TextField
              margin="normal"
              name="year"
              label="Year"
              type="number"
              InputProps={{
                inputProps: {
                  min: 1940,
                  step: 1,
                },
              }}
              defaultValue={vehicle.year}
              onChange={handleYear}
              fullWidth
            />
            <TextField
              margin="normal"
              name="color"
              label="Color"
              type="text"
              defaultValue={vehicle.color}
              onChange={handleInput}
              fullWidth
            />
            <FormControlLabel
              control={<Switch checked={checked} onChange={handleSwitch} />}
              label="Default Vehicle"
              labelPlacement="start"
            />
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
