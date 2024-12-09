import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";

import Navbar from "../../components/navbar";
import Filter from "../../components/filter";
import Footer from "../../components/footer";

export default function Tours() {
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [ratings, setRatings] = useState([]);
    const [regions, setRegions] = useState([]);
    const [tours, setTours] = useState([]);
    const [filteredTours, setFilteredTours] = useState([]);
    const BASE_PATH = "/assets/images/listing/";
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handlePriceChange = (min, max) => {
        setPriceRange([min, max]);
    };

    const handleRatingChange = (selectedRatings) => {
        setRatings(selectedRatings);
    };

    const handleRegionChange = (selectedRegions) => {
        setRegions(selectedRegions);
    };

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


    useEffect(() => {
        const filterTours = () => {
            const parseCost = (cost) => {
                const match = cost.match(/(\d+)/); // Extracts the numeric part
                return match ? parseInt(match[1], 10) : 0;
            };

            let filtered = [...tours];

            if (priceRange[0] !== 0 || priceRange[1] !== 500) {
                filtered = tours.filter((tour) => {
                    const costValue = parseCost(tour.cost);
                    return costValue >= priceRange[0] && costValue <= priceRange[1];
                });
            }

            if (ratings.length > 0) {
                filtered = tours.filter((tour) => {
                    return ratings.includes(Math.round(parseFloat(tour.rating)));
                });
            }

            if (regions.length > 0) {
                filtered = tours.filter((tour) => {
                    return regions.includes(tour.region);
                });
            }

            setFilteredTours(filtered);
        };

        filterTours();
    }, [priceRange, ratings, regions, tours]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Navbar navclass="defaultscroll is-sticky" navlight={true} manuclass="justify-end nav-light" />

            <section className="relative table w-full items-center py-36 bg-[url('../../assets/images/bg/cta.jpg')] bg-top bg-no-repeat bg-cover">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900"></div>
                <div className="container relative">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="text-4xl leading-normal tracking-wider font-semibold text-white">Tour Packages</h3>
                    </div>
                </div>

                <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                    <ul className="tracking-[0.5px] mb-0 inline-block">
                        <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white"><Link to="/">Tripster</Link></li>
                        <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="mdi mdi-chevron-right"></i></li>
                        <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white" aria-current="page">Tour</li>
                    </ul>
                </div>
            </section>

            <section className="relative md:py-24 py-16">
                <div className="container relative">
                    <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
                        <Filter
                            onPriceChange={handlePriceChange}
                            onRatingChange={handleRatingChange}
                            onRegionChange={handleRegionChange}
                        />

                        <div className="lg:col-span-8 md:col-span-7">
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                                {filteredTours.map((item, index) => (
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
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}