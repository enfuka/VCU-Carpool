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

export default function RequestCancelModalBox(props) {
  const handleClose = () => {
    props.modalHandler(false);
  };

  var id = props.id;
  var operation = "Cancelled";
  const handleSubmit = () => {
    fetch(`/api/user/updaterequest`, {
      method: "POST",
      body: JSON.stringify({ id, operation }),
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
          toast.success("Request Cancelled! Refreshing...");
        }
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Do you really want to cancel this booking request?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will not be able to send another request to this ride.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleSubmit();
              props.modalHandler(false);
            }}
          >
            CANCEL REQUEST
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
