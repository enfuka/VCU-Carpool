import VehicleTable from "@/components/vehicle-table";
import { Metric, Title } from "@tremor/react";
import Divider from "@mui/material/Divider";
import RideForm from "./ride-form";

export default function User() {
  return (
    <div className="flex flex-col w-full h-full overflow-auto justify-center bg-gray-50">
      <div className="p-5">
        <Metric>Create Ride</Metric>
      </div>
      <div className="flex flex-wrap mx-3 justify-items-stretch">
        <div className="px-5 w-full justify-center">
          <RideForm />
        </div>
      </div>
    </div>
  );
}
