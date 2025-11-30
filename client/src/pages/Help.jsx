import React, { useState } from 'react';
import { HelpCircle, MessageCircle, Mail, Phone } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useToast } from '../components/ui/ToastProvider';

const Help = () => {
    const { addToast } = useToast();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const faqs = [
        {
            question: 'How do I post an item for sale?',
            answer: 'Click on "Sell Item" in the navigation bar, fill in the item details, add photos, and submit. Your listing will be live immediately.'
        },
        {
            question: 'What items are allowed on CampKart?',
            answer: 'You can sell textbooks, electronics, furniture, clothing, sports equipment, and other campus-related items. Prohibited items include weapons, drugs, and exam materials.'
        },
        {
            question: 'How do I contact a seller?',
            answer: 'Click on any listing, then use the "Contact Seller" button to send a message. You need to be logged in to contact sellers.'
        },
        {
            question: 'Is my student email required?',
            answer: 'Yes, using your .ac.in or .edu email helps verify you as a student and builds trust in the community.'
        },
        {
            question: 'How do I delete my listing?',
            answer: 'Go to your Profile page, find the listing under "My Listings", and click the delete icon.'
        },
        {
            question: 'What payment methods are accepted?',
            answer: 'CampKart doesn\'t process payments. We recommend cash on delivery or UPI payments after meeting in person and inspecting the item.'
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        addToast({ title: 'Message Sent!', description: 'We\'ll get back to you within 24 hours' });
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="text-center mb-12">
                <div className="inline-flex p-4 bg-campus-blue/10 rounded-2xl mb-4">
                    <HelpCircle size={48} className="text-campus-blue" />
                </div>
                <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
                <p className="text-lg text-muted-foreground">
                    Find answers to common questions or get in touch with our team
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* FAQs */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="text-base">{faq.question}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Contact Form */}
                <div>
                    <Card className="sticky top-20">
                        <CardHeader>
                            <CardTitle>Contact Support</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name</label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Message</label>
                                    <textarea
                                        className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    <MessageCircle size={16} className="mr-2" />
                                    Send Message
                                </Button>
                            </form>

                            <div className="mt-6 pt-6 border-t space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail size={16} className="text-muted-foreground" />
                                    <a href="mailto:support@campkart.in" className="text-campus-blue hover:underline">
                                        support@campkart.in
                                    </a>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone size={16} className="text-muted-foreground" />
                                    <span>+91 98765 43210</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Help;
