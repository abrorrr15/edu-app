import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Welcome to": "Welcome to",
      "Loading...": "Loading...",

      "Online Mode": "Online Mode",
      "Offline Mode": "Offline Mode",
      Language: "Language",
      Theme: "Theme",
      "Font Type": "Font Type",
      "Dark Theme": "Dark Theme",
      "Light Theme": "Light Theme",
      "Sans-serif": "Sans-serif",
      Serif: "Serif",
      Monospace: "Monospace",

      "READ AND LEARN": "READ AND LEARN",
      Home: "Home",
      Catalog: "Catalog",
      Liked: "Liked",
      Download: "Download",
      Settings: "Settings",
      Profile: "Profile",
      "Privacy Politics": "Privacy Politics",
      "About App": "About App",

      "Move to a Catalog": "Move to a Catalog",
      "Or create a new catalog": "Or create a new catalog:",
      "Enter new catalog name": "Enter new catalog name",
      "Create and Add": "Create and Add",
      Cancel: "Cancel",
      Error: "Error",
      "Please enter a valid catalog name.":
        "Please enter a valid catalog name.",
      "No book selected.": "No book selected.",
      Success: "Success",
      "Catalog created and book added": "Catalog created and book added!",
      "Failed to load offline books.": "Failed to load offline books.",
      "Failed to delete the book.": "Failed to delete the book.",
      "The book has been deleted": "The book has been deleted.",
      "Failed to add the book to the catalog.":
        "Failed to add the book to the catalog.",
      "The book has been added into the catalogs":
        "The book has been added into the catalogs!",

      "Search books...": "Search books...",

      Categories: "Categories",

      Delete: "Delete",
      Remove: "Remove",
      Create: "Create",
      Save: "Save",

      // Alerts and Modals
      "Delete Catalog": "Delete Catalog",
      "Are you sure you want to delete this catalog?":
        "Are you sure you want to delete this catalog?",
      "Catalog deleted successfully.": "Catalog deleted successfully.",
      "Delete Book": "Delete Book",
      "Are you sure you want to remove this book?":
        "Are you sure you want to remove this book?",
      "Book removed from catalog.": "Book removed from catalog.",
      "Catalog name cannot be empty.": "Catalog name cannot be empty.",
      "Catalog updated successfully.": "Catalog updated successfully.",
      "New catalog created successfully.": "New catalog created successfully.",

      // Page Content
      "My Book Catalogs": "My Book Catalogs",
      'No catalogs available. Press the "+" button to create a catalog!':
        'No catalogs available. Press the "+" button to create a catalog!',
      "Edit Catalog": "Edit Catalog",
      "New Catalog": "New Catalog",
      "Enter catalog name": "Enter catalog name",
      "No books in this catalog.": "No books in this catalog.",

      // General Actions
      Read: "Read",

      // Page Content
      "Liked Books": "Liked Books",
      "No liked books yet.": "No liked books yet.",

      // Alerts
      "Error fetching liked books": "Error fetching liked books",

      "Network Error": "Network Error",
      "Unable to fetch books. Please check your network connection.":
        "Unable to fetch books. Please check your network connection.",
      "Download Complete": "Download Complete",
      "The book is now available offline!":
        "The book is now available offline!",
      "Download Error": "Download Error",
      "Failed to save the book for offline access.":
        "Failed to save the book for offline access.",
      "Search books": "Search books",
      "No books found.": "No books found.",
      "More Books": "More Books",

      Confirmation: "Confirmation",
      "Are you sure you want to proceed?": "Are you sure you want to proceed?",
      Confirm: "Confirm",
      "Are you sure you want to delete this book?":
        "Are you sure you want to delete this book?",

      //PrivacyPolitics
      "Privacy Policy": "Privacy Policy",
      "privacy_policy.introduction.title": "1. Introduction",
      "privacy_policy.introduction.content":
        "We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and share your data when you use our app.",
      "privacy_policy.data_collection.title": "2. Data Collection",
      "privacy_policy.data_collection.content":
        "We collect information that you provide directly to us, such as your name, email address, and any other information you submit through the app.",
      "privacy_policy.data_usage.title": "3. How We Use Your Information",
      "privacy_policy.data_usage.content":
        "Your information is used to provide and improve our services. We may use your information for communication purposes, such as responding to your inquiries or sending updates.",
      "privacy_policy.third_party_sharing.title": "4. Third-Party Sharing",
      "privacy_policy.third_party_sharing.content":
        "We do not share your personal information with third parties, except in compliance with legal requirements or to provide services through third-party partners.",
      "privacy_policy.rights.title": "5. Your Rights",
      "privacy_policy.rights.content":
        "You have the right to access, update, or delete the personal information we have on file for you. Please contact us if you have any questions regarding your data privacy.",
      "privacy_policy.contact.title": "6. Contact Us",
      "privacy_policy.contact.content":
        "If you have any questions about this Privacy Policy or our practices, please contact us at fudent.technologies@gmail.com.",

      "about.title": "About EDU PLATFORM",
      "about.description1":
        "Welcome to EDU PLATFORM! This app is designed for teachers to easily upload and share books and lessons with students. Whether it's textbooks, supplementary reading, or interactive lessons, everything can be accessed in one place.",
      "about.description2":
        "Our mission is to create a seamless learning environment by allowing educators to distribute educational content directly to their students. Students can search, read, and explore a wide range of materials tailored to their coursework.",
      "about.description3":
        "We believe in empowering education through accessible and easy-to-use digital tools. Thank you for choosing EDU PLATFORM, and we hope it enhances your teaching and learning experience!",
      "about.developerTitle": "Developer Information",
      "about.developerDescription":
        "Connect with the developer on social media:",
      "about.telegram": "Telegram",
      "about.instagram": "Instagram",
      "about.version": "Version 1.0.0",

      "Development Preview": "Development Preview",
      "An upgraded experience is coming soon!":
        "An upgraded experience is coming soon!",
    },
  },
  ru: {
    translation: {
      "Welcome to": "Добро пожаловать в",
      "Loading...": "Загрузка...",

      "Online Mode": "Онлайн режим",
      "Offline Mode": "Офлайн режим",
      Language: "Язык",
      Theme: "Тема",
      "Font Type": "Тип шрифта",
      "Dark Theme": "Темная тема",
      "Light Theme": "Светлая тема",
      "Sans-serif": "Без засечек",
      Serif: "С засечками",
      Monospace: "Моноширинный",

      "READ AND LEARN": "ЧИТАЙ И ИЗУЧАЙ",
      Home: "Главная",
      Catalog: "Каталог",
      Liked: "Избранные",
      Download: "Загрузить",
      Settings: "Настройки",
      Profile: "Профиль",
      "Privacy Politics": "Политика конфиденциальности",
      "About App": "О приложении",

      "Move to a Catalog": "Переместить в каталог",
      "Or create a new catalog": "Или создайте новый каталог:",
      "Enter new catalog name": "Введите название нового каталога",
      "Create and Add": "Создать и добавить",
      Cancel: "Отмена",
      Error: "Ошибка",
      "Please enter a valid catalog name.":
        "Пожалуйста, введите допустимое название каталога.",
      "No book selected.": "Книга не выбрана.",
      Success: "Успех",
      "Catalog created and book added": "Каталог создан и книга добавлена!",
      "Failed to load offline books.": "Не удалось загрузить оффлайн-книги.",
      "Failed to delete the book.": "Не удалось удалить книгу.",
      "The book has been deleted": "Книга удалена.",
      "Failed to add the book to the catalog.":
        "Не удалось добавить книгу в каталог.",
      "The book has been added into the catalogs": "Книга добавлена в каталог!",

      "Search books...": "Поиск книг...",

      Categories: "Категории",

      Delete: "Удалить",
      Remove: "Убрать",
      Create: "Создать",
      Save: "Сохранить",

      // Alerts and Modals
      "Delete Catalog": "Удалить каталог",
      "Are you sure you want to delete this catalog?":
        "Вы уверены, что хотите удалить этот каталог?",
      "Catalog deleted successfully.": "Каталог успешно удален.",
      "Delete Book": "Удалить книгу",
      "Are you sure you want to remove this book?":
        "Вы уверены, что хотите удалить эту книгу?",
      "Book removed from catalog.": "Книга удалена из каталога.",
      "Catalog name cannot be empty.": "Имя каталога не может быть пустым.",
      "Catalog updated successfully.": "Каталог успешно обновлен.",
      "New catalog created successfully.": "Новый каталог успешно создан.",

      // Page Content
      "My Book Catalogs": "Мои книжные каталоги",
      'No catalogs available. Press the "+" button to create a catalog!':
        'Каталоги отсутствуют. Нажмите кнопку "+", чтобы создать каталог!',
      "Edit Catalog": "Редактировать каталог",
      "New Catalog": "Новый каталог",
      "Enter catalog name": "Введите название каталога",
      "No books in this catalog.": "В этом каталоге нет книг.",

      // General Actions
      Read: "Читать",

      // Page Content
      "Liked Books": "Избранные книги",
      "No liked books yet.": "Пока нет избранных книг.",

      // Alerts
      "Error fetching liked books": "Ошибка при получении избранных книг",

      "Network Error": "Ошибка сети",
      "Unable to fetch books. Please check your network connection.":
        "Не удалось загрузить книги. Пожалуйста, проверьте ваше сетевое соединение.",
      "Download Complete": "Загрузка завершена",
      "The book is now available offline!": "Книга теперь доступна оффлайн!",
      "Download Error": "Ошибка загрузки",
      "Failed to save the book for offline access.":
        "Не удалось сохранить книгу для оффлайн-доступа.",
      "Search books": "Поиск книг",
      "No books found.": "Книги не найдены.",
      "More Books": "Больше книг",

      Confirmation: "Подтверждение",
      "Are you sure you want to proceed?": "Вы уверены, что хотите продолжить?",
      Confirm: "Подтвердить",
      "Are you sure you want to delete this book?":
        "Вы уверены, что хотите удалить эту книгу?",

      //PrivacyPolitics
      "Privacy Policy": "Политика конфиденциальности",
      "privacy_policy.introduction.title": "1. Введение",
      "privacy_policy.introduction.content":
        "Мы ценим вашу конфиденциальность и стремимся защищать вашу личную информацию. Эта Политика конфиденциальности описывает, как мы собираем, используем и делимся вашими данными, когда вы используете наше приложение.",
      "privacy_policy.data_collection.title": "2. Сбор данных",
      "privacy_policy.data_collection.content":
        "Мы собираем информацию, которую вы предоставляете напрямую нам, такую как ваше имя, адрес электронной почты и любую другую информацию, которую вы отправляете через приложение.",
      "privacy_policy.data_usage.title": "3. Как мы используем вашу информацию",
      "privacy_policy.data_usage.content":
        "Ваша информация используется для предоставления и улучшения наших услуг. Мы можем использовать вашу информацию для целей связи, таких как ответ на ваши запросы или отправка обновлений.",
      "privacy_policy.third_party_sharing.title": "4. Передача третьим лицам",
      "privacy_policy.third_party_sharing.content":
        "Мы не передаем вашу личную информацию третьим лицам, за исключением случаев, предусмотренных законодательством или для предоставления услуг через третьих лиц.",
      "privacy_policy.rights.title": "5. Ваши права",
      "privacy_policy.rights.content":
        "Вы имеете право на доступ, обновление или удаление личной информации, которая у нас есть о вас. Пожалуйста, свяжитесь с нами, если у вас есть вопросы по поводу вашей конфиденциальности данных.",
      "privacy_policy.contact.title": "6. Свяжитесь с нами",
      "privacy_policy.contact.content":
        "Если у вас есть вопросы по этой Политике конфиденциальности или нашим практикам, пожалуйста, свяжитесь с нами по адресу fudent.technologies@gmail.com.",

      "about.title": "О платформе EDU",
      "about.description1":
        "Добро пожаловать на платформу EDU! Это приложение создано для учителей, чтобы они могли легко загружать и делиться книгами и уроками со студентами. Учебники, дополнительные материалы или интерактивные уроки - всё доступно в одном месте.",
      "about.description2":
        "Наша миссия - создать удобную учебную среду, позволяя педагогам предоставлять образовательные материалы непосредственно своим студентам. Студенты могут искать, читать и изучать материалы, адаптированные под их учебные программы.",
      "about.description3":
        "Мы верим в силу образования, и наша цель - предоставить доступные и удобные цифровые инструменты. Спасибо, что выбрали платформу EDU, и мы надеемся, что она улучшит ваш учебный и преподавательский опыт!",
      "about.developerTitle": "Информация о разработчике",
      "about.developerDescription":
        "Свяжитесь с разработчиком в социальных сетях:",
      "about.telegram": "Телеграм",
      "about.instagram": "Инстаграм",
      "about.version": "Версия 1.0.0",

      "Development Preview": "Предпросмотр обновления",
      "An upgraded experience is coming soon!":
        "Идёт разработка над этим разделом!",
    },
  },
  uz: {
    translation: {
      "Welcome to": "Xush kelibsiz",
      "Loading...": "Yuklanmoqda...",

      "Online Mode": "Online rejim",
      "Offline Mode": "Offlayn rejim",
      Language: "Til",
      Theme: "Mavzu",
      "Font Type": "Shrift turi",
      "Dark Theme": "Qorong'u mavzu",
      "Light Theme": "Yorug' mavzu",
      "Sans-serif": "Sans-serif",
      Serif: "Serif",
      Monospace: "Monospace",

      "READ AND LEARN": "O'QISH VA O'RGANISH",
      Home: "Bosh sahifa",
      Catalog: "Katalog",
      Liked: "Yoqtirganlar",
      Download: "Yuklash",
      Settings: "Sozlamalar",
      Profile: "Profil",
      "Privacy Politics": "Maxfiylik siyosati",
      "About App": "Ilova haqida",

      "Move to a Catalog": "Katalogga o'tkazish",
      "Or create a new catalog": "Yoki yangi katalog yarating:",
      "Enter new catalog name": "Yangi katalog nomini kiriting",
      "Create and Add": "Yarating va qo'shing",
      Cancel: "Bekor qilish",
      Error: "Xato",
      "Please enter a valid catalog name.":
        "Iltimos, to'g'ri katalog nomini kiriting.",
      "No book selected.": "Hech qanday kitob tanlanmagan.",
      Success: "Muvaffaqiyat",
      "Catalog created and book added": "Katalog yaratildi va kitob qo'shildi!",
      "Failed to load offline books.": "Offlayn kitoblarni yuklashda xato.",
      "Failed to delete the book.": "Kitobni o'chirishda xato.",
      "The book has been deleted": "Kitob o'chirildi.",
      "Failed to add the book to the catalog.":
        "Kitobni katalogga qo'shishda xato.",
      "The book has been added into the catalogs": "Kitob katalogga qo'shildi!",

      "Search books...": "Kitoblarni qidiring...",

      Categories: "Kategoriyalar",

      Delete: "O'chirish",
      Remove: "O'chirish",
      Create: "Yaratish",
      Save: "Saqlash",

      // Alerts and Modals
      "Delete Catalog": "Katalogni o'chirish",
      "Are you sure you want to delete this catalog?":
        "Ushbu katalogni o'chirishga ishonchingiz komilmi?",
      "Catalog deleted successfully.": "Katalog muvaffaqiyatli o'chirildi.",
      "Delete Book": "Kitobni o'chirish",
      "Are you sure you want to remove this book?":
        "Ushbu kitobni olib tashlashga ishonchingiz komilmi?",
      "Book removed from catalog.": "Kitob katalogdan o'chirildi.",
      "Catalog name cannot be empty.": "Katalog nomi bo'sh bo'lmasligi kerak.",
      "Catalog updated successfully.": "Katalog muvaffaqiyatli yangilandi.",
      "New catalog created successfully.":
        "Yangi katalog muvaffaqiyatli yaratildi.",

      // Page Content
      "My Book Catalogs": "Mening kitob kataloglarim",
      'No catalogs available. Press the "+" button to create a catalog!':
        'Kataloglar mavjud emas. Katalog yaratish uchun "+" tugmasini bosing!',
      "Edit Catalog": "Katalogni tahrirlash",
      "New Catalog": "Yangi katalog",
      "Enter catalog name": "Katalog nomini kiriting",
      "No books in this catalog.": "Ushbu katalogda hech qanday kitob yo'q.",

      // General Actions
      Read: "O'qish",

      // Page Content
      "Liked Books": "Yoqtirgan kitoblar",
      "No liked books yet.": "Hali yoqtirgan kitoblar yo'q.",

      // Alerts
      "Error fetching liked books": "Yoqtirgan kitoblarni olishda xato",

      "Network Error": "Tarmoq xatosi",
      "Unable to fetch books. Please check your network connection.":
        "Kitoblarni olishda xato. Iltimos, tarmoq ulanishingizni tekshiring.",
      "Download Complete": "Yuklash yakunlandi",
      "The book is now available offline!": "Kitob endi offlayn mavjud!",
      "Download Error": "Yuklash xatosi",
      "Failed to save the book for offline access.":
        "Kitobni offlayn foydalanish uchun saqlashda xato.",
      "Search books": "Kitoblarni qidiring",
      "No books found.": "Hech qanday kitob topilmadi.",
      "More Books": "Boshqa kitoblar",

      Confirmation: "Tasdiqlash",
      "Are you sure you want to proceed?": "Davom etmoqchimisiz?",
      Confirm: "Tasdiqlash",
      "Are you sure you want to delete this book?":
        "Ushbu kitobni o'chirishga ishonchingiz komilmi?",

      //PrivacyPolitics
      "Privacy Policy": "Maxfiylik siyosati",
      "privacy_policy.introduction.title": "1. Kirish",
      "privacy_policy.introduction.content":
        "Biz sizning maxfiyligingizni qadrlaymiz va shaxsiy ma'lumotlaringizni himoya qilishga sodiqmiz. Ushbu Maxfiylik Siyosati bizning dasturimizdan foydalanganda qanday qilib sizning ma'lumotlaringizni yig'ishimiz, ishlatishimiz va baham ko'rishimiz haqida batafsil ma'lumot beradi.",
      "privacy_policy.data_collection.title": "2. Ma'lumot to'plash",
      "privacy_policy.data_collection.content":
        "Biz siz tomonidan to'g'ridan-to'g'ri taqdim etilgan ma'lumotlarni yig'amiz, masalan, ismingiz, elektron pochta manzilingiz va dastur orqali yuborgan har qanday boshqa ma'lumot.",
      "privacy_policy.data_usage.title":
        "3. Sizning ma'lumotlaringizdan qanday foydalanamiz",
      "privacy_policy.data_usage.content":
        "Sizning ma'lumotlaringiz xizmatlarimizni taqdim etish va yaxshilash uchun ishlatiladi. Biz sizning ma'lumotlaringizni sizning so'rovlaringizga javob berish yoki yangilanishlarni yuborish kabi aloqa maqsadlarida ishlatishimiz mumkin.",
      "privacy_policy.third_party_sharing.title":
        "4. Uchinchi tomon bilan ulashish",
      "privacy_policy.third_party_sharing.content":
        "Biz sizning shaxsiy ma'lumotlaringizni uchinchi tomonlar bilan baham ko'rmaymiz, faqat qonuniy talablar bilan yoki uchinchi tomon hamkorlari orqali xizmatlarni taqdim etish uchun.",
      "privacy_policy.rights.title": "5. Sizning huquqlaringiz",
      "privacy_policy.rights.content":
        "Sizda bizda saqlanayotgan shaxsiy ma'lumotlarga kirish, yangilash yoki o'chirish huquqi mavjud. Ma'lumotlaringizning maxfiyligi haqida biron bir savolingiz bo'lsa, biz bilan bog'laning.",
      "privacy_policy.contact.title": "6. Biz bilan bog'laning",
      "privacy_policy.contact.content":
        "Ushbu Maxfiylik Siyosati yoki amaliyotlarimiz haqida savollaringiz bo'lsa, iltimos, biz bilan bog'laning: fudent.technologies@gmail.com.",

      "about.title": "EDU PLATFORM haqida",
      "about.description1":
        "EDU PLATFORMga xush kelibsiz! Ushbu ilova o‘qituvchilarga darsliklar va o‘quv materiallarini oson yuklab olish va talabalar bilan ulashish uchun mo‘ljallangan. Darsliklar, qo‘shimcha materiallar yoki interaktiv darslar - barchasi bir joyda.",
      "about.description2":
        "Bizning maqsadimiz ta'lim jarayonini soddalashtirish va o‘qituvchilarga o‘z o‘quv materiallarini to‘g‘ridan-to‘g‘ri o‘quvchilarga yetkazish imkonini berishdir. Talabalar o‘z kurslariga mos materiallarni qidirish, o‘qish va o‘rganishlari mumkin.",
      "about.description3":
        "Biz ta'limni kuchaytirish uchun qulay va oson foydalaniladigan raqamli vositalar taqdim etamiz. EDU PLATFORMni tanlaganingiz uchun rahmat va darslaringizda muvaffaqiyat tilaymiz!",
      "about.developerTitle": "Dasturchi haqida",
      "about.developerDescription":
        "Dasturchi bilan ijtimoiy tarmoqlarda bog'laning:",
      "about.telegram": "Telegram",
      "about.instagram": "Instagram",
      "about.version": "Versiya 1.0.0",

      "Development Preview": "Yangi versiyani korish",
      "An upgraded experience is coming soon!":
        "Ilovani ustida dasturlash ishlari olib borilmoqda...",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

export default i18n;
