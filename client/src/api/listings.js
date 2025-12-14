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
    const { data } = await axiosClient.put(`/listings/${id}`, listingData);
    return data;
};
