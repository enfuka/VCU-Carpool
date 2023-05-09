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

export default function DriverRespondModalBox(props) {
  const [request, setRequest] = useState(props.ReqDetails);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setError] = useState("");

  const handleClose = () => {
    props.modalHandler(false);
  };

  var id = props.id;

  useEffect(() => {
    setRequest(props.ReqDetails);
  }, [id]);

  const handleAccept = () => {
    fetch(`/api/user/updaterequest`, {
      method: "POST",
      body: JSON.stringify({ id, operation: "Accepted" }),
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
          toast.success("Responded! Refreshing...");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleReject = () => {
    fetch(`/api/user/updaterequest`, {
      method: "POST",
      body: JSON.stringify({ id, operation: "Rejected" }),
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
          toast.success("Responded!");
          // setTimeout(() => {
          //   window.location.reload();
          // }, 2000);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          How would you like to respond to this ride request?
        </DialogTitle>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <DialogContent>
            <DialogContentText>
              Request sent by: {request.sender}
            </DialogContentText>
            {request.notes && (
              <DialogContentText>
                Notes from the rider: {request.notes}
              </DialogContentText>
            )}
          </DialogContent>
        )}

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              handleReject();
              props.modalHandler(false);
              //toast.success(errorMessage);
            }}
          >
            REJECT
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              handleAccept();
              props.modalHandler(false);
              //toast.success(errorMessage);
            }}
          >
            ACCEPT
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
