// components/Sidebar.jsx
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";

export default function Sidebar({ onSelect }) {
    const [active, setActive] = useState("users");

    const handleSelect = (option) => {
        setActive(option);
        onSelect(option);
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    return (
        <div className="w-64 h-screen bg-gray-800 text-white">
            <div className="p-4 text-xl font-bold text-red-500 border-b-2">Tripster Admin</div>
            <div
                className={`p-4 border-b-2 cursor-pointer ${active === "users" ? "bg-gray-700" : ""}`}
                onClick={() => handleSelect("users")}
            >
                Users Management
            </div>
            <div
                className={`p-4 border-b-2 cursor-pointer ${active === "tours" ? "bg-gray-700" : ""}`}
                onClick={() => handleSelect("tours")}
            >
                Tours Management
            </div>
            {/* <div>
                <div
                    className={`p-4 border-b-2 cursor-pointer ${active === "bookings" ? "bg-gray-700" : ""}`}
                    onClick={() => handleSelect("bookings")}
                >
                    Bookings Management
                </div>
            </div> */}
            <div className="p-4 cursor-pointer align-bottom flex" onClick={handleLogout}>
                <span className="mr-2">Logout</span>
                <FiLogOut className="mt-2">Logout</FiLogOut>
            </div>
        </div>
    );
};