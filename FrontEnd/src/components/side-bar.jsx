// components/Sidebar.jsx
import { useState } from "react";

export default function Sidebar({ onSelect }) {
    const [active, setActive] = useState("users");

    const handleSelect = (option) => {
        setActive(option);
        onSelect(option);
    };

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
        </div>
    );
};