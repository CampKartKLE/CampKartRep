import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Heart, Share2, Flag, MessageCircle, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { getListingById } from '../api/listings'; // Use real API
import { startConversation, sendMessage } from '../api/messages'; // Use real API
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import StarRating from '../components/ui/StarRating';
import Avatar from '../components/ui/Avatar';
import Modal from '../components/ui/Modal';
import ProductCard from '../components/marketplace/ProductCard';
import { useToast } from '../components/ui/ToastProvider';

const ItemDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const { addToast } = useToast();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [messageText, setMessageText] = useState('');

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const data = await getListingById(id);
            setProduct(data);

            // Should fetch similar products from real API if available, 
            // for now leaving empty or mock if getListings supports filtering by category
            setSimilarProducts([]);
        } catch (error) {
            console.error("Failed to fetch product", error);
            addToast({ title: 'Error', description: 'Product not found', variant: 'destructive' });
            navigate('/marketplace');
        } finally {
            setLoading(false);
        }
    };

    const handleContactSeller = async () => {
        if (!isAuthenticated) {
            navigate(`/login?redirect=/item/${id}`);
            return;
        }

        // If user is the seller, don't allow messaging
        if (product.seller._id === user?._id) {
            addToast({ title: 'Info', description: 'You cannot message yourself', variant: 'default' });
            return;
        }

        setIsMessageOpen(true);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
            // 1. Start/Get conversation
            // Robustly get seller ID
            const sellerId = typeof product.seller === 'object' ? (product.seller._id || product.seller.id) : product.seller;

            if (!sellerId) {
                console.error("Seller ID missing from product object");
                addToast({ title: 'Error', description: 'Cannot message: Seller info missing', variant: 'destructive' });
                return;
            }

            const conversation = await startConversation(sellerId);

            // 2. Send message
            await sendMessage(conversation._id, messageText);

            addToast({ title: 'Message Sent', description: 'The seller will receive your message.' });
            setIsMessageOpen(false);
            setMessageText('');

            // Optional: Redirect to chat
            // navigate('/chat'); 
        } catch (error) {
            console.error("Message failed", error);
            addToast({ title: 'Error', description: 'Failed to send message', variant: 'destructive' });
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        addToast({ title: 'Link Copied', description: 'Product link copied to clipboard' });
    };

    if (loading) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    }

    if (!product) return null;

    const conditionColors = {
        'New': 'success',
        'Like New': 'success',
        'Excellent': 'success',
        'Good': 'warning',
        'Fair': 'secondary',
    };

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Link to="/marketplace" className="hover:text-foreground">Marketplace</Link>
                <span>/</span>
                <Link to={`/marketplace?category=${encodeURIComponent(product.category)}`} className="hover:text-foreground">{product.category}</Link>
                <span>/</span>
                <span className="text-foreground">{product.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Images */}
                <div className="lg:col-span-2">
                    <div className="sticky top-20">
                        {/* Main Image */}
                        <div className="relative aspect-square bg-muted rounded-xl overflow-hidden mb-4">
                            <img
                                src={product.images && product.images[currentImageIndex] ? product.images[currentImageIndex] : 'https://placehold.co/600x400?text=No+Image'}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                            {product.images && product.images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setCurrentImageIndex((currentImageIndex - 1 + product.images.length) % product.images.length)}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        onClick={() => setCurrentImageIndex((currentImageIndex + 1) % product.images.length)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {product.images && product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${idx === currentImageIndex ? 'border-campus-blue' : 'border-transparent'
                                            }`}
                                    >
                                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Details */}
                <div className="space-y-6">
                    {/* Title & Price */}
                    <div>
                        <div className="flex items-start justify-between mb-2">
                            <h1 className="text-3xl font-bold flex-1">{product.title}</h1>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" onClick={handleShare}>
                                    <Share2 size={20} />
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <Heart size={20} />
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-3xl font-bold text-campus-blue">₹{product.price}</span>
                            <Badge variant={conditionColors[product.condition] || 'secondary'}>{product.condition}</Badge>
                        </div>
                        {/* Rating removed if not in schema, or keep if virtual */}
                        {/* <StarRating rating={product.rating} size={18} /> */}
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pb-6 border-b">
                        <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{product.location || 'Campus'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span>Posted {new Date(product.createdAt).toLocaleDateString()}</span>
                        </div>
                        {/* <span>{product.views} views</span> */}
                    </div>

                    {/* Seller Card */}
                    <div className="bg-muted/50 rounded-xl p-4">
                        <h3 className="font-semibold mb-3">Seller Information</h3>
                        <div className="flex items-center gap-3 mb-4">
                            {/* Check if seller is populated, otherwise handle gracefully */}
                            <Avatar fallback={product.seller?.name?.[0] || '?'} size="lg" />
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{product.seller?.name || 'Unknown Seller'}</span>
                                    {product.seller?.isVerifiedStudent && (
                                        <CheckCircle size={16} className="text-blue-500" />
                                    )}
                                </div>
                                {/* <p className="text-sm text-muted-foreground">Member since 2023</p> */}
                            </div>
                        </div>
                        <Button className="w-full" onClick={handleContactSeller}>
                            <MessageCircle size={18} className="mr-2" />
                            Contact Seller
                        </Button>
                    </div>

                    {/* Description */}
                    <div className="pb-6 border-b">
                        <h3 className="font-semibold mb-2">Description</h3>
                        <p className="text-muted-foreground whitespace-pre-line">{product.description}</p>
                    </div>

                    {/* Report */}
                    <button
                        onClick={() => setIsReportOpen(true)}
                        className="text-sm text-muted-foreground hover:text-danger-red flex items-center gap-1"
                    >
                        <Flag size={14} />
                        Report this listing
                    </button>
                </div>
            </div>

            {/* Similar Items - Skipped for now to focus on messaging */}

            {/* Message Modal */}
            <Modal isOpen={isMessageOpen} onClose={() => setIsMessageOpen(false)} title="Message Seller">
                <form onSubmit={handleSendMessage} className="space-y-4">
                    <textarea
                        className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Hi, is this still available?"
                        required
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="ghost" onClick={() => setIsMessageOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Send Message</Button>
                    </div>
                </form>
            </Modal>

            {/* Report Modal */}
            <Modal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} title="Report Listing">
                <form onSubmit={(e) => { e.preventDefault(); addToast({ title: 'Report Submitted' }); setIsReportOpen(false); }} className="space-y-4">
                    <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                        <option value="">Select a reason</option>
                        <option>Spam or misleading</option>
                        <option>Prohibited item</option>
                        <option>Scam or fraud</option>
                        <option>Other</option>
                    </select>
                    <textarea
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Additional details..."
                        required
                    />
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="ghost" onClick={() => setIsReportOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="destructive">Submit Report</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ItemDetail;
