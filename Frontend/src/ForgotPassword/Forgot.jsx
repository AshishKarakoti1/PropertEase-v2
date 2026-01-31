import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { handleSuccess, handleError } from '../utils';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import Loading from '../Buying_page/Loading';

const Forgot = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const sendEmail = async (e) => {
        e.preventDefault();
        if (!email) return handleError("Please enter your email");

        setIsSubmitting(true);
        try {
            const response = await axios.post(
                'http://localhost:5000/password/forgot',
                { email },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const { success, message } = response.data;
            if (success) {
                handleSuccess(message);
                setEmail(''); // Clear only on success
            } else {
                handleError(message);
            }
        } catch (error) {
            handleError(error.response?.data?.message || 'Failed to send reset link');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 mt-12 mb-0">
            <div className="relative max-w-md mx-auto">
                <div className="relative z-10 p-8 bg-white/90 backdrop-blur-md shadow-2xl rounded-[2rem] border border-gray-100">
                    
                    <Link to='/login' className="inline-block p-2 hover:bg-gray-100 rounded-full transition-colors mb-4">
                        <ArrowLeft size={20} className="text-gray-600" />
                    </Link>

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-indigo-600">Forgot Password?</h1>
                        <p className="mt-4 text-gray-500 text-sm">
                            Enter your email and we'll send you a link to reset your password.
                        </p>
                    </div>

                    <form onSubmit={sendEmail} className="space-y-6">
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative mt-2">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <Mail size={18} />
                                </span>
                                <input
                                    type="email"
                                    className="w-full rounded-2xl border-2 border-gray-50 pl-10 py-4 text-sm focus:border-indigo-500 focus:outline-none transition-all shadow-sm"
                                    placeholder="Enter your registered email"
                                    name="email"
                                    onChange={handleChange}
                                    value={email}
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center justify-center gap-2 w-full rounded-2xl bg-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-70"
                        >
                            {isSubmitting ? <Loading /> : <><Send size={18} /> Send Reset Link</>}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            Remembered your password? <Link to='/login' className="text-indigo-600 font-bold hover:underline">Login</Link>
                        </p>
                    </div>
                    
                    <ToastContainer position="bottom-center" />
                </div>
            </div>
        </div>
    );
}

export default Forgot;