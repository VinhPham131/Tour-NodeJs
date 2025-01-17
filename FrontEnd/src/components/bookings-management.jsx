import { useState, useEffect } from "react";

export default function BookingManagement() {
    const [groupedBillings, setGroupedBillings] = useState({});
    const [error, setError] = useState(null);

    const fetchBillings = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/billing");
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const { billings } = await response.json();

            // Group billings by userId
            const grouped = billings.reduce((acc, billing) => {
                const userKey = `${billing.User.name} - ${billing.User.email}`;
                if (!acc[userKey]) {
                    acc[userKey] = [];
                }
                acc[userKey].push(billing);
                return acc;
            }, {});

            setGroupedBillings(grouped);
        } catch (error) {
            console.error("Error fetching billings:", error);
            setError("Failed to fetch billing data. Please try again later.");
        }
    };

    useEffect(() => {
        fetchBillings();
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Bookings Management</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="space-y-8">
                {Object.entries(groupedBillings).map(([userKey, userBillings]) => (
                    <div key={userKey} className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">
                            <span className="text-red-600">{userKey}</span>
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-sm ">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal ">
                                        <th className="py-3 px-6 text-left">Tour Title</th>
                                        <th className="py-3 px-6 text-left">Tour Place</th>
                                        <th className="py-3 px-6 text-left">Address</th>
                                        <th className="py-3 px-6 text-left">Phone</th>
                                        <th className="py-3 px-6 text-left">Children</th>
                                        <th className="py-3 px-6 text-left">Adults</th>
                                        <th className="py-3 px-6 text-left">Total Cost</th>
                                        <th className="py-3 px-6 text-left">Payment Method</th>
                                        <th className="py-3 px-6 text-left">Arrival Date</th>
                                        <th className="py-3 px-6 text-left">Departure Date</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {userBillings.map((billing) => (
                                        <tr
                                            key={billing.id}
                                            className="hover:bg-gray-50 border-b border-gray-200 text-center"
                                        >
                                            <td className="py-3 px-6">{billing.tourTitle}</td>
                                            <td className="py-3 px-6">{billing.tourPlace}</td>
                                            <td className="py-3 px-6">{billing.address}</td>
                                            <td className="py-3 px-6">{billing.phone}</td>
                                            <td className="py-3 px-6">{billing.children}</td>
                                            <td className="py-3 px-6 ">{billing.adults}</td>
                                            <td className="py-3 px-6">${billing.totalCost}</td>
                                            <td className="py-3 px-6">{billing.paymentMethod}</td>
                                            <td className="py-3 px-6">{new Date(billing.arrivalDate).toLocaleDateString()}</td>
                                            <td className="py-3 px-6">{new Date(billing.departureDate).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
