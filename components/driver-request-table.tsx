"use client";
import TableLoader from "app/protected/admin/loading";
import UserModalBox from "./user-edit-modal";
import RideModalBox from "./ride-edit-modal";
import DriverRespondModalBox from "./driver-respond-modal";
import SimpleMap from "./map";
// @ts-expect-error
import MUIDataTable from "mui-datatables";
import useSWR from "swr";
import Button from "@mui/material/Button";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Divider from "@mui/material/Divider";

import { useEffect, useState } from "react";
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ThreeDots from "./threedots";
// @ts-expect-error
export default function DriverRequestTable({ type }) {
  const [isActive, setIsActive] = useState(false);
  const [route, setRoute] = useState({});
  const [rowsExpanded, setRowsExpanded] = useState([]);
  const [rowID, setRowID] = useState(-1);
  const [ReqDetails, setReqDetails] = useState({});

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
            return <ArrowCircleRightIcon color="success" />;
          },
        },
      },
      {
        name: "TO",
      },
      {
        name: "STATUS",
        options: {
          // filter: false,
          // sort: false,
          // empty: true,
          // @ts-expect-error
          customBodyRenderLite: (dataIndex, rowIndex) => {
            var status = data[dataIndex][12];
            var requestID = data[dataIndex][11];
            var sender = data[dataIndex][13];
            var notes = data[dataIndex][14];
            switch (status) {
              case "Pending":
                return (
                  <div className="flex flex-wrap gap-1 place-content-start">
                    <Chip label={status} color="warning" />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setRowID(requestID);
                        setReqDetails({ sender: sender, notes: notes });
                        console.log(ReqDetails);
                        console.log(rowID);
                        setIsActive(!isActive);
                      }}
                    >
                      RESPOND
                    </Button>
                  </div>
                );
                break;
              case "Accepted":
                return (
                  <div className="flex flex-wrap gap-1 place-content-start">
                    <Chip label={status} color="success" />
                  </div>
                );
                break;
              case "Rejected":
                return (
                  <div className="flex flex-wrap gap-1 place-content-start">
                    <Chip label={status} color="error" />
                  </div>
                );
                break;
              default:
                return (
                  <div className="flex flex-wrap gap-1  place-content-start">
                    <Chip label={status} />
                  </div>
                );
            }
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

  const { data, error, isLoading } = useSWR(
    `/api/user/getdriverrequests`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className="flex justify-center">
        <ThreeDots />
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
    //searchAlwaysOpen: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: false,
    download: false,
    filter: false,
    search: true,
    pagination: true,
    viewColumns: false,
    print: false,
    searchPlaceholder: "Search address",
    rowsExpanded: rowsExpanded,
    textLabels: {
      body: {
        noMatch: "You have no requests",
      },
      pagination: {
        rowsPerPage: "Show last",
      },
    },
    // @ts-expect-error
    onTableChange: (action, tableState) => {
      console.log(action);
      switch (action) {
        case "rowExpansionChange":
          console.log(action);
          console.log(tableState);
          var rowsExpanded = tableState.expandedRows.data.map(
            // @ts-expect-error
            (item) => item.index
          );

          if (rowsExpanded.length > 1) {
            // limiting would go here
            rowsExpanded = rowsExpanded.slice(-1);
          }

          console.log(rowsExpanded);

          setRowsExpanded(rowsExpanded);

          break;
      }
    },

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
                      <TableCell>
                        <PlaceIcon sx={{ mr: 2 }} />
                        From
                      </TableCell>
                      <TableCell align="left">
                        {data[rowMeta.dataIndex][2]}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <SportsScoreIcon sx={{ mr: 2 }} />
                        To
                      </TableCell>
                      <TableCell align="left">
                        {data[rowMeta.dataIndex][3]}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <AccessTimeIcon sx={{ mr: 2 }} />
                        Leaving
                      </TableCell>
                      <TableCell align="left">
                        {data[rowMeta.dataIndex][6]}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <PersonOutlineIcon sx={{ mr: 2 }} />
                        Driver
                      </TableCell>
                      <TableCell align="left">
                        {data[rowMeta.dataIndex][7]}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <AirlineSeatReclineExtraIcon sx={{ mr: 2 }} />
                        Seats
                      </TableCell>
                      <TableCell align="left">
                        {data[rowMeta.dataIndex][8]} (filled/offered)
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <AttachMoneyIcon sx={{ mr: 2 }} />
                        Fare
                      </TableCell>
                      <TableCell align="left">
                        ${data[rowMeta.dataIndex][9]}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <DirectionsCarIcon sx={{ mr: 2 }} />
                        Car
                      </TableCell>
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
      <Divider />
      <br></br>
      {/* <SimpleMap route={route} /> */}
      {/* {isActive &&
        (type == "user" ? (
          <UserModalBox modalHandler={handleState} id={rowID} type={type} />
        ) : (
          <RideModalBox modalHandler={handleState} id={rowID} type={type} />
        ))} */}
      {isActive && (
        <DriverRespondModalBox
          modalHandler={handleState}
          ReqDetails={ReqDetails}
          id={rowID}
          type={type}
        />
      )}
      <MUIDataTable
        //title={`${capitalize(type)} List`}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  );
}
