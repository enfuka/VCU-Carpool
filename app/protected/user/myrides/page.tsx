import DriverRequestTable from "@/components/driver-request-table";
import RequestTable from "@/components/request-table";

import { Title } from "@tremor/react";

export default function User() {
  return (
    <div className="flex w-full h-full overflow-auto justify-center bg-gray-50">
      <div className="flex w-full h-full flex-wrap items-stretch mx-3 py-10 justify-start">
        <div className="p-5 justify-center basis-1/2">
          <Title>Booking Requests Sent:</Title>
          <RequestTable type="ride" />
        </div>
        <div className="p-5 justify-center basis-1/2">
          <Title>Booking Requests Received:</Title>
          <DriverRequestTable type="ride" />
        </div>
      </div>
    </div>
  );
}
