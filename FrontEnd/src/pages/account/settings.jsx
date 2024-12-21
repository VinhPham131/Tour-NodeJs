import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import AccountingTab from "../../components/accounting-tab";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Settings() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [deleteConfirm, setDeleteConfirm] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);



    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            setError("New password and confirm password do not match.");
            setMessage(null);
            return;
        }
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3000/api/users/update-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const data = await response.json();
            if (!response.ok) {
                if (data.message === "x") {
                    throw new Error("The current password you entered is incorrect.");
                }
                throw new Error(data.message || "Failed to update password.");
            }

            setMessage("Password updated successfully.");
            setError(null);
        } catch (err) {
            setError(err.message);
            setMessage(null);
        }
    };

    const handleDeleteAccount = async () => {
        if (deleteConfirm !== "DELETE") {
            setError("Please type 'DELETE' to confirm.");
            setMessage(null);
            return;
        }

        if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3000/api/users/delete", {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to delete account.");
            }

            localStorage.removeItem("token");
            navigate("/login");
        } catch (err) {
            setError(err.message);
            setMessage(null);
        }
    };

    return (
        <>
            <Navbar navclass="defaultscroll is-sticky" navlight={false} manuclass="justify-end" />
            <section className="relative lg:pb-24 pb-16 md:mt-[84px] mt-[70px]">
                <div className="md:container container-fluid relative">
                    <div className="relative overflow-hidden md:rounded-md shadow dark:shadow-gray-800 h-52 bg-[url('../../assets/images/bg/cta.jpg')] bg-center bg-no-repeat bg-cover"></div>
                </div>

                <div className="container relative md:mt-24 mt-16">
                    <div className="md:flex">
                        <AccountingTab />
                        <div className="lg:w-3/4 md:w-2/3 md:px-3 mt-6 md:mt-0">
                            <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
                                <h5 className="text-2xl font-semibold mb-4">Settings</h5>
                                <div className=" mb-14 ">
                                    <div></div>
                                    <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                                    <div className="relative mb-6">
                                        <input
                                            type={showPassword ? "text" : "password"} // Toggle between 'password' and 'text'
                                            placeholder="Current Password"
                                            className="block w-[500px] mb-6 px-4 py-2 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-800 focus:ring-0"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                        />
                                        {/* Eye Icon for toggling password visibility */}
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-[200px] top-[20px] transform -translate-y-1/2 text-gray-500"
                                        >
                                            {showPassword ? (
                                                <FiEye className="w-4 h-4" />
                                            ) : (
                                                <FiEyeOff className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="relative mb-6">
                                        <input
                                            type={showNewPassword ? "text" : "password"} // Toggle between 'password' and 'text'
                                            placeholder="New Password"
                                            className="block w-[500px] mb-6 px-4 py-2 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-800 focus:ring-0"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        {/* Eye Icon for toggling password visibility */}
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-[200px] top-[20px] transform -translate-y-1/2 text-gray-500"
                                        >
                                            {showNewPassword ? (
                                                <FiEye className="w-4 h-4" />
                                            ) : (
                                                <FiEyeOff className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="relative mb-6">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"} // Toggle between 'password' and 'text'
                                            placeholder="Confirm New Password"
                                            className="block w-[500px] mb-6 px-4 py-2 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-800 focus:ring-0"
                                            value={confirmNewPassword}
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        />
                                        {/* Eye Icon for toggling password visibility */}
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-[200px] top-[20px] transform -translate-y-1/2 text-gray-500"
                                        >
                                            {showConfirmPassword ? (
                                                <FiEye className="w-4 h-4" />
                                            ) : (
                                                <FiEyeOff className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>

                                    <button
                                        onClick={handleChangePassword}
                                        className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-red-600 text-white rounded-md"
                                    >
                                        Update Password
                                    </button>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Delete Account</h3>
                                    <input
                                        type="text"
                                        placeholder="Type 'DELETE' to confirm"
                                        className="block w-full mb-6 px-4 py-2 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                        value={deleteConfirm}
                                        onChange={(e) => setDeleteConfirm(e.target.value)}
                                    />
                                    <button
                                        onClick={handleDeleteAccount}
                                        disabled={deleteConfirm !== "DELETE"}
                                        className={`${deleteConfirm === "DELETE"
                                            ? "bg-red-500 text-white"
                                            : "bg-gray-300 text-gray-500"
                                            } py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center rounded-md`}
                                    >
                                        Delete Account
                                    </button>
                                </div>

                                {message && <p className="text-green-500 text-xl mt-4">{message}</p>}
                                {error && <p className="text-red-500 mt-4">{error}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}