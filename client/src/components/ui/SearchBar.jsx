import React, { useState, useRef, useEffect } from 'react';
import { Search, Clock, TrendingUp, Grid, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import Button from './Button';

const SearchBar = ({ className }) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const wrapperRef = useRef(null);
    const navigate = useNavigate();

    // Mock Data
    const recentSearches = ['Engineering Graphics', 'Scientific Calculator', 'Drafter'];
    const trendingItems = ['Cycle', 'Mattress', 'Table Fan', 'Lab Coat'];
    const categories = ['Books', 'Electronics', 'Furniture', 'Sports'];

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/marketplace?search=${encodeURIComponent(query)}`);
            setIsFocused(false);
        }
    };

    const handleSuggestionClick = (text) => {
        setQuery(text);
        navigate(`/marketplace?search=${encodeURIComponent(text)}`);
        setIsFocused(false);
    };

    return (
        <div ref={wrapperRef} className={cn("relative w-full max-w-2xl", className)}>
            <form onSubmit={handleSearch} className="relative z-20">
                <div className={cn(
                    "flex items-center w-full h-12 rounded-full border-2 transition-all duration-200 bg-white",
                    isFocused ? "border-campus-blue shadow-lg" : "border-gray-200 hover:border-gray-300"
                )}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        placeholder="Search for textbooks, cycles, laptops..."
                        className="flex-1 h-full px-6 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                    />

                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            className="p-2 mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                        >
                            <X size={18} />
                        </button>
                    )}

                    <button
                        type="submit"
                        className="mr-1.5 p-2.5 bg-campus-blue text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                        <Search size={20} />
                    </button>
                </div>
            </form>

            {/* Suggestions Dropdown */}
            {isFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-4 space-y-4">
                        {/* Recent Searches */}
                        <div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                <Clock size={12} /> Recent Searches
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {recentSearches.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(item)}
                                        className="px-3 py-1.5 text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors border border-gray-100"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Trending */}
                        <div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                <TrendingUp size={12} /> Trending in Campus
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {trendingItems.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(item)}
                                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-campus-blue rounded-lg transition-colors text-left"
                                    >
                                        <Search size={14} className="opacity-50" />
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                <Grid size={12} /> Collections
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(cat)}
                                        className="px-3 py-1.5 text-sm font-medium text-campus-blue bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
