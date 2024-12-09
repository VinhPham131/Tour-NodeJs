import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FiMapPin, FiX } from '../assets/icons/vander';

export default function ToursPackages({ searchTerm, arrivalDay, departureDay, region, showModal, setShowModal}) {
    const [tours, setTours] = useState([]);
    const BASE_PATH = "/assets/images/listing/";
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredTours, setFilteredTours] = useState([]);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/tours");
                if (!response.ok) {
                    throw new Error("Failed to fetch tours");
                }
                const data = await response.json();
                setTours(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchTours();
    }, []);
    //Seach Tours
    useEffect(() => {
        let results = tours;

        if (searchTerm) {
            results = results.filter(tour =>
                tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tour.place.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (arrivalDay) {
            results = results.filter(tour => new Date(tour.arrive_day) >= new Date(arrivalDay));
        }

        if (departureDay) {
            results = results.filter(tour => new Date(tour.depart_day) <= new Date(departureDay));
        }

        if (region) {
            results = results.filter(tour => tour.region === region);
        }

        setFilteredTours(results);
    }, [searchTerm, arrivalDay, departureDay, region, tours]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            {tours.map((item, index) => (
                <div className="group rounded-md shadow dark:shadow-gray-700" key={index}>
                    <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-700 mx-2 mt-2">
                        <img src={`${BASE_PATH}${item.image}`} className="scale-125 group-hover:scale-100 duration-500" alt={item.title} />
                        {item.sale_off && (
                            <div className="absolute top-0 start-0 p-4">
                                <span className="bg-red-500 text-white text-[12px] px-2.5 py-1 font-medium rounded-md h-5">
                                    {item.sale_off}% Off
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="p-3">
                        <p className="flex items-center text-slate-400 font-medium mb-2">
                            <FiMapPin className="text-red-500 size-4 me-1" /> {item.place}
                        </p>
                        <Link to={`/tour-details/${item.id}`} className="text-lg font-medium hover:text-red-500 duration-500 ease-in-out">
                            {item.title}
                        </Link>
                        <div className="flex items-center mt-2">
                            <span className="text-slate-400">Rating:</span>
                            <ul className="text-lg font-medium text-amber-400 list-none ms-2">
                                {[...Array(item.rating)].map((_, i) => (
                                    <li key={i} className="inline">
                                        <i className="mdi mdi-star align-middle"></i>
                                    </li>
                                ))}
                                <li className="inline text-black dark:text-white text-sm">
                                    {item.rating} ({item.reviews_count})
                                </li>
                            </ul>
                        </div>
                        <div className="mt-3 pt-3 flex justify-between items-center border-t border-slate-100 dark:border-gray-800">
                            <h5 className="text-lg font-medium text-red-500"> ${item.cost} / Day</h5>
                            <Link to={`/tour-details/${item.id}`} className="text-slate-400 hover:text-red-500">
                                Explore Now <i className="mdi mdi-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/50">
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-14 w-3/4 max-w-5xl overflow-y-auto max-h-screen relative">
                        <FiX className="absolute top-2 right-2 text-red-500 size-6 cursor-pointer" onClick={() => setShowModal(false)}>Close</FiX>
                        <h3 className="text-2xl font-semibold mb-4">Search Results</h3>
                        {filteredTours.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredTours.map((item, index) => (
                                    <div className="group rounded-md shadow dark:shadow-gray-700 mb-4" key={index}>
                                        <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-700 mx-2 mt-2">
                                            <img src={`${BASE_PATH}${item.image}`} className="scale-125 group-hover:scale-100 duration-500" alt={item.title} />
                                            {item.sale_off && (
                                                <div className="absolute top-0 start-0 p-4">
                                                    <span className="bg-red-500 text-white text-[12px] px-2.5 py-1 font-medium rounded-md h-5">
                                                        {item.sale_off}% Off
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-3">
                                            <p className="flex items-center text-slate-400 font-medium mb-2">
                                                <FiMapPin className="text-red-500 size-4 me-1" /> {item.place}
                                            </p>
                                            <Link to={`/tour-detail-one/${item.id}`} className="text-lg font-medium hover:text-red-500 duration-500 ease-in-out">
                                                {item.title}
                                            </Link>
                                            <div className="flex items-center mt-2">
                                                <span className="text-slate-400">Rating:</span>
                                                <ul className="text-lg font-medium text-amber-400 list-none ms-2">
                                                    {[...Array(item.rating)].map((_, i) => (
                                                        <li key={i} className="inline">
                                                            <i className="mdi mdi-star align-middle"></i>
                                                        </li>
                                                    ))}
                                                    <li className="inline text-black dark:text-white text-sm">
                                                        {item.rating} ({item.reviews_count})
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mt-3 pt-3 flex justify-between items-center border-t border-slate-100 dark:border-gray-800">
                                                <h5 className="text-lg font-medium text-red-500">${item.cost} / Day</h5>
                                                <Link to={`/tour-details/${item.id}`} className="text-slate-400 hover:text-red-500">
                                                    Explore Now <i className="mdi mdi-arrow-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No results found</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}