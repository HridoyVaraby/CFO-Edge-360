import React, { useState } from 'react';
import PageHero from '../components/PageHero';
import { Mail, Phone, MapPin, Send, Linkedin, Calendar, Clock, Globe, Facebook } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    whatsapp: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        whatsapp: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <PageHero
        title="Let's Build Your Financial Edge"
        description="Reach out to explore how CFO EDGE360 can support your growth with strategic financial leadership and comprehensive virtual CFO services."
      />

      {/* Contact Section */}
      <section className="px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              {/* Header Section */}
              <div className="relative">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 sm:p-8 border border-amber-100">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif mb-4">
                    Let's Connect & Transform Your Business
                  </h2>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Ready to elevate your financial operations? Our expert CFO services are designed to drive growth, optimize processes, and deliver strategic insights that matter.
                  </p>
                  <div className="mt-4 flex items-center space-x-4 text-sm text-amber-700">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>24/7 Support</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Globe className="h-4 w-4" />
                      <span>Global Coverage</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary Contact Methods */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferred Contact Methods</h3>
                
                {/* Book Consultation - Featured */}
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white flex-shrink-0 shadow-lg">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">Book a Free Consultation</h4>
                      <p className="text-sm text-gray-600 mb-3">Get personalized financial insights in a 30-minute session</p>
                      <a
                        href="https://calendly.com/cfoedge360/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Now - It's Free
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email Contact */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-white flex-shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">Email Us</h4>
                      <a 
                        href="mailto:reaz@cfoedge360.com" 
                        className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
                      >
                        reaz@cfoedge360.com
                      </a>
                      <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span>Response within 24 hours</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone Contact */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 text-white flex-shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">Call Us Directly</h4>
                      <div className="space-y-1">
                        <div>
                          <span className="text-sm text-gray-500">US:</span>
                          <a href="tel:+15055232471" className="ml-2 text-blue-600 hover:text-blue-700 font-medium">
                            +1 505 523 2471
                          </a>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">BD:</span>
                          <a href="tel:+8801713301465" className="ml-2 text-blue-600 hover:text-blue-700 font-medium">
                            +880 1713-301465
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>Available across all time zones</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Contact */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white flex-shrink-0">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.480-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.361.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">WhatsApp Chat</h4>
                      <p className="text-gray-600 mb-2">+88 01973 301465</p>
                      <a 
                        href="https://wa.me/8801973301465" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors duration-200"
                      >
                        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.480-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.361.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Start WhatsApp Chat
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Office Information</h3>
                
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 text-white flex-shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Headquarters</h4>
                      <address className="text-gray-600 not-italic leading-relaxed">
                        <div className="font-medium">ASTRAL PARADISE</div>
                        <div>Flat# 5/A, House-20, Road-25</div>
                        <div>Eastern Housing Pallabi</div>
                        <div>(Sujatnagar Balur Math)</div>
                        <div>Mirpur-12, Dhaka-1216</div>
                        <div className="font-medium mt-1">Bangladesh</div>
                      </address>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form and Additional Info */}
            <div className="space-y-6 mt-8 lg:mt-0">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <div className="text-left mb-6">
                <h3 className="text-2xl font-bold text-amber-500 mb-2 font-serif">
                  Send us a message
                </h3>
                <p className="text-gray-600">
                  Have a question or need assistance? Fill out the form below, and we’ll get back to you as soon as possible. Your inquiries are important to us!
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base min-h-[44px]"
                      placeholder="Your first name"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base min-h-[44px]"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base min-h-[44px]"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base min-h-[44px]"
                      placeholder="+88 01973 301465"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors duration-200 resize-none text-sm sm:text-base"
                    placeholder="Tell us about your business and how we can help..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-amber-500 text-white font-semibold rounded-xl hover:bg-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-h-[44px] text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Schedule a Consultation
                      <Send className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm">
                      Thank you! We'll be in touch within 24 hours to schedule your consultation.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">
                      Something went wrong. Please try again or email us directly at reaz@cfoedge360.com
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* Business Hours - Outside form container */}
            <div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white flex-shrink-0">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span className="font-medium">9:00 AM - 6:00 PM (GMT+6)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span className="font-medium">10:00 AM - 4:00 PM (GMT+6)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="text-amber-600 font-medium">Emergency Only</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-blue-200">
                      <div className="flex items-center space-x-1 text-blue-700">
                        <Globe className="h-3 w-3" />
                        <span className="text-xs font-medium">Available for global clients across all time zones</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media & Follow - Outside form container */}
            <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect & Follow</h3>
              <p className="text-gray-600 text-sm mb-4">Stay updated with our latest insights, financial tips, and business growth strategies.</p>
              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com/company/cfoedge360"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
                <a
                  href="https://www.facebook.com/cfoedge360/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <Facebook className="h-4 w-4" />
                  <span className="text-sm font-medium">Facebook</span>
                </a>
                <a
                  href="https://wa.me/8801973301465"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.480-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.361.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span className="text-sm font-medium">WhatsApp</span>
                </a>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
