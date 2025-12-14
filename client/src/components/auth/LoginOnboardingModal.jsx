import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Smartphone, ArrowRight, ShieldCheck, ShoppingBag, Heart } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const LoginOnboardingModal = ({ isOpen, onClose, intent = 'login' }) => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            icon: <ShoppingBag size={48} className="text-campus-blue" />,
            title: "Buy & Sell on Campus",
            desc: "The safest way to trade textbooks, electronics, and gear with fellow students."
        },
        {
            icon: <ShieldCheck size={48} className="text-success-green" />,
            title: "Verified Students Only",
            desc: "Connect with real students. Every account is verified via college email."
        },
        {
            icon: <Heart size={48} className="text-danger-red" />,
            title: "Help Juniors, Save Money",
            desc: "Pass on your essentials to the next batch or find great deals for yourself."
        }
    ];

    // Auto-advance slides
    useEffect(() => {
        if (!isOpen) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [isOpen]);

    const handleEmailLogin = () => {
        onClose();
        navigate(intent === 'signup' ? '/signup' : '/login');
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title=""
            className="max-w-md p-0 overflow-hidden border-none"
        >
            <div className="flex flex-col">
                {/* Carousel Section */}
                <div className="bg-gradient-to-br from-blue-50 to-white pt-8 pb-6 px-6 text-center">
                    <div className="h-48 flex flex-col items-center justify-center transition-all duration-500 ease-in-out">
                        <div className="mb-4 p-4 bg-white rounded-full shadow-sm animate-in zoom-in duration-500">
                            {slides[currentSlide].icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {slides[currentSlide].title}
                        </h3>
                        <p className="text-sm text-gray-500 max-w-[280px] mx-auto leading-relaxed">
                            {slides[currentSlide].desc}
                        </p>
                    </div>

                    {/* Dots Indicators */}
                    <div className="flex justify-center gap-2 mt-4">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx
                                    ? "w-6 bg-campus-blue"
                                    : "w-2 bg-gray-300 hover:bg-gray-400"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Login Options Section */}
                <div className="p-6 bg-white space-y-3">
                    <Button
                        variant="outline"
                        className="w-full relative h-12 border-gray-300 hover:bg-gray-50 hover:text-gray-900 font-medium"
                        onClick={() => { }} // Placeholder for phone login
                    >
                        <Smartphone size={20} className="absolute left-4 text-gray-500" />
                        Continue with Phone
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full relative h-12 border-gray-300 hover:bg-gray-50 hover:text-gray-900 font-medium"
                        onClick={() => { }} // Placeholder for Google login
                    >
                        <svg className="absolute left-4 w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </Button>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">Or continue with email</span>
                        </div>
                    </div>

                    <Button
                        onClick={handleEmailLogin}
                        className="w-full h-12 font-medium"
                    >
                        <Mail size={18} className="mr-2" />
                        {intent === 'signup' ? "Sign up with Email" : "Login with Email"}
                    </Button>

                    <p className="text-xs text-center text-gray-400 mt-4 leading-normal">
                        By continuing, you simply agree to our <span className="underline cursor-pointer hover:text-gray-600">Terms</span> and <span className="underline cursor-pointer hover:text-gray-600">Privacy Policy</span>. Cannot be simpler.
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default LoginOnboardingModal;
