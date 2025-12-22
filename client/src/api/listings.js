import axiosClient from './axiosClient';

export const getListings = async (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'All Categories') {
            if (key === 'search') params.append('q', value);
            else params.append(key, value);
        }
    });
    const { data } = await axiosClient.get(`/listings?${params.toString()}`);
    return data;
};

export const getListingById = async (id) => {
    const { data } = await axiosClient.get(`/listings/${id}`);
    return data;
};

// Supports both JSON and FormData
export const createListing = async (listingData) => {
    // Axios handles FormData Content-Type + boundary automatically
    const { data } = await axiosClient.post('/listings', listingData);
    return data;
};

export const createReport = async (reportData) => {
    const { data } = await axiosClient.post('/reports', reportData);
    return data;
};

export const deleteListing = async (id) => {
    const { data } = await axiosClient.delete(`/listings/${id}`);
    return data;
};


export const updateListing = async (id, listingData) => {
    // Allow axios to set Content-Type with boundary automatically for FormData
    const { data } = await axiosClient.put(`/listings/${id}`, listingData);
    return data;
};

export const toggleWishlist = async (id) => {
    const { data } = await axiosClient.post(`/users/wishlist/${id}`);
    return data;
};

export const getWishlist = async () => {
    const { data } = await axiosClient.get('/users/wishlist');
    return data;
};
