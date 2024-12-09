import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import logo from '../../assets/images/logo-icon.png';
import BackToHome from "../../components/back-to-home";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const data = await response.json();
            if (data.message === "Invalid email or password.") {
                setError("Invalid email or password.");
            } else {
                setError("An unexpected error occurred.");
            }
            return;
        }

        const data = await response.json();
        const tokenExpiry = 3600 * 1000; // Assuming 1 hour in milliseconds

        // Save token and user details
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);

        // Auto logout when the token expires
        setTimeout(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            navigate('/login'); // Redirect to login
            alert("Session expired. Please log in again.");
        }, tokenExpiry);

        navigate(from);
    } catch (error) {
        setError('An unexpected error occurred.');
    }
};


  // Check token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <section className="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
        <div className="absolute inset-0 image-wrap z-1 bg-[url('../../assets/images/bg/6.jpg')] bg-no-repeat bg-center bg-cover"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-2" id="particles-snow"></div>
        <div className="container relative z-3">
          <div className="flex justify-center">
            <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md">
              <Link to="/"><img src={logo} className="mx-auto" alt="Logo" /></Link>
              <h5 className="my-6 text-xl font-semibold text-center">Login</h5>
              <form className="text-start" onSubmit={handleLogin}>
                <div className="grid grid-cols-1">
                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="LoginEmail">Email Address:</label>
                    <input
                      id="LoginEmail"
                      type="email"
                      className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="LoginPassword">Password:</label>
                    <input
                      id="LoginPassword"
                      type="password"
                      className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                      placeholder="Password:"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {error && (
                    <div className="text-red-500 text-sm mb-4">
                      {error}
                    </div>
                  )}

                  <div className="mb-4">
                    <button
                      type="submit"
                      className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md w-full"
                    >
                      Login
                    </button>
                  </div>

                  <div className="text-center">
                    <span className="text-slate-400 me-2">Don't have an account?</span>
                    <Link to="/signup" className="text-black dark:text-white font-bold inline-block">Sign Up</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <BackToHome />
    </>
  );
}
