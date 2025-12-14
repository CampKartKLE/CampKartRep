import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';

const ItemCard = ({ item }) => {

    // ---------- FIX 1: Get safe image ----------
    const getImage = () => {
        // If exists and length > 0:
        if (item.images && item.images.length > 0 && item.images[0]) {
            return item.images[0];
        }
        // Fallback placeholder:
        return "https://placehold.co/600x600?text=No+Image";
    };

    // ---------- FIX 2: If MongoDB ID use _id ----------
    const itemId = item._id || item.id;

    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    const conditionColors = {
        New: "success",
        "Like New": "success",
        Excellent: "success",
        Good: "warning",
        Fair: "secondary",
    };

    return (
        <Link to={`/item/${itemId}`}>
            <Card className="h-full overflow-hidden hover:shadow-md transition-shadow group">

                {/* ---------- FIX 3: Safe image loader ---------- */}
                <div className="aspect-square overflow-hidden bg-muted relative">
                    <img
                        src={getImage()}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        onError={(e) => {
                            e.target.src = "https://placehold.co/600x600?text=Image+Not+Found";
                        }}
                    />

                    <div className="absolute top-2 right-2">
                        <Badge variant={conditionColors[item.condition] || "default"}>
                            {item.condition}
                        </Badge>
                    </div>
                </div>

                <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold line-clamp-1 group-hover:text-campus-blue transition-colors">
                            {item.title}
                        </h3>
                        <span className="font-bold text-lg">₹{item.price}</span>
                    </div>

                    <p className="text-xs text-muted-foreground mb-2">{item.category}</p>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{item.location}</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{timeAgo(item.createdAt)}</span>
                    </div>
                </CardContent>

                <CardFooter className="p-4 pt-0 flex items-center justify-between text-xs text-muted-foreground border-t mt-auto">
                    <div className="flex items-center gap-1 mt-3">
                        <span>{item.sellerName}</span>
                        {item.sellerVerified && <CheckCircle className="h-3 w-3 text-blue-500" />}
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default ItemCard;
