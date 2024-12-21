import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo-icon.png';
import BackToHome from '../../components/back-to-home';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for password visibility



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/users/reset-password/${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();
            console.log(password);

            if (response.ok) {
                setMessage('Password reset successfully. Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(data.message || 'Failed to reset password.');
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
                            <img src={logo} className="mx-auto mb-4" alt="Logo" />
                            <h5 className="text-xl font-semibold mb-4 text-center">Set Your New Password</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4 relative">
                                    <label className="font-semibold" htmlFor="password">New Password:</label>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"} // Toggle between 'password' and 'text'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                        placeholder="Enter new password"
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
                                <div className="mb-4 relative">
                                    <label className="font-semibold" htmlFor="confirmPassword">Confirm Password:</label>
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"} // Toggle between 'password' and 'text'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                        placeholder="Confirm new password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-[60px] transform -translate-y-1/2 text-gray-500"
                                    >
                                        {showConfirmPassword ? (
                                            <FiEye className="w-4 h-4" />
                                        ) : (
                                            <FiEyeOff className="w-4 h-4" />
                                        )}
                                    </button>
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
                                        className={`py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center ${loading ? 'bg-gray-400' : 'bg-red-500'
                                            } text-white rounded-md w-full`}
                                    >
                                        {loading ? 'Resetting...' : 'Reset Password'}
                                    </button>
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