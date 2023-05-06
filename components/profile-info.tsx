"use client";

import { Button } from "@mui/material";
import { useState } from "react";
import Divider from "@mui/material/Divider";
import ProfileModalBox from "@/components/profile-edit-modal";
import useSWR from "swr";
import ThreeDots from "./threedots";
import { Metric, Title, Subtitle, Bold, Italic, Text } from "@tremor/react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PlacesAutocomplete from "../app/protected/user/createride/places-autocomplete";

export default function ProfileInfo({ user }: { user: any }) {
  const [isActive, setIsActive] = useState(false);

  // @ts-expect-error
  function handleState(state) {
    setIsActive(state);
  }

  // @ts-expect-error
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/user/getuser`, fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className="flex justify-center">
        <ThreeDots />
      </div>
    );
  const userData = data[0];

  return (
    <>
      {isActive && (
        <ProfileModalBox modalHandler={handleState} email={user.email} />
      )}
      <div className="ml-3">
        {/* <div className="text-base font-medium text-gray-800">{user.name}</div>
        <div className="text-sm font-medium text-gray-500">{user.email}</div> */}
        <Title>Personal Information:</Title>
        <Divider />
        <br></br>
        <List>
          <ListItem>
            <ListItemText
              primary="First Name:"
              secondary={userData.first_name}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Last Name:" secondary={userData.last_name} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email:" secondary={userData.email} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Gender:" secondary={userData.gender} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Phone Number:" secondary={userData.phone} />
          </ListItem>
        </List>
        <Button
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            setIsActive(!isActive);
          }}
        >
          Change Information
        </Button>
      </div>
    </>
  );
}
