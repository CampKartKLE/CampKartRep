import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Heart, CheckCircle, Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';
import Badge from '../ui/Badge';
import StarRating from '../ui/StarRating';

const ProductCard = ({ product, onSave, onDelete, isFavorite, onToggleFavorite }) => {

    // SAFE ID (MongoDB uses _id)
    const productId = product._id;

    // Fallback Image - Use a local asset or a UI block, avoiding external placeholders if possible, or just render nothing/icon
    // For now, I'll use a clean UI block if no images.
    const hasImage = product?.images?.length > 0;
    const imageUrl = hasImage ? product.images[0] : null;

    const handleImageError = (e) => {
        // e.target.style.display = 'none'; // Hide broken images
        // Or swap to a local placeholder
        e.target.src = "/placeholder-no-image.png"; // Assuming we might have one, or better:
        // logic handled in render
    };

    const timeAgo = (date) => {
        if (!date) return "";
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
        <Card className="group overflow-hidden transition-all duration-300 hover:shadow-card-hover relative">
            <Link to={`/item/${productId}`}>
                {/* IMAGE */}
                <div className="relative aspect-square overflow-hidden bg-muted flex items-center justify-center">
                    {hasImage ? (
                        <img
                            src={imageUrl}
                            alt={product.title}
                            onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.classList.add('bg-gray-200'); }}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                        />
                    ) : (
                        <span className="text-muted-foreground text-xs">No Image</span>
                    )}

                    <div className="absolute top-2 right-2 flex gap-2">
                        {product.condition && (
                            <Badge variant={conditionColors[product.condition] || 'default'} className="shadow-sm">
                                {product.condition}
                            </Badge>
                        )}
                    </div>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            if (onToggleFavorite) onToggleFavorite(productId);
                            else if (onSave) onSave(productId);
                        }}
                        className={`absolute top-2 left-2 p-2 rounded-full transition-all hover:scale-110 ${isFavorite
                            ? 'bg-red-500 text-white opacity-100'
                            : 'bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-white text-gray-700'
                            }`}
                    >
                        <Heart size={16} className={isFavorite ? "fill-current" : ""} />
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

                    {/* Only show rating and views if they actually exist */}
                    <div className="flex items-center gap-1 mb-2">
                        {typeof product.rating === 'number' && (
                            <StarRating rating={product.rating} size={14} />
                        )}
                        {typeof product.views === 'number' && (
                            <span className="text-xs text-muted-foreground">
                                ({product.views} views)
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <MapPin size={12} />
                        <span className="truncate">{product.location || "Online"}</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={12} />
                        <span>{timeAgo(product.createdAt)}</span>
                    </div>

                    {/* SELLER - Use conditional rendering */}
                    {product.seller && (
                        <div className="flex items-center justify-between mt-3 pt-3 border-t">
                            <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-campus-blue/10 flex items-center justify-center text-xs font-semibold text-campus-blue">
                                    {product.seller.name ? product.seller.name.charAt(0).toUpperCase() : "?"}
                                </div>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    {product.seller.name}
                                    {product.seller.isVerifiedStudent && (
                                        <CheckCircle size={12} className="text-blue-500" />
                                    )}
                                </span>
                            </div>


                            {product.isOwner && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onDelete(productId);
                                    }}
                                    className="text-red-500 hover:text-red-700 text-xs font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors flex items-center gap-1"
                                >
                                    <Trash2 size={12} />
                                    Delete
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </Link>
        </Card>
    );
};

export default ProductCard;
