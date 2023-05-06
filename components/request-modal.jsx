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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  // InputAdornment,
} from "@mui/material";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useEffect, useState, useReducer } from "react";
import toast from "react-hot-toast";

export default function RequestModalBox(props) {
  const [ride, setRide] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setError] = useState("");

  const handleClose = () => {
    props.modalHandler(false);
  };

  var id = props.id;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/user/getride`, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        const rideData = data[0];
        setRide(rideData);
        setFormInput({
          //email: session.user.email,
          ride: id,
        });
        setLoading(false);
        console.log(id);
        console.log(rideData);
      });
  }, [id]);

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { ride: "", notes: "" }
  );

  const handleSubmit = () => {
    let data = { formInput };

    fetch(`/api/user/sendrequest`, {
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
          toast.success("Request sent!");
        }
      })
      .catch((error) => console.error("Error:", error));
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
        <DialogTitle id="form-dialog-title">Book Ride</DialogTitle>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <DialogContent>
            <DialogContentText>Ride details:</DialogContentText>
            <>
              <tr>
                <td colSpan={5}>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <PlaceIcon sx={{ mr: 2 }} />
                            From
                          </TableCell>
                          <TableCell align="left">{ride.source}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <SportsScoreIcon sx={{ mr: 2 }} />
                            To
                          </TableCell>
                          <TableCell align="left">{ride.destination}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <AccessTimeIcon sx={{ mr: 2 }} />
                            Leaving
                          </TableCell>
                          <TableCell align="left">{ride.time}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <PersonOutlineIcon sx={{ mr: 2 }} />
                            Driver
                          </TableCell>
                          <TableCell align="left">{ride.driver}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <AirlineSeatReclineExtraIcon sx={{ mr: 2 }} />
                            Seats
                          </TableCell>
                          <TableCell align="left">
                            {ride.seats} (filled/offered)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <AttachMoneyIcon sx={{ mr: 2 }} />
                            Fare
                          </TableCell>
                          <TableCell align="left">${ride.fare}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <DirectionsCarIcon sx={{ mr: 2 }} />
                            Car
                          </TableCell>
                          <TableCell align="left">{ride.vehicle}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </td>
              </tr>
            </>
            <TextField
              autoFocus
              margin="normal"
              name="notes"
              label="Notes"
              type="text"
              // InputProps={{
              //   inputProps: {
              //     min: 0,
              //     step: 0.01,
              //   },
              //   startAdornment: (
              //     <InputAdornment position="start">$</InputAdornment>
              //   ),
              // }}
              //defaultValue={ride.fare}
              onChange={handleInput}
              fullWidth
            />
            <DialogContentText>
              Check your ride request later to see if ride owner accepted it!
            </DialogContentText>
          </DialogContent>
        )}

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={() => {
              handleSubmit();
              props.modalHandler(false);
              //toast.success(errorMessage);
              // setTimeout(() => {
              //   window.location.reload();
              // }, 2000);
            }}
          >
            SEND REQUEST
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
