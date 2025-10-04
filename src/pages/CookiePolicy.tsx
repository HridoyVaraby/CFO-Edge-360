import React from 'react';
import PageHero from '../components/PageHero';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <PageHero 
        title="Cookie Policy"
        description="Learn about how we use cookies to enhance your experience and provide better services across our platform."
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 lg:p-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif mb-6 sm:mb-8">
            Cookie Policy
          </h1>

          <div className="prose prose-sm sm:prose-lg max-w-none text-gray-700">
            <p className="mb-6">
              <strong>Last updated:</strong> January 1, 2024
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What Are Cookies</h2>
            <p className="mb-6">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us provide you with a better browsing experience and allow certain features to work properly.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How We Use Cookies</h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Essential Cookies</h3>
            <p className="mb-4">These cookies are necessary for the website to function properly:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Session management cookies (keep you logged in)</li>
              <li>Security cookies (protect against fraud)</li>
              <li>Load balancing cookies (distribute traffic evenly)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Analytics Cookies</h3>
            <p className="mb-4">These cookies help us understand how visitors interact with our website:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Google Analytics cookies (track page views and user behavior)</li>
              <li>Performance monitoring cookies (measure site speed)</li>
              <li>Error tracking cookies (identify and fix issues)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Functionality Cookies</h3>
            <p className="mb-4">These cookies remember your preferences:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Language preference cookies</li>
              <li>Form auto-fill cookies</li>
              <li>Layout preference cookies</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Third-Party Cookies</h2>
            <p className="mb-6">
              We may use third-party services that place cookies on our site:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
              <li><strong>Social Media Platforms:</strong> For social sharing features</li>
              <li><strong>Customer Support Tools:</strong> For live chat functionality</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Managing Cookies</h2>
            <p className="mb-4">You can control cookies in several ways:</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Browser Settings</h3>
            <p className="mb-4">Most web browsers allow you to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>View cookies stored on your device</li>
              <li>Delete existing cookies</li>
              <li>Block cookies from specific sites</li>
              <li>Block all cookies from being set</li>
              <li>Receive notifications when cookies are set</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Our Cookie Banner</h3>
            <p className="mb-6">
              When you first visit our website, you'll see a cookie banner that allows you to accept or customize your cookie preferences. You can change these preferences at any time.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Cookie Retention</h2>
            <p className="mb-6">
              Different cookies have different lifespans:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
              <li><strong>Persistent cookies:</strong> Remain on your device for a set period or until deleted</li>
              <li><strong>Third-party cookies:</strong> Controlled by the third-party service provider</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p className="mb-6">
              If you have questions about our use of cookies, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="mb-2"><strong>Email:</strong> reaz@cfoedge360.com</p>
              <p><strong>Phone:</strong> +1 505 523 2471</p>
              <p><strong>Bangladesh:</strong> +880 1713-301465</p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Updates to This Policy</h2>
            <p className="mb-6">
              We may update this Cookie Policy from time to time. We'll notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;