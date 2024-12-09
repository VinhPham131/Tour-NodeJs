import React, { useState } from 'react';

export default function SendMessages() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        comment: '',
    });

    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage({ type: 'success', text: result.message });
                setFormData({ name: '', email: '', comment: '' });
                console.log(result);
            } else {
                setMessage({ type: 'error', text: result.error });
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage({ type: 'error', text: 'Failed to send the message.' });
        }
    };

    return (
        <>
            <h5 className="text-lg font-semibold">Leave A Comment:</h5>
            {message && (
                <div className={`mt-4 p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}
            <form className="mt-6" onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-12 lg:gap-6">
                    <div className="lg:col-span-6 mb-5">
                        <div className="text-left">
                            <label htmlFor="name" className="font-semibold">Your Name:</label>
                            <input
                                name="name"
                                id="name"
                                type="text"
                                className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                placeholder="Name :"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-6 mb-5">
                        <div className="text-left">
                            <label htmlFor="email" className="font-semibold">Your Email:</label>
                            <input
                                name="email"
                                id="email"
                                type="email"
                                className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                placeholder="Email :"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1">
                    <div className="mb-5">
                        <div className="text-left">
                            <label htmlFor="comment" className="font-semibold">Your Comment:</label>
                            <textarea
                                name="comment"
                                id="comment"
                                className="mt-3 w-full py-2 px-3 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 h-28"
                                placeholder="Message :"
                                value={formData.comment}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" id="submit" name="send" className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md w-full">
                    Send Message
                </button>
            </form>
            </>
    );
};