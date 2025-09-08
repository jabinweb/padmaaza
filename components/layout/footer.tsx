import Link from 'next/link'
import { Linkedin, Facebook, Instagram, Mail, Phone, MapPin, Award, Truck, Shield } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
          
          {/* Company Info - Full width on mobile */}
          <div className="lg:col-span-2 mb-6 lg:mb-0">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-orange-400 mb-2">Padmaaja</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                India's leading manufacturer and exporter of premium Basmati rice and multigrain flour. 
                Committed to delivering authentic quality and taste that has been trusted for generations.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 mt-1 flex-shrink-0" />
                <div className="text-xs sm:text-sm">
                  <p className="font-medium">Corporate Office</p>
                  <p className="text-gray-400">11B/79, Vrindavan Colony, Lucknow - 226029</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
                <div className="text-xs sm:text-sm">
                  <a href="tel:+91-9475758817" className="hover:text-orange-400 transition-colors">
                    +91-9475758817
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
                <div className="text-xs sm:text-sm">
                  <a href="mailto:info@padmaaja.com" className="hover:text-orange-400 transition-colors">
                    info@padmaaja.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Menu sections - Responsive layout */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              
              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-white">Quick Links</h4>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  <li><Link href="/about" className="text-gray-400 hover:text-orange-400 transition-colors">About Us</Link></li>
                  <li><Link href="/products" className="text-gray-400 hover:text-orange-400 transition-colors">Our Products</Link></li>
                  <li><Link href="/partnership" className="text-gray-400 hover:text-orange-400 transition-colors">Partnership</Link></li>
                  <li><Link href="/wholesaler" className="text-gray-400 hover:text-orange-400 transition-colors">Become Wholesaler</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">Contact Us</Link></li>
                </ul>
              </div>

              {/* Business Solutions */}
              <div>
                <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-white">Business</h4>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  <li><Link href="/wholesaler" className="text-gray-400 hover:text-orange-400 transition-colors">Distributor Program</Link></li>
                  <li><Link href="/partnership" className="text-gray-400 hover:text-orange-400 transition-colors">Business Partnership</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">Private Label</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">Export Inquiry</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">Franchise</Link></li>
                </ul>
              </div>

              {/* Legal & Support - Responsive column spanning */}
              <div className="col-span-2 lg:col-span-1">
                <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 text-white">Support</h4>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm grid grid-cols-2 lg:grid-cols-1 gap-x-4 lg:gap-x-0">
                  <li><Link href="/orders" className="text-gray-400 hover:text-orange-400 transition-colors">Track Order</Link></li>
                  <li><Link href="/profile" className="text-gray-400 hover:text-orange-400 transition-colors">My Account</Link></li>
                  <li><Link href="/terms-of-service" className="text-gray-400 hover:text-orange-400 transition-colors">Terms of Service</Link></li>
                  <li><Link href="/privacy-policy" className="text-gray-400 hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/refund-policy" className="text-gray-400 hover:text-orange-400 transition-colors">Refund Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800">
          <div className="flex flex-col space-y-4 sm:space-y-6 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center">
            
            {/* Social Media */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6">
              <span className="text-sm font-medium text-gray-400">Follow Us:</span>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
                </Link>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <span className="text-sm font-medium text-gray-400">Stay Updated:</span>
              <div className="flex w-full sm:w-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 sm:flex-none px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-sm focus:outline-none focus:border-orange-400 text-white placeholder-gray-500 w-full sm:w-48"
                />
                <button className="px-3 sm:px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-400 space-y-2 sm:space-y-0">
            <div>
              <p>&copy; 2024 Padmaaja. All rights reserved.</p>
            </div>
            <div>
              <p>Crafted with ❤️ for authentic Indian taste</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}