import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ShoppingBag, Wrench, Shield, TrendingUp } from 'lucide-react'
import { motion } from 'motion/react'


export const Route = createFileRoute('/')({ component: App })


function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-white mb-6"
        >
          فروشگاه لوازم یدکی خودرو
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto"
        >
          تامین کننده انواع سوکت و قطعات الکتریکی خودرو با کیفیت عالی و قیمت
          مناسب
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex gap-4 justify-center"
        >
          <Link to="/products">
            <Button size="lg" className="text-lg px-8">
              <ShoppingBag className="ml-2" />
              مشاهده محصولات
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="bg-slate-800/50 rounded-xl p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-white mb-2">کیفیت تضمینی</h3>
            <p className="text-slate-300">
              تمامی محصولات ما با کیفیت عالی و گارانتی اصالت کالا ارائه می‌شود
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-slate-800/50 rounded-xl p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Wrench className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-white mb-2">
              تنوع محصولات
            </h3>
            <p className="text-slate-300">
              بیش از 27 نوع سوکت و قطعه الکتریکی برای انواع خودروهای ایرانی
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-slate-800/50 rounded-xl p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <TrendingUp className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-white mb-2">قیمت مناسب</h3>
            <p className="text-slate-300">
              بهترین قیمت‌ها در بازار با امکان مقایسه و انتخاب
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-800/50 rounded-xl p-8 md:p-12"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl font-bold text-white mb-6 text-center"
          >
            درباره ما
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-3xl mx-auto text-slate-300 text-lg leading-relaxed space-y-4"
          >
            <p>
              فروشگاه لوازم یدکی خودرو با بیش از 10 سال تجربه در زمینه تامین و
              فروش انواع سوکت و قطعات الکتریکی خودرو، یکی از معتبرترین مراکز
              فروش در این حوزه محسوب می‌شود.
            </p>
            <p>
              ما با ارائه محصولات با کیفیت و اصیل، سعی داریم نیازهای مشتریان
              خود را به بهترین شکل ممکن برطرف کنیم. تمامی محصولات ما دارای
              گارانتی اصالت کالا بوده و با بهترین قیمت‌ها در بازار ارائه
              می‌شوند.
            </p>
            <p>
              محصولات ما شامل انواع سوکت‌های دوخانه، سه‌خانه، سوزنی، رله،
              مقاومت فن و سایر قطعات الکتریکی برای خودروهای پراید، پژو 206،
              پژو 405 و سایر خودروهای ایرانی می‌باشد.
            </p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
