import React, { Children, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function Payment() {
    const navigate = useNavigate();
    const { state } = useLocation(); // Receive data from the previous page
    const { tourDetails, adults, children } = state || {}; // Ensure we have the tour details
    const [paymentMethod, setPaymentMethod] = useState("credit-card");
    const [loading, setLoading] = useState(false);

    const participants = adults + children;

    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    // Calculate duration
    const calculateDuration = (arriveDay, departDay) => {
        if (arriveDay && departDay) {
            const arriveDate = new Date(arriveDay);
            const departDate = new Date(departDay);
            return Math.ceil((departDate - arriveDate) / (1000 * 60 * 60 * 24)); // Difference in days
        }
        return 1; // Default to 1 day if dates are missing
    };

    const duration = calculateDuration(tourDetails?.arrive_day, tourDetails?.depart_day);

    console.log(tourDetails);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handlePayment = async () => {
        setLoading(true);

        // Prepare the data to send
        const paymentData = {
            name: userInfo.name,
            email: userInfo.email,
            phone: userInfo.phone,
            address: userInfo.address,
            paymentMethod: paymentMethod,
            totalCost: (tourDetails?.cost || 0) * duration * participants,
            tourTitle: tourDetails?.title,
            tourPlace: tourDetails?.place,
            arrivalDate: tourDetails?.arrive_day,
            departureDate: tourDetails?.depart_day,
            adults: adults,
            children: children,
        };

        try {
            const response = await fetch("http://localhost:3000/api/billing/billing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Add authorization header if needed
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Example token handling
                },
                body: JSON.stringify(paymentData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            // Handle successful payment
            alert("Payment Successful!");
            console.log("Payment Response:", result);

            // Optionally navigate to a confirmation page
            navigate("/payment-success");   
        } catch (error) {
            console.error("Payment error:", error);
            alert("Payment Failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    if (!tourDetails) {
        return <p>No tour selected. Please go back and select a tour.</p>;
    }

    return (
        <>
            <Navbar navclass="defaultscroll is-sticky" navlight={false} manuclass="justify-end" />

            <section className="relative md:pb-24 pb-16 mt-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-semibold mb-6">Payment</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Left: User Information Form (2/3 width) */}
                        <div className="md:col-span-2 bg-white p-6 rounded-md shadow-md">
                            <h3 className="text-xl font-medium mb-4">User Information</h3>
                            <form>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={userInfo.name}
                                        onChange={handleInputChange}
                                        className="w-full border rounded-md px-4 py-2"
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={userInfo.email}
                                        onChange={handleInputChange}
                                        className="w-full border rounded-md px-4 py-2"
                                        placeholder="Your Email"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={userInfo.phone}
                                        onChange={handleInputChange}
                                        className="w-full border rounded-md px-4 py-2"
                                        placeholder="Your Phone Number"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Address</label>
                                    <textarea
                                        name="address"
                                        value={userInfo.address}
                                        onChange={handleInputChange}
                                        className="w-full border rounded-md px-4 py-2"
                                        placeholder="Your Address"
                                        rows="3"
                                        required
                                    ></textarea>
                                </div>
                            </form>
                        </div>

                        {/* Right: Tour Details (1/3 width) */}
                        <div className="bg-white p-6 rounded-md shadow-md">
                            <h3 className="text-xl font-medium mb-4">Tour Details</h3>
                            <p className="text-gray-600">Tour: <span className="font-bold">{tourDetails?.title || "N/A"}</span></p>
                            <p className="text-gray-600">Place: {tourDetails?.place || "N/A"}</p>
                            <p className="text-gray-600">Arrival Day: {tourDetails?.arrive_day ? new Date(tourDetails?.arrive_day).toLocaleDateString() : "N/A"}</p>
                            <p className="text-gray-600">Departure Day: {tourDetails?.depart_day ? new Date(tourDetails?.depart_day).toLocaleDateString() : "N/A"}</p>
                            <p className="text-gray-600">Duration: {duration} days</p>
                            <p className="text-gray-600">Cost: ${tourDetails?.cost || 0} / Day</p>
                            <p className="text-gray-600">Child: {children}</p>
                            <p className="text-gray-600">Adult: {adults}</p>


                            <div className="mt-6">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Payment Method
                                </label>
                                <select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-full border rounded-md px-4 py-2"
                                >
                                    <option value="credit-card">Credit Card</option>
                                    <option value="paypal">PayPal</option>
                                    <option value="bank-transfer">Bank Transfer</option>
                                </select>
                            </div>
                            <p className="text-gray-600 mt-4">
                                Total Cost: <span className="font-bold text-red-400">${(tourDetails?.cost || 0) * duration * participants}</span>
                            </p>

                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={handlePayment}
                                    className={`px-6 py-2 text-white rounded-md ${loading ? "bg-red-400" : "bg-red-500 hover:bg-red-600"
                                        }`}
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : "Pay Now"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
