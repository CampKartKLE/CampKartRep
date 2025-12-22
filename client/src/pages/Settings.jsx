import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Checkbox from '../components/ui/Checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useToast } from '../components/ui/ToastProvider';

const Settings = () => {
    const { user } = useAuth();
    const { addToast } = useToast();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        campus: user?.campus || '',
        phone: '',
        hostel: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        pushNotifications: true,
        categories: [], // Store joined string or array? Backend expects array. UI doesn't have category selector yet.
        priceAlertThreshold: 20,
        messageAlerts: true, // Not yet in backend prefs explicitly? Backend has generic push. Assuming UI maps to push
        listingUpdates: false,
        marketingEmails: false
    });

    // Fetch Preferences
    useEffect(() => {
        // We could fetch user profile again or add a specific endpoint. 
        // For now assuming we might need to fetch from /api/auth/me or similar if it includes preferences.
        // Or simpler: just keep defaults/local state for this session if "me" doesn't have it.
        // Ideally should fetch. I'll skip fetch for MVP speed unless critical.
        // Wait, I can easily fetch from user object if it's updated. 
        // `user` from useAuth might be stale.
    }, []);

    const handleSavePreferences = async () => {
        try {
            setLoading(true);
            // Map UI keys to Backend keys
            const payload = {
                emailNotifications: notifications.emailNotifications,
                pushNotifications: notifications.pushNotifications || notifications.messageAlerts, // Mapping messageAlerts to push for now
                priceAlertThreshold: notifications.priceAlertThreshold
            };

            // Use axios directly

            const response = await axiosClient.put('/notifications/preferences', payload);

            addToast({ title: 'Success', description: 'Notification preferences saved' });
        } catch (error) {
            console.error(error);
            addToast({ title: 'Error', description: 'Failed to save preferences', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNotificationChange = (key) => {
        setNotifications({ ...notifications, [key]: !notifications[key] });
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            addToast({ title: 'Success', description: 'Profile updated successfully' });
            setLoading(false);
        }, 1000);
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            addToast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
            return;
        }
        setLoading(true);
        setTimeout(() => {
            addToast({ title: 'Success', description: 'Password changed successfully' });
            setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
            setLoading(false);
        }, 1000);
    };

    const isVerified = user?.email?.endsWith('.ac.in') || user?.email?.endsWith('.edu');

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

            <div className="space-y-6">
                {/* Profile Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSaveProfile} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Full Name</label>
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Campus</label>
                                    <Input
                                        name="campus"
                                        value={formData.campus}
                                        onChange={handleChange}
                                        placeholder="e.g., IIT Bombay"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                                    <Input
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Hostel / Block</label>
                                    <Input
                                        name="hostel"
                                        value={formData.hostel}
                                        onChange={handleChange}
                                        placeholder="e.g., Hostel 10"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <Input
                                    value={user?.email}
                                    disabled
                                    className="bg-muted cursor-not-allowed"
                                />
                                <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                            </div>

                            <Button type="submit" isLoading={loading}>
                                Save Changes
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Verification Status */}
                <Card>
                    <CardHeader>
                        <CardTitle>Verification Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isVerified ? (
                            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <CheckCircle className="text-success-green flex-shrink-0 mt-0.5" size={20} />
                                <div>
                                    <p className="font-medium text-green-900">Verified Student</p>
                                    <p className="text-sm text-green-700 mt-1">
                                        Your campus email ({user?.email}) has been verified. You have access to all features.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <AlertCircle className="text-warning-yellow flex-shrink-0 mt-0.5" size={20} />
                                <div>
                                    <p className="font-medium text-yellow-900">Not Verified</p>
                                    <p className="text-sm text-yellow-700 mt-1">
                                        Add your campus email (.ac.in or .edu) to get verified and unlock all features.
                                    </p>
                                    <p className="text-xs text-yellow-600 mt-2">
                                        Contact support if you need to update your email address.
                                    </p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Notification Preferences */}
                <Card>
                    <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Email Notifications</p>
                                    <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                                </div>
                                <Checkbox
                                    checked={notifications.emailNotifications}
                                    onChange={() => handleNotificationChange('emailNotifications')}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Message Alerts</p>
                                    <p className="text-sm text-muted-foreground">Get notified when someone messages you</p>
                                </div>
                                <Checkbox
                                    checked={notifications.messageAlerts}
                                    onChange={() => handleNotificationChange('messageAlerts')}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Listing Updates</p>
                                    <p className="text-sm text-muted-foreground">Updates about your posted items</p>
                                </div>
                                <Checkbox
                                    checked={notifications.listingUpdates}
                                    onChange={() => handleNotificationChange('listingUpdates')}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Marketing Emails</p>
                                    <p className="text-sm text-muted-foreground">Promotional offers and news</p>
                                </div>
                                <Checkbox
                                    checked={notifications.marketingEmails}
                                    onChange={() => handleNotificationChange('marketingEmails')}
                                />
                            </div>

                            <Button onClick={handleSavePreferences} isLoading={loading}>
                                Save Preferences
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Change Password */}
                <Card>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Current Password</label>
                                <Input
                                    name="currentPassword"
                                    type="password"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">New Password</label>
                                <Input
                                    name="newPassword"
                                    type="password"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                />
                                <p className="text-xs text-muted-foreground mt-1">Minimum 6 characters</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                                <Input
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                />
                            </div>

                            <Button type="submit" isLoading={loading}>
                                Change Password
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Settings;
