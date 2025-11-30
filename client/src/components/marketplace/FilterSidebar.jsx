import React, { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';

const FilterSidebar = ({
    filters,
    setFilters,
    categories,
    onClear
}) => {
    const [priceRange, setPriceRange] = useState({ min: filters.minPrice || '', max: filters.maxPrice || '' });

    const handlePriceChange = () => {
        setFilters(prev => ({ ...prev, minPrice: priceRange.min, maxPrice: priceRange.max }));
    };

    const handleConditionChange = (condition) => {
        const current = filters.condition ? filters.condition.split(',') : [];
        const updated = current.includes(condition)
            ? current.filter(c => c !== condition)
            : [...current, condition];
        setFilters(prev => ({ ...prev, condition: updated.join(',') }));
    };

    return (
        <div className="space-y-6">
            <CategoryFilter
                categories={categories}
                selectedCategory={filters.category}
                onSelectCategory={(cat) => setFilters(prev => ({ ...prev, category: cat === 'All Items' ? '' : cat }))}
            />

            <div className="px-2">
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="flex items-center gap-2 mb-2">
                    <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                        className="h-8"
                    />
                    <span>-</span>
                    <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                        className="h-8"
                    />
                </div>
                <Button size="sm" variant="outline" className="w-full" onClick={handlePriceChange}>Apply Price</Button>
            </div>

            <div className="px-2">
                <h3 className="font-semibold mb-3">Condition</h3>
                <div className="space-y-2">
                    {['New', 'Like New', 'Excellent', 'Good', 'Fair'].map((cond) => (
                        <div key={cond} className="flex items-center gap-2">
                            <Checkbox
                                id={`cond-${cond}`}
                                checked={filters.condition?.includes(cond)}
                                onChange={() => handleConditionChange(cond)}
                            />
                            <label htmlFor={`cond-${cond}`} className="text-sm cursor-pointer">{cond}</label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-2">
                <h3 className="font-semibold mb-3">Location</h3>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="loc-campus"
                            checked={filters.location === 'Campus'}
                            onChange={() => setFilters(prev => ({ ...prev, location: prev.location === 'Campus' ? '' : 'Campus' }))}
                        />
                        <label htmlFor="loc-campus" className="text-sm cursor-pointer">On Campus</label>
                    </div>
                </div>
            </div>

            <div className="px-2">
                <Button variant="ghost" className="w-full text-destructive hover:text-destructive" onClick={onClear}>
                    Clear All Filters
                </Button>
            </div>
        </div>
    );
};

export default FilterSidebar;
