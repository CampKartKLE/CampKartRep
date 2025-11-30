import React from 'react';
import Select from '../ui/Select';

const SortOptions = ({ value, onChange }) => {
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-[180px]"
            >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="popular">Most Popular</option>
            </Select>
        </div>
    );
};

export default SortOptions;
