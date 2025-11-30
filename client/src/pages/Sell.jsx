import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../api/mockApi';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Checkbox from '../components/ui/Checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useToast } from '../components/ui/ToastProvider';
import { categories } from '../data/products';

const Sell = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        price: '',
        condition: '',
        description: '',
        location: '',
        images: [],
        imageUrlInput: '',
        termsAccepted: false
    });

    useEffect(() => {
        if (!isAuthenticated) {
            const savedData = localStorage.getItem('sell_form_draft');
            if (savedData) {
                setFormData(JSON.parse(savedData));
                localStorage.removeItem('sell_form_draft');
            }
        }
    }, [isAuthenticated]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newFormData = {
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        };
        setFormData(newFormData);

        // Auto-save draft
        if (isAuthenticated) {
            localStorage.setItem('sell_form_draft', JSON.stringify(newFormData));
        }
    };

    const handleAddImage = () => {
        if (formData.imageUrlInput && formData.images.length < 5) {
            setFormData({
                ...formData,
                images: [...formData.images, formData.imageUrlInput],
                imageUrlInput: ''
            });
        }
    };

    const removeImage = (index) => {
        setFormData({
            ...formData,
            images: formData.images.filter((_, i) => i !== index)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            localStorage.setItem('sell_form_draft', JSON.stringify(formData));
            navigate('/login?redirect=/sell');
            return;
        }

        if (!formData.termsAccepted) {
            addToast({ title: 'Error', description: 'Please accept the terms', variant: 'destructive' });
            return;
        }

        if (formData.images.length === 0) {
            addToast({ title: 'Error', description: 'Add at least one image', variant: 'destructive' });
            return;
        }

        setLoading(true);
        try {
            const newProduct = await mockApi.addProduct({
                title: formData.title,
                description: formData.description,
                price: Number(formData.price),
                category: formData.category,
                condition: formData.condition,
                images: formData.images,
                location: formData.location
            }, user);

            localStorage.removeItem('sell_form_draft');
            addToast({ title: 'Success!', description: 'Your listing is now live' });
            navigate(`/item/${newProduct.id}`);
        } catch (error) {
            addToast({ title: 'Error', description: error.message, variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Sell an Item</h1>
                <p className="text-muted-foreground">List your item and reach thousands of students on campus</p>
                {!isAuthenticated && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-900">
                        <AlertCircle size={16} className="inline mr-2" />
                        You'll need to log in or create an account to post this listing. Your details will be saved.
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Title *</label>
                            <Input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Engineering Mathematics Textbook"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Category *</label>
                                <Select name="category" value={formData.category} onChange={handleChange} required>
                                    <option value="">Select Category</option>
                                    {categories.filter(c => c !== 'All Categories').map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Condition *</label>
                                <Select name="condition" value={formData.condition} onChange={handleChange} required>
                                    <option value="">Select Condition</option>
                                    <option value="New">New</option>
                                    <option value="Like New">Like New</option>
                                    <option value="Excellent">Excellent</option>
                                    <option value="Good">Good</option>
                                    <option value="Fair">Fair</option>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Price (₹) *</label>
                                <Input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="500"
                                    min="100"
                                    max="50000"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Location *</label>
                                <Input
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g., Hostel 10"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Description *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="Describe your item in detail..."
                                required
                                minLength={20}
                            />
                            <p className="text-xs text-muted-foreground mt-1">Minimum 20 characters</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Images */}
                <Card>
                    <CardHeader>
                        <CardTitle>Photos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-2">
                            <Input
                                name="imageUrlInput"
                                value={formData.imageUrlInput}
                                onChange={handleChange}
                                placeholder="Paste image URL"
                            />
                            <Button type="button" onClick={handleAddImage} disabled={formData.images.length >= 5}>
                                Add
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Add up to 5 images. Use Unsplash or Pexels for free images.</p>

                        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                            {formData.images.map((img, idx) => (
                                <div key={idx} className="relative aspect-square bg-muted rounded-lg overflow-hidden group">
                                    <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                            {formData.images.length === 0 && (
                                <div className="aspect-square bg-muted rounded-lg border-2 border-dashed flex items-center justify-center">
                                    <Upload size={24} className="text-muted-foreground" />
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Safety Tips */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
                    <div className="text-sm">
                        <p className="font-medium text-blue-900 mb-1">Safety Tips</p>
                        <ul className="text-blue-700 space-y-1 text-xs">
                            <li>• Meet in public places on campus</li>
                            <li>• Don't share personal banking details</li>
                            <li>• Report suspicious activity</li>
                        </ul>
                    </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                    <Checkbox
                        id="terms"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                    />
                    <label htmlFor="terms" className="text-sm">
                        I confirm this item follows CampKart's{' '}
                        <a href="/terms" className="text-campus-blue hover:underline" target="_blank">
                            Terms & Conditions
                        </a>{' '}
                        and campus rules.
                    </label>
                </div>

                <Button type="submit" className="w-full" size="lg" isLoading={loading}>
                    {loading ? 'Publishing...' : 'Publish Listing'}
                </Button>
            </form>
        </div>
    );
};

export default Sell;
