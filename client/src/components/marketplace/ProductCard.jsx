import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Heart, CheckCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import Badge from '../ui/Badge';
import StarRating from '../ui/StarRating';

const ProductCard = ({ product, onSave }) => {

    // SAFE ID (MongoDB uses _id)
    const productId = product._id || product.id;

    // Fallback Image
    const imageUrl =
        product?.images?.length > 0
            ? product.images[0]
            : "https://via.placeholder.com/300?text=No+Image";

    const handleImageError = (e) => {
        e.target.src = "https://via.placeholder.com/300?text=No+Image";
    };

    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        let interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + "d ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + "h ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + "m ago";
        return "Just now";
    };

    const conditionColors = {
        'New': 'success',
        'Like New': 'success',
        'Excellent': 'success',
        'Good': 'warning',
        'Fair': 'secondary',
    };

    return (
        <Card className="group overflow-hidden transition-all duration-300 hover:shadow-card-hover">
            <Link to={`/item/${productId}`}>
                {/* IMAGE */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                        src={imageUrl}
                        alt={product.title}
                        onError={handleImageError}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />

                    <div className="absolute top-2 right-2 flex gap-2">
                        <Badge variant={conditionColors[product.condition] || 'default'} className="shadow-sm">
                            {product.condition}
                        </Badge>
                    </div>

                    <button
                        onClick={(e) => { e.preventDefault(); onSave?.(productId); }}
                        className="absolute top-2 left-2 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    >
                        <Heart size={16} className="text-gray-700" />
                    </button>
                </div>

                {/* CONTENT */}
                <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold line-clamp-2 text-sm group-hover:text-campus-blue transition-colors">
                            {product.title}
                        </h3>
                    </div>

                    <div className="flex items-baseline gap-2 mb-3">
                        <span className="font-bold text-xl text-campus-blue">₹{product.price}</span>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                        <StarRating rating={product.rating || 4} size={14} />
                        <span className="text-xs text-muted-foreground">
                            ({product.views || 0} views)
                        </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <MapPin size={12} />
                        <span className="truncate">{product.location || "Not specified"}</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={12} />
                        <span>{timeAgo(product.createdAt || product.postedAt)}</span>
                    </div>

                    {/* SELLER */}
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                        <div className="h-6 w-6 rounded-full bg-campus-blue/10 flex items-center justify-center text-xs font-semibold text-campus-blue">
                            {product.sellerName?.charAt(0)}
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                            {product.sellerName}
                            {product.sellerVerified && (
                                <CheckCircle size={12} className="text-blue-500" />
                            )}
                        </span>
                    </div>
                </div>
            </Link>
        </Card>
    );
};

export default ProductCard;
