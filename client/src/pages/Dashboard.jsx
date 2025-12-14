import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Heart, TrendingUp, DollarSign, Plus, Eye, ShoppingBag, Clock, Star, IndianRupee } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getListings } from '../api/listings';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProductCard from '../components/marketplace/ProductCard';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        activeListings: 0,
        itemsSold: 0,
        savedItems: 0,
        totalEarnings: 0
    });
    const [myListings, setMyListings] = useState([]);
    const [recommendedItems, setRecommendedItems] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, [user]);

    const fetchDashboardData = async () => {
        try {
            const allProducts = await getListings();

            // Get user's listings
            const userListings = allProducts.filter(p => p.seller.email === user?.email);
            setMyListings(userListings.slice(0, 3));

            // Calculate stats
            const activeListings = userListings.length;
            const soldListings = 0; // Mock for now
            const savedItems = JSON.parse(localStorage.getItem('saved_items') || '[]').length;
            const totalEarnings = userListings.reduce((sum, item) => sum + item.price, 0);

            setStats({
                activeListings,
                itemsSold: soldListings,
                savedItems,
                totalEarnings
            });

            // Get recommended items (random items from same categories user has listed)
            const userCategories = [...new Set(userListings.map(l => l.category))];
            const recommended = allProducts
                .filter(p => p.seller.email !== user?.email && (!userCategories.length || userCategories.includes(p.category)))
                .slice(0, 4);
            setRecommendedItems(recommended);

            // Mock recent activity
            setRecentActivity([
                { type: 'view', text: 'Someone viewed your "Engineering Textbook"', time: '2h ago' },
                { type: 'message', text: 'New message from Priya about "Calculator"', time: '5h ago' },
                { type: 'listing', text: 'You posted "Study Lamp"', time: '1d ago' }
            ]);

        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const firstName = user?.name?.split(' ')[0] || 'Student';

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Welcome Panel */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Hi, {firstName} 👋</h1>
                <p className="text-muted-foreground">
                    {user?.campus || 'Your Campus'} • Here's what's happening on CampKart today
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <Package className="h-8 w-8 text-campus-blue" />
                                </div>
                                <div className="text-2xl font-bold">{stats.activeListings}</div>
                                <p className="text-xs text-muted-foreground">Active Listings</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <TrendingUp className="h-8 w-8 text-success-green" />
                                </div>
                                <div className="text-2xl font-bold">{stats.itemsSold}</div>
                                <p className="text-xs text-muted-foreground">Items Sold</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <Heart className="h-8 w-8 text-red-500" />
                                </div>
                                <div className="text-2xl font-bold">{stats.savedItems}</div>
                                <p className="text-xs text-muted-foreground">Saved Items</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <IndianRupee className="h-8 w-8 text-campus-gold" />
                                </div>
                                <div className="text-2xl font-bold">₹{stats.totalEarnings}</div>
                                <p className="text-xs text-muted-foreground">Total Value</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Link to="/sell">
                                    <Button className="w-full">
                                        <Plus size={18} className="mr-2" />
                                        Post New Item
                                    </Button>
                                </Link>
                                <Link to="/marketplace">
                                    <Button variant="outline" className="w-full">
                                        <ShoppingBag size={18} className="mr-2" />
                                        View Marketplace
                                    </Button>
                                </Link>
                                <Link to="/profile">
                                    <Button variant="outline" className="w-full">
                                        <Eye size={18} className="mr-2" />
                                        My Profile
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivity.map((activity, idx) => (
                                    <div key={idx} className="flex items-start gap-3 pb-3 border-b last:border-0">
                                        <div className="p-2 bg-muted rounded-lg">
                                            <Clock size={16} className="text-muted-foreground" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm">{activity.text}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recommended Items */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Recommended for You</h2>
                            <Link to="/marketplace">
                                <Button variant="ghost" size="sm">View All</Button>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {recommendedItems.map((item) => (
                                <ProductCard key={item.id} product={item} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Profile Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Account</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center text-center mb-4">
                                <Avatar fallback={user?.name?.charAt(0)} size="xl" className="mb-3" />
                                <h3 className="font-semibold">{user?.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{user?.email}</p>
                                {user?.isVerified && (
                                    <Badge variant="success" className="mb-3">Verified Student</Badge>
                                )}
                                <p className="text-xs text-muted-foreground">{user?.campus || 'Campus not set'}</p>
                            </div>
                            <Link to="/profile">
                                <Button variant="outline" className="w-full">Manage Account</Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* My Recent Listings */}
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>My Listings</CardTitle>
                                <Link to="/profile">
                                    <Button variant="ghost" size="sm">View All</Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {myListings.length > 0 ? (
                                <div className="space-y-3">
                                    {myListings.map((item) => (
                                        <Link key={item.id} to={`/item/${item.id}`}>
                                            <div className="flex gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                                                <img
                                                    src={item.images[0]}
                                                    alt={item.title}
                                                    className="w-16 h-16 object-cover rounded-md"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-sm truncate">{item.title}</p>
                                                    <p className="text-sm text-campus-blue font-semibold">₹{item.price}</p>
                                                    <p className="text-xs text-muted-foreground">{item.views} views</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <Package size={32} className="mx-auto text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground mb-3">No listings yet</p>
                                    <Link to="/sell">
                                        <Button size="sm">Post Your First Item</Button>
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
