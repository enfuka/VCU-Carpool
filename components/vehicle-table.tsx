"use client";
import VehicleDeleteModalBox from "./vehicle-delete-modal";
import VehicleEditModalBox from "./vehicle-edit-modal";
import VehicleAddModalBox from "./vehicle-add-modal";
// @ts-expect-error
import MUIDataTable from "mui-datatables";
import useSWR from "swr";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
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
import { Title } from "@tremor/react";

export default function VehicleTable() {
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [route, setRoute] = useState({});
  const [rowsExpanded, setRowsExpanded] = useState([]);
  const [rowID, setRowID] = useState(-1);
  const [ReqDetails, setReqDetails] = useState({});

  // @ts-expect-error
  function handleState1(state) {
    setIsActive1(state);
  }
  // @ts-expect-error
  function handleState2(state) {
    setIsActive2(state);
  }
  // @ts-expect-error
  function handleState3(state) {
    setIsActive3(state);
  }

  const columns = [
    {
      name: "",
      options: {
        customHeadRender: () => null,
      },
    },
    {
      name: "",
      options: {
        customHeadRender: () => null,
        // filter: false,
        // sort: false,
        // empty: true,
        // @ts-expect-error
        customBodyRenderLite: (dataIndex, rowIndex) => {
          var isDefault = data[dataIndex][7];
          if (isDefault) {
            return <Chip label="Default" variant="outlined" color="success" />;
          }
        },
      },
    },
    {
      name: "",
      options: {
        customHeadRender: () => {
          return (
            <Button
              startIcon={<AddIcon />}
              variant="text"
              onClick={(e) => {
                e.stopPropagation();
                setIsActive3(!isActive3);
              }}
            >
              Add Vehicle
            </Button>
          );
        },
        filter: false,
        sort: false,
        empty: true,
        // @ts-expect-error
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <>
              <Button
                variant="outlined"
                size="small"
                //sx={{ ml: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setRowID(data[dataIndex][1]);
                  console.log(rowID);
                  setIsActive1(!isActive1);
                }}
              >
                EDIT
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                //sx={{ ml: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setRowID(data[dataIndex][1]);
                  console.log(rowID);
                  setIsActive2(!isActive2);
                }}
              >
                DELETE
              </Button>
            </>
          );
        },
      },
    },
  ];

  // @ts-expect-error
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(`/api/user/getvehicles`, fetcher);

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
    search: false,
    pagination: false,
    viewColumns: false,
    print: false,
    searchPlaceholder: "Search address",
    rowsExpanded: rowsExpanded,
    textLabels: {
      body: {
        noMatch: "You have no vehicles",
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
                      <TableCell>License Plate</TableCell>
                      <TableCell align="left">
                        {data[rowMeta.dataIndex][2]}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Year</TableCell>
                      <TableCell align="left">
                        {data[rowMeta.dataIndex][5]}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Color</TableCell>
                      <TableCell align="left">
                        {data[rowMeta.dataIndex][6]}
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

  return (
    <>
      <Title>Vehicles:</Title>
      <Divider />
      <br></br>
      {isActive1 && (
        <VehicleEditModalBox
          modalHandler={handleState1}
          id={rowID}
          //type={type}
        />
      )}
      {isActive2 && (
        <VehicleDeleteModalBox
          modalHandler={handleState2}
          id={rowID}
          //type={type}
        />
      )}
      {isActive3 && <VehicleAddModalBox modalHandler={handleState3} />}
      <MUIDataTable
        //title={"Vehicles"}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  );
}
