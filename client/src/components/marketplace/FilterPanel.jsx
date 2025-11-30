import React, { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Checkbox from '../ui/Checkbox';
import { categories } from '../../data/products';

const FilterPanel = ({ filters, onFilterChange, onClear, isMobile, onClose }) => {
    const [priceRange, setPriceRange] = useState({
        min: filters.minPrice || '',
        max: filters.maxPrice || ''
    });

    const conditions = ['New', 'Like New', 'Excellent', 'Good', 'Fair'];

    const handlePriceApply = () => {
        onFilterChange({ minPrice: priceRange.min, maxPrice: priceRange.max });
    };

    return (
        <div className={`bg-card rounded-xl border p-4 ${isMobile ? 'h-full' : 'sticky top-20'}`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal size={18} />
                    <h3 className="font-semibold">Filters</h3>
                </div>
                {isMobile && (
                    <button onClick={onClose}>
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Category */}
            <div className="mb-6">
                <h4 className="font-medium mb-3 text-sm">Category</h4>
                <div className="space-y-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => onFilterChange({ category: cat === 'All Categories' ? '' : cat })}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${(filters.category === cat || (!filters.category && cat === 'All Categories'))
                                    ? 'bg-campus-blue text-white'
                                    : 'hover:bg-muted'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
                <h4 className="font-medium mb-3 text-sm">Price Range</h4>
                <div className="flex gap-2 mb-2">
                    <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                        className="h-9"
                    />
                    <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                        className="h-9"
                    />
                </div>
                <Button size="sm" variant="outline" className="w-full" onClick={handlePriceApply}>
                    Apply
                </Button>
            </div>

            {/* Condition */}
            <div className="mb-6">
                <h4 className="font-medium mb-3 text-sm">Condition</h4>
                <div className="space-y-2">
                    {conditions.map((cond) => (
                        <div key={cond} className="flex items-center gap-2">
                            <Checkbox
                                id={`cond-${cond}`}
                                checked={filters.condition === cond}
                                onChange={() => onFilterChange({ condition: filters.condition === cond ? '' : cond })}
                            />
                            <label htmlFor={`cond-${cond}`} className="text-sm cursor-pointer">
                                {cond}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Verified Sellers */}
            <div className="mb-6">
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="verified"
                        checked={filters.verifiedOnly}
                        onChange={() => onFilterChange({ verifiedOnly: !filters.verifiedOnly })}
                    />
                    <label htmlFor="verified" className="text-sm cursor-pointer">
                        Verified sellers only
                    </label>
                </div>
            </div>

            {/* Clear Filters */}
            <Button variant="outline" className="w-full" onClick={onClear}>
                Clear All Filters
            </Button>
        </div>
    );
};

export default FilterPanel;
