import React, { useEffect, useState } from "react";
import faqImg from "../assets/images/bg/5.jpg"

import { FiChevronDown } from '../assets/icons/vander'

export default function Faq() {
    const [faqData, setFaqData] = React.useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let [activeIndex, setActiveIndex] = useState(1);

    useEffect(() => {
        const fetchFaq = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/faqs");
                if (!response.ok) {
                    throw new Error("Failed to fetch faq");
                }
                const data = await response.json();
                setFaqData(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchFaq();

    }, []);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="relative grid md:grid-cols-12 grid-cols-1 items-center mt-6 gap-6">
            <div className="md:col-span-6">
                <img src={faqImg} className="w-full h-[540px] object-cover rounded-md shadow dark:shadow-gray-800" alt="" />
            </div>

            <div className="md:col-span-6">
                <div>
                    {faqData.map((item, index) => {
                        return (
                            <div className="relative shadow dark:shadow-gray-800 rounded-md overflow-hidden mt-4 first:mt-0" key={index}>
                                <h2 className="text-base font-semibold" id="accordion-collapse-heading-1">
                                    <button type="button" className={`flex justify-between items-center p-5 w-full font-medium text-start ${activeIndex === item.id ? 'bg-gray-50 dark:bg-slate-800 text-red-500' : ''}`} onClick={() => setActiveIndex(item.id)}>
                                        <span>{item.title}</span>
                                        <FiChevronDown className={`w-4 h-4 shrink-0 ${activeIndex === item.id ? 'rotate-180' : ''}`}></FiChevronDown>
                                    </button>
                                </h2>
                                <div className={activeIndex === item.id ? "" : "hidden"}>
                                    <div className="p-5">
                                        <p className="text-slate-400 dark:text-gray-400">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
