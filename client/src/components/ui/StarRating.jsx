import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

const StarRating = ({ rating, max = 5, size = 16, className }) => {
    return (
        <div className={cn("flex items-center gap-0.5", className)}>
            {[...Array(max)].map((_, i) => (
                <Star
                    key={i}
                    size={size}
                    className={cn(
                        "fill-current",
                        i < Math.floor(rating)
                            ? "text-campus-gold"
                            : "text-gray-300"
                    )}
                />
            ))}
            <span className="ml-1 text-sm font-medium text-muted-foreground">{rating}</span>
        </div>
    );
};

export default StarRating;
