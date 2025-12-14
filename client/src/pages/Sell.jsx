import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createListing } from '../api/listings'; // Use real API
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
        images: [], // Stores File objects or URL strings
        imageUrlInput: '',
        termsAccepted: false
    });

    const [files, setFiles] = useState([]); // Separate state for actual file objects if needed, but we can mix in formData.images for simplicity or keep separate.
    // Let's keep images array mixed (URLs) and handle files separately or unify.
    // Better approach: formData.images for preview URLs, and a separate ref or state for File objects.
    // ACTUALLY: Let's follow the plan. formData.images will hold the PREVIEW URLs. We need a way to store the actual files.

    const [selectedFiles, setSelectedFiles] = useState([]); // Array of File objects
    const [fileInputKey, setFileInputKey] = useState(Date.now()); // to reset input

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

    // Old functions removed to avoid duplication



    // Unified Image State Manager
    const [imageItems, setImageItems] = useState([]); // { type: 'file', file: File, preview: string } | { type: 'url', url: string, preview: string }

    const handleFileSelect = (e) => {
        const newFiles = Array.from(e.target.files);
        if (imageItems.length + newFiles.length > 5) {
            addToast({ title: 'Limit Reached', description: 'Maximum 5 images allowed.', variant: 'destructive' });
            return;
        }

        const newItems = [];
        newFiles.forEach(file => {
            if (!file.type.startsWith('image/')) {
                addToast({ title: 'Invalid File', description: `${file.name} is not an image.`, variant: 'destructive' });
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                addToast({ title: 'File Too Large', description: `${file.name} exceeds 5MB limit.`, variant: 'destructive' });
                return;
            }
            newItems.push({ type: 'file', file, preview: URL.createObjectURL(file) });
        });
        setImageItems(prev => [...prev, ...newItems]);
        setFileInputKey(Date.now()); // reset input
    };

    const handleAddImageUrl = () => {
        if (formData.imageUrlInput && imageItems.length < 5) {
            if (!formData.imageUrlInput.match(/^https?:\/\/.+/)) {
                addToast({ title: 'Invalid URL', description: 'Please enter a valid image URL.', variant: 'destructive' });
                return;
            }
            setImageItems(prev => [...prev, { type: 'url', url: formData.imageUrlInput, preview: formData.imageUrlInput }]);
            setFormData(prev => ({ ...prev, imageUrlInput: '' }));
        }
    };

    const removeImageItem = (index) => {
        setImageItems(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            // Draft saving logic needs update for files (cannot save files to LS)
            // Saving only text fields
            localStorage.setItem('sell_form_draft', JSON.stringify({ ...formData, imageUrlInput: '' }));
            navigate('/login?redirect=/sell');
            return;
        }

        if (!formData.termsAccepted) {
            addToast({ title: 'Error', description: 'Please accept the terms', variant: 'destructive' });
            return;
        }

        if (imageItems.length === 0) {
            addToast({ title: 'Error', description: 'Add at least one image', variant: 'destructive' });
            return;
        }

        setLoading(true);
        try {
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('category', formData.category);
            submitData.append('condition', formData.condition);
            submitData.append('price', formData.price);
            submitData.append('description', formData.description);
            submitData.append('location', formData.location);

            imageItems.forEach(item => {
                if (item.type === 'file') {
                    submitData.append('images', item.file);
                } else {
                    // Backend expects 'images' field to be files?
                    // If backend ONLY accepts files via multer, we might have an issue with URLs.
                    // Checking listingController.js: 
                    // "if (!req.files || req.files.length === 0) return res.status(400)..."
                    // It SEEMS to require FILES. 
                    // FIX: If user provides URL, we can't easily send it as 'images' file array unless we download it or modify backend.
                    // DECISION: For this iteration, if user provides URL, we might need to send it separately OR just enforce File Upload for "simplicity" and "robustness" as per plan.
                    // BUT, to keep the "Add Image URL" feature working without backend changes, we'd need backend to accept a separate 'imageUrls' array.
                    // Backend `createListing` logic: `const imageUrls = req.files.map(...)`. It strongly expects files.
                    // CRITICAL: URL inputs will FAIL on current backend. 
                    // ADAPTATION: I will DISABLE/REMOVE URL input support to align with current Backend constraint, OR I assume I should fix backend.
                    // User said: "Fallback for URL Input (Optional): If you keep the URL input...".
                    // Given backend constraint `if (!req.files...)`, I will remove URL input to prevent errors, focusing on File Upload.

                    // WAIT: I can't remove it if I promised "toggle". 
                    // OK, I'll allow URL input but I should probably fetch the blob and send it as file? No, that's CORS hell.
                    // Simple fix: Only support File Uploads for now to ensure success. I will Comment out URL logic.
                    // Actually, I will support ONLY file uploads as per my previous note "Decision: I will implement File Upload primarily".
                }
            });

            // Filter only files. If no files, we can't submit.
            const filesToUpload = imageItems.filter(i => i.type === 'file');
            if (filesToUpload.length === 0) {
                addToast({ title: 'Upload Required', description: 'Please upload at least one image file (URLs not supported yet).', variant: 'destructive' });
                setLoading(false);
                return;
            }

            filesToUpload.forEach(item => submitData.append('images', item.file));

            const response = await createListing(submitData);

            localStorage.removeItem('sell_form_draft');
            addToast({ title: 'Success!', description: 'Your listing is now live' });
            navigate(`/item/${response.listing?._id || response.listing?.id}`); // Handle likely _id from Mongo
        } catch (error) {
            console.error(error);
            addToast({ title: 'Error', description: error.message || "Failed to create listing", variant: 'destructive' });
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
                        <div className="flex flex-col gap-3">
                            {/* File Input */}
                            <div className="flex items-center gap-2">
                                <label htmlFor="image-upload" className="cursor-pointer">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-campus-blue text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm">
                                        <Upload size={18} />
                                        <span>Upload Photos</span>
                                    </div>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg"
                                        multiple
                                        className="hidden"
                                        onChange={handleFileSelect}
                                        key={fileInputKey}
                                    />
                                </label>
                                <span className="text-sm text-gray-500">{imageItems.length}/5</span>
                            </div>

                            {/* URL Input (Hidden/Removed for now to ensure backend compatibility) */}
                            {/* 
                            <div className="flex gap-2">
                                <Input
                                    name="imageUrlInput"
                                    value={formData.imageUrlInput}
                                    onChange={handleChange}
                                    placeholder="Or paste image URL"
                                />
                                <Button type="button" onClick={handleAddImageUrl} variant="outline" disabled={imageItems.length >= 5}>
                                    Add URL
                                </Button>
                            </div>
                            */}
                        </div>
                        <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG. Max size: 5MB per image.</p>

                        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-4">
                            {imageItems.map((item, idx) => (
                                <div key={idx} className="relative aspect-square bg-muted rounded-lg overflow-hidden group border border-gray-200">
                                    <img src={item.preview} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImageItem(idx)}
                                        className="absolute top-1 right-1 p-1 bg-white/90 text-danger-red rounded-full opacity-100 shadow-sm hover:bg-white transition-all"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                            {imageItems.length === 0 && (
                                <div className="aspect-square bg-muted/30 rounded-lg border-2 border-dashed flex flex-col items-center justify-center text-muted-foreground p-4 text-center">
                                    <Upload size={24} className="mb-2 opacity-50" />
                                    <span className="text-xs">No images selected</span>
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
