"use client";
import TableLoader from "app/protected/admin/loading";
import UserModalBox from "./user-edit-modal";
import RideModalBox from "./ride-edit-modal";
// @ts-expect-error
import MUIDataTable from "mui-datatables";
import useSWR from "swr";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
// @ts-expect-error
export default function AdminTable({ type }) {
  const [isActive, setIsActive] = useState(false);

  const [rowID, setRowID] = useState(-1);

  // @ts-expect-error
  function handleState(state) {
    setIsActive(state);
  }

  const [user, ride] = [
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
          // @ts-expect-error
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
          // @ts-expect-error
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
  let columns: string[] = [];
  switch (type) {
    case "user":
      // @ts-expect-error
      columns = user;
      break;
    case "ride":
      // @ts-expect-error
      columns = ride;
      break;
    default:
    case "user":
      break;
  }

  // @ts-expect-error
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(`/api/admin/get${type}s`, fetcher);

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
    onRowsDelete: () => {
      window.alert("deleted");
    },
  };

  function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      {isActive &&
        (type == "user" ? (
          <UserModalBox modalHandler={handleState} id={rowID} type={type} />
        ) : (
          <RideModalBox modalHandler={handleState} id={rowID} type={type} />
        ))}
      <MUIDataTable
        title={`${capitalize(type)} List`}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  );
}
