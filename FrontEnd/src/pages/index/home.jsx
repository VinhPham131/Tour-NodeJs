import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import TopDestination from '../../components/top-destination';
import Faq from '../../components/faq';
import ToursPackages from '../../components/tours-packages';
import bg from "../../assets/images/bg/2.jpg";
import { FiSearch } from '../../assets/icons/vander';
import { Parallax } from 'react-parallax';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [arrivalDay, setArrivalDay] = useState('');
    const [departureDay, setDepartureDay] = useState('');
    const [region, setRegion] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    return (
        <>
            <Navbar navclass="defaultscroll is-sticky tagline-height" navlight={true} manuclass="justify-end nav-light" />
            <section className="relative py-36 bg-cover jarallax" data-jarallax data-speed="0.5">
                <Parallax bgImage={bg} bgImageAlt="the cat" strength={200} className='absolute inset-0' />
                <div className="absolute inset-0 bg-slate-900/40"></div>
                <div className="container relative">
                    <div className="grid lg:grid-cols-12 md:grid-cols-2 mt-10 items-center gap-6">
                        <div className="lg:col-span-7">
                            <h5 className="text-3xl font-dancing text-white">Find Your Ideal Stay</h5>
                            <h4 className="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-6xl mb-6 mt-5">Where Do You <br /> Want To Go?</h4>
                            <p className="text-white/70 text-xl max-w-xl">Planning for a trip? We will organize your trip with the best places and within best budget!</p>
                        </div>
                        <div className="lg:col-span-5">
                            <div className="bg-white dark:bg-slate-900 rounded-xl shadow dark:shadow-gray-800 p-6 z-10 relative lg:ms-10">
                                <h4 className="mb-5 text-2xl font-semibold">Search Your Destinations</h4>
                                <form onSubmit={handleSearch}>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div>
                                            <label className="form-label font-medium text-slate-900 dark:text-white">Name & Place:</label>
                                            <div className="relative mt-2">
                                                <FiSearch className="size-[18px] absolute top-[10px] start-3"></FiSearch>
                                                <input
                                                    name="name"
                                                    type="text"
                                                    id="job-keyword"
                                                    className="w-full py-2 px-3 ps-10 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                                    placeholder="Search"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="form-label font-medium text-slate-900 dark:text-white">Arrival Day:</label>
                                            <input
                                                type="date"
                                                className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                                value={arrivalDay}
                                                onChange={(e) => setArrivalDay(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label font-medium text-slate-900 dark:text-white">Departure Day:</label>
                                            <input
                                                type="date"
                                                className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                                value={departureDay}
                                                onChange={(e) => setDepartureDay(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label font-medium text-slate-900 dark:text-white">Region:</label>
                                            <select
                                                className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                                value={region}
                                                onChange={(e) => setRegion(e.target.value)}
                                            >
                                                <option value="">Select Region</option>
                                                <option value="Asia">Asia</option>
                                                <option value="Europe">Europe</option>
                                                <option value="Africa">Africa</option>
                                                <option value="North America">North America</option>
                                                <option value="South America">South America</option>
                                            </select>
                                        </div>
                                        <div className="">
                                            <input type="submit" id="search-buy" name="search" className="py-1 px-5 h-10 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md w-full cursor-pointer" value="Search" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="relative">
                <div className="absolute block w-full h-auto bottom-[25px] z-1 start-0">
                    <Link to="#"><i className="mdi mdi-arrow-down absolute top-0 start-0 end-0 text-center inline-flex items-center justify-center rounded-full bg-white dark:bg-slate-900 h-12 w-12 mx-auto shadow-md dark:shadow-gray-800"></i></Link>
                </div>
                <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden text-white dark:text-slate-900">
                    <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>
            <section className="relative md:py-24 py-16">
                <TopDestination />
                <div className="container relative md:mt-24 mt-16">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">Tours Packages</h3>
                        <p className="text-slate-400 max-w-xl mx-auto">Planning for a trip? We will organize your trip with the best places and within best budget!</p>
                    </div>
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
                        <ToursPackages
                            searchTerm={searchTerm}
                            arrivalDay={arrivalDay}
                            departureDay={departureDay}
                            region={region}
                            showModal={showModal}
                            setShowModal={setShowModal}
                        />
                    </div>
                </div>
                <div className="container relative md:mt-24 mt-16">
                    <div className="grid grid-cols-1 pb-6 text-center">
                        <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">Frequently Asked Questions</h3>
                        <p className="text-slate-400 max-w-xl mx-auto">This is just a simple text made for this unique and awesome template, you can replace it with any text.</p>
                    </div>
                    <Faq />
                </div>
            </section>
            <Footer />
        </>
    );
}