import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext';
import Post from './Post';
import Loading from './Loading';
import Error from './Error';
import styles from './postlist.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Modern icons

const PostList = () => {
    const { 
        data, 
        loading, 
        error, 
        fetchListings, 
        totalPages, 
        currentPage, 
        setCurrentPage, 
        filters, 
        applyFilters 
    } = useContext(StoreContext);

    // Consolidated Fetch Logic
    useEffect(() => {
        const hasActiveFilters = Object.values(filters).some(val => val !== '' && val !== null);
        
        if (hasActiveFilters) {
            applyFilters(currentPage);
        } else {
            fetchListings(currentPage);
        }
        // Smooth scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, filters.location, filters.bedrooms, filters.bathrooms, filters.category]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px] w-full lg:w-[70%]">
                <Loading />
            </div>
        );
    }

    if (error) return <Error />;

    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px] w-full lg:w-[70%] text-center">
                <p className="text-3xl font-bold text-gray-400 italic">No listings found matching your criteria</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-grow">
            {/* Grid layout for posts */}
            <div className={styles.postlist}>
                {data.map((listing) => (
                    <Post
                        key={listing._id}
                        id={listing._id}
                        url={listing.images[0]}
                        location={listing.location}
                        bedrooms={listing.bedrooms}
                        bathrooms={listing.bathrooms}
                        area={listing.area}
                        price={listing.price}
                        category={listing.category}
                    />
                ))}
            </div>

            {/* Modern Pagination UI */}
            <div className="flex justify-center items-center gap-6 mt-12 mb-8">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="p-2 rounded-full border border-gray-200 hover:bg-white disabled:opacity-30 transition-all shadow-sm"
                >
                    <ChevronLeft size={24} className="text-gray-700" />
                </button>
                
                <div className="flex items-center gap-2 font-semibold text-gray-700">
                    <span>Page</span>
                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-md">{currentPage}</span>
                    <span>of {totalPages || 1}</span>
                </div>

                <button
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="p-2 rounded-full border border-gray-200 hover:bg-white disabled:opacity-30 transition-all shadow-sm"
                >
                    <ChevronRight size={24} className="text-gray-700" />
                </button>
            </div>
        </div>
    );
}

export default PostList;