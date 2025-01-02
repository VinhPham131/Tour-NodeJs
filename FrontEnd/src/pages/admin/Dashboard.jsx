
import { useState } from "react";
import Sidebar from "../../components/side-bar";
import ToursManagement from "../../components/tours-management";
import UsersManagement from "../../components/users-management";
import BookingsManagement from "../../components/bookings-management";

export default function Dashboard(){
  const [selectedPage, setSelectedPage] = useState("users");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar onSelect={setSelectedPage} />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {selectedPage === "users" && <UsersManagement />}
        {selectedPage === "tours" && <ToursManagement />}
      </div>
    </div>
  );
};
