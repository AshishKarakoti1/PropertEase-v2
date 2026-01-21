import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleSuccess, handleError } from '../utils';
import axios from 'axios';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ToastContainer } from 'react-toastify';

const SignUp = () => {
    const navigate = useNavigate();
    const [hidden, setHidden] = useState(true);
    const [loading, setLoading] = useState(false);
    const [signUpDetails, setSignUpDetails] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        contactNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpDetails({ ...signUpDetails, [name]: value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const { first_name, last_name, email, password, contactNumber } = signUpDetails;

        if (!first_name || !last_name || !email || !password || !contactNumber) {
            return handleError('All fields are required');
        }

        const username = `${first_name} ${last_name}`;

        try {
            setLoading(true);
            const url = "http://localhost:9090/auth/signup";
            const { data } = await axios.post(url, {
                username,
                email,
                password,
                contactNumber
            });

            if (data.success) {
                handleSuccess("Sign Up successful");
                setTimeout(() => navigate('/login'), 1000);
            } else {
                handleError(data.message);
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Sign Up failed";
            handleError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-8">
            <div className="relative max-w-lg mx-auto">
                <div className="relative z-10 p-4 bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl border border-gray-100">
                    
                    <Link to={'/'} className="inline-block p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <IoMdArrowRoundBack className="text-xl text-gray-600" />
                    </Link>

                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Get started today</h1>
                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500 text-sm">
                        Join PropertEase to find your dream home or sell your property effortlessly.
                    </p>

                    <form onSubmit={handleSignUp} className="mb-0 mt-6 space-y-4">
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="text-sm font-medium text-gray-700 ml-1">First Name</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    className="w-full rounded-lg border-2 border-gray-100 p-3 text-sm focus:border-indigo-500 focus:outline-none transition-colors shadow-sm"
                                    placeholder="John"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="text-sm font-medium text-gray-700 ml-1">Last Name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    className="w-full rounded-lg border-2 border-gray-100 p-3 text-sm focus:border-indigo-500 focus:outline-none transition-colors shadow-sm"
                                    placeholder="Doe"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full rounded-lg border-2 border-gray-100 p-3 text-sm focus:border-indigo-500 focus:outline-none transition-colors shadow-sm"
                                placeholder="name@example.com"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 ml-1">Contact Number</label>
                            <input
                                type="text"
                                name="contactNumber"
                                className="w-full rounded-lg border-2 border-gray-100 p-3 text-sm focus:border-indigo-500 focus:outline-none transition-colors shadow-sm"
                                placeholder="10-digit number"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
                            <div className='relative flex items-center'>
                                <input
                                    type={hidden ? 'password' : 'text'}
                                    name="password"
                                    className="w-full rounded-lg border-2 border-gray-100 p-3 text-sm focus:border-indigo-500 focus:outline-none transition-colors shadow-sm"
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                    required
                                />
                                <div 
                                    className="absolute right-3 cursor-pointer text-gray-400 hover:text-indigo-600"
                                    onClick={() => setHidden(!hidden)}
                                >
                                    {hidden ? <FaEye /> : <FaEyeSlash />}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`block w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-indigo-700 active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Creating Account...' : 'Sign up'}
                        </button>

                        <p className="text-center text-sm text-gray-500 pt-2">
                            Already have an account? <Link to='/login' className='text-indigo-600 font-semibold hover:underline'>Sign in</Link>
                        </p>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}

export default SignUp;