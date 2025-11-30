import React from 'react';
import { cn } from '../../lib/utils';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="space-y-1">
            <h3 className="font-semibold mb-3 px-2">Categories</h3>
            <button
                onClick={() => onSelectCategory('All Items')}
                className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                    selectedCategory === 'All Items' || !selectedCategory
                        ? "bg-campus-blue/10 text-campus-blue font-medium"
                        : "hover:bg-muted text-muted-foreground"
                )}
            >
                All Items
            </button>
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onSelectCategory(cat)}
                    className={cn(
                        "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                        selectedCategory === cat
                            ? "bg-campus-blue/10 text-campus-blue font-medium"
                            : "hover:bg-muted text-muted-foreground"
                    )}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
