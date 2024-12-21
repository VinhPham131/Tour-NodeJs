import React, { useState } from "react";
import logo from "../../assets/images/logo-icon.png";
import { Link } from "react-router-dom";
import BackToHome from "../../components/back-to-home";

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await fetch(`http://localhost:3000/api/users/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Password reset link has been sent to your email.');
            } else {
                setError(data.message || 'Failed to send reset link.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
                <div className="absolute inset-0 image-wrap z-1 bg-[url('../../assets/images/bg/6.jpg')] bg-no-repeat bg-center bg-cover"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-2"></div>
                <div className="container relative z-3">
                    <div className="flex justify-center">
                        <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md">
                            <Link to="/">
                                <img src={logo} className="mx-auto" alt="Logo" />
                            </Link>
                            <h5 className="my-6 text-xl font-semibold">Reset Your Password</h5>
                            <p className="text-slate-400 mb-6">
                                Please enter your email address. You will receive a link to create a new password via email.
                            </p>
                            <form className="text-start" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1">
                                    <div className="mb-4">
                                        <label className="font-semibold" htmlFor="LoginEmail">
                                            Email Address:
                                        </label>
                                        <input
                                            id="LoginEmail"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                            placeholder="name@example.com"
                                            required
                                        />
                                    </div>

                                    {message && (
                                        <p className="text-green-500 text-sm mb-4">{message}</p>
                                    )}
                                    {error && (
                                        <p className="text-red-500 text-sm mb-4">{error}</p>
                                    )}

                                    <div className="mb-4">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className={`py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center ${
                                                loading ? 'bg-gray-400' : 'bg-red-500'
                                            } text-white rounded-md w-full`}
                                        >
                                            {loading ? 'Sending...' : 'Send'}
                                        </button>
                                    </div>

                                    <div className="text-center">
                                        <span className="text-slate-400 me-2">
                                            Remember your password?
                                        </span>
                                        <Link
                                            to="/login"
                                            className="text-black dark:text-white font-bold inline-block"
                                        >
                                            Sign in
                                        </Link>
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
