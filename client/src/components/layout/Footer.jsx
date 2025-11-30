import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-footer-navy text-white mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-campus-blue p-1.5 rounded-lg">
                                <ShoppingBag size={20} />
                            </div>
                            <span className="font-bold text-xl">CampKart</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                            Your trusted campus marketplace. Buy and sell safely within your college community.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="hover:text-campus-blue transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="hover:text-campus-blue transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="hover:text-campus-blue transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="hover:text-campus-blue transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/marketplace" className="hover:text-white transition-colors">Browse Marketplace</Link></li>
                            <li><Link to="/sell" className="hover:text-white transition-colors">Sell an Item</Link></li>
                            <li><Link to="/safety" className="hover:text-white transition-colors">Safety Guidelines</Link></li>
                            <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link to="/support" className="hover:text-white transition-colors">Contact Support</Link></li>
                            <li><a href="#" className="hover:text-white transition-colors">Report an Issue</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-start gap-2">
                                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                                <span>IIT Bombay, Powai, Mumbai - 400076</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={16} className="flex-shrink-0" />
                                <a href="mailto:support@campkart.in" className="hover:text-white transition-colors">support@campkart.in</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone size={16} className="flex-shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} CampKart. All rights reserved.</p>
                    <p className="mt-2 flex items-center justify-center gap-1">
                        Made with <Heart size={14} className="text-red-500 fill-current" /> for Students
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
