import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import AccountingTab from "../../components/accounting-tab";

export default function InvoicePage() {
    const [billings, setBillings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBillings = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login"); // Redirect to login if not authenticated
                    return;
                }

                const response = await fetch("http://localhost:3000/api/billing/user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Log the response status for debugging
                console.log("API Response Status: ", response.status);

                if (!response.ok) {
                    setError("Failed to fetch billings.");
                    return;
                }

                const data = await response.json();
                console.log("API Response Data: ", data);

                // Check if there are billing records
                if (data.billings && data.billings.length > 0) {
                    setBillings(data.billings); // Set billing data if available
                } else {
                    setBillings([]); // No billings, set empty array
                    setError(null); // Clear any error, so message can be shown
                }
            } catch (error) {
                console.error("Error fetching billings: ", error);
                setError("Network error or invalid token.");
            } finally {
                setLoading(false);
            }
        };

        fetchBillings();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

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
                                <h5 className="text-2xl font-semibold mb-4">Invoice</h5>

                                {/* If no billing records, show a message */}
                                {billings.length === 0 ? (
                                    <div className="text-gray-700">
                                        <p>You haven't booked a tour yet.</p>
                                    </div>
                                ) : (
                                    // Otherwise, show the billing information
                                    billings.map((billing) => (
                                        <div key={billing.id} className="mb-6 border-b-2">
                                            {/* Divided into Two Columns: User Info & Booking Info */}
                                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                                                {/* User Info Column */}
                                                <div className="border-r border-gray-200 pr-6">
                                                    <h6 className="font-semibold text-lg mb-2">User Information</h6>
                                                    <div className="mb-2">
                                                        <p className="text-gray-700">Name: {billing.name}</p>
                                                        <p className="text-gray-700">Email: {billing.email}</p>
                                                        <p className="text-gray-700">Phone: {billing.phone}</p>
                                                        <p className="text-gray-700">Address: {billing.address}</p>
                                                    </div>
                                                </div>

                                                {/* Booking Info Column */}
                                                <div>
                                                    <h6 className="font-semibold text-lg mb-2">Tour Details</h6>
                                                    <div className="mb-2">
                                                        <p className="text-gray-700">Tour Title: {billing.tourTitle}</p>
                                                        <p className="text-gray-700">Tour Place: {billing.tourPlace}</p>
                                                        <p className="text-gray-700">Child: {billing.children}</p>
                                                        <p className="text-gray-700">Adult: {billing.adults}</p>
                                                        <p className="text-gray-700">Payment Method: {billing.paymentMethod}</p>
                                                        <p className="text-gray-700">Total Cost: ${billing.totalCost}</p>
                                                        <p className="text-gray-700">
                                                            Arrival Date: {new Date(billing.arrivalDate).toLocaleDateString()}
                                                        </p>
                                                        <p className="text-gray-700">
                                                            Departure Date: {new Date(billing.departureDate).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
