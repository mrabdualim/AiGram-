import { Product } from './types';

export const APP_NAME = "Мир Техники";

export const TRANSLATIONS = {
  ru: {
    catalog: "Каталог",
    promo: "Акции",
    stores: "Магазины",
    search: "Поиск",
    cart: "Корзина",
    profile: "Профиль",
    home: "Главная",
    addToCart: "В корзину",
    new: "NEW",
    hit: "ХИТ",
    sale: "УЦЕНКА",
    eveningPrice: "Вечерняя цена",
    redPrice: "Красная цена",
    total: "Итого",
    checkout: "Оформить заказ",
    emptyCart: "Корзина пуста",
    emptyCartDesc: "Кажется, вы еще не нашли технику своей мечты.",
    toCatalog: "В каталог",
    subtotal: "Подытог",
    discount: "Скидка",
    eveningSaleTitle: "Ночная распродажа",
    eveningSaleDesc: "Скидка -10% на весь ассортимент.",
    heroTitle1: "Техника, которая",
    heroTitle2: "понимает вас",
    heroDesc: "Умный дом начинается с умного выбора. Доверьте подбор техники нашему искусственному интеллекту Zud AI.",
    askAi: "Спросить Zud AI",
    happyClients: "довольных клиентов",
    optimalChoice: "Оптимальный выбор",
    pickedByAi: "Подобрано Zud AI",
    orderTitle: "Оформление заказа",
    deliveryMethod: "Способ получения",
    courier: "Доставка курьером",
    pickup: "Самовывоз из магазина",
    paymentMethod: "Способ оплаты",
    cash: "Наличными при получении",
    card: "Картой онлайн",
    installments: "В рассрочку (Alif / Humo)",
    nameLabel: "Ваше имя",
    phoneLabel: "Телефон",
    confirmOrder: "Подтвердить заказ",
    warrantyTitle: "Гарантийный Талон",
    warrantyValid: "Действителен до",
    warrantyOwner: "Владелец",
    warrantyIssued: "Выдан",
    download: "Скачать",
    close: "Закрыть",
    successOrder: "Заказ успешно оформлен!"
  },
  tj: {
    catalog: "Каталог",
    promo: "Аксияҳо",
    stores: "Мағозаҳо",
    search: "Ҷустуҷӯ",
    cart: "Сабад",
    profile: "Профил",
    home: "Асосӣ",
    addToCart: "Ба сабад",
    new: "НАВ",
    hit: "ХИТ",
    sale: "АРЗОН",
    eveningPrice: "Нархи шомона",
    redPrice: "Нархи сурх",
    total: "Ҷамъ",
    checkout: "Ба расмият даровардан",
    emptyCart: "Сабад холи аст",
    emptyCartDesc: "Шумо ҳанӯз техникаи орзуи худро наёфтаед.",
    toCatalog: "Ба каталог",
    subtotal: "Арзиш",
    discount: "Тахфиф",
    eveningSaleTitle: "Фурӯши шабона",
    eveningSaleDesc: "Тахфифи -10% барои ҳамаи молҳо.",
    heroTitle1: "Техникае, ки",
    heroTitle2: "шуморо мефаҳмад",
    heroDesc: "Хонаи ҳушманд аз интихоби ҳушманд оғоз меёбад. Интихоби техникаро ба зеҳни сунъии Zud AI бовар кунед.",
    askAi: "Пурсидан аз Zud AI",
    happyClients: "мизоҷони розӣ",
    optimalChoice: "Интихоби беҳтарин",
    pickedByAi: "Интихоби Zud AI",
    orderTitle: "Барасмиятдарории фармоиш",
    deliveryMethod: "Тарзи гирифтан",
    courier: "Расонидан бо хаткашон",
    pickup: "Гирифтан аз мағоза",
    paymentMethod: "Тарзи пардохт",
    cash: "Нақд ҳангоми қабул",
    card: "Бо карта онлайн",
    installments: "Бо насият (Alif / Humo)",
    nameLabel: "Номи шумо",
    phoneLabel: "Телефон",
    confirmOrder: "Тасдиқи фармоиш",
    warrantyTitle: "Талони Кафолат",
    warrantyValid: "Эътибор дорад то",
    warrantyOwner: "Соҳиб",
    warrantyIssued: "Дода шуд",
    download: "Боргирӣ",
    close: "Пӯшидан",
    successOrder: "Фармоиш қабул шуд!"
  }
};

