import React from 'react';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative px-4 py-16 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl font-serif">
            Terms & Conditions
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600 leading-relaxed">
            The terms and conditions that govern your use of our services and define our business relationship and mutual obligations.
          </p>
          <div className="mx-auto w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 lg:p-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif mb-6 sm:mb-8">
            Terms & Conditions
          </h1>

          <div className="prose prose-sm sm:prose-lg max-w-none text-gray-700">
            <p className="mb-6">
              <strong>Last updated:</strong> January 1, 2024
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Agreement to Terms</h2>
            <p className="mb-6">
              By accessing or using CFO EDGE360's services, you agree to be bound by these Terms and Conditions. If you do not agree to all the terms, please do not use our services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Services Description</h2>
            <p className="mb-4">CFO EDGE360 provides:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Virtual and fractional CFO services</li>
              <li>Financial strategy and forecasting</li>
              <li>Cash flow optimization</li>
              <li>Investor and board reporting</li>
              <li>Global compliance and expansion support</li>
              <li>KPI dashboard and analytics</li>
              <li>M&A and fundraising support</li>
              <li>Financial operations setup</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Client Responsibilities</h2>
            <p className="mb-4">As our client, you agree to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Provide accurate and complete information</li>
              <li>Respond to requests for information in a timely manner</li>
              <li>Implement recommended changes and processes</li>
              <li>Pay invoices according to agreed terms</li>
              <li>Maintain confidentiality of shared information</li>
              <li>Comply with applicable laws and regulations</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Service Delivery</h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Virtual Services</h3>
            <p className="mb-4">Our services are delivered virtually through:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Video conferences and calls</li>
              <li>Email and secure messaging</li>
              <li>Shared documents and dashboards</li>
              <li>Project management tools</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Response Times</h3>
            <p className="mb-4">We commit to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Responding to urgent matters within 4 hours during business hours</li>
              <li>Regular communications within 24 hours</li>
              <li>Scheduled meetings and deliverables as agreed</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Payment Terms</h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Fees and Billing</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Fees are as quoted in our service agreement</li>
              <li>Monthly retainers are billed in advance</li>
              <li>Project fees are billed according to milestones</li>
              <li>Late payments may incur additional charges</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Payment Methods</h3>
            <p className="mb-6">We accept payments via credit card, bank transfer, or other methods as agreed upon.</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Confidentiality</h2>
            <p className="mb-4">Both parties agree to maintain confidentiality of:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Business financial information</li>
              <li>Strategic plans and forecasts</li>
              <li>Client data and records</li>
              <li>Proprietary methodologies</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Intellectual Property</h2>
            <p className="mb-4">Rights to materials created during our engagement:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Custom reports and analyses: Client owns the outputs</li>
              <li>Our methodologies and templates: CFO EDGE360 retains ownership</li>
              <li>Work papers and calculations: Remain our property</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Limitation of Liability</h2>
            <p className="mb-6">
              CFO EDGE360's liability is limited to the amount paid for services in the 12 months preceding the claim. We are not liable for indirect, special, or consequential damages.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Indemnification</h2>
            <p className="mb-6">
              You agree to indemnify CFO EDGE360 against claims arising from your breach of these terms or misuse of our services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Termination</h2>
            <p className="mb-4">Either party may terminate services:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>With written notice as specified in the service agreement</li>
              <li>Immediately for material breach of terms</li>
              <li>Upon mutual agreement</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Governing Law</h2>
            <p className="mb-6">
              These terms are governed by the laws of [Jurisdiction]. Any disputes will be resolved through binding arbitration or in the courts of [Jurisdiction].
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Force Majeure</h2>
            <p className="mb-6">
              Neither party is liable for delays caused by events beyond their reasonable control, including natural disasters, pandemics, or government actions.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Entire Agreement</h2>
            <p className="mb-6">
              These terms, together with your service agreement, constitute the entire understanding between us and supersede all prior agreements.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Information</h2>
            <p className="mb-6">
              For questions about these Terms and Conditions:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="mb-2"><strong>Email:</strong> legal@cfoedge360.com</p>
              <p className="mb-2"><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> [Business Address]</p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Updates to Terms</h2>
            <p className="mb-6">
              We may update these terms periodically. We'll notify you of material changes and continued use of our services constitutes acceptance of updated terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;