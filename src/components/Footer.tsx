import { Instagram, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* درباره ما */}
          <div>
            <h3 className="text-xl font-bold mb-4">درباره ما</h3>
            <p className="text-slate-300 leading-relaxed">
              فروشگاه لوازم یدکی خودرو با بیش از 10 سال تجربه در زمینه تامین و
              فروش انواع سوکت و قطعات الکتریکی خودرو. ما با کیفیت ترین محصولات
              را با بهترین قیمت به شما ارائه می‌دهیم.
            </p>
          </div>

          {/* اطلاعات تماس */}
          <div>
            <h3 className="text-xl font-bold mb-4">اطلاعات تماس</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>تهران، خیابان ولیعصر، پلاک 123</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>021-12345678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>info@example.com</span>
              </li>
            </ul>
          </div>

          {/* شبکه‌های اجتماعی */}
          <div>
            <h3 className="text-xl font-bold mb-4">شبکه‌های اجتماعی</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Instagram className="w-6 h-6" />
                <span>اینستاگرام</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>© {new Date().getFullYear()} تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}
