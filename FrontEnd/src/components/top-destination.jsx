import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import TinySlider from "tiny-slider-react";
import 'tiny-slider/dist/tiny-slider.css';


export default function TopDestinationTwo() {
    const settings = {
        container: '.tiny-six-item',
        controls: true,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: "bottom",
        controlsText: ['<i class="mdi mdi-chevron-left "></i>', '<i class="mdi mdi-chevron-right"></i>'],
        nav: false,
        speed: 400,
        gutter: 0,
        responsive: {
            1025: {
                items: 6
            },

            992: {
                items: 4
            },

            767: {
                items: 3
            },

            425: {
                items: 1
            },
        },
    };
    const [topDestination, setTopDestinations] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const BASE_PATH = "/assets/images/listing/";


    useEffect(() => {
        const fetchTopDestinations = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/top-destinations");
                if (!response.ok) {
                    throw new Error("Failed to fetch top destinations");
                }
                const data = await response.json();
                setTopDestinations(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchTopDestinations();
    },
    []);
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;
    return (
        <div className="container relative">
            <div className="grid grid-cols-1 pb-8 text-center">
                <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">Top Destinations</h3>

                <p className="text-slate-400 max-w-xl mx-auto">Planning for a trip? We will organize your trip with the best places and within best budget!</p>
            </div>

            <div className="grid grid-cols-1 relative mt-6">
                <div className="tiny-six-item">
                    <TinySlider settings={settings}>
                        {topDestination.map((item, index) => {
                            return (
                                <div className="tiny-slide" key={index}>
                                    <div className="group relative overflow-hidden rounded-md shadow dark:shadow-gray-800 m-2">
                                        <img src={`${BASE_PATH}${item.image}`} className="w-full md:h-32 h-36 object-cover scale-125 group-hover:scale-100 duration-500 shadow dark:shadow-gray-800" alt="" />
                                        <div className="absolute inset-0 bg-gradient-to-b to-slate-900 from-transparent opacity-0 group-hover:opacity-100 duration-500"></div>

                                        <div className="absolute p-4 bottom-0 start-0">

                                        <Link to={`/tour-details/${item.id}`} className="text-lg font-medium text-white hover:text-red-500 duration-500 ease-in-out">{item.place}</Link>
                                        <p className="text-white text-sm duration-500">Book count: {item.book_count}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </TinySlider>
                </div>
            </div>
        </div>
    )
}