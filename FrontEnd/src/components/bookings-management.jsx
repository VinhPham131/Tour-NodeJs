import { useState, useEffect } from "react";

export default function BookingManagement() {
    const [billings, setBillings] = useState([]);

    const fetchBillings = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/billing");
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
            setBillings(data);
        } catch (error) {
            console.error("Error fetching billings:", error);
        }
    };

    useEffect(() => {
        fetchBillings();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Billing Management</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Customer Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Amount</th>
                            <th className="border border-gray-300 px-4 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billings.map((billing) => (
                            <tr key={billing.id}>
                                <td className="border border-gray-300 px-4 py-2">{billing.customerName}</td>
                                <td className="border border-gray-300 px-4 py-2">{billing.email}</td>
                                <td className="border border-gray-300 px-4 py-2">${billing.amount}</td>
                                <td className="border border-gray-300 px-4 py-2">{billing.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
