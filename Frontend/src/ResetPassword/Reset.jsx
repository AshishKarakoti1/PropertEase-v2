import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { handleSuccess, handleError } from '../utils';

const API = import.meta.env.VITE_API_URL;

const Reset = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { value } = e.target;
        setPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${API}/password/reset/${token}`,
                { password }
            );

            const { success, message } = response.data;

            if (success) {
                handleSuccess(message);
                setPassword('');

                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                handleError(message);
            }

        } catch (error) {
            console.error(error);
            handleError('Failed to reset password');
        }
    };

    return (
        <div className="mx-auto w-[35rem] px-4 py-8 sm:px-6 lg:px-8 mt-12 mb-0">

            <div className="relative max-w-lg mx-auto bg-white bg-opacity-80 rounded-lg">

                <div className="absolute inset-0 bg-white rounded-lg"></div>

                <div className="relative z-10 p-6">

                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                        Reset Password
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="mb-0 mt-4 space-y-4 rounded-lg shadow-lg sm:p-4 lg:p-6"
                    >

                        <p className="text-center text-lg font-medium">
                            Enter new password
                        </p>

                        <div>
                            <label className="sr-only">Password</label>

                            <div className="relative">
                                <input
                                    type="password"
                                    className="w-full rounded-lg border-2 border-gray-200 p-3 pe-12 text-sm shadow-md outline-gray-300"
                                    placeholder="Enter password"
                                    onChange={handleChange}
                                    value={password}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
                        >
                            Reset Password
                        </button>

                    </form>

                    <ToastContainer />

                </div>
            </div>
        </div>
    );
};

export default Reset;
