import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Faq from "../../components/faq";
import SendMessages from "../../components/send-messages";
import DatePicker from "react-datepicker";


import { FiActivity, FiCamera, FiClock, FiDollarSign, FiGlobe, FiMapPin, FiUser, FiUsers } from '../../assets/icons/vander'

import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';


export default function Details() {


    const { id } = useParams(); // Get the tour ID from the route
    const [images, setImages] = useState([]); // State for images
    const [tourDetails, setTourDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [photoIndex, setActiveIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();

    const [adults, setAdults] = useState(1); // Default one adult
    const [children, setChildren] = useState(0); // Default zero children



    const handleBookNow = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login", { state: { from: "/payment" } });
        } else {
            navigate("/payment", {
                state: {
                    tourDetails: {
                        title,
                        description,
                        cost,
                        place,
                        duration,
                        arrive_day,
                        depart_day
                    },
                    adults,
                    children,
                },
            });
        }
    };



    // Fetch tour details
    useEffect(() => {
        const fetchTourDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/tours/${id}`);
                if (!response.ok) throw new Error("Failed to fetch tour details.");
                const data = await response.json();

                console.log(data);
                setTourDetails(data);
                const thumbnails = JSON.parse(data.thumbnails || "[]"); // Safely parse the JSON string
                setImages(thumbnails);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTourDetails();
    }, [id]);

    // Handle lightbox image opening
    const handleCLick = (index) => {
        setActiveIndex(index);
        setIsOpen(true);
    };

    // Destructure tourDetails here
    const { title, description, cost, place, type, group_size, language, arrive_day, depart_day } = tourDetails;

    // Calculate tour duration after destructuring
    let duration = null;
    if (arrive_day && depart_day) {
        const arriveDate = new Date(arrive_day);
        const departDate = new Date(depart_day);
        duration = Math.ceil((departDate - arriveDate) / (1000 * 60 * 60 * 24)); // Difference in days
    }





    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    return (
        <>
            <Navbar navclass="defaultscroll is-sticky" navlight={false} manuclass="justify-end" />

            <section className="relative md:pb-24 pb-16 mt-20">
                <div className="container-fluid relative">
                    <div className="md:flex mt-4">
                        <div className="lg:w-1/2 md:w-1/2 p-1">
                            <div className="group relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
                                <img src={images[0]} alt="" />
                                <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                                <div className="absolute top-1/2 -translate-y-1/2 start-0 end-0 text-center opacity-0 group-hover:opacity-100 duration-500">
                                    <Link to="#" onClick={() => handleCLick(0)} className="inline-flex justify-center items-center size-9 bg-red-500 text-white rounded-full lightbox"><FiCamera className="size-4 align-middle"></FiCamera></Link>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 md:w-1/2">
                            <div className="flex">
                                {images.slice(1, 3).map((img, index) => (
                                    <div className="w-1/2 p-1" key={index + 1}>
                                        <div className="group relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
                                            <img src={img} alt="" />
                                            <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                                            <div className="absolute top-1/2 -translate-y-1/2 start-0 end-0 text-center opacity-0 group-hover:opacity-100 duration-500">
                                                <Link to="#" onClick={() => handleCLick(index + 1)} className="inline-flex justify-center items-center size-9 bg-red-500 text-white rounded-full lightbox"><FiCamera className="size-4 align-middle"></FiCamera></Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex">
                                {images.slice(3).map((img, index) => (
                                    <div className="w-1/2 p-1" key={index + 3}>
                                        <div className="group relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
                                            <img src={img} alt="" />
                                            <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                                            <div className="absolute top-1/2 -translate-y-1/2 start-0 end-0 text-center opacity-0 group-hover:opacity-100 duration-500">
                                                <Link to="#" onClick={() => handleCLick(index + 3)} className="inline-flex justify-center items-center size-9 bg-red-500 text-white rounded-full lightbox"><FiCamera className="size-4 align-middle"></FiCamera></Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container relative md:mt-24 mt-16">
                    <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
                        <div className="lg:col-span-8 md:col-span-7">
                            <h5 className="text-2xl font-semibold">{title}</h5>
                            <p className="flex items-center text-slate-400 font-medium mt-2"><FiMapPin className="size-4 me-1"></FiMapPin>{place}</p>

                            <ul className="list-none">

                                <li className="inline-flex items-center me-5 mt-5">
                                    <FiClock className="size-6 stroke-[1.5] text-red-500"></FiClock>
                                    <div className="ms-3">
                                        <p className="font-medium">Duration</p>
                                        <span className="text-slate-400 font-medium text-sm mr-14">
                                            {duration ? `${duration} day${duration > 1 ? 's' : ''}` : 'N/A'}
                                        </span>
                                    </div>
                                    <FiActivity className="size-6 stroke-[1.5] text-red-500"></FiActivity>
                                    <div className="ms-3">
                                        <p className="font-medium">Type</p>
                                        <span className="text-slate-400 font-medium text-sm mr-14">{type}</span>
                                    </div>
                                    <FiUser className="size-6 stroke-[1.5] text-red-500"></FiUser>
                                    <div className="ms-3">
                                        <p className="font-medium">Group Size</p>
                                        <span className="text-slate-400 font-medium text-sm mr-14">{group_size} peoples</span>
                                    </div>
                                    <FiGlobe className="size-6 stroke-[1.5] text-red-500"></FiGlobe>
                                    <div className="ms-3">
                                        <p className="font-medium">Languages</p>
                                        <span className="text-slate-400 font-medium text-sm mr-14">{language}</span>
                                    </div>
                                    <FiDollarSign className="size-6 stroke-[1.5] text-red-500"></FiDollarSign>
                                    <div className="ms-3">
                                        <p className="font-medium">Cost</p>
                                        <span className="text-slate-400 font-medium text-sm">${cost} / Day</span>
                                    </div>



                                </li>
                            </ul>

                            <div className="mt-6">
                                <h5 className="text-lg font-semibold">Tour Descriptions:</h5>

                                <p className="text-slate-400 mt-6">{description}</p>
                            </div>

                            <div className="mt-6">
                                <h5 className="text-lg font-semibold">Questions & Answers:</h5>
                                <div className="mt-6">
                                    <Faq />
                                </div>
                            </div>

                            <div className="mt-6">
                                <SendMessages />
                            </div>
                        </div>

                        <div className="lg:col-span-4 md:col-span-5">
                            <div className="p-4 rounded-md shadow dark:shadow-gray-700 sticky top-20">
                                <div className="flex flex-col">
                                    <label className="font-semibold">Arrival Day:</label>
                                    <p className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800">
                                        {arrive_day ? new Date(arrive_day).toLocaleDateString() : "N/A"}
                                    </p>
                                </div>
                                <div className="flex flex-col mt-4">
                                    <label className="font-semibold">Departure Day:</label>
                                    <p className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800">
                                        {depart_day ? new Date(depart_day).toLocaleDateString() : "N/A"}
                                    </p>
                                </div>

                                <div className="p-4 rounded-md shadow dark:shadow-gray-700 sticky top-20 mt-4">
                                    <label className="font-semibold">Adults:</label>
                                    <input
                                        type="number"
                                        className="w-full border rounded-md px-4 py-2"
                                        value={adults}
                                        onChange={(e) => setAdults(parseInt(e.target.value) || 0)}
                                        min="0"
                                    />
                                    <label className="font-semibold mt-4">Children:</label>
                                    <input
                                        type="number"
                                        className="w-full border rounded-md px-4 py-2"
                                        value={children}
                                        onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
                                        min="0"
                                    />
                                    <button
                                        onClick={handleBookNow}
                                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md w-full"
                                    >
                                        Book Now
                                    </button>
                                </div>

                                <div className="mt-6">
                                    <h5 className="text-lg font-medium">Tour Map</h5>

                                    <div className="mt-3">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8931381602997!2d108.2176782753758!3d16.071034184608756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421836b5f0b5d5%3A0xf372c18deace6db!2zVmnhu4duIE5naGnDqm4gY-G7qXUgdsOgIMSQw6BvIHThuqFvIFZp4buHdCAtIEFuaCwgxJDhuqFpIGjhu41jIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2s!4v1733380976062!5m2!1svi!2s" style={{ border: '0' }} title="tripster" className="w-full h-[500px]"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            {isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setActiveIndex((photoIndex + images.length - 1) % images.length,
                        )
                    }
                    onMoveNextRequest={() =>
                        setActiveIndex((photoIndex + 1) % images.length,
                        )
                    }
                />
            )}
        </>
    )
}