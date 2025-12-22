import axiosClient from './axiosClient';

export const getNotifications = async () => {
    const { data } = await axiosClient.get('/notifications');
    return data;
};

export const markAsRead = async (id) => {
    const { data } = await axiosClient.put(`/notifications/read/${id}`);
    return data;
};

export const markAllAsRead = async () => {
    const { data } = await axiosClient.put('/notifications/read-all');
    return data;
};

// Admin/Dev testing
export const sendTestNotification = async () => {
    const { data } = await axiosClient.post('/notifications/test', {
        type: 'system',
        title: 'System Test',
        message: 'This is a test notification from the client.'
    });
    return data;
};
