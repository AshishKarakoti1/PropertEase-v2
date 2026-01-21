import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                
                {/* Brand Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-2 rounded-lg">
                            <Home className="text-white" size={24} />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">
                            PropertEase
                        </span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-400">
                        Making the journey of finding and selling homes effortless. We provide premium listings and expert guidance to help you find your perfect space.
                    </p>
                    <div className="flex gap-4">
                        <Facebook size={20} className="hover:text-indigo-500 cursor-pointer transition-all hover:-translate-y-1" />
                        <Twitter size={20} className="hover:text-indigo-500 cursor-pointer transition-all hover:-translate-y-1" />
                        <Instagram size={20} className="hover:text-indigo-500 cursor-pointer transition-all hover:-translate-y-1" />
                        <Linkedin size={20} className="hover:text-indigo-500 cursor-pointer transition-all hover:-translate-y-1" />
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Quick Links</h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link to="/buy" className="hover:text-indigo-500 transition-all hover:translate-x-1 inline-block no-underline">Buy Properties</Link></li>
                        <li><Link to="/buy?category=renting" className="hover:text-indigo-500 transition-all hover:translate-x-1 inline-block no-underline">Rent Properties</Link></li>
                        <li><Link to="/sell" className="hover:text-indigo-500 transition-all hover:translate-x-1 inline-block no-underline">Sell Your Home</Link></li>
                        <li><Link to="/mortgage-calculator" className="hover:text-indigo-500 transition-all hover:translate-x-1 inline-block no-underline">Mortgage Calculator</Link></li>
                    </ul>
                </div>

                {/* Support Section */}
                <div>
                    <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Support</h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link to="/contact" className="hover:text-indigo-500 transition-all hover:translate-x-1 inline-block no-underline">Contact Us</Link></li>
                        <li><Link to="/faq" className="hover:text-indigo-500 transition-all hover:translate-x-1 inline-block no-underline">FAQs</Link></li>
                        <li><Link to="/terms" className="hover:text-indigo-500 transition-all hover:translate-x-1 inline-block no-underline">Terms of Service</Link></li>
                        <li><Link to="/privacy" className="hover:text-indigo-500 transition-all hover:translate-x-1 inline-block no-underline">Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Contact Info</h4>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin size={18} className="text-indigo-500 shrink-0" />
                            <span className="text-gray-400">123 Realty Lane, Dehradun,<br /> Uttarakhand, India</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone size={18} className="text-indigo-500 shrink-0" />
                            <span className="text-gray-400">+91 98765 43210</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail size={18} className="text-indigo-500 shrink-0" />
                            <span className="text-gray-400">support@propertease.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} PropertEase. Designed with care for premium real estate.</p>
            </div>
        </footer>
    );
};

export default Footer;