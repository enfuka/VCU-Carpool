"use client";
import TableLoader from "app/protected/admin/loading";
// @ts-expect-error
import MUIDataTable from "mui-datatables";
// import { useState, useEffect } from "react";
import useSWR from "swr";
// @ts-expect-error
export default function AdminTable({ type }) {
  const [user, ride] = [
    ["ID", "Name", "E-mail", "Gender", "Phone"],
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
    ],
  ];
  let columns: string[] = [];
  switch (type) {
    case "user":
      columns = user;
      break;
    case "ride":
      columns = ride;
      break;
    default:
    case "user":
      break;
  }
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   async function getUsers() {
  //     const res = await fetch("http://localhost:3000//api/getusers", {
  //       method: "GET",
  //     });
  //     const rows = await res.json();
  //     setData(rows);
  //     console.log(rows);
  //   }
  //   getUsers();
  // }, []);

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
    <MUIDataTable
      title={`${capitalize(type)} List`}
      data={data}
      columns={columns}
      options={options}
    />
  );
}