// Prices adjusted to resemble Tajik Somoni (TJS)
export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'LG AI DD WashTower',
    category: 'Стиральные машины',
    price: 12990,
    oldPrice: 14500,
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    features: ['AI DD', 'Steam+', 'TurboWash'],
    description: 'Интеллектуальная система определения типа ткани.',
    isHit: true,
    colors: [
      { name: 'Белый', hex: '#FFFFFF' },
      { name: 'Платина', hex: '#E5E7EB' }
    ]
  },
  {
    id: '2',
    name: 'LG InstaView Door-in-Door',
    category: 'Холодильники',
    price: 18990, 
    oldPrice: 21990,
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    features: ['Прозрачная дверь', 'Hygiene Fresh+'],
    description: 'Постучите дважды, чтобы увидеть содержимое, не открывая дверь.',
    isNew: true,
    colors: [
      { name: 'Черная сталь', hex: '#374151' },
      { name: 'Стальной', hex: '#9CA3AF' }
    ]
  },
  {
    id: '3',
    name: 'Samsung Jet 90 Complete',
    category: 'Пылесосы',
    price: 4990,
    image: 'https://images.unsplash.com/photo-1558317374-a309d918a1c3?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    features: ['200 Вт', 'HEPA', 'До 60 мин'],
    description: 'Беспроводной пылесос с высокой мощностью всасывания.',
    isHit: true,
    colors: [
      { name: 'Серебристый', hex: '#D1D5DB' }
    ]
  },
  {
    id: '4',
    name: 'Samsung Neo QLED 8K 75"',
    category: 'Телевизоры',
    price: 34990,
    oldPrice: 39990,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    features: ['8K AI', 'Quantum Matrix', '120Hz'],
    description: 'Абсолютная реалистичность с процессором Neo Quantum.',
    isNew: true,
    colors: [
      { name: 'Черный титан', hex: '#111827' }
    ]
  },
  {
    id: '5',
    name: 'Tefal Ingenio Set',
    category: 'Кухня',
    price: 1290,
    oldPrice: 1590,
    image: 'https://images.unsplash.com/photo-1584269613118-54837ba18e5d?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    features: ['Съемная ручка', 'Антипригар'],
    description: 'Набор посуды со съемной ручкой. Уценка: повреждена упаковка.',
    isDamaged: true,
    damageReason: 'Помята коробка, посуда целая.',
    colors: [
      { name: 'Красный', hex: '#B91C1C' },
      { name: 'Черный', hex: '#1F2937' }
    ]
  },
  {
    id: '6',
    name: 'Luminarc Diwali Service',
    category: 'Посуда',
    price: 490,
    image: 'https://images.unsplash.com/photo-1603199837569-8d90141499ef?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    features: ['18 предметов', 'Стеклокерамика'],
    description: 'Классический обеденный сервиз для 6 персон.',
    colors: [
      { name: 'Бирюзовый', hex: '#2DD4BF' },
      { name: 'Белый', hex: '#FFFFFF' },
      { name: 'Серый', hex: '#6B7280' }
    ]
  },
  {
    id: '7',
    name: 'KitchenAid Artisan 4.8L',
    category: 'Кухня',
    price: 5990,
    image: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    features: ['Планетарный', '10 скоростей'],
    description: 'Легендарный миксер для идеальной выпечки.',
    isHit: true,
    colors: [
      { name: 'Красный', hex: '#DC2626' },
      { name: 'Кремовый', hex: '#FEF3C7' }
    ]
  },
  {
    id: '8',
    name: 'LG XBOOM Go',
    category: 'Аудио',
    price: 1290,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    features: ['Meridian', '24ч работы', 'IPX5'],
    description: 'Портативная колонка с мощным басом.',
    isNew: true,
    colors: [
      { name: 'Синий', hex: '#2563EB' },
      { name: 'Черный', hex: '#000000' }
    ]
  }
];