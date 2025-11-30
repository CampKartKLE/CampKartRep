import React from 'react';

const Terms = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>

            <div className="prose prose-slate max-w-none space-y-8">
                <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Welcome to CampKart. By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions. CampKart is a marketplace designed exclusively for campus students to buy, sell, and exchange items within their college community.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">2. User Eligibility</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>You must be a current student or staff member of a recognized educational institution.</li>
                        <li>You must provide accurate and truthful information during registration.</li>
                        <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                        <li>You must be at least 18 years old or have parental consent to use this platform.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">3. Prohibited Items</h2>
                    <p className="text-muted-foreground mb-3">The following items are strictly prohibited on CampKart:</p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Weapons, drugs, alcohol, and tobacco products</li>
                        <li>Adult content or offensive materials</li>
                        <li>Stolen, counterfeit, or pirated goods</li>
                        <li>Exam papers, answer keys, or materials promoting academic dishonesty</li>
                        <li>Live animals or perishable food items</li>
                        <li>Items that violate intellectual property rights</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Provide accurate descriptions and images of items you list</li>
                        <li>Honor your commitments to buyers and sellers</li>
                        <li>Communicate respectfully with other users</li>
                        <li>Report suspicious or fraudulent activity</li>
                        <li>Comply with your institution's policies and local laws</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">5. Disclaimer of Liability</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        CampKart acts solely as a platform connecting buyers and sellers. We are not involved in the actual transaction between parties. We do not guarantee the quality, safety, legality, or accuracy of items advertised. Users engage in transactions at their own risk.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">6. Privacy and Data</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We collect and process personal information in accordance with our Privacy Policy. By using CampKart, you consent to such processing and warrant that all data provided is accurate.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">7. Account Termination</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or pose a risk to the community.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the new terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        For questions about these terms, please contact us at{' '}
                        <a href="mailto:legal@campkart.in" className="text-campus-blue hover:underline">
                            legal@campkart.in
                        </a>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Terms;
