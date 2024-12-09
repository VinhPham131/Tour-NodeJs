import React from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiMail, FiPhone } from "../assets/icons/vander";

export default function Footer() {
    return (
        <footer className="footer bg-dark-footer text-gray-200">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10">

                    {/* About Section */}
                    <div className="md:col-span-4">
                        <Link to="#" className="text-[22px] font-bold">
                            Tripster
                        </Link>
                        <p className="mt-4 text-gray-300">
                            Planning for a trip? We will organize your trip with the best places and within the best budget!
                        </p>
                    </div>

                    {/* Office Section */}
                    <div className="md:col-span-4">
                        <h5 className="text-gray-100 font-semibold">Office</h5>
                        <address className="not-italic mt-6 text-gray-300">
                            <div className="flex items-start mt-4">
                                <FiMapPin className="text-red-500 mr-3" />
                                <span>K21/2a Mai Lao Bang, Hai Chau, Da Nang</span>
                            </div>
                            <div className="flex items-start mt-4">
                                <FiMail className="text-red-500 mr-3" />
                                <Link to="mailto:phamquangvinh13012004@gmail.com" className="hover:text-slate-400">
                                    phamquangvinh13012004@gmail.com
                                </Link>
                            </div>
                            <div className="flex items-start mt-4">
                                <FiPhone className="text-red-500 mr-3" />
                                <Link to="tel:+152534-468-854" className="hover:text-slate-400">
                                    0901996064
                                </Link>
                            </div>
                        </address>
                    </div>

                    {/* Newsletter Section */}
                    <div className="md:col-span-4">
                        <h5 className="text-gray-100 font-semibold">Newsletter</h5>
                        <p className="mt-4">Sign up and receive the latest tips via email.</p>
                        <form className="mt-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm">
                                    Write your email <span className="text-red-600">*</span>
                                </label>
                                <div className="relative">
                                    <FiMail className="absolute top-3 left-3 text-gray-400" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        placeholder="Email"
                                        className="pl-10 w-full py-2 bg-gray-800 text-gray-100 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="mt-4 w-full py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    );
}
