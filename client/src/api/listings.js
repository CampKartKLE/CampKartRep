const API_URL = 'http://localhost:5000/api';

export const getListings = async (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
    });

    const response = await fetch(`${API_URL}/listings?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch listings');
    return response.json();
};

export const getListingById = async (id) => {
    const response = await fetch(`${API_URL}/listings/${id}`);
    if (!response.ok) throw new Error('Failed to fetch listing');
    return response.json();
};

export const createListing = async (listingData, token) => {
    const response = await fetch(`${API_URL}/listings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(listingData),
    });
    if (!response.ok) throw new Error('Failed to create listing');
    return response.json();
};

export const createReport = async (reportData, token) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_URL}/reports`, {
        method: 'POST',
        headers,
        body: JSON.stringify(reportData),
    });
    if (!response.ok) throw new Error('Failed to create report');
    return response.json();
};
