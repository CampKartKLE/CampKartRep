import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, ShoppingBag, Bell, MessageCircle, User, LogOut, Heart, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Avatar from '../ui/Avatar';
import { cn } from '../../lib/utils';

const Header = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.search.value;
        if (query) {
            navigate(`/marketplace?search=${encodeURIComponent(query)}`);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                    <div className="bg-campus-blue text-white p-1.5 rounded-lg">
                        <ShoppingBag size={20} />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:inline-block">CampKart</span>
                </Link>

                {/* Search Bar - Hidden on mobile, visible on md+ */}
                <div className="hidden md:flex flex-1 max-w-md mx-4">
                    <form onSubmit={handleSearch} className="relative w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            name="search"
                            placeholder="Search for textbooks, cycles, gadgets..."
                            className="pl-9 bg-muted/50 border-transparent focus:bg-background focus:border-input transition-all rounded-full"
                        />
                    </form>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-4">
                    <Link to="/marketplace">
                        <Button variant="ghost">Marketplace</Button>
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link to="/sell">
                                <Button className="rounded-full">Sell Item</Button>
                            </Link>
                            <div className="flex items-center gap-2 border-l pl-4 ml-2">
                                <Link to="/chat">
                                    <Button variant="ghost" size="icon" className="relative">
                                        <MessageCircle size={20} />
                                        <span className="absolute top-2 right-2 h-2 w-2 bg-danger-red rounded-full animate-pulse" />
                                    </Button>
                                </Link>
                                <Button variant="ghost" size="icon">
                                    <Bell size={20} />
                                </Button>

                                <div className="relative ml-2">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2 focus:outline-none"
                                    >
                                        <Avatar src={user?.avatar} fallback={user?.name?.charAt(0)} />
                                    </button>

                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-card shadow-card-hover p-2 animate-in fade-in zoom-in-95 duration-200">
                                            <div className="px-2 py-1.5 text-sm font-semibold border-b mb-1">
                                                {user?.name}
                                                <p className="text-xs font-normal text-muted-foreground truncate">{user?.email}</p>
                                            </div>
                                            <Link to="/profile" onClick={() => setIsProfileOpen(false)}>
                                                <div className="flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-accent cursor-pointer">
                                                    <User size={16} /> Profile
                                                </div>
                                            </Link>
                                            <Link to="/profile?tab=saved" onClick={() => setIsProfileOpen(false)}>
                                                <div className="flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-accent cursor-pointer">
                                                    <Heart size={16} /> Saved Items
                                                </div>
                                            </Link>
                                            <Link to="/settings" onClick={() => setIsProfileOpen(false)}>
                                                <div className="flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-accent cursor-pointer">
                                                    <Settings size={16} /> Settings
                                                </div>
                                            </Link>
                                            <div className="border-t my-1" />
                                            <button
                                                onClick={() => { logout(); setIsProfileOpen(false); navigate('/'); }}
                                                className="w-full flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-accent text-danger-red cursor-pointer"
                                            >
                                                <LogOut size={16} /> Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="ghost">Log in</Button>
                            </Link>
                            <Link to="/signup">
                                <Button>Sign up</Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t p-4 space-y-4 bg-background animate-in slide-in-from-top-5">
                    <form onSubmit={(e) => { handleSearch(e); setIsMenuOpen(false); }}>
                        <Input name="search" placeholder="Search..." className="w-full" />
                    </form>
                    <nav className="flex flex-col gap-2">
                        <Link to="/marketplace" onClick={() => setIsMenuOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start">Browse Marketplace</Button>
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link to="/sell" onClick={() => setIsMenuOpen(false)}>
                                    <Button className="w-full justify-start">Sell an Item</Button>
                                </Link>
                                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="ghost" className="w-full justify-start">My Profile</Button>
                                </Link>
                                <Link to="/chat" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="ghost" className="w-full justify-start">Messages</Button>
                                </Link>
                                <Button variant="ghost" className="w-full justify-start text-danger-red" onClick={() => { logout(); setIsMenuOpen(false); navigate('/'); }}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="outline" className="w-full">Log in</Button>
                                </Link>
                                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                                    <Button className="w-full">Sign up</Button>
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
