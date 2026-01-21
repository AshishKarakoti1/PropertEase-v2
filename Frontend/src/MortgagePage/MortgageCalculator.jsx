import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { handleError } from '../utils';
import { Calculator, ArrowLeft, RotateCcw, IndianRupee } from 'lucide-react';

const MortgageCalculator = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const propertyPrice = searchParams.get('price');
    
    const [principal, setPrincipal] = useState(propertyPrice || '');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);

    const calculatePayment = () => {
        const P = parseFloat(principal);
        const r = parseFloat(interestRate) / 100 / 12;
        const n = parseInt(loanTerm) * 12;

        if (P > 0 && r > 0 && n > 0) {
            const M = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            setMonthlyPayment(M.toFixed(0));
        } else {
            handleError('Please enter valid positive numbers for all fields');
        }
    };

    const clearInputs = () => {
        setInterestRate('');
        setLoanTerm('');
        setMonthlyPayment(null);
    };

    return (
        <div className="min-h-[89vh] flex items-center justify-center p-4">
            <div className="max-w-5xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
                
                {/* Left Section: Visual/Image */}
                <div className="md:w-5/12 bg-indigo-600 relative overflow-hidden">
                    <img 
                        src="/mortgage.png" 
                        alt="Mortgage" 
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent flex flex-col justify-end p-10 text-white">
                        <h2 className="text-3xl font-bold">Plan Your Future</h2>
                        <p className="text-indigo-100 mt-2">Calculate your monthly installments to make an informed decision on your dream home.</p>
                    </div>
                </div>

                {/* Right Section: Form */}
                <div className="md:w-7/12 p-8 md:p-12">
                    {/* <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 transition-colors mb-8"
                    >
                        <ArrowLeft size={18} />
                        <span className="text-sm font-medium">Back to Property</span>
                    </button> */}

                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                            <Calculator size={28} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Mortgage Calculator</h1>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Loan Amount (Principal)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                                <input
                                    type="number"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-indigo-500 rounded-xl outline-none transition-all font-semibold"
                                    value={principal}
                                    onChange={(e) => setPrincipal(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Interest Rate (%)</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 8.5"
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-indigo-500 rounded-xl outline-none transition-all font-semibold"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Term (Years)</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 20"
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-indigo-500 rounded-xl outline-none transition-all font-semibold"
                                    value={loanTerm}
                                    onChange={(e) => setLoanTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={calculatePayment}
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
                            >
                                Calculate
                            </button>
                            <button
                                onClick={clearInputs}
                                className="px-6 py-4 bg-gray-100 text-gray-500 hover:bg-gray-200 rounded-2xl transition-all"
                            >
                                <RotateCcw size={20} />
                            </button>
                        </div>

                        {monthlyPayment && (
                            <div className="mt-10 p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100 animate-in fade-in slide-in-from-bottom-4">
                                <h3 className="text-indigo-600 text-xs font-black uppercase tracking-[0.2em] mb-2 text-center">Estimated Monthly Payment</h3>
                                <div className="text-center">
                                    <span className="text-4xl font-black text-indigo-900">₹{Number(monthlyPayment).toLocaleString('en-IN')}</span>
                                    <span className="text-indigo-400 font-medium text-sm ml-1">/month</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MortgageCalculator;