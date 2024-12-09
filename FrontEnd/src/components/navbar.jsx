import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // useHistory for navigation after logout

import userImg from '../assets/images/person/16.png';

import { FiUser, FiSettings, FiLogOut, FiFileText } from '../assets/icons/vander';

export default function Navbar({ navclass, navlight, manuclass }) {
    const [scrolling, setScrolling] = useState(false);
    const [isToggle, setToggle] = useState(false);
    const [manu, setManu] = useState('');
    const [subManu, setSubManu] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [userManu, setUserManu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track user login state
    const dropdownRef = useRef(null);
    const userRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolling = window.scrollY > 50;
            setScrolling(isScrolling);
        };

        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const userOutsideClick = (e) => {
            if (userRef.current && !userRef.current.contains(e.target)) {
                setUserManu(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('click', handleOutsideClick);
        window.addEventListener('click', userOutsideClick);

        const current = window.location.pathname;
        setManu(current);
        setSubManu(current);
        window.scrollTo(0, 0);

        // Check if user is logged in by checking localStorage
        const userData = localStorage.getItem('user');
        setIsLoggedIn(userData ? true : false); // Set logged-in state based on user data

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('click', handleOutsideClick);
            window.removeEventListener('click', userOutsideClick);
        };
    }, []);

    const toggleMenu = () => {
        setToggle(!isToggle);
    };

    const handleLogout = () => {
        // Make API call to log out (optional)
        // For now, we'll clear localStorage and set login state to false
        localStorage.removeItem('token');  // For localStorage
        sessionStorage.removeItem('token');  // For sessionStorage
        localStorage.removeItem('user');  // Clear user data from localStorage
        setIsLoggedIn(false);  // Update login state
        navigate('/login');  // Redirect to login page
    };

    return (
        <nav id="topnav" className={`${navclass} ${scrolling ? 'nav-sticky' : ''}`} style={{ zIndex: 40 }}>
            <div className="container relative">
                <Link className="logo" to="/">
                    <span className="inline-block dark:hidden text-red-600">Tripster</span>
                </Link>

                <div className="menu-extras">
                    <div className="menu-item">
                        <Link to="#" className={`navbar-toggle ${isToggle ? 'open' : ''}`} id="isToggle" onClick={toggleMenu}>
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </Link>
                    </div>
                </div>

                <ul className="buy-button list-none mb-0 space-x-1">
                    

                    {/* User Dropdown */}
                    <li className="dropdown inline-block relative ps-0.5" ref={userRef}>
                        <button className="dropdown-toggle items-center" type="button" onClick={() => setUserManu(!userManu)}>
                            <span className="size-6 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md border border-white bg-white text-white">
                                <img src={userImg} className="rounded-md" alt="" />
                            </span>
                        </button>
                        {userManu && (
                            <div className="dropdown-menu absolute end-0 m-0 mt-4 z-10 w-48 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 ">
                                <ul className="py-2 text-start">
                                    {isLoggedIn ? (
                                        <>
                                            <li>
                                                <Link to="/profile" className="flex items-center font-medium py-2 px-4 dark:text-white/70 hover:text-red-500 dark:hover:text-white">
                                                    <FiUser className="size-4 me-2"></FiUser>Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/invoice" className="flex items-center font-medium py-2 px-4 dark:text-white/70 hover:text-red-500 dark:hover:text-white">
                                                    <FiFileText className="size-4 me-2"></FiFileText>Invoice
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/setting" className="flex items-center font-medium py-2 px-4 dark:text-white/70 hover:text-red-500 dark:hover:text-white">
                                                    <FiSettings className="size-4 me-2"></FiSettings>Settings
                                                </Link>
                                            </li>
                                            <li className="border-t border-gray-100 dark:border-gray-800 my-2"></li>
                                            <li>
                                                <button onClick={handleLogout} className="flex items-center font-medium py-2 px-4 dark:text-white/70 hover:text-red-500 dark:hover:text-white">
                                                    <FiLogOut className="size-4 me-2"></FiLogOut>Logout
                                                </button>
                                            </li>
                                        </>
                                    ) : (
                                        <li>
                                            <Link to="/login" className="flex items-center font-medium py-2 px-4 dark:text-white/70 hover:text-red-500 dark:hover:text-white">
                                                <FiLogOut className="size-4 me-2"></FiLogOut>Login
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </li>
                </ul>

                <div id="navigation" style={{ display: isToggle === true ? 'block' : 'none' }}>
                    <ul className={`navigation-menu ${manuclass}`}>
                        <li className={`${manu === '/' ? 'active' : ''}`}><Link to="/" className="sub-menu-item">Home</Link></li>
                        <li className={`${manu === '/tours' ? 'active' : ''}`}><Link to="/tours" className="sub-menu-item">Tours</Link></li>
                        <li className={`${manu === '/contact' ? 'active' : ''}`}><Link to="/contact" className="sub-menu-item">Contact Us</Link></li>
                        <li className={`${manu === '/about-us' ? 'active' : ''}`}><Link to="/about-us" className="sub-menu-item">About Us</Link></li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}
