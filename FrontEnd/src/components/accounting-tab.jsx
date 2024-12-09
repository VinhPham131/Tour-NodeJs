import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import clientImg from "../assets/images/person/16.png";
import {
    FiUser,
    FiFileText,
    FiLogOut,
    FiSettings,
} from "../assets/icons/vander";

export default function AccountingTab() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const current = window.location.pathname;

    const loadFile = (e) => {
        const image = document.getElementById("profile-image");
        image.src = URL.createObjectURL(e.target.files[0]);
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear token
        sessionStorage.removeItem("token"); // Clear session token
        localStorage.removeItem("user"); // Clear user data
        navigate("/login"); // Redirect to login
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Ensure the token is being retrieved correctly
                const token = localStorage.getItem('token');

                if (!token) {
                    setError('No token found in localStorage.');
                    return;
                }

                // Send token in the Authorization header
                const response = await fetch("http://localhost:3000/api/users/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Add token to header
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.user) {
                        setUser(data.user); // Handle the response and set user data
                    } else {
                        setError("User profile data not found.");
                    }
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || "Failed to fetch profile.");
                }
            } catch (error) {
                setError(error.message || "An unexpected error occurred.");
                console.error('Fetch error:', error); // Log to the console
            }
        };

        fetchUser();
    }, []);

    if (error) {
        return (
            <div className="text-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="lg:w-1/4 md:w-1/3 md:px-3">
            <div className="relative md:-mt-48 -mt-32">
                <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
                    <div className="profile-pic text-center mb-5">
                        <input
                            id="pro-img"
                            name="profile-image"
                            type="file"
                            className="hidden"
                            onChange={(e) => loadFile(e)}
                        />
                        <div>
                            <div className="relative h-28 w-28 mx-auto">
                                <img
                                    src={user?.avatar || clientImg}
                                    className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
                                    id="profile-image"
                                    alt="Profile"
                                />
                                <label
                                    className="absolute inset-0 cursor-pointer"
                                    htmlFor="pro-img"
                                ></label>
                            </div>

                            <div className="mt-4">
                                <h5 className="text-lg font-semibold">
                                    {user ? user.name : "Loading..."}
                                </h5>
                                <p className="text-slate-400">
                                    {user ? user.email : "Loading..."}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-700">
                        <ul className="list-none sidebar-nav mb-0 pb-0" id="navmenu-nav">
                            <li
                                className={`navbar-item account-menu ${current === "/profile" ? "active" : ""
                                    }`}
                            >
                                <Link
                                    to="/profile"
                                    className="navbar-link text-slate-400 flex items-center py-2 rounded"
                                >
                                    <span className="me-2 mb-0">
                                        <FiUser className="size-4" />
                                    </span>
                                    <h6 className="mb-0 font-medium">Profile</h6>
                                </Link>
                            </li>

                            <li
                                className={`navbar-item account-menu ${current === "/user-invoice" ? "active" : ""
                                    }`}
                            >
                                <Link
                                    to="/invoice"
                                    className="navbar-link text-slate-400 flex items-center py-2 rounded"
                                >
                                    <span className="me-2 mb-0">
                                        <FiFileText className="size-4" />
                                    </span>
                                    <h6 className="mb-0 font-medium">Invoice</h6>
                                </Link>
                            </li>
                            <li
                                className={`navbar-item account-menu ${current === "/user-invoice" ? "active" : ""
                                    }`}
                            >
                                <Link
                                    to="/setting"
                                    className="navbar-link text-slate-400 flex items-center py-2 rounded"
                                >
                                    <span className="me-2 mb-0">
                                        <FiSettings className="size-4" />
                                    </span>
                                    <h6 className="mb-0 font-medium">Settings</h6>
                                </Link>
                            </li>

                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center font-medium py-2 px-4 dark:text-white/70 hover:text-red-500 dark:hover:text-white"
                                >
                                    <FiLogOut className="size-4 me-2" />
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
