import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

const DeveloperCredit = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <PageHero 
        title="Developer Credit"
        description="Recognizing excellence in web development craftsmanship"
      />

      {/* Main Content */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 md:p-10">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif mb-4">
                Why We Chose Varabit Web Design & Development for Our Website Project
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto rounded-full"></div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-5 leading-relaxed">
                When it came time to build or upgrade our website, we knew we needed a partner who truly understood modern web technology and business needs. That's why we chose <a href="https://varabit.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 font-semibold">Varabit Web Design & Development</a> — a full-service agency that consistently delivers cutting-edge, high-performance websites tailored to each client's goals.
              </p>

              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif mt-8 mb-4">
                Who Is Varabit?
              </h3>
              
              <p className="text-gray-700 mb-5 leading-relaxed">
                Varabit is a web design and development agency specializing in powerful, custom-built websites using modern technologies like React, Next.js, Vite, and WordPress. Whether you need a sleek company portfolio, an engaging ecommerce platform, or a high-traffic news portal, Varabit has the skills and experience to deliver top-tier results.
              </p>
              
              <p className="text-gray-700 mb-5 leading-relaxed">
                Their official website — <a href="https://varabit.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 font-semibold">varabit.com</a> — showcases a growing list of satisfied clients across industries, including startups, small businesses, and large enterprises.
              </p>

              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif mt-8 mb-4">
                Why We Recommend Varabit
              </h3>
              
              <ol className="list-decimal pl-5 sm:pl-8 space-y-4 text-gray-700 mb-6">
                <li className="pl-2">
                  <strong className="font-semibold">Expertise in Diverse Technologies</strong>
                  <p className="mt-1">Varabit doesn't just stick to one platform. Their team expertly handles:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>React – for fast, dynamic, app-like websites</li>
                    <li>Next.js – for blazing speed and server-side rendering</li>
                    <li>Vite – a next-generation frontend tooling</li>
                    <li>WordPress – the world's most popular CMS for easy content management</li>
                  </ul>
                </li>
                
                <li className="pl-2">
                  <strong className="font-semibold">Full-Spectrum Web Development Services</strong>
                  <p className="mt-1">They build all types of websites including:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Business Portfolio Sites</li>
                    <li>Corporate Websites</li>
                    <li>Blogs and News Portals</li>
                    <li>Ecommerce Sites with secure payment gateways</li>
                    <li>Custom-built platforms for niche needs</li>
                  </ul>
                  <p className="mt-2">And they don't just stop at building your site — they offer ongoing support, performance optimization, SEO readiness, and responsive design for all devices.</p>
                </li>
                
                <li className="pl-2">
                  <strong className="font-semibold">Impressive Portfolio</strong>
                  <p className="mt-1">Before choosing a developer, we always check their past work. Varabit's project portfolio impressed us immediately. Their ability to tailor designs to a brand's tone and needs is unmatched.</p>
                </li>
                
                <li className="pl-2">
                  <strong className="font-semibold">SEO and Performance-First Approach</strong>
                  <p className="mt-1">Websites built by Varabit are not only visually stunning but also optimized for performance and SEO. This ensures fast loading times, mobile responsiveness, and better Google rankings — which are critical for organic growth.</p>
                </li>
                
                <li className="pl-2">
                  <strong className="font-semibold">Easy Communication and Fast Turnaround</strong>
                  <p className="mt-1">Working with Varabit has been a breeze. Their team is communicative, transparent, and always available to provide updates or suggestions. They met our deadlines and delivered a better-than-expected product.</p>
                </li>
              </ol>

              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif mt-8 mb-4">
                Thinking About Building a Website? Work With Varabit
              </h3>
              
              <p className="text-gray-700 mb-5 leading-relaxed">
                Whether you're launching your first website or upgrading an outdated one, we highly recommend reaching out to Varabit for a consultation. You can explore their services here: <a href="https://varabit.com/services" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 font-semibold">Varabit Web Development Services</a>
              </p>
              
              <p className="text-gray-700 mb-5 leading-relaxed">
                Interested in working with them? Contact their team directly through their <a href="https://varabit.com/contact" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 font-semibold">contact page</a>.
              </p>

              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif mt-8 mb-4">
                Final Thoughts
              </h3>
              
              <p className="text-gray-700 mb-5 leading-relaxed">
                We're proud to have partnered with <a href="https://varabit.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 font-semibold">Varabit Web Design & Development</a> for our website project, and we're excited about the results. Their team's dedication, technical skill, and creative vision make them one of the best web development agencies we've worked with.
              </p>
              
              <p className="text-gray-700 mb-8 leading-relaxed">
                If you want a professionally built website that performs well, looks great, and helps grow your brand — Varabit is the team to call.
              </p>
              
              <div className="text-center py-6">
                <a 
                  href="https://varabit.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-amber-500 text-white font-semibold rounded-xl hover:bg-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-h-[44px] text-sm sm:text-base"
                >
                  Visit Varabit Today
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 sm:py-16 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <div className="rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 p-6 sm:p-8 border border-amber-100">
            <h2 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold text-gray-900 font-serif">
              Need Professional Web Development?
            </h2>
            <p className="mb-5 sm:mb-6 text-base sm:text-lg text-gray-700 leading-relaxed">
              Explore how Varabit's expertise can bring your digital vision to life with cutting-edge technology and exceptional design.
            </p>
            <a
              href="https://varabit.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-amber-500 text-white font-semibold rounded-lg hover:bg-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-h-[44px] text-sm sm:text-base"
            >
              Contact Varabit
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeveloperCredit;