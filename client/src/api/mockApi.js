import { products as seedProducts } from '../data/products';

const DELAY = 500; // Simulate network delay

const getFromStorage = (key, defaultVal) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultVal;
};

const setToStorage = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
};

// Initialize data if empty
if (!localStorage.getItem('campkart_products')) {
    setToStorage('campkart_products', seedProducts);
}

if (!localStorage.getItem('campkart_users')) {
    setToStorage('campkart_users', [
        {
            id: 'u1',
            name: 'Rahul Sharma',
            email: 'rahul.sharma@iitb.ac.in',
            password: 'password123',
            isVerified: true,
            avatar: 'R',
            campus: 'IIT Bombay',
            joinedAt: '2023-01-15T10:00:00Z'
        }
    ]);
}

export const mockApi = {
    login: async (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = getFromStorage('campkart_users', []);
                const user = users.find(u => u.email === email && u.password === password);
                if (user) {
                    const { password, ...userWithoutPass } = user;
                    resolve(userWithoutPass);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, DELAY);
        });
    },

    signup: async (userData) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = getFromStorage('campkart_users', []);
                if (users.find(u => u.email === userData.email)) {
                    reject(new Error('User already exists'));
                    return;
                }

                const isCampusEmail = userData.email.endsWith('.ac.in') || userData.email.endsWith('.edu');
                const newUser = {
                    id: `u${Date.now()}`,
                    ...userData,
                    isVerified: isCampusEmail,
                    avatar: userData.name.charAt(0).toUpperCase(),
                    joinedAt: new Date().toISOString()
                };

                users.push(newUser);
                setToStorage('campkart_users', users);

                const { password, ...userWithoutPass } = newUser;
                resolve(userWithoutPass);
            }, DELAY);
        });
    },

    getProducts: async (filters = {}) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let allProducts = getFromStorage('campkart_products', seedProducts);

                // Apply filters
                if (filters.category && filters.category !== 'All Categories') {
                    allProducts = allProducts.filter(p => p.category === filters.category);
                }
                if (filters.search) {
                    const q = filters.search.toLowerCase();
                    allProducts = allProducts.filter(p =>
                        p.title.toLowerCase().includes(q) ||
                        p.description.toLowerCase().includes(q)
                    );
                }
                if (filters.minPrice) {
                    allProducts = allProducts.filter(p => p.price >= Number(filters.minPrice));
                }
                if (filters.maxPrice) {
                    allProducts = allProducts.filter(p => p.price <= Number(filters.maxPrice));
                }
                if (filters.condition) {
                    allProducts = allProducts.filter(p => p.condition === filters.condition);
                }
                if (filters.verifiedOnly) {
                    allProducts = allProducts.filter(p => p.seller.isVerified);
                }

                // Apply sorting
                if (filters.sort) {
                    switch (filters.sort) {
                        case 'price_asc':
                            allProducts.sort((a, b) => a.price - b.price);
                            break;
                        case 'price_desc':
                            allProducts.sort((a, b) => b.price - a.price);
                            break;
                        case 'newest':
                            allProducts.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
                            break;
                        case 'popular':
                            allProducts.sort((a, b) => b.views - a.views);
                            break;
                        case 'rating':
                            allProducts.sort((a, b) => b.rating - a.rating);
                            break;
                        default:
                            break;
                    }
                }

                resolve(allProducts);
            }, DELAY);
        });
    },

    getProductById: async (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const products = getFromStorage('campkart_products', seedProducts);
                const product = products.find(p => p.id === id);
                if (product) resolve(product);
                else reject(new Error('Product not found'));
            }, DELAY);
        });
    },

    addProduct: async (productData, seller) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const products = getFromStorage('campkart_products', seedProducts);
                const newProduct = {
                    id: `p${Date.now()}`,
                    ...productData,
                    seller: {
                        name: seller.name,
                        email: seller.email,
                        isVerified: seller.isVerified,
                        avatar: seller.avatar
                    },
                    postedAt: new Date().toISOString(),
                    views: 0,
                    rating: 0
                };
                products.unshift(newProduct);
                setToStorage('campkart_products', products);
                resolve(newProduct);
            }, DELAY);
        });
    },

    getChats: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getFromStorage('campkart_chats', []));
            }, DELAY);
        });
    }
};
