'use client'

import { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ShoppingCart, X, Plus, Minus } from 'lucide-react'
import { cartManager } from '@/lib/cart'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string | null
}

interface CartSidebarProps {
  children?: React.ReactNode
}

export default function CartSidebar({ children }: CartSidebarProps) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const loadCart = () => {
    const cartItems = cartManager.getCart()
    setCart(cartItems)
  }

  useEffect(() => {
    loadCart()
    
    const handleCartUpdate = () => loadCart()
    window.addEventListener('cartUpdated', handleCartUpdate)
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate)
    }
  }, [])

  const updateQuantity = (productId: string, newQuantity: number) => {
    cartManager.updateQuantity(productId, newQuantity)
    loadCart()
  }

  const removeItem = (productId: string) => {
    cartManager.removeFromCart(productId)
    toast.success('Item removed from cart')
    loadCart()
  }

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cartManager.getTotalPrice()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children || (
          <Button variant="ghost" size="sm" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge 
                className="absolute -top-[5px] -right-[5px] h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white !text-xs"
              >
                {itemCount > 99 ? '99+' : itemCount}
              </Badge>
            )}
          </Button>
        )}
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Shopping Cart ({itemCount})
          </SheetTitle>
          <SheetDescription>
            Manage your cart items
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
              <Button 
                className="mt-4" 
                onClick={() => setIsOpen(false)}
                asChild
              >
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Image
                    src={item.image || 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg'}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                    
                    <div className="flex items-center space-x-1 mt-1">
                      <span className="text-sm font-bold text-gray-900">
                        ₹{(item.price || 0).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity || 0}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  className="w-full" 
                  onClick={() => setIsOpen(false)}
                  asChild
                >
                  <Link href="/checkout">Checkout</Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                  asChild
                >
                  <Link href="/cart">View Cart</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
                 