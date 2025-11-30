import React from 'react';
import { cn } from '../../lib/utils';

const Avatar = ({ src, fallback, size = 'md', className }) => {
    const sizes = {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-16 w-16 text-xl',
        xl: 'h-24 w-24 text-3xl'
    };

    return (
        <div className={cn(
            "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-muted",
            sizes[size],
            className
        )}>
            {src ? (
                <img src={src} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
                <span className="font-medium text-muted-foreground">{fallback}</span>
            )}
        </div>
    );
};

export default Avatar;
