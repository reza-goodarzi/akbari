import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Menu, X, ShoppingCart, Home, Package } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { getTotalItems } = useCart()
  const cartItemsCount = getTotalItems()

  return (
    <>
      <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-white"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
              <Link to="/" className="text-xl font-bold text-white">
                لوازم یدکی خودرو
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-slate-300 hover:text-white transition-colors"
                activeProps={{
                  className: 'text-white font-semibold',
                }}
              >
                <Home className="w-5 h-5 inline ml-1" />
                خانه
              </Link>
              <Link
                to="/products"
                className="text-slate-300 hover:text-white transition-colors"
                activeProps={{
                  className: 'text-white font-semibold',
                }}
              >
                <Package className="w-5 h-5 inline ml-1" />
                محصولات
              </Link>
              <Link to="/cart" className="relative">
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </Link>
            </nav>

            <div className="md:hidden">
              <Link to="/cart" className="relative">
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-slate-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <h2 className="text-xl font-bold">منو</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors mb-2',
            }}
          >
            <Home size={20} />
            <span className="font-medium">خانه</span>
          </Link>

          <Link
            to="/products"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors mb-2',
            }}
          >
            <Package size={20} />
            <span className="font-medium">محصولات</span>
          </Link>

          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors mb-2',
            }}
          >
            <ShoppingCart size={20} />
            <span className="font-medium">
              سبد خرید
              {cartItemsCount > 0 && (
                <span className="mr-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </span>
          </Link>
        </nav>
      </aside>
    </>
  )
}
