import React from 'react';
import { Leaf, IndianRupeeIcon, Repeat, Users } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

const SustainabilityMetrics = () => {
    const metrics = [
        {
            label: 'Items Reused',
            value: '1,200+',
            icon: Repeat,
            color: 'text-blue-500',
            bg: 'bg-blue-100',
        },
        {
            label: 'Money Saved',
            value: '₹ 5.4 Lakhs',
            icon: IndianRupeeIcon,
            color: 'text-green-600',
            bg: 'bg-green-100',
        },
        {
            label: 'CO₂ Reduced',
            value: '850 kg',
            icon: Leaf,
            color: 'text-emerald-500',
            bg: 'bg-emerald-100',
        },
        {
            label: 'Active Traders',
            value: '500+',
            icon: Users,
            color: 'text-purple-500',
            bg: 'bg-purple-100',
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
                <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <div className={`p-3 rounded-full mb-3 ${metric.bg}`}>
                            <metric.icon className={`h-6 w-6 ${metric.color}`} />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">{metric.value}</h3>
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default SustainabilityMetrics;
