import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAvatar } from "../context/AvatarContext"; // Import AvatarContext


import clientImg from "../assets/images/person/default-user.png";
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
    const { avatar, setAvatar } = useAvatar(); // Lấy và cập nhật avatar từ context
    const current = window.location.pathname;

    const uploadAvatar = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("avatar", file);

        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:3000/api/users/upload-avatar", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const fetchUserResponse = await fetch("http://localhost:3000/api/users/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (fetchUserResponse.ok) {
                    const data = await fetchUserResponse.json();
                    setAvatar(data.user.avatar); // Đồng bộ avatar vào context
                    setUser(data.user); // Cập nhật user
                } else {
                    console.error("Failed to fetch updated user data");
                }
            } else {
                const errorData = await response.json();
                console.error("Failed to upload avatar:", errorData);
            }
        } catch (error) {
            console.error("Error during avatar upload:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return setError("No token found in localStorage.");

                const response = await fetch("http://localhost:3000/api/users/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setAvatar(data.user.avatar); // Đồng bộ avatar vào context
                    setUser(data.user);
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || "Failed to fetch user data.");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setError("An error occurred while fetching user data.");
            }
        };

        fetchUser();
    }, [setAvatar]);

    if (error) {
        return (
            <div className="text-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="lg:w-[400px] md:w-1/3 md:px-3">
            <div className="relative md:-mt-48 -mt-32">
                <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
                    <div className="profile-pic text-center mb-5">
                        <input
                            id="pro-img"
                            name="profile-image"
                            type="file"
                            className="hidden"
                            onChange={uploadAvatar}
                        />
                        <div>
                            <div className="relative h-28 w-28 mx-auto">
                                <img
                                    src={avatar ? `http://localhost:3000${avatar}` : clientImg}
                                    alt="User Avatar"
                                    className="w-28 h-28 rounded-full object-cover border border-gray-300"
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
                                <p className="text-slate-40   ">
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
