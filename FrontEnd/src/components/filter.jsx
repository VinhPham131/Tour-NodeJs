import React, { useState } from "react";

export default function Filter({ onPriceChange, onRatingChange, onRegionChange }) {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(500);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [selectedRegions, setSelectedRegions] = useState([]);

    const changeMinValue = (e) => {
        const newMin = Number(e.target.value);
        setMinValue(newMin);
        onPriceChange(newMin, maxValue);
    };

    const changeMaxValue = (e) => {
        const newMax = Number(e.target.value);
        setMaxValue(newMax);
        onPriceChange(minValue, newMax);
    };

    const handleRatingChange = (e) => {
        const value = parseInt(e.target.value, 10);
        const updatedRatings = selectedRatings.includes(value)
            ? selectedRatings.filter((r) => r !== value)
            : [...selectedRatings, value];
        setSelectedRatings(updatedRatings);
        onRatingChange(updatedRatings);
    };

    const handleRegionChange = (e) => {
        const value = e.target.value;
        const updatedRegions = selectedRegions.includes(value)
            ? selectedRegions.filter((r) => r !== value)
            : [...selectedRegions, value];
        setSelectedRegions(updatedRegions);
        onRegionChange(updatedRegions);
    };

    return (
        <div className="lg:col-span-4 md:col-span-5">
            <div className="p-4 rounded-md shadow dark:shadow-gray-700 sticky top-20">
                {/* Price Filter */}
                <div>
                    <h5 className="text-lg font-medium">Price Filter</h5>
                    <div className="range-slider mt-3">
                        <span className="flex justify-between pb-2">
                            <span>
                                <label htmlFor="" className="text-lg">$</label>
                                <input
                                    type="number"
                                    className="text-slate-400"
                                    value={minValue}
                                    min={0}
                                    max={500}
                                    onChange={changeMinValue}
                                />
                            </span>
                            <span>
                                <label htmlFor="" className="text-lg">$</label>
                                <input
                                    type="number"
                                    className="text-slate-400"
                                    value={maxValue}
                                    min={0}
                                    max={500}
                                    onChange={changeMaxValue}
                                />
                            </span>
                        </span>
                        <input
                            value={minValue}
                            min={0}
                            max={500}
                            step="5"
                            type="range"
                            onChange={changeMinValue}
                        />
                        <input
                            value={maxValue}
                            min={0}
                            max={500}
                            step="5"
                            type="range"
                            onChange={changeMaxValue}
                        />
                    </div>
                </div>

                {/* Ratings Filter */}
                <div className="mt-6">
                    <h5 className="text-lg font-medium">Reviews</h5>
                    <div className="mt-3">
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <div className="flex items-center mb-0" key={rating}>
                                <input
                                    className="form-checkbox rounded border-gray-100 dark:border-gray-800 text-red-500 focus:border-red-300 focus:ring focus:ring-offset-0 focus:ring-red-500/20 focus:ring-opacity-50 me-2"
                                    type="checkbox"
                                    value={rating}
                                    id={`${rating}star`}
                                    onChange={handleRatingChange}
                                />
                                <label className="form-checkbox-label text-slate-400" htmlFor={`${rating}star`}>
                                    <ul className="font-medium list-none space-x-1">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <li key={i} className="inline">
                                                <i
                                                    className={`mdi ${
                                                        i < rating
                                                            ? "mdi-star text-amber-400"
                                                            : "mdi-star-outline text-slate-200 dark:text-gray-700"
                                                    } align-middle`}
                                                ></i>
                                            </li>
                                        ))}
                                    </ul>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Region Filter */}
                <div className="mt-6">
                    <h5 className="text-lg font-medium">Region</h5>
                    <div className="mt-3">
                        {["Asia", "Europe", "Africa", "South America", "North America"].map((region) => (
                            <div className="flex items-center mb-0" key={region}>
                                <input
                                    className="form-checkbox rounded border-gray-100 dark:border-gray-800 text-red-500 focus:border-red-300 focus:ring focus:ring-offset-0 focus:ring-red-500/20 focus:ring-opacity-50 me-2"
                                    type="checkbox"
                                    value={region}
                                    id={region}
                                    onChange={handleRegionChange}
                                />
                                <label className="form-checkbox-label text-slate-400" htmlFor={region}>
                                    {region}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
