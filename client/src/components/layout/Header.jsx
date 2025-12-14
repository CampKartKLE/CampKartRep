import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, Bell, MessageCircle, User, LogOut, Heart, Settings, ChevronDown, PlusCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import SearchBar from '../ui/SearchBar';
import LoginOnboardingModal from '../auth/LoginOnboardingModal';
import { cn } from '../../lib/utils';

const Header = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
    const [authIntent, setAuthIntent] = useState('login'); // 'login' | 'signup'
    const navigate = useNavigate();

    // Close profile dropdown when clicking outside (simple implementation)
    // For a robust solution, a click-outside hook is better, but this suffices for now
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

    const handleLoginClick = () => {
        setAuthIntent('login');
        setIsOnboardingOpen(true);
    };

    const handleSignupClick = () => {
        setAuthIntent('signup');
        setIsOnboardingOpen(true);
    };

    return (
        <>
            <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-6">
                    {/* Logo & Brand */}
                    <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
                        <div className="bg-campus-blue text-white p-2 rounded-xl shadow-lg shadow-blue-900/10 group-hover:scale-105 transition-transform duration-200">
                            <ShoppingBag size={22} className="stroke-2" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-xl tracking-tight text-gray-900 leading-none">CampKart</span>
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-campus-blue">Marketplace</span>
                        </div>
                    </Link>

                    {/* Smart Search Bar - Desktop */}
                    <div className="hidden md:block flex-1 max-w-xl">
                        <SearchBar />
                    </div>

                    {/* Desktop Navigation & Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {isAuthenticated ? (
                            <>
                                {/* Action Icons */}
                                <div className="flex items-center gap-1 mr-2">
                                    <Link to="/profile?tab=saved">
                                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-campus-blue hover:bg-blue-50 rounded-full" title="Saved Items">
                                            <Heart size={22} />
                                        </Button>
                                    </Link>
                                    <Link to="/chat">
                                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-campus-blue hover:bg-blue-50 rounded-full relative" title="Messages">
                                            <MessageCircle size={22} />
                                            {/* Badge placeholder */}
                                            <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-danger-red border-2 border-white rounded-full"></span>
                                        </Button>
                                    </Link>
                                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-campus-blue hover:bg-blue-50 rounded-full" title="Notifications">
                                        <Bell size={22} />
                                    </Button>
                                </div>

                                <div className="h-8 w-px bg-gray-200 mx-1"></div>

                                {/* Sell Button */}
                                <Link to="/sell">
                                    <Button className="rounded-full gap-2 shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 transition-shadow">
                                        <PlusCircle size={18} />
                                        SELL
                                    </Button>
                                </Link>

                                {/* Profile Dropdown */}
                                <div className="relative ml-2">
                                    <button
                                        onClick={toggleProfile}
                                        className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full border border-gray-200 hover:border-campus-blue/50 hover:bg-blue-50/50 transition-all focus:outline-none"
                                    >
                                        <Avatar src={user?.avatarUrl} fallback={user?.name?.charAt(0)} className="h-8 w-8 border border-white shadow-sm" />
                                        <ChevronDown size={14} className={cn("text-gray-500 transition-transform duration-200", isProfileOpen && "rotate-180")} />
                                    </button>

                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-gray-100 bg-white shadow-xl p-2 animate-in fade-in zoom-in-95 duration-200 z-50">
                                            <div className="px-3 py-3 bg-gray-50 rounded-xl mb-1 flex items-center gap-3">
                                                <Avatar src={user?.avatarUrl} fallback={user?.name?.charAt(0)} className="h-10 w-10" />
                                                <div className="overflow-hidden">
                                                    <p className="font-semibold text-sm text-gray-900 truncate">{user?.name}</p>
                                                    <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="text-xs text-campus-blue hover:underline">
                                                        View Profile
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="space-y-0.5 mt-2">
                                                <Link to="/profile" onClick={() => setIsProfileOpen(false)}>
                                                    <div className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 cursor-pointer transition-colors">
                                                        <User size={16} /> My Account
                                                    </div>
                                                </Link>
                                                <Link to="/profile?tab=saved" onClick={() => setIsProfileOpen(false)}>
                                                    <div className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 cursor-pointer transition-colors">
                                                        <Heart size={16} /> Saved Items
                                                    </div>
                                                </Link>
                                                <Link to="/settings" onClick={() => setIsProfileOpen(false)}>
                                                    <div className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 cursor-pointer transition-colors">
                                                        <Settings size={16} /> Settings
                                                    </div>
                                                </Link>
                                            </div>

                                            <div className="border-t border-gray-100 my-1"></div>

                                            <button
                                                onClick={() => { logout(); setIsProfileOpen(false); navigate('/'); }}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-danger-red rounded-lg hover:bg-red-50 cursor-pointer transition-colors"
                                            >
                                                <LogOut size={16} /> Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" onClick={handleLoginClick} className="font-semibold text-gray-600 hover:text-campus-blue">
                                    Log in
                                </Button>
                                <Button onClick={handleSignupClick} className="rounded-full px-6 shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20">
                                    Sign up
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden p-2 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t p-4 space-y-4 bg-white animate-in slide-in-from-top-5 shadow-2xl">
                        <div className="mb-4">
                            <SearchBar />
                        </div>
                        <nav className="flex flex-col gap-2">
                            <Link to="/marketplace" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start text-lg">Browse Marketplace</Button>
                            </Link>

                            {isAuthenticated ? (
                                <>
                                    <Link to="/sell" onClick={() => setIsMenuOpen(false)}>
                                        <Button className="w-full justify-start gap-2 bg-campus-blue text-white">
                                            <PlusCircle size={18} /> Sell an Item
                                        </Button>
                                    </Link>
                                    <div className="border-t my-2 pt-2">
                                        <div className="flex items-center gap-3 px-2 mb-4">
                                            <Avatar src={user?.avatarUrl} fallback={user?.name?.charAt(0)} />
                                            <div>
                                                <p className="font-semibold">{user?.name}</p>
                                                <p className="text-xs text-gray-500">{user?.email}</p>
                                            </div>
                                        </div>
                                        <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                                            <Button variant="ghost" className="w-full justify-start">My Profile</Button>
                                        </Link>
                                        <Link to="/chat" onClick={() => setIsMenuOpen(false)}>
                                            <Button variant="ghost" className="w-full justify-start">Messages</Button>
                                        </Link>
                                        <Link to="/profile?tab=saved" onClick={() => setIsMenuOpen(false)}>
                                            <Button variant="ghost" className="w-full justify-start">Saved Items</Button>
                                        </Link>
                                        <Button variant="ghost" className="w-full justify-start text-danger-red mt-2" onClick={() => { logout(); setIsMenuOpen(false); navigate('/'); }}>
                                            <LogOut size={18} className="mr-2" /> Logout
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-3 mt-4">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-center py-6 text-lg"
                                        onClick={() => { setIsMenuOpen(false); handleLoginClick(); }}
                                    >
                                        Log in
                                    </Button>
                                    <Button
                                        className="w-full justify-center py-6 text-lg"
                                        onClick={() => { setIsMenuOpen(false); handleSignupClick(); }}
                                    >
                                        Sign up
                                    </Button>
                                </div>
                            )}
                        </nav>
                    </div>
                )}
            </header>

            {/* Login Onboarding Modal */}
            <LoginOnboardingModal
                isOpen={isOnboardingOpen}
                onClose={() => setIsOnboardingOpen(false)}
                intent={authIntent}
            />
        </>
    );
};

export default Header;

