import axiosClient from './axiosClient';

export const getListings = async (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'All Categories') params.append(key, value);
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
    const { data } = await axiosClient.post('/listings', listingData);
    return data;
};

export const createReport = async (reportData) => {
    const { data } = await axiosClient.post('/reports', reportData);
    return data;
};
