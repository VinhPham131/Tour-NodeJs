import { useState, useEffect } from "react";

export default function TourModal({ tour, onClose, onSave }) {
    const [formData, setFormData] = useState({
        id: "",
        image: "",
        sale_off: "",
        place: "",
        title: "",
        cost: "",
        region: "",
        description: "",
        rating: "",
        reviews_count: "",
        arrive_day: "",
        depart_day: "",
        type: "",
        group_size: "",
        language: "",
        thumbnails: [],
        createdAt: "",
        updatedAt: ""
    });

    useEffect(() => {
        if (tour) {
            setFormData(tour);
        }
    }, [tour]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[1000px] overflow-y-auto">
                <h3 className="text-xl font-bold mb-4 text-red-600">
                    {tour ? "Edit Tour" : "Add Tour"}
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap mx-2">
                        <div className="w-1/2 px-2">
                            <div className="mb-4">
                                <label className="block mb-1 font-semibold">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-semibold">Image</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-semibold">Sale Off</label>
                                <input
                                    type="number"
                                    name="sale_off"
                                    value={formData.sale_off}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-semibold">Place</label>
                                <input
                                    type="text"
                                    name="place"
                                    value={formData.place}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-semibold">Region</label>
                                <input
                                    type="text"
                                    name="region"
                                    value={formData.region}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-semibold">Cost</label>
                                <input
                                    type="number"
                                    name="cost"
                                    value={formData.cost}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-semibold">Group Size</label>
                                <input
                                    type="number"
                                    name="group_size"
                                    value={formData.group_size}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-semibold">Language</label>
                                <input
                                    type="text"
                                    name="language"
                                    value={formData.language}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                        </div>
                        <div className="w-1/2 px-2">
                            <div className="mb-4">
                                <label className="block mb-1 font-semibold">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-semibold">Rating</label>
                                <input
                                    type="number"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-semibold">Reviews Count</label>
                                <input
                                    type="number"
                                    name="reviews_count"
                                    value={formData.reviews_count}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-semibold">Arrive Day</label>
                                <input
                                    type="date"
                                    name="arrive_day"
                                    value={formData.arrive_day}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-semibold">Depart Day</label>
                                <input
                                    type="date"
                                    name="depart_day"
                                    value={formData.depart_day}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-semibold">Type</label>
                                <input
                                    type="text"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-semibold">Thumbnails</label>
                                <input
                                    type="text"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};