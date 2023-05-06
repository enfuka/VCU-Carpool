import VehicleTable from "@/components/vehicle-table";
import { Metric, Title } from "@tremor/react";
import Divider from "@mui/material/Divider";
import Profile from "./profile";

export default function User() {
  return (
    <div className="flex flex-col w-full h-full overflow-auto justify-center bg-gray-50">
      <div className="p-5">
        <Metric>Profile</Metric>
      </div>
      <div className="flex flex-wrap mx-3 justify-items-stretch">
        <div className="p-5 justify-center basis-1/2">
          {/* @ts-expect-error*/}
          <Profile />
        </div>
        <div className="p-5 justify-center">
          <VehicleTable />
        </div>
      </div>
    </div>
  );
}
