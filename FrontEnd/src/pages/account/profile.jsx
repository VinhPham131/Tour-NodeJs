import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { FiUser, FiUserCheck, FiMail, FiBookmark, FiMessageCircle, FiPhone, FiGlobe } from "../../assets/icons/vander";
import AccountingTab from "../../components/accounting-tab";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // Add success message state
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    occupation: '',
    description: '',
    phoneNumber: '',
    website: '',
    social: '',
  });

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found in localStorage.');
          return;
        }

        const response = await fetch("http://localhost:3000/api/users/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setUser(data.user);
            setFormData({
              name: data.user.name || '',
              email: data.user.email || '',
              occupation: data.user.occupation || '',
              description: data.user.description || '',
              phoneNumber: data.user.phoneNumber || '',
              website: data.user.website || '',
              social: data.user.social || '',  // Initialize social field
            });
          } else {
            setError("User profile data not found.");
          }
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch profile.");
        }
      } catch (error) {
        setError(error.message || "An unexpected error occurred.");
        console.error('Fetch error:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No token found in localStorage.');
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user); // Update the user state with the new data
        setIsEditing(false); // Disable editing after saving
        setSuccessMessage('Profile updated successfully!'); // Show success message
        setError(''); // Clear any previous error messages

        // If the backend returns a new token, update it in localStorage
        if (data.token) {
          localStorage.setItem('token', data.token); // Update the token
        }
      } else {
        setError(data.message || 'Failed to update profile.'); // Set error message
        setSuccessMessage(''); // Clear success message if any
      }
    } catch (error) {
      setError('An error occurred while updating the profile.');
      setSuccessMessage(''); // Clear success message if any
      console.error('Update error:', error);
    }
  };




  if (error) {
    return (
      <div>
        <Navbar />
        <div className="text-center text-red-500">{error}</div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <Navbar />
        <div className="text-center">Loading profile...</div>
        <Footer />
      </div>
    );
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
                <h5 className="text-2xl font-semibold mb-4">Personal Detail :</h5>
                <form onSubmit={handleSaveChanges}>
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <div>
                      <label className="form-label font-medium">First Name: <span className="text-red-600">*</span></label>
                      <div className="form-icon relative mt-2">
                        <FiUser className="w-4 h-4 absolute top-3 start-4"></FiUser>
                        <input
                          type="text"
                          className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          placeholder="First Name"
                          name="name"
                          value={formData.name || ""}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label font-medium">Your Email: <span className="text-red-600">*</span></label>
                      <div className="form-icon relative mt-2">
                        <FiMail className="w-4 h-4 absolute top-3 start-4"></FiMail>
                        <input
                          type="email"
                          className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          placeholder="Email"
                          name="email"
                          value={formData.email || ""}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label font-medium">Occupation:</label>
                      <div className="form-icon relative mt-2">
                        <FiBookmark className="w-4 h-4 absolute top-3 start-4"></FiBookmark>
                        <input
                          name="occupation"
                          type="text"
                          className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          placeholder="Occupation"
                          value={formData.occupation || ""}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1">
                    <div className="mt-5">
                      <label className="form-label font-medium">Description:</label>
                      <div className="form-icon relative mt-2">
                        <FiMessageCircle className="w-4 h-4 absolute top-3 start-4"></FiMessageCircle>
                        <textarea
                          name="description"
                          className="ps-11 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                          placeholder="Description"
                          value={formData.description || ""}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-6">
                    <h5 className="text-lg font-semibold mb-4">Contact Info :</h5>
                    <div className="grid grid-cols-1 gap-5">
                      <div>
                        <label className="form-label font-medium">Phone No. :</label>
                        <div className="form-icon relative mt-2">
                          <FiPhone className="w-4 h-4 absolute top-3 start-4"></FiPhone>
                          <input
                            name="phoneNumber"
                            type="tel"
                            className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                            placeholder="Phone Number"
                            value={formData.phoneNumber || ""}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="form-label font-medium">Social :</label>
                        <div className="form-icon relative mt-2">
                          <FiGlobe className="w-4 h-4 absolute top-3 start-4"></FiGlobe>
                          <input
                            name="social"
                            type="url"
                            className="ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                            placeholder="Social URL"
                            value={formData.social || ""}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {isEditing ? (
                    <button
                      type="submit" // This button triggers the form submission when saving changes
                      className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md mt-5"
                    >
                      Save Changes
                      {successMessage && <p>{successMessage}</p>} {/* Display success message */}
                    </button>

                  ) : (
                    <button
                      type="button" // This button does not trigger a form submission
                      onClick={(e) => {
                        e.preventDefault(); // Prevent unintended form submission
                        console.log("Edit button clicked");
                        setIsEditing(true);
                      }}
                      className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md mt-5"
                    >
                      Edit Profile
                    </button>
                  )}
                  <div className="mt-4">
                    {successMessage && <p className="text-green-500 text-xl">{successMessage}</p>}
                    {error && <p className="text-red-500">{error}</p>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
