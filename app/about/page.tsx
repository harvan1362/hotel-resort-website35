import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">درباره مجتمع اقامتی دریاکنار</h1>

          <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed space-y-6">
            <p>
              مجتمع تفریحی اقامتی دریاکنار بندر مقام در قلب طبیعت بکر و زیبای خلیج فارس واقع شده است. این مجتمع با
              بهره‌گیری از معماری مدرن و امکانات روز دنیا، تجربه‌ای فراموش‌نشدنی از اقامت در کنار دریا را برای شما فراهم
              می‌کند.
            </p>

            <p>
              ما در دریاکنار بندر مقام با ارائه خدمات درجه یک و امکانات کامل تفریحی، رستوران، کافی‌شاپ و اقامتگاه، محیطی
              آرام و دلنشین برای تمامی اعضای خانواده فراهم کرده‌ایم.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-800">چشم‌انداز ما</h3>
                <p className="text-gray-700">
                  تبدیل شدن به برترین مقصد تفریحی و اقامتی در منطقه خلیج فارس با ارائه خدمات بی‌نظیر و تجربه‌های ماندگار.
                </p>
              </div>

              <div className="bg-teal-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-teal-800">ماموریت ما</h3>
                <p className="text-gray-700">
                  ایجاد فضایی گرم و صمیمی برای خانواده‌ها با بهره‌گیری از طبیعت زیبای ساحلی و ارائه خدمات استاندارد
                  بین‌المللی.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mt-12 mb-6">امکانات و خدمات</h2>
            <ul className="grid md:grid-cols-2 gap-4">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                اتاق‌های مجهز با نمای دریا
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                رستوران با غذاهای محلی و بین‌المللی
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                کافی‌شاپ و فست‌فود
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                امکانات ورزشی و تفریحی
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                دسترسی مستقیم به ساحل
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                پارکینگ اختصاصی
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
