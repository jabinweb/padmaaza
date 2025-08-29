import Link from 'next/link'
import { Linkedin, Facebook, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-gray-300">About Us</Link></li>
              <li><Link href="/#values" className="hover:text-gray-300">Our Values</Link></li>
              <li><Link href="/careers" className="hover:text-gray-300">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products/multigrain-flour" className="hover:text-gray-300">Multigrain Flour</Link></li>
              <li><Link href="/products/premium-basmati-rice" className="hover:text-gray-300">Basmati Rice</Link></li>
              <li><Link href="/products/non-basmati-rice" className="hover:text-gray-300">Non-Basmati Rice</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Certifications</h3>
            <ul className="space-y-2 text-sm">
              <li>ISO 9001</li>
              <li>ISO 14001</li>
              <li>ISO 22000</li>
              <li>HACCP</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>11B, 79 Vrindavan Yojna, Lucknow, Uttar Pradesh 226029</li>
              <li>Phone: +91 94757 58817</li>
              <li>Email: <a href="mailto:srajeev7053@gmail.com" className="hover:text-gray-300">srajeev7053@gmail.com</a></li>
              <li>Website: <a href="https://www.padmaajarasooi.in" className="hover:text-gray-300">www.padmaajarasooi.in</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-green-700 pt-6">
          <div className="flex justify-center space-x-6">
            <Link href="#"><Linkedin className="h-6 w-6 hover:text-gray-300"/></Link>
            <Link href="#"><Facebook className="h-6 w-6 hover:text-gray-300"/></Link>
            <Link href="#"><Instagram className="h-6 w-6 hover:text-gray-300"/></Link>
          </div>
        </div>
      </div>
    </footer>
  )
}