import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid, List } from 'lucide-react';
import { getListings, deleteListing, toggleWishlist } from '../api/listings';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/marketplace/ProductCard';
import FilterPanel from '../components/marketplace/FilterPanel';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import { useToast } from '../components/ui/ToastProvider';

const Marketplace = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const { addToast } = useToast();
    const { user, refreshUser } = useAuth();

    const [filters, setFilters] = useState({
        search: searchParams.get('search') || '',
        category: searchParams.get('category') || '',
        minPrice: '',
        maxPrice: '',
        condition: '',
        verifiedOnly: false,
        sort: 'newest'
    });

    useEffect(() => {
        fetchProducts();
    }, [
        filters.search,
        filters.category,
        filters.minPrice,
        filters.maxPrice,
        filters.condition,
        filters.sort
    ]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await getListings(filters);
            setProducts(data);
        } catch (error) {
            addToast({ title: 'Error', description: 'Failed to load products', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteListing(id);
            setProducts(prev => prev.filter(p => p._id !== id));
            addToast({ title: "Deleted", description: "Listing removed" });
        } catch {
            addToast({ title: "Error", description: "Delete failed", variant: "destructive" });
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters });
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            category: '',
            minPrice: '',
            maxPrice: '',
            condition: '',
            verifiedOnly: false,
            sort: 'newest'
        });
        setSearchParams({});
    };

    const handleToggleWishlist = async (productId) => {
        if (!user) {
            addToast({ title: 'Login Required', description: 'Please login to save items', variant: 'destructive' });
            return;
        }

        try {
            const response = await toggleWishlist(productId);
            // Result: { success: true, wishlist: [...], isFavorited: boolean }

            // Refresh user to get updated wishlist in context
            await refreshUser();

            addToast({
                title: response.isFavorited ? 'Added to Wishlist' : 'Removed from Wishlist',
                description: response.isFavorited ? 'Item saved successfully' : 'Item removed from saved list'
            });
        } catch (error) {
            addToast({ title: 'Error', description: 'Failed to update wishlist', variant: 'destructive' });
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex gap-6">
                {/* Desktop Filters */}
                <aside className="hidden lg:block w-64 flex-shrink-0">
                    <FilterPanel
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onClear={clearFilters}
                    />
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold">Marketplace</h1>
                            <p className="text-muted-foreground text-sm">
                                {products.length} items found
                                {filters.search && ` for "${filters.search}"`}
                            </p>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Button
                                variant="outline"
                                size="sm"
                                className="lg:hidden"
                                onClick={() => setShowFilters(true)}
                            >
                                <SlidersHorizontal size={16} className="mr-2" />
                                Filters
                            </Button>

                            <Select
                                value={filters.sort}
                                onChange={(e) => handleFilterChange({ sort: e.target.value })}
                                className="h-9 text-sm"
                            >
                                <option value="newest">Newest First</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="popular">Most Popular</option>
                                <option value="rating">Highest Rated</option>
                            </Select>

                            <div className="hidden sm:flex border rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-muted' : ''}`}
                                >
                                    <Grid size={16} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-muted' : ''}`}
                                >
                                    <List size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="h-80 bg-muted animate-pulse rounded-xl" />
                            ))}
                        </div>
                    ) : products.length > 0 ? (
                        <div className={`grid gap-4 ${viewMode === 'grid'
                            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                            : 'grid-cols-1'
                            }`}>
                            {products.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={{
                                        ...product,
                                        isOwner: product.seller?.id === user?.id
                                    }}
                                    isFavorite={user?.wishlist?.includes(product._id)}
                                    onToggleFavorite={handleToggleWishlist}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="bg-muted/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                                <SlidersHorizontal className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No items found</h3>
                            <p className="text-muted-foreground mb-6">Try adjusting your filters or search query.</p>
                            <Button onClick={clearFilters}>Clear all filters</Button>
                        </div>
                    )}
                </main>
            </div>

            {/* Mobile Filter Modal */}
            {showFilters && (
                <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
                    <div className="absolute right-0 top-0 h-full w-80 bg-background overflow-y-auto">
                        <FilterPanel
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onClear={clearFilters}
                            isMobile
                            onClose={() => setShowFilters(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Marketplace;
