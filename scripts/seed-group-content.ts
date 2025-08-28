export const seedGroupContent = () => {
  const groupContents = [
    // رستوران
    {
      groupId: "restaurant",
      groupTitle: "رستوران",
      items: [
        {
          id: "1",
          title: "کباب کوبیده",
          description: "کباب کوبیده تازه با برنج زعفرانی و سالاد",
          price: 180000,
          category: "کباب",
          available: true,
          order: 1,
        },
        {
          id: "2",
          title: "قورمه سبزی",
          description: "خورش قورمه سبزی با گوشت و لوبیا قرمز",
          price: 150000,
          category: "خورش",
          available: true,
          order: 2,
        },
        {
          id: "3",
          title: "ماهی شکم پر",
          description: "ماهی تازه خلیج فارس با برنج و سبزی",
          price: 220000,
          category: "غذای دریایی",
          available: true,
          order: 3,
        },
        {
          id: "4",
          title: "فسنجان",
          description: "خورش فسنجان با مرغ و آلو",
          price: 160000,
          category: "خورش",
          available: true,
          order: 4,
        },
      ],
    },
    // فست فود
    {
      groupId: "fastfood",
      groupTitle: "فست فود",
      items: [
        {
          id: "1",
          title: "برگر مخصوص",
          description: "برگر گوشت با پنیر، کاهو، گوجه و سس مخصوص",
          price: 85000,
          category: "برگر",
          available: true,
          order: 1,
        },
        {
          id: "2",
          title: "پیتزا مارگاریتا",
          description: "پیتزا با پنیر موزارلا و ریحان تازه",
          price: 120000,
          category: "پیتزا",
          available: true,
          order: 2,
        },
        {
          id: "3",
          title: "ساندویچ مرغ",
          description: "ساندویچ مرغ سوخاری با سس مایونز",
          price: 65000,
          category: "ساندویچ",
          available: true,
          order: 3,
        },
        {
          id: "4",
          title: "سیب زمینی سرخ کرده",
          description: "سیب زمینی برشته شده با نمک و ادویه",
          price: 35000,
          category: "پیش غذا",
          available: true,
          order: 4,
        },
      ],
    },
    // کبابی
    {
      groupId: "kebab",
      groupTitle: "کبابی",
      items: [
        {
          id: "1",
          title: "کباب برگ",
          description: "کباب برگ گوشت گوسفندی با برنج زعفرانی",
          price: 200000,
          category: "کباب",
          available: true,
          order: 1,
        },
        {
          id: "2",
          title: "جوجه کباب",
          description: "جوجه کباب با زعفران و برنج",
          price: 170000,
          category: "کباب",
          available: true,
          order: 2,
        },
        {
          id: "3",
          title: "کباب چنجه",
          description: "کباب چنجه گوشت گوساله با برنج",
          price: 190000,
          category: "کباب",
          available: true,
          order: 3,
        },
        {
          id: "4",
          title: "کباب بختیاری",
          description: "ترکیب کباب کوبیده و جوجه کباب",
          price: 210000,
          category: "کباب",
          available: true,
          order: 4,
        },
      ],
    },
    // کافی شاپ
    {
      groupId: "cafe",
      groupTitle: "کافی شاپ",
      items: [
        {
          id: "1",
          title: "قهوه اسپرسو",
          description: "قهوه اسپرسو تازه دم با دانه‌های برزیلی",
          price: 25000,
          category: "قهوه",
          available: true,
          order: 1,
        },
        {
          id: "2",
          title: "کاپوچینو",
          description: "کاپوچینو با شیر بخار شده و دارچین",
          price: 35000,
          category: "قهوه",
          available: true,
          order: 2,
        },
        {
          id: "3",
          title: "کیک شکلاتی",
          description: "کیک شکلاتی خانگی با کرم شکلات",
          price: 45000,
          category: "شیرینی",
          available: true,
          order: 3,
        },
        {
          id: "4",
          title: "چای ماسالا",
          description: "چای ماسالا با ادویه‌های هندی",
          price: 20000,
          category: "چای",
          available: true,
          order: 4,
        },
      ],
    },
    // گشت و گذار
    {
      groupId: "tour",
      groupTitle: "گشت و گذار",
      items: [
        {
          id: "1",
          title: "ترانسفر فرودگاه عسلویه",
          description: "سرویس رفت و برگشت از فرودگاه عسلویه با خودروی مدرن",
          price: 150000,
          category: "ترانسفر",
          available: true,
          order: 1,
        },
        {
          id: "2",
          title: "ترانسفر بندرعباس",
          description: "سرویس ترانسفر از بندرعباس به مقصد",
          price: 200000,
          category: "ترانسفر",
          available: true,
          order: 2,
        },
        {
          id: "3",
          title: "تور ساحل مکسر",
          description: "بازدید از ساحل زیبای مکسر با صخره‌های شگفت‌انگیز",
          price: 120000,
          category: "تور گردشگری",
          available: true,
          order: 3,
        },
        {
          id: "4",
          title: "تور گردنه عشاق",
          description: "بازدید از گردنه عشاق با مناظر رمانتیک",
          price: 100000,
          category: "تور گردشگری",
          available: true,
          order: 4,
        },
        {
          id: "5",
          title: "تور جزیره مارو",
          description: "سفر به جزیره مارو با قایق و بازدید از جاذبه‌ها",
          price: 180000,
          category: "تور گردشگری",
          available: true,
          order: 5,
        },
        {
          id: "6",
          title: "تور تنگه بوچیر",
          description: "کاوش در تنگه بوچیر با آبشار و قندیل‌های زیبا",
          price: 140000,
          category: "تور گردشگری",
          available: true,
          order: 6,
        },
      ],
    },
  ]

  // ذخیره در localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("groupContents", JSON.stringify(groupContents))
    console.log("[v0] Group contents seeded successfully")
  }
}

// اجرای خودکار
if (typeof window !== "undefined") {
  seedGroupContent()
}
