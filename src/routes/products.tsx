import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { products } from "@/data/products";
import { useCartStore } from "@/stores/cart-store";
import { ShoppingCart, Package, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
});

const ITEMS_PER_PAGE = 9;

function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [animatedProducts, setAnimatedProducts] = useState<Set<string>>(new Set());
  const { addToCart, updateQuantity, removeFromCart, getItemQuantity } = useCartStore();

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleAddToCart = (product: (typeof products)[0]) => {
    if (product.stock > 0) {
      const currentQuantity = getItemQuantity(product.id);
      if (currentQuantity === 0) {
        // First time adding - trigger animation
        setAnimatedProducts((prev) => new Set(prev).add(product.id));
        setTimeout(() => {
          setAnimatedProducts((prev) => {
            const newSet = new Set(prev);
            newSet.delete(product.id);
            return newSet;
          });
        }, 600);
      }
      addToCart(product, 1);
    }
  };

  const handleIncrement = (product: (typeof products)[0]) => {
    const currentQuantity = getItemQuantity(product.id);
    if (currentQuantity < product.stock) {
      updateQuantity(product.id, currentQuantity + 1);
    }
  };

  const handleDecrement = (product: (typeof products)[0]) => {
    const currentQuantity = getItemQuantity(product.id);
    if (currentQuantity > 1) {
      updateQuantity(product.id, currentQuantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">محصولات ما</h1>
          <p className="text-slate-300 text-lg">
            انتخاب از بین {products.length} محصول با کیفیت
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentProducts.map((product) => {
            const quantity = getItemQuantity(product.id);
            const isInCart = quantity > 0;
            const isAnimating = animatedProducts.has(product.id);

            return (
              <motion.div
                key={product.id}
                initial={false}
                animate={isAnimating ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.6 }}
              >
                <Card
                  className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-white text-lg">
                        {product.name}
                      </CardTitle>
                      <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        {product.code}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">قیمت:</span>
                        <span className="text-green-400 font-bold text-xl">
                          {product.price.toLocaleString("fa-IR")} تومان
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">موجودی:</span>
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-slate-400" />
                          <span
                            className={`font-semibold ${
                              product.stock > 0 ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {product.stock > 0 ? `${product.stock} عدد` : "ناموجود"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <AnimatePresence mode="wait">
                      {!isInCart ? (
                        <motion.div
                          key="add-button"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="w-full"
                        >
                          <Button
                            onClick={() => handleAddToCart(product)}
                            disabled={product.stock === 0}
                            className="w-full"
                            variant={product.stock > 0 ? "default" : "secondary"}
                          >
                            <ShoppingCart className="ml-2 w-4 h-4" />
                            {product.stock > 0 ? "افزودن به سبد خرید" : "ناموجود"}
                          </Button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="quantity-controls"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="w-full flex items-center gap-2"
                        >
                          <Button
                            onClick={() => handleDecrement(product)}
                            variant="outline"
                            size="icon"
                            className="flex-shrink-0"
                          >
                            {quantity === 1 ? (
                              <Trash2 className="w-4 h-4" />
                            ) : (
                              <Minus className="w-4 h-4" />
                            )}
                          </Button>
                          <div className="flex-1 text-center">
                            <span className="text-white font-semibold text-lg">
                              {quantity}
                            </span>
                          </div>
                          <Button
                            onClick={() => handleIncrement(product)}
                            variant="outline"
                            size="icon"
                            className="flex-shrink-0"
                            disabled={quantity >= product.stock}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) {
                        setCurrentPage(currentPage + 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
