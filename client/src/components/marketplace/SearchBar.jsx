import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const SearchBar = ({ className }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/marketplace?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className={`relative flex w-full max-w-2xl items-center ${className}`}>
            <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search for textbooks, electronics, furniture..."
                    className="pl-10 h-12 rounded-full shadow-sm border-campus-blue/20 focus-visible:ring-campus-blue"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <Button type="submit" className="absolute right-1.5 top-1.5 rounded-full px-6">
                Search
            </Button>
        </form>
    );
};

export default SearchBar;
