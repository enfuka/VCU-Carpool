"use client";
import TableLoader from "app/protected/admin/loading";
import UserModalBox from "./user-edit-modal";
import RideModalBox from "./ride-edit-modal";
import RequestModalBox from "./request-modal";
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
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
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
import toast from "react-hot-toast";
// @ts-expect-error
export default function UserTable({ type }) {
  const [isActive, setIsActive] = useState(false);
  const [route, setRoute] = useState({});
  const [rowsExpanded, setRowsExpanded] = useState([]);
  const [rowID, setRowID] = useState(-1);
  // @ts-expect-error
  function handleState(state) {
    setIsActive(state);
  }

  // Display toaster once after loading.
  useEffect(() => {
    toast("Click on a ride to see the route on the map!", {
      duration: 6000,
      position: "bottom-center",
      icon: "👆",
    });
    toast("Click on the arrow on the left to see ride details", {
      duration: 8000,
      position: "bottom-left",
      icon: "👆",
    });
  }, []);

  const columns = [
    {
      name: "FROM",
      options: {
        //customHeadRender: () => null,
      },
    },
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        //customHeadRender: () => null,
        // @ts-expect-error
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return <ArrowCircleRightIcon color="success" />;
        },
      },
    },
    {
      name: "TO",
      options: {
        //customHeadRender: () => null,
      },
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
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setRowID(data[dataIndex][4]);
                console.log(rowID);
                setIsActive(!isActive);
              }}
            >
              BOOK
            </Button>
          );
        },
      },
    },
  ];

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
    searchAlwaysOpen: false,
    expandableRowsHeader: false,
    expandableRowsOnClick: false,
    download: false,
    filter: false,
    search: true,
    print: false,
    viewColumns: false,
    searchPlaceholder: "Search address",
    rowsExpanded: rowsExpanded,
    textLabels: {
      body: {
        noMatch: "No rides available for that address",
      },
      pagination: {
        rowsPerPage: "Show:",
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
                    <TableRow>
                      <TableCell>
                        <SpeakerNotesIcon sx={{ mr: 2 }} />
                        Notes
                      </TableCell>
                      <TableCell align="left">
                        {data[rowMeta.dataIndex][11]
                          ? data[rowMeta.dataIndex][11]
                          : "No notes"}
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
      {/* {isActive &&
        (type == "user" ? (
          <UserModalBox modalHandler={handleState} id={rowID} type={type} />
        ) : (
          <RideModalBox modalHandler={handleState} id={rowID} type={type} />
        ))} */}
      {isActive && (
        <RequestModalBox modalHandler={handleState} id={rowID} type={type} />
      )}
      <div className=" flex flex-col justify-center items-center">
        <div className="max-w-7xl w-full h-full flex flex-col justify-items-stretch my-5 ">
          <MUIDataTable
            title={`Available Rides:`}
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </>
  );
}
