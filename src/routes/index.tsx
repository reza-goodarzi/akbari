import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ShoppingBag, Wrench, Shield, TrendingUp } from 'lucide-react'


export const Route = createFileRoute('/')({ component: App })


function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          فروشگاه لوازم یدکی خودرو
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
          تامین کننده انواع سوکت و قطعات الکتریکی خودرو با کیفیت عالی و قیمت
          مناسب
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/products">
            <Button size="lg" className="text-lg px-8">
              <ShoppingBag className="ml-2" />
              مشاهده محصولات
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-800/50 rounded-xl p-6 text-center">
            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">کیفیت تضمینی</h3>
            <p className="text-slate-300">
              تمامی محصولات ما با کیفیت عالی و گارانتی اصالت کالا ارائه می‌شود
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 text-center">
            <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              تنوع محصولات
            </h3>
            <p className="text-slate-300">
              بیش از 27 نوع سوکت و قطعه الکتریکی برای انواع خودروهای ایرانی
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 text-center">
            <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">قیمت مناسب</h3>
            <p className="text-slate-300">
              بهترین قیمت‌ها در بازار با امکان مقایسه و انتخاب
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-slate-800/50 rounded-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            درباره ما
          </h2>
          <div className="max-w-3xl mx-auto text-slate-300 text-lg leading-relaxed space-y-4">
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
          </div>
        </div>
      </section>
    </div>
  )
}
