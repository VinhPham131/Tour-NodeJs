import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAvatar } from '../context/AvatarContext'; // Import AvatarContext

import clientImg from "../assets/images/person/16.png";
import clientImgBlack from "../assets/images/person/default-user-black.png";
import { FiUser, FiSettings, FiLogOut, FiFileText, FiLogIn } from '../assets/icons/vander';

export default function Navbar({ navclass, manuclass }) {
    const [scrolling, setScrolling] = useState(false);
    const [isToggle, setToggle] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userManu, setUserManu] = useState(false);
    const dropdownRef = useRef(null);
    const userRef = useRef(null);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { avatar, setAvatar } = useAvatar(); // Sử dụng AvatarContext



    const isTokenValid = (token) => {
        try {
            const decoded = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp > currentTime;
        } catch (error) {
            console.error('Error decoding token:', error);
            return false;
        }
    };

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        if (!token || !isTokenValid(token)) {
            handleLogout();
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/users/profile', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAvatar(data.user.avatar || null);
                setIsLoggedIn(true);
            } else {
                console.error('Failed to fetch user data.');
                handleLogout();
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            handleLogout();
        }
    };

    useEffect(() => {
        const handleScroll = () => setScrolling(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);

        // Kiểm tra trạng thái đăng nhập và tải dữ liệu người dùng
        fetchUser();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setAvatar(null); // Xóa avatar khỏi context
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <nav id="topnav" className={`${navclass} ${scrolling ? 'nav-sticky' : ''}`} style={{ zIndex: 40 }}>
            <div className="container relative">
                <Link className="logo" to="/">
                    <span className="inline-block dark:hidden text-red-600">Tripster</span>
                </Link>
                <ul className="buy-button list-none mb-0 space-x-1">
                    <li className="dropdown inline-block relative ps-0.5" ref={userRef}>
                        <button className="dropdown-toggle items-center" type="button" onClick={() => setUserManu(!userManu)}>
                            <span className="w-[40px] h-[40px] inline-flex items-center justify-center tracking-wide align-middle duration-500 rounded-md shadow-lg">
                                <img
                                    src={avatar ? `http://localhost:3000${avatar}` : clientImgBlack}
                                    className="rounded-full w-[30px] h-[30px] object-cover object-center"
                                    alt="User Avatar"
                                />
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
                                        <>
                                            <li>
                                                <Link to="/login" className="flex items-center font-medium py-2 px-4 dark:text-white/70 hover:text-red-500 dark:hover:text-white">
                                                    <FiLogIn className="size-4 me-2"></FiLogIn>Login
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/signup" className="flex items-center font-medium py-2 px-4 dark:text-white/70 hover:text-red-500 dark:hover:text-white">
                                                    <FiLogIn className="size-4 me-2"></FiLogIn>Sign up
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        )}
                    </li>
                </ul>

                <div id="navigation" style={{ display: isToggle ? 'block' : 'none' }}>
                    <ul className={`navigation-menu ${manuclass}`}>
                        <li><Link to="/" className="sub-menu-item">Home</Link></li>
                        <li><Link to="/tours" className="sub-menu-item">Tours</Link></li>
                        <li><Link to="/contact" className="sub-menu-item">Contact Us</Link></li>
                        <li><Link to="/about-us" className="sub-menu-item">About Us</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}