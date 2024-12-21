import React from "react";

export default function TourModalDetails({ tour, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[1000px] overflow-y-auto">
                <h3 className="text-xl font-bold mb-4 text-red-600">Tour Details</h3>
                <div className="flex flex-wrap mx-2">
                    <div className="w-1/2 px-2">
                        <div className="mb-4">
                            <strong>Title:</strong> {tour.title}
                        </div>
                        <div className="mb-4">
                            <strong>Image:</strong> {tour.image}
                        </div>
                        <div className="mb-4">
                            <strong>Sale Off:</strong> {tour.sale_off}
                        </div>
                        <div className="mb-4">
                            <strong>Place:</strong> {tour.place}
                        </div>
                        <div className="mb-4">
                            <strong>Region:</strong> {tour.region}
                        </div>
                        <div className="mb-4">
                            <strong>Cost:</strong> {tour.cost}
                        </div>
                    </div>
                    <div className="w-1/2 px-2">
                        <div className="mb-4">
                            <strong>Description:</strong> {tour.description}
                        </div>
                        <div className="mb-4">
                            <strong>Rating:</strong> {tour.rating}
                        </div>
                        <div className="mb-4">
                            <strong>Reviews Count:</strong> {tour.reviews_count}
                        </div>
                        <div className="mb-4">
                            <strong>Arrive Day:</strong> {tour.arrive_day}
                        </div>
                        <div className="mb-4">
                            <strong>Depart Day:</strong> {tour.depart_day}
                        </div>
                        <div className="mb-4">
                            <strong>Type:</strong> {tour.type}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}