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
    // axios automatically sets Content-Type to multipart/form-data when body is FormData
    // BUT our axiosClient defaults to application/json, so we must override it.
    const { data } = await axiosClient.post('/listings', listingData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
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
    // Force multipart if it's FormData, though typically axios handles it if data is FormData.
    // However, our axiosClient might have defaults. Best to be explicit if we know we are sending files.
    const isFormData = listingData instanceof FormData;
    const config = isFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {};

    const { data } = await axiosClient.put(`/listings/${id}`, listingData, config);
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
