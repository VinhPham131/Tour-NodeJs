import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo-icon.png";
import BackToHome from "../../components/back-to-home";

import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!acceptTerms) {
      setError("You must accept the terms and conditions.");
      return;
    }

    // Email validation
    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailValidation.test(email)) {
      setError("Please provide a valid email address.");
      return;
    }

    // Password validation (same as server-side)
    const passwordValidation = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordValidation.test(password)) {
      setError("Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(`Error: ${errorText}`);
        return;
      }

      const data = await response.json();
      // Handle successful signup (e.g., navigate to another page)
      navigate("/signup-success");
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };


  return (
    <>
      <section className="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
        <div className="absolute inset-0 image-wrap z-1 bg-[url('../../assets/images/bg/6.jpg')] bg-no-repeat bg-center bg-cover"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-2" id="particles-snow"></div>
        <div className="container relative z-3">
          <div className="flex justify-center">
            <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md">
              <Link to="/"><img src={logo} className="mx-auto" alt="Logo" /></Link>
              <h5 className="my-6 text-xl font-semibold text-center">Signup</h5>
              <form className="text-start" onSubmit={handleSignup}>
                <div className="grid grid-cols-1">
                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="RegisterName">Your Name:</label>
                    <input
                      id="RegisterName"
                      type="text"
                      className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                      placeholder="Name:"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

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

                  <div className="mb-4 relative">
                    <label className="font-semibold" htmlFor="LoginPassword">Password:</label>
                    <input
                      id="LoginPassword"
                      type={showPassword ? "text" : "password"} // Toggle between 'password' and 'text'
                      className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                      placeholder="Password:"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {/* Eye Icon for toggling password visibility */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-[60px] transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? (
                        <FiEye className="w-4 h-4" />
                      ) : (
                        <FiEyeOff className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center w-full mb-0">
                      <input
                        className="form-checkbox rounded border-gray-100 dark:border-gray-800 text-red-500 focus:border-red-300 focus:ring focus:ring-offset-0 focus:ring-red-500/20 focus:ring-opacity-50 me-2"
                        type="checkbox"
                        value={acceptTerms}
                        id="AcceptTAndC"
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                      />
                      <label className="form-check-label text-slate-400" htmlFor="AcceptTAndC">
                        I Accept <Link to="" className="text-red-500">Terms And Condition</Link>
                      </label>
                    </div>
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
                      Register
                    </button>
                  </div>

                  <div className="text-center">
                    <span className="text-slate-400 me-2">Already have an account?</span>
                    <Link to="/login" className="text-black dark:text-white font-bold inline-block">Sign in</Link>
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
