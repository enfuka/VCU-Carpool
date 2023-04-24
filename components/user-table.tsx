"use client";
import TableLoader from "app/protected/admin/loading";
import UserModalBox from "./user-edit-modal";
import RideModalBox from "./ride-edit-modal";
import SimpleMap from "./map";
// @ts-expect-error
import MUIDataTable from "mui-datatables";
import useSWR from "swr";
import Button from "@mui/material/Button";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
// @ts-expect-error
export default function UserTable({ type }) {
  const [isActive, setIsActive] = useState(false);
  const [route, setRoute] = useState({});

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
      {
        name: "FROM",
      },
      {
        name: "",
        options: {
          filter: false,
          sort: false,
          empty: true,
          // @ts-expect-error
          customBodyRenderLite: (dataIndex, rowIndex) => {
            return <KeyboardDoubleArrowRightIcon color="success" />;
          },
        },
      },
      {
        name: "TO",
      },
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

  const { data, error, isLoading } = useSWR(`/api/user/get${type}s`, fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className="flex w-full justify-center">
        <TableLoader />
      </div>
    );
  // @ts-expect-error
  const rowClickHandler = (rowMeta) => {
    setRoute({
      source: data[rowMeta.dataIndex][2],
      destination: data[rowMeta.dataIndex][3],
    });
    console.log(route);
  };

  const options = {
    //filterType: "checkbox",
    responsive: "standard",
    selectableRows: "none",
    expandableRows: true,
    searchAlwaysOpen: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: true,
    download: false,
    viewColumns: false,
    print: false,
    searchPlaceholder: "Search address",
    // @ts-expect-error
    onRowClick: (rowData, rowMeta) => {
      rowClickHandler(rowMeta);
      //setRoute({ source: rowData[0], destination: rowData[2] });
      //console.log(route);
    },
    onRowsDelete: () => {
      window.alert("deleted");
    },
    // @ts-expect-error
    renderExpandableRow: (rowData, rowMeta) => {
      console.log(rowData, rowMeta);
      return (
        <>
          <tr>
            <td colSpan={5}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell>Going from</TableCell>
                      <TableCell align="left">
                        {data[rowMeta.dataIndex][2]}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Going to</TableCell>
                      <TableCell align="left">
                        {data[rowMeta.dataIndex][3]}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Leaving at</TableCell>
                      <TableCell align="left">
                        {data[rowMeta.dataIndex][6]}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Driver</TableCell>
                      <TableCell align="left">
                        {data[rowMeta.dataIndex][7]}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Available Seats</TableCell>
                      <TableCell align="left">
                        {data[rowMeta.dataIndex][8]}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Fare</TableCell>
                      <TableCell align="left">
                        ${data[rowMeta.dataIndex][9]}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Car</TableCell>
                      <TableCell align="left">
                        {data[rowMeta.dataIndex][10]}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </td>
          </tr>
        </>
      );
    },
  };

  function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      <SimpleMap route={route} />
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
