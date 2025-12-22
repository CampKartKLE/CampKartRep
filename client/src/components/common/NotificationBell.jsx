import React, { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import { useSocket } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthContext';
import { getNotifications, markAsRead, markAllAsRead } from '../../api/notifications';
import { useToast } from '../ui/ToastProvider';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const NotificationBell = () => {
    const { isAuthenticated } = useAuth();
    const socket = useSocket();
    const { addToast } = useToast();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Initial Fetch
    useEffect(() => {
        if (isAuthenticated) {
            fetchNotifications();
        }
    }, [isAuthenticated]);

    // Socket Listener
    useEffect(() => {
        if (socket) {
            socket.on('notification', (newNotif) => {
                setNotifications(prev => [newNotif, ...prev]);
                setUnreadCount(prev => prev + 1);
                addToast({ title: newNotif.title, description: newNotif.message });
            });
        }
        return () => {
            if (socket) socket.off('notification');
        };
    }, [socket]);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchNotifications = async () => {
        try {
            const data = await getNotifications();
            setNotifications(data.notifications);
            setUnreadCount(data.unreadCount);
        } catch (error) {
            console.error("Failed to fetch notifications");
        }
    };

    const handleRead = async (id, isRead, link) => {
        if (!isRead) {
            try {
                await markAsRead(id);
                setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
                setUnreadCount(prev => Math.max(0, prev - 1));
            } catch (error) {
                console.error("Failed to mark as read");
            }
        }
    };

    const handleMarkAllRead = async () => {
        try {
            await markAllAsRead();
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error("Failed to mark all read");
        }
    };

    if (!isAuthenticated) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full hover:bg-muted transition-colors"
            >
                <Bell size={20} className="text-foreground" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center border-2 border-background">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-background border rounded-lg shadow-lg z-50 max-h-[500px] flex flex-col">
                    <div className="p-3 border-b flex justify-between items-center">
                        <h3 className="font-semibold text-sm">Notifications</h3>
                        {unreadCount > 0 && (
                            <button onClick={handleMarkAllRead} className="text-xs text-campus-blue hover:underline">
                                Mark all read
                            </button>
                        )}
                    </div>

                    <div className="overflow-y-auto flex-1 p-0">
                        {notifications.length > 0 ? (
                            <div className="divide-y">
                                {notifications.map((notif) => (
                                    <div
                                        key={notif._id}
                                        onClick={() => handleRead(notif._id, notif.read)}
                                        className={`p-3 hover:bg-muted/50 transition-colors cursor-pointer ${!notif.read ? 'bg-blue-50/50' : ''}`}
                                    >
                                        <div className="flex gap-3">
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium leading-none">{notif.title}</p>
                                                <p className="text-xs text-muted-foreground line-clamp-2">{notif.message}</p>
                                                <p className="text-[10px] text-muted-foreground mt-1">
                                                    {new Date(notif.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            {!notif.read && (
                                                <div className="h-2 w-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-muted-foreground text-sm">
                                No notifications
                            </div>
                        )}
                    </div>

                    <div className="p-2 border-t text-center bg-muted/20">
                        <Link to="/settings" onClick={() => setIsOpen(false)} className="text-xs text-muted-foreground hover:text-foreground">
                            Notification Settings
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
