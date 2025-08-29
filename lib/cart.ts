interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string | null
}

interface Product {
  id: string
  name: string
  price: number
  discount: number
  images: string[]
  stock: number
}

class CartManager {
  private cartKey = 'shopping-cart'

  private getDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount / 100)
  }

  getCart(): CartItem[] {
    if (typeof window === 'undefined') return []
    
    try {
      const cart = localStorage.getItem(this.cartKey)
      return cart ? JSON.parse(cart) : []
    } catch (error) {
      console.error('Error getting cart:', error)
      return []
    }
  }

  saveCart(cart: CartItem[]): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(this.cartKey, JSON.stringify(cart))
      // Dispatch custom event to notify components about cart updates
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }))
    } catch (error) {
      console.error('Error saving cart:', error)
    }
  }

  addToCart(product: Product, quantity: number = 1): boolean {
    if (product.stock < quantity) {
      return false
    }

    const cart = this.getCart()
    const existingItemIndex = cart.findIndex(item => item.id === product.id)

    if (existingItemIndex >= 0) {
      const newQuantity = cart[existingItemIndex].quantity + quantity
      if (newQuantity > product.stock) {
        return false
      }
      cart[existingItemIndex].quantity = newQuantity
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: this.getDiscountedPrice(product.price, product.discount),
        quantity,
        image: product.images[0] || null
      })
    }

    this.saveCart(cart)
    return true
  }

  removeFromCart(productId: string): void {
    const cart = this.getCart()
    const updatedCart = cart.filter(item => item.id !== productId)
    this.saveCart(updatedCart)
  }

  updateQuantity(productId: string, quantity: number): boolean {
    if (quantity <= 0) {
      this.removeFromCart(productId)
      return true
    }

    const cart = this.getCart()
    const itemIndex = cart.findIndex(item => item.id === productId)
    
    if (itemIndex >= 0) {
      cart[itemIndex].quantity = quantity
      this.saveCart(cart)
      return true
    }
    return false
  }

  clearCart(): void {
    this.saveCart([])
  }

  getTotalPrice(): number {
    const cart = this.getCart()
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  // Add alias for compatibility
  getCartTotal(): number {
    return this.getTotalPrice()
  }

  getTotalItems(): number {
    const cart = this.getCart()
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  getItemCount(): number {
    return this.getCart().length
  }

  getCartCount(): number {
    const cart = this.getCart()
    return cart.reduce((total, item) => total + item.quantity, 0)
  }
}

export const cartManager = new CartManager()
