import React, { useState, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from "../context/StoreContext";
import { handleSuccess, handleError } from '../utils';
import { Mail, Send, MessageSquare, Tag, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Buying_page/Loading';

const API = import.meta.env.VITE_API_URL;

const Email = () => {
    const navigate = useNavigate();
    const { userEmail } = useContext(StoreContext);

    const [sending, setSending] = useState(false);
    const [emailDetails, setEmailDetails] = useState({
        subject: '',
        text: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmailDetails({ ...emailDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailDetails.subject || !emailDetails.text) {
            return handleError("Please fill in all fields");
        }

        setSending(true);

        try {
            const response = await axios.post(`${API}/contact/sendEmail`, {
                to: userEmail,
                subject: emailDetails.subject,
                text: emailDetails.text
            });

            if (response.data.success) {
                handleSuccess("Inquiry sent successfully!");
                setEmailDetails({ subject: '', text: '' });

                setTimeout(() => navigate(-1), 2000);
            } else {
                handleError(response.data.message);
            }

        } catch (error) {
            handleError("Failed to connect to mail server");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="h-screen max-w-6xl mx-auto p-8">

            <button 
                onClick={() => navigate(-1)} 
                className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-4 transition-colors group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Listing</span>
            </button>

            <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 min-h-[60vh]">

                {/* Left Visual */}
                <div className="md:w-1/2 bg-indigo-50 flex items-center justify-center p-12">
                    <div className="relative">
                        <img
                            src="/mail.png"
                            alt="Contact"
                            className="relative z-10 w-full max-w-sm"
                        />
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-200 rounded-full blur-2xl opacity-50"></div>
                    </div>
                </div>

                {/* Form */}
                <form
                    className="md:w-1/2 p-10 md:p-14 flex flex-col gap-6"
                    onSubmit={handleSubmit}
                >

                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
                            <Mail size={24} />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Send Inquiry
                            </h2>
                            <p className="text-sm text-gray-500 font-medium truncate w-64 md:w-full">
                                To: {userEmail || 'Recipient not found'}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-5">

                        {/* Subject */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <Tag size={14} /> Subject
                            </label>

                            <input
                                type="text"
                                name="subject"
                                value={emailDetails.subject}
                                onChange={handleChange}
                                placeholder="Interest in Property..."
                                className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all font-medium"
                                required
                            />
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <MessageSquare size={14} /> Message
                            </label>

                            <textarea
                                name="text"
                                value={emailDetails.text}
                                onChange={handleChange}
                                placeholder="I would like to know more about..."
                                className="h-40 w-full p-4 bg-gray-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all font-medium resize-none"
                                required
                            ></textarea>
                        </div>

                    </div>

                    <button 
                        type="submit" 
                        disabled={sending || !userEmail}
                        className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {sending ? (
                            <Loading />
                        ) : (
                            <>
                                <Send size={20} />
                                Send Message
                            </>
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Email;
