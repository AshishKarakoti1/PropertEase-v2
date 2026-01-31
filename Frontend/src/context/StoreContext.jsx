import { createContext, useState } from "react";
import axios from 'axios';
import { handleSuccess, handleError } from '../utils'

const API = import.meta.env.VITE_API_URL;

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [filters, setFilters] = useState({
        price: '',
        location: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        category: ''
    });

    const [userEmail, setUserEmail] = useState('');
    const [myListings, setMyListings] = useState([]);
    const [myFavorites, setMyFavorites] = useState([]);
    const [user, setUser] = useState({});
    const [currentListing, setCurrentListing] = useState({
        id: '',
        url: '',
        location: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        price: '',
        category: ''
    });

    const getUserData = async (email) => {
        try {
            const response = await axios.get(`${API}/user/?email=${email}`);
            setUser(response.data.userData);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchMyListings = async (email) => {
        setLoading(true);
        try {
            const response = await axios.get(`${API}/user/listings?email=${email}`);
            setMyListings(response.data.listings || []);
        } catch (err) {
            setError('Failed to fetch listings.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchMyFavorites = async (email) => {
        setLoading(true);
        try {
            const response = await axios.get(`${API}/user/favorites?email=${email}`);
            setMyFavorites(response.data.favorites || []);
        } catch (err) {
            setError('Failed to fetch favorites.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addToFavorites = async (email, id) => {
        try {
            const response = await axios.post(`${API}/user/favorites`, { email, id });
            setMyFavorites(response.data.favorites || []);
            handleSuccess('Added to favorites');
        } catch (err) {
            handleError('Failed to add listing to favorites');
            console.error(err);
        }
    };

    const deleteFromFavorites = async (email, id) => {
        try {
            const response = await axios.delete(`${API}/user/favorites?email=${email}&id=${id}`);
            setMyFavorites(response.data.favorites || []);
            handleSuccess('Removed from favorites');
        } catch (err) {
            handleError('Failed to delete listing from favorites');
            console.error(err);
        }
    };

    const fetchListings = async (page = 1) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${API}/buy?page=${page}`);
            const { listings, totalPages: total, currentPage: current } = response.data;

            setData(listings || []);
            setTotalPages(total || 0);
            setCurrentPage(current || 1);
        } catch (err) {
            setError("Failed to fetch data.");
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = async (page = 1) => {
        setLoading(true);

        try {
            const response = await axios.post(`${API}/buy?page=${page}`, filters);
            const { filteredListings, totalPages: total, currentPage: current } = response.data;

            setData(filteredListings || []);
            setTotalPages(total || 0);
            setCurrentPage(current || 1);
        } catch (err) {
            setError('Error filtering data.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const clearFilters = async () => {
        setFilters({
            price: '',
            location: '',
            area: '',
            bedrooms: '',
            bathrooms: '',
            category: ''
        });
        await fetchListings();
    };

    const contextValue = {
        data,
        loading,
        error,
        filters,
        myListings,
        myFavorites,
        user,
        userEmail,
        currentListing,
        currentPage,
        totalPages,
        setUser,
        setFilters,
        applyFilters,
        clearFilters,
        setLoading,
        setData,
        fetchMyListings,
        setMyListings,
        fetchListings,
        fetchMyFavorites,
        setMyFavorites,
        addToFavorites,
        deleteFromFavorites,
        getUserData,
        setUserEmail,
        setCurrentListing,
        setCurrentPage
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
