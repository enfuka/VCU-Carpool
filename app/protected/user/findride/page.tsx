import UserTable from "@/components/user-table";

export default function Admin() {
  return (
    <div className="flex w-full h-full justify-center bg-gray-50">
      <div className="h-full w-full flex flex-col justify-center">
        <div>
          <UserTable type="ride" />
        </div>
      </div>
    </div>
  );
}
