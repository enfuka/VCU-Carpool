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
import React, { useEffect, useState, useReducer } from "react";
import toast from "react-hot-toast";

export default function VehicleDeleteModalBox(props) {
  const handleClose = () => {
    props.modalHandler(false);
  };

  var id = props.id;
  const handleSubmit = () => {
    fetch(`/api/user/deletevehicle`, {
      method: "POST",
      body: JSON.stringify({ id }),
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
          toast.success("Vehicle is deleted! Refreshing...");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Do you really want to delete this vehicle?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have to have at least one vehicle to drive.
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
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
