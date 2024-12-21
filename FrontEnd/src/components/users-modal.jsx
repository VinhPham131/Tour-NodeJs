// components/UserModal.jsx
import { useState, useEffect } from "react";

export default function UserModal({ user, onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
        occupation: "",
        description: "",
        phoneNumber: "",
        social: "",
        avatar: "",
    });


    useEffect(() => {
        if (user) {
            setFormData({ ...user, password: "" }); // Password not pre-filled for security
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        console.log("Form data to save:", formData);

    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[1000px] overflow-y-auto">
                <h3 className="text-xl font-bold mb-4 text-red-600">
                    {user ? "Edit User" : "Add User"}
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-2">
                        <div className="w-1/2 px-2 mb-4">
                            <label className="block mb-1 font-semibold">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>
                        <div className="w-1/2 px-2 mb-4">
                            <label className="block mb-1 font-semibold">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>
                        {!user && (
                            <div className="w-1/2 px-2 mb-4">
                                <label className="block mb-1 font-semibold">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required={!user}
                                />
                            </div>
                        )}
                        <div className="w-1/2 px-2 mb-4">
                            <label className="block mb-1 font-semibold">Role</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="w-1/2 px-2 mb-4">
                            <label className="block mb-1 font-semibold">Occupation</label>
                            <input
                                type="text"
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="w-1/2 px-2 mb-4">
                            <label className="block mb-1 font-semibold">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="w-1/2 px-2 mb-4">
                            <label className="block mb-1 font-semibold">Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="w-1/2 px-2 mb-4">
                            <label className="block mb-1 font-semibold">Social</label>
                            <input
                                type="text"
                                name="social"
                                value={formData.social}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="w-1/2 px-2 mb-4">
                            <label className="block mb-1 font-semibold">Avatar URL</label>
                            <input
                                type="text"
                                name="avatar"
                                value={formData.avatar}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            />
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