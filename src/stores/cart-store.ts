import { create } from 'zustand'
import { Product } from '@/data/products'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
  getItemQuantity: (productId: string) => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addToCart: (product: Product, quantity: number) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      )

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity
        if (newQuantity > product.stock) {
          return state // Don't add if exceeds stock
        }
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: newQuantity }
              : item
          ),
        }
      }

      if (quantity > product.stock) {
        return state // Don't add if exceeds stock
      }

      return {
        items: [...state.items, { product, quantity }],
      }
    })
  },

  removeFromCart: (productId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }))
  },

  updateQuantity: (productId: string, quantity: number) => {
    set((state) => {
      const item = state.items.find((item) => item.product.id === productId)
      if (!item) return state

      if (quantity <= 0) {
        return {
          items: state.items.filter((item) => item.product.id !== productId),
        }
      }

      if (quantity > item.product.stock) {
        return state // Don't update if exceeds stock
      }

      return {
        items: state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        ),
      }
    })
  },

  clearCart: () => {
    set({ items: [] })
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },

  getItemQuantity: (productId: string) => {
    const item = get().items.find((item) => item.product.id === productId)
    return item ? item.quantity : 0
  },
}))

