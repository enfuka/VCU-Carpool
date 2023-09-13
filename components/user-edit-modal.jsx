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
} from "@mui/material";
import React, { Suspense, useEffect, useState, useReducer } from "react";
import toast from "react-hot-toast";

export default function UserModalBox(props) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const handleClose = () => {
    props.modalHandler(false);
  };

  var id = props.id;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/get${props.type}`, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        const userData = data[0];
        setUser(userData);
        setFormInput(userData);
        setLoading(false);
        console.log(userData);
      });
  }, [id]);

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      first_name: "",
      last_name: "",
      gender: "",
      phone: "",
      admin: "",
    }
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
            <TextField
              autoFocus
              margin="dense"
              name="first_name"
              label="First Name"
              type="text"
              defaultValue={user.first_name}
              //onChange={handleChange("dname")}
              onChange={handleInput}
              fullWidth
              required
            />
            <TextField
              autoFocus
              margin="dense"
              name="last_name"
              label="Last Name"
              type="text"
              defaultValue={user.last_name}
              onChange={handleInput}
              //onChange={(event) => {setValue(event.target.value);}}
              fullWidth
              required
            />
            <TextField
              autoFocus
              margin="dense"
              name="gender"
              label="Gender"
              type="text"
              defaultValue={user.gender}
              onChange={handleInput}
              fullWidth
              required
            />
            <TextField
              autoFocus
              margin="dense"
              name="phone"
              label="Phone Number"
              type="text"
              defaultValue={user.phone}
              onChange={handleInput}
              fullWidth
              pattern="[0-9]{10}"
              required
            />
            <InputLabel id="label">Admin?</InputLabel>
            <Select
              native
              labelId="label"
              fullWidth
              name="admin"
              //label="Admin?"
              defaultValue={user.isAdmin}
              //onChange={handleChange("dsource")}
              onChange={handleInput}
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
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
              toast.success("Changes saved!");
              // setTimeout(() => {
              //   window.location.reload();
              // }, 2000);
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
