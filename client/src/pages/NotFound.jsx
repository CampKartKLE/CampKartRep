import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="mb-8">
                <h1 className="text-9xl font-bold text-campus-blue mb-4">404</h1>
                <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
                <p className="text-muted-foreground max-w-md mb-8">
                    Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link to="/">
                        <Button size="lg">Go Home</Button>
                    </Link>
                    <Link to="/marketplace">
                        <Button size="lg" variant="outline">Browse Marketplace</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
