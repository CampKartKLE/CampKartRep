import React, { createContext, useContext, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback(({ title, description, variant = 'default', duration = 3000 }) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, title, description, variant }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={cn(
                            'flex w-full max-w-sm items-start gap-4 rounded-md border p-4 shadow-lg transition-all animate-in slide-in-from-right',
                            toast.variant === 'destructive' ? 'bg-destructive text-destructive-foreground' : 'bg-background text-foreground',
                            toast.variant === 'success' ? 'bg-sustainability-green text-white' : ''
                        )}
                    >
                        <div className="flex-1">
                            {toast.title && <div className="font-semibold">{toast.title}</div>}
                            {toast.description && <div className="text-sm opacity-90">{toast.description}</div>}
                        </div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="text-foreground/50 hover:text-foreground"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
