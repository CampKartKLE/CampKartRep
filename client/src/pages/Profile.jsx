import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Package, Heart, Settings, Edit, Trash2, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../api/mockApi';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import ProductCard from '../components/marketplace/ProductCard';
import { useToast } from '../components/ui/ToastProvider';

const Profile = () => {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const [myListings, setMyListings] = useState([]);
    const [savedItems, setSavedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToast } = useToast();
    const activeTab = searchParams.get('tab') || 'listings';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const allProducts = await mockApi.getProducts();
            const userProducts = allProducts.filter(p => p.seller.email === user?.email);
            setMyListings(userProducts);

            // Mock saved items from localStorage
            const saved = JSON.parse(localStorage.getItem('saved_items') || '[]');
            setSavedItems(allProducts.filter(p => saved.includes(p.id)));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            setMyListings(myListings.filter(item => item.id !== id));
            addToast({ title: 'Deleted', description: 'Listing removed successfully' });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center mb-6">
                                <Avatar fallback={user?.name?.charAt(0)} size="xl" className="mb-4" />
                                <h2 className="text-xl font-bold">{user?.name}</h2>
                                <p className="text-sm text-muted-foreground mb-2">{user?.email}</p>
                                {user?.isVerified && (
                                    <Badge variant="success" className="flex items-center gap-1">
                                        <CheckCircle size={12} />
                                        Verified Student
                                    </Badge>
                                )}
                            </div>

                            <div className="space-y-1">
                                <Link to="/profile?tab=listings">
                                    <Button
                                        variant={activeTab === 'listings' ? 'default' : 'ghost'}
                                        className="w-full justify-start"
                                    >
                                        <Package size={16} className="mr-2" />
                                        My Listings
                                    </Button>
                                </Link>
                                <Link to="/profile?tab=saved">
                                    <Button
                                        variant={activeTab === 'saved' ? 'default' : 'ghost'}
                                        className="w-full justify-start"
                                    >
                                        <Heart size={16} className="mr-2" />
                                        Saved Items
                                    </Button>
                                </Link>
                                <Link to="/settings">
                                    <Button variant="ghost" className="w-full justify-start">
                                        <Settings size={16} className="mr-2" />
                                        Settings
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    {activeTab === 'listings' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">My Listings</h1>
                                <Link to="/sell">
                                    <Button>Post New Item</Button>
                                </Link>
                            </div>

                            {loading ? (
                                <div>Loading...</div>
                            ) : myListings.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {myListings.map((item) => (
                                        <div key={item.id} className="relative group">
                                            <ProductCard product={item} />
                                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                <Button size="icon" variant="secondary" className="h-8 w-8 shadow-lg">
                                                    <Edit size={14} />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    className="h-8 w-8 shadow-lg"
                                                    onClick={(e) => { e.preventDefault(); handleDelete(item.id); }}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Card className="bg-muted/30 border-dashed">
                                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                                        <Package size={48} className="text-muted-foreground mb-4" />
                                        <h3 className="font-semibold mb-2">No listings yet</h3>
                                        <p className="text-muted-foreground mb-4">Start selling your items on campus</p>
                                        <Link to="/sell">
                                            <Button>Post Your First Item</Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )}

                    {activeTab === 'saved' && (
                        <div>
                            <h1 className="text-2xl font-bold mb-6">Saved Items</h1>
                            {savedItems.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {savedItems.map((item) => (
                                        <ProductCard key={item.id} product={item} />
                                    ))}
                                </div>
                            ) : (
                                <Card className="bg-muted/30 border-dashed">
                                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                                        <Heart size={48} className="text-muted-foreground mb-4" />
                                        <h3 className="font-semibold mb-2">No saved items</h3>
                                        <p className="text-muted-foreground mb-4">Save items you're interested in</p>
                                        <Link to="/marketplace">
                                            <Button>Browse Marketplace</Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
