import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, TrendingUp, Shield, Users, ArrowRight, BookOpen, Laptop, Bike, Shirt, Leaf, DollarSign, Package, IndianRupee } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';

const Home = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [searchQuery, setSearchQuery] = React.useState('');

    // Redirect authenticated users to dashboard
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/marketplace?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const categories = [
        { name: 'Textbooks', icon: BookOpen, count: '120+', color: 'bg-blue-100 text-blue-600' },
        { name: 'Electronics & Gadgets', icon: Laptop, count: '85+', color: 'bg-purple-100 text-purple-600' },
        { name: 'Cycles', icon: Bike, count: '45+', color: 'bg-green-100 text-green-600' },
        { name: 'Clothes / Hoodies', icon: Shirt, count: '60+', color: 'bg-pink-100 text-pink-600' }
    ];

    const features = [
        {
            icon: Shield,
            title: 'Safe & Secure',
            description: 'Verified student sellers and campus-only transactions ensure your safety'
        },
        {
            icon: Users,
            title: 'Campus Community',
            description: 'Buy and sell within your trusted college network of fellow students'
        },
        {
            icon: IndianRupee,
            title: 'Best Prices',
            description: 'Student-friendly pricing on all items - save money on essentials'
        },
        {
            icon: Leaf,
            title: 'Eco-Friendly',
            description: 'Reuse and reduce waste - contribute to a sustainable campus'
        }
    ];

    const stats = [
        { value: '1,200+', label: 'Items Reused', icon: Package },
        { value: '₹5.4L', label: 'Money Saved', icon: IndianRupee },
        { value: '850kg', label: 'CO₂ Reduced', icon: Leaf },
        { value: '500+', label: 'Active Traders', icon: Users }
    ];

    // Don't render anything while checking auth (prevents flash)
    if (isAuthenticated) {
        return null;
    }

    return (
        <div>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                <div className="container mx-auto px-4 py-20 md:py-32 relative">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Your Campus Marketplace
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-blue-100">
                            Buy, sell, and discover amazing deals from fellow students
                        </p>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for textbooks, cycles, electronics..."
                                    className="pl-12 h-14 text-lg bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-full"
                                />
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
                                >
                                    Search
                                </Button>
                            </div>
                        </form>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/marketplace">
                                <Button size="lg" variant="secondary" className="rounded-full">
                                    Browse Marketplace
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button size="lg" variant="outline" className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                                    Create Free Account
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof Stats */}
            <section className="py-12 bg-white border-b">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="inline-flex p-3 bg-campus-blue/10 rounded-2xl mb-3">
                                    <stat.icon size={28} className="text-campus-blue" />
                                </div>
                                <div className="text-3xl font-bold text-campus-blue mb-1">{stat.value}</div>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
                        <p className="text-muted-foreground">Find what you need from these top categories</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((cat) => (
                            <Link key={cat.name} to={`/marketplace?category=${encodeURIComponent(cat.name)}`}>
                                <Card className="group hover:shadow-card-hover transition-all cursor-pointer">
                                    <CardContent className="p-6 text-center">
                                        <div className={`inline-flex p-4 rounded-2xl ${cat.color} mb-4 group-hover:scale-110 transition-transform`}>
                                            <cat.icon size={32} />
                                        </div>
                                        <h3 className="font-semibold mb-2">{cat.name}</h3>
                                        <p className="text-sm text-muted-foreground">{cat.count} items</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why CampKart */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Why CampKart?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            The trusted marketplace built specifically for college students
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature) => (
                            <div key={feature.title} className="text-center">
                                <div className="inline-flex p-4 bg-campus-blue/10 rounded-2xl mb-4">
                                    <feature.icon size={32} className="text-campus-blue" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                        <p className="text-muted-foreground">Start buying and selling in three simple steps</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="bg-campus-blue text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                1
                            </div>
                            <h3 className="font-semibold mb-2 text-lg">Sign Up</h3>
                            <p className="text-sm text-muted-foreground">Create your account with your campus email and get verified instantly</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-campus-blue text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                2
                            </div>
                            <h3 className="font-semibold mb-2 text-lg">Browse or List</h3>
                            <p className="text-sm text-muted-foreground">Find items you need or list items to sell with just a few clicks</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-campus-blue text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                3
                            </div>
                            <h3 className="font-semibold mb-2 text-lg">Connect & Trade</h3>
                            <p className="text-sm text-muted-foreground">Chat with sellers and complete transactions safely on campus</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-gradient-to-r from-campus-blue to-blue-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
                    <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                        Join thousands of students buying and selling on campus. Create your free account today and start saving money!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/signup">
                            <Button size="lg" variant="secondary" className="rounded-full px-8">
                                Create Free Account
                                <ArrowRight size={20} className="ml-2" />
                            </Button>
                        </Link>
                        <Link to="/marketplace">
                            <Button size="lg" variant="outline" className="rounded-full px-8 bg-white/10 border-white/20 text-white hover:bg-white/20">
                                Browse Items
                            </Button>
                        </Link>
                    </div>
                    <p className="text-sm text-blue-100 mt-6">No credit card required • Free forever</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
