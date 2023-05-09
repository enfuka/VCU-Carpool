"use client";
import TableLoader from "app/protected/admin/loading";
import UserModalBox from "./user-edit-modal";
import RideModalBox from "./ride-edit-modal";
import RecordDeleteModalBox from "./record-delete-modal";
import VehicleEditAdminModalBox from "./vehicle-edit-modal-admin";
// @ts-expect-error
import MUIDataTable from "mui-datatables";
import useSWR, { useSWRConfig } from "swr";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";
// @ts-expect-error
export default function AdminTable({ type }) {
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [idsToDelete, setIdsToDelete] = useState([]);
  const [open, setOpen] = useState(false);
  const [rowID, setRowID] = useState(-1);
  //const { mutate } = useSWRConfig();

  function handleState(state) {
    setIsActive(state);
  }

  function handleState2(state) {
    setIsActive2(state);
  }

  const handleDelete = () => {
    setOpen(true);
    fetch(`/api/admin/deleterecord`, {
      method: "POST",
      body: JSON.stringify({ idsToDelete, type }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setOpen(false);
        //console.log(response);
        if (response.hasOwnProperty("error")) {
          toast.error(response.error);
        } else {
          toast.success("Record is deleted!");
          setTimeout(() => {
            mutate();
          }, 2000);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const [user, ride, vehicle] = [
    [
      "ID",
      "Name",
      "E-mail",
      "Gender",
      "Phone",
      {
        name: "",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRenderLite: (dataIndex, rowIndex) => {
            return (
              <Button
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  setRowID(data[dataIndex][0]);
                  console.log(rowID);
                  setIsActive(!isActive);
                }}
              >
                Edit
              </Button>
            );
          },
        },
      },
    ],
    [
      "ID",
      "Status",
      "From",
      "To",
      "Time",
      "Driver",
      "Seats",
      "Fare",
      "Vehicle",
      {
        name: "",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRenderLite: (dataIndex, rowIndex) => {
            return (
              <Button
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  setRowID(data[dataIndex][0]);
                  console.log(rowID);
                  setIsActive(!isActive);
                }}
              >
                Edit
              </Button>
            );
          },
        },
      },
    ],
    [
      "ID",
      "License",
      "Make",
      "Model",
      "Year",
      "Color",
      "Owner",
      {
        name: "",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRenderLite: (dataIndex, rowIndex) => {
            return (
              <Button
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  setRowID(data[dataIndex][0]);
                  console.log(rowID);
                  setIsActive(!isActive);
                }}
              >
                Edit
              </Button>
            );
          },
        },
      },
    ],
  ];

  let columns = [];
  switch (type) {
    case "user":
      columns = user;
      break;
    case "ride":
      columns = ride;
      break;
    case "vehicle":
      columns = vehicle;
      break;
    default:
    case "user":
      break;
  }

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading, mutate } = useSWR(
    `/api/admin/get${type}s`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className="flex w-full justify-center">
        <TableLoader />
      </div>
    );

  const options = {
    //filterType: "checkbox",
    responsive: "standard",
    onRowsDelete: (rowsDeleted, newTableData) => {
      setIsActive2(!isActive2);
      let ids = [];
      rowsDeleted.data.forEach((element) => {
        ids.push(data[element.dataIndex][0]);
      });
      setIdsToDelete(ids);
      //handleDelete();
      console.log(idsToDelete);
    },
  };

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  let modal;

  switch (type) {
    case "user":
      modal = (
        <UserModalBox modalHandler={handleState} id={rowID} type={type} />
      );
      break;
    case "ride":
      modal = (
        <RideModalBox modalHandler={handleState} id={rowID} type={type} />
      );
      break;
    case "vehicle":
      modal = (
        <VehicleEditAdminModalBox
          modalHandler={handleState}
          id={rowID}
          type={type}
        />
      );
      break;
  }

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        //onClick={handleClose}
      >
        <CircularProgress color="inherit" />
        {/* <p>Loading..</p> */}
      </Backdrop>
      {isActive && modal}
      {isActive2 && (
        <RecordDeleteModalBox
          modalHandler={handleState2}
          deleteHandler={handleDelete}
          id={rowID}
          type={type}
        />
      )}

      <MUIDataTable
        title={`${capitalize(type)} List`}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  );
}
