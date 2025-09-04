import Link from 'next/link'
import { Linkedin, Facebook, Instagram, Mail, Phone, MapPin, Award, Truck, Shield } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-orange-400 mb-2">Padmaaja</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                India's leading manufacturer and exporter of premium Basmati rice and multigrain flour. 
                Committed to delivering authentic quality and taste that has been trusted for generations.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-400 mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium">Corporate Office</p>
                  <p className="text-gray-400">11-B/79, Brij Vihar, Sector 11,<br />Vrindavan Colony, Lucknow - 226029</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-400" />
                <div className="text-sm">
                  <a href="tel:+91-9454906009" className="hover:text-orange-400 transition-colors">
                    +91-9454906009
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-400" />
                <div className="text-sm">
                  <a href="mailto:info@padmaaja.com" className="hover:text-orange-400 transition-colors">
                    info@padmaaja.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-400 hover:text-orange-400 transition-colors">About Us</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-orange-400 transition-colors">Our Products</Link></li>
              <li><Link href="/partnership" className="text-gray-400 hover:text-orange-400 transition-colors">Partnership</Link></li>
              <li><Link href="/wholesaler" className="text-gray-400 hover:text-orange-400 transition-colors">Become Wholesaler</Link></li>
              <li><Link href="/bulk-supply" className="text-gray-400 hover:text-orange-400 transition-colors">Bulk Supply</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Business Solutions */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Business</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/wholesaler" className="text-gray-400 hover:text-orange-400 transition-colors">Distributor Program</Link></li>
              <li><Link href="/bulk-supply" className="text-gray-400 hover:text-orange-400 transition-colors">Bulk Orders</Link></li>
              <li><Link href="/partnership" className="text-gray-400 hover:text-orange-400 transition-colors">Business Partnership</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">Private Label</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">Export Inquiry</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">Franchise</Link></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/orders" className="text-gray-400 hover:text-orange-400 transition-colors">Track Order</Link></li>
              <li><Link href="/profile" className="text-gray-400 hover:text-orange-400 transition-colors">My Account</Link></li>
              <li><Link href="/terms-of-service" className="text-gray-400 hover:text-orange-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="text-gray-400 hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund-policy" className="text-gray-400 hover:text-orange-400 transition-colors">Refund Policy</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">Help Center</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            
            {/* Social Media */}
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <span className="text-sm font-medium text-gray-400">Follow Us:</span>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <Facebook className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                  <Instagram className="h-6 w-6" />
                </Link>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-400">Stay Updated:</span>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-sm focus:outline-none focus:border-orange-400 text-white placeholder-gray-500"
                />
                <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div>
              <p>&copy; 2024 Padmaaja. All rights reserved.</p>
            </div>
            <div className="mt-2 md:mt-0">
              <p>Crafted with ❤️ for authentic Indian taste</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}