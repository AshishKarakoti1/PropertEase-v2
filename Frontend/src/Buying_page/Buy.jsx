import React from 'react';
import Filters from './Filters';
import PostList from './PostList';
import NavBar from '../LandingPage/NavBar';
import styles from './Buy.module.css';

const Buy = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            <div className="max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-12">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filter Sidebar */}
                    <Filters />

                    {/* Main Listing Grid */}
                    <main className="flex-1">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">Available Properties</h1>
                            <p className="text-sm text-gray-500">Discover your perfect home from our verified listings</p>
                        </div>
                        <PostList />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Buy;