import { useState, useEffect } from "react";
import TourModal from "./tours-modal";
import TourDetailsModal from "./tours-modal-details";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";

export default function ToursManagement() {
    const [tours, setTours] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTour, setSelectedTour] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const fetchTours = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/tours");
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
            setTours(data);
        } catch (error) {
            console.error("Error fetching tours:", error);
        }
    };  

    useEffect(() => {
        fetchTours();
    }, []);

    const handleSave = async (tour) => {
        try {
            let response;
            if (tour.id) {
                // Update tour
                response = await fetch(`http://localhost:3000/api/tours/${tour.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(tour),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                alert("Tour updated successfully");
                setTours(tours.map((t) => (t.id === tour.id ? { ...t, ...tour } : t)));
            } else {
                // Create tour
                console.log("Tour data being sent:", tour);
                response = await fetch("http://localhost:3000/api/tours", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(tour),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                const data = await response.json();
                setTours([...tours, { id: data.id, ...tour }]);
                alert("Tour added successfully");
            }
            setShowModal(false);
        } catch (error) {
            console.error("Error saving tour:", error);
            alert(error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/tours/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            alert("Tour deleted successfully");
            setTours(tours.filter((tour) => tour.id !== id));
        } catch (error) {
            console.error("Error deleting tour:", error);
        }
    };

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-bold">Tours Management</h2>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                        setSelectedTour(null);
                        setShowModal(true);
                    }}
                >
                    Add Tour
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-[1250px] border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Title</th>
                            <th className="border border-gray-300 px-4 py-2">Place</th>
                            <th className="border border-gray-300 px-4 py-2">Cost</th>
                            <th className="border border-gray-300 px-4 py-2">Description</th>
                            <th className="border border-gray-300 px-4 py-2">Arrival Day</th>
                            <th className="border border-gray-300 px-4 py-2">Departure Day</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tours.map((tour) => (
                            <tr key={tour.id}>
                                <td className="border border-gray-300 px-4 py-2">{tour.title}</td>
                                <td className="border border-gray-300 px-4 py-2">{tour.place}</td>
                                <td className="border border-gray-300 px-4 py-2">${tour.cost}</td>
                                <td className="border border-gray-300 px-4 py-2">{tour.description}</td>
                                <td className="border border-gray-300 px-4 py-2">{tour.arrive_day}</td>
                                <td className="border border-gray-300 px-4 py-2">{tour.depart_day}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex gap-2">
                                        <button
                                            className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                            onClick={() => {
                                                setSelectedTour(tour);
                                                setShowModal(true);
                                            }}
                                        >
                                            <FiEdit>Edit</FiEdit>
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={() => handleDelete(tour.id)}
                                        >
                                            <FiTrash>Delete</FiTrash>
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white px-2 py-1 rounded"
                                            onClick={() => {
                                                setSelectedTour(tour);
                                                setShowDetailsModal(true);
                                            }}
                                        >
                                            <FiEye>View Details</FiEye>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <TourModal
                    tour={selectedTour}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}
            {showDetailsModal && (
                <TourDetailsModal
                    tour={selectedTour}
                    onClose={() => setShowDetailsModal(false)}
                />
            )}
        </div>
    );
};