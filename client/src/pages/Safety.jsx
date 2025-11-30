import React from 'react';
import { Shield, MapPin, CreditCard, AlertTriangle, Users, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const Safety = () => {
    const tips = [
        {
            icon: MapPin,
            title: 'Meet in Public Places',
            description: 'Always meet in well-lit, public areas on campus like the library, cafeteria, or student center. Never meet in isolated locations.'
        },
        {
            icon: CreditCard,
            title: 'Safe Payment Methods',
            description: 'Use cash on delivery or secure UPI payments only after inspecting the item. Never make advance payments to unknown sellers.'
        },
        {
            icon: Shield,
            title: 'Verify Seller Identity',
            description: 'Check for the "Verified Student" badge. You can also ask to see their student ID card when meeting in person.'
        },
        {
            icon: AlertTriangle,
            title: 'Report Suspicious Activity',
            description: 'If you encounter suspicious listings or users, report them immediately using the "Report" button on the listing page.'
        },
        {
            icon: Users,
            title: 'Bring a Friend',
            description: 'When meeting a seller for the first time, consider bringing a friend along for added safety.'
        },
        {
            icon: Eye,
            title: 'Inspect Before Buying',
            description: 'Always thoroughly inspect items before making payment. Check for damages, functionality, and authenticity.'
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="text-center mb-12">
                <div className="inline-flex p-4 bg-campus-blue/10 rounded-2xl mb-4">
                    <Shield size={48} className="text-campus-blue" />
                </div>
                <h1 className="text-4xl font-bold mb-4">Safety Guidelines</h1>
                <p className="text-lg text-muted-foreground">
                    Your safety is our top priority. Follow these guidelines for a secure experience.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {tips.map((tip) => (
                    <Card key={tip.title}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <div className="p-2 bg-campus-blue/10 rounded-lg">
                                    <tip.icon size={24} className="text-campus-blue" />
                                </div>
                                {tip.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{tip.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-red-50 border-red-200">
                <CardContent className="p-6">
                    <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                        <AlertTriangle size={20} className="text-red-600" />
                        Red Flags to Watch Out For
                    </h3>
                    <ul className="space-y-2 text-sm text-red-800">
                        <li>• Sellers asking for advance payment before meeting</li>
                        <li>• Prices significantly lower than market value</li>
                        <li>• Sellers refusing to meet in person</li>
                        <li>• Requests to communicate outside the platform</li>
                        <li>• Pressure to make quick decisions</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};

export default Safety;
