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

export default function RecordDeleteModalBox(props) {
  const handleClose = () => {
    props.modalHandler(false);
  };

  const handleSubmit = () => {
    props.deleteHandler();
  };

  return (
    <div>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Do you really want to delete the record(s)?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>The action cannot be reversed.</DialogContentText>
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
