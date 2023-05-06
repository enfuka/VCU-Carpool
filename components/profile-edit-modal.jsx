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
import LoadingOverlay from "react-loading-overlay";

export default function ProfileModalBox(props) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const handleClose = () => {
    props.modalHandler(false);
  };

  var email = props.email;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/user/getuser`, {
      method: "POST",
      body: JSON.stringify({ email }),
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
  }, [email]);

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      first_name: "",
      last_name: "",
      gender: "",
      phone: "",
    }
  );

  const handleSubmit = () => {
    let data = { formInput };

    fetch(`/api/user/updateprofile`, {
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
          toast.success("Changes saved! Refreshing...");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  //if (isLoading) return <p>Loading...</p>;

  return (
    <LoadingOverlay active={isLoading} text="Loading...">
      <div>
        <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit</DialogTitle>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <DialogContent>
              <TextField
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
    </LoadingOverlay>
  );
}
