import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL;

const Login = () => {
    const navigate = useNavigate();
    const [hidden, setHidden] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails({ ...loginDetails, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginDetails;

        if (!email || !password) return handleError('All fields are required');

        try {
            setLoading(true);

            const url = `${API}/auth/login`;
            const { data } = await axios.post(url, { email, password });

            const { success, message, jwtToken, user } = data;

            if (success) {
                handleSuccess("Login successful");

                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', user.username);
                localStorage.setItem('user_email', user.email);
                localStorage.setItem('userId', user._id);

                setTimeout(() => navigate('/'), 1000);
            } else {
                handleError(message);
            }

        } catch (err) {
            const errorMsg = err.response?.data?.message || "Login failed. Please try again.";
            handleError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 mt-12 mb-0">
            <div className="relative max-w-lg mx-auto rounded-lg overflow-hidden">
                <div className="relative z-10 p-6 bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl border border-gray-100">
                    
                    <Link to={'/'} className="inline-block p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <IoMdArrowRoundBack className="text-xl text-gray-600" />
                    </Link>

                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl mt-4">
                        Welcome Back
                    </h1>

                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500 text-sm">
                        Discover your dream home or sell your property with ease.
                    </p>

                    <form onSubmit={handleLogin} className="mb-0 mt-6 space-y-4">

                        <div>
                            <label className="text-sm font-medium text-gray-700 ml-1">
                                Email
                            </label>

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
                            <label className="text-sm font-medium text-gray-700 ml-1">
                                Password
                            </label>

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
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>

                        <div className="text-center space-y-2 pt-2">
                            <p className="text-sm text-gray-500">
                                No account?{" "}
                                <Link
                                    to='/signup'
                                    className='text-indigo-600 font-semibold hover:underline'
                                >
                                    Sign up
                                </Link>
                            </p>

                            <p className="text-sm">
                                <Link
                                    to='/forgot-password'
                                    title="Reset Password"
                                    className='text-gray-400 hover:text-indigo-600 transition-colors'
                                >
                                    Forgot Password?
                                </Link>
                            </p>
                        </div>

                    </form>
                </div>

                <ToastContainer />
            </div>
        </div>
    );
};

export default Login;
