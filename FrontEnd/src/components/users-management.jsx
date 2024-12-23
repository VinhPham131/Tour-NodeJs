import { useState, useEffect } from "react";
import UserModal from "./users-modal";
import { FiEdit, FiTrash } from "react-icons/fi";

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const token = localStorage.getItem("token"); 

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/users", {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }

            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };


    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSave = async (userData) => {
        try {
            let response;
            if (userData.id) {
                // Edit user
                response = await fetch(`http://localhost:3000/api/users/${userData.id}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                    body: JSON.stringify(userData),
                });
                if (!response.ok) throw new Error("Failed to update user");

                alert("User updated successfully.");
                setUsers(users.map((u) => (u.id === userData.id ? { ...u, ...userData } : u)));
            } else {
                response = await fetch("http://localhost:3000/api/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                });

                if (!response.ok) {
                    const data = await response.json();
                    if (data.message) {
                        throw new Error(data.message);
                    }
                }
                alert("User created successfully.");
                const data = await response.json();
                setUsers([...users, { ...userData, id: data.user.id }]);
            }
            setShowModal(false);
        } catch (error) {
            console.error("Error creating user.", error.message);
            alert(error.message);
        }
    };


    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to delete user");
            }
            setUsers(users.filter((user) => user.id !== id));
            alert("User deleted successfully.");
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-bold">Users Management</h2>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                        setSelectedUser(null);
                        setShowModal(true);
                    }}
                >
                    Add User
                </button>
            </div>
            <table className="w-[1250px] border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Role</th>
                        <th className="border border-gray-300 px-4 py-2">Occupation</th>
                        <th className="border border-gray-300 px-4 py-2">Description</th>
                        <th className="border border-gray-300 px-4 py-2">Phone Number</th>
                        <th className="border border-gray-300 px-4 py-2">Avatar</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.occupation}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.description}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.phoneNumber}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.avatar}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <div className="flex">
                                    <button
                                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                        onClick={() => {
                                            setSelectedUser(user);
                                            setShowModal(true);
                                        }}
                                    >
                                        <FiEdit>Edit</FiEdit>
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        <FiTrash>Delete</FiTrash>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <UserModal
                    user={selectedUser}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}
