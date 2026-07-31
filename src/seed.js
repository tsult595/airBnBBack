import {config} from "dotenv";
import sql from "./config/db.js";

config(); // Загружаем переменные окружения из .env

const accommodations = [
  // --- КВАРТИРЫ ---
  {
    title: "Роскошные апартаменты в центре Баку",
    description: "Просторная 3-комнатная квартира с панорамным видом на Каспийское море и Пламенные башни.",
    type: "apartment",
    category: "homes",
    location: "Баку, пр. Нефтяников",
    latitude: 40.3683,
    longitude: 49.8392,
    price: 180,
    rate: 4.95,
    image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800",
    max_guests: 4
  },
  {
    title: "Современная студия возле Ичери Шехер",
    description: "Уютные апартаменты в 5 минутах ходьбы от Старого города. Отличный выбор для пар.",
    type: "apartment",
    category: "homes",
    location: "Баку, Старый Город",
    latitude: 40.3661,
    longitude: 49.8331,
    price: 95,
    rate: 4.88,
    image_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800",
    max_guests: 2
  },
  {
    title: "Loft-апартаменты на Торговой (ул. Низами)",
    description: "Стильный лофт в самом тусовочном центре города. Вся инфраструктура под боком.",
    type: "apartment",
    category: "homes",
    location: "Баку, ул. Низами",
    latitude: 40.3725,
    longitude: 49.8432,
    price: 130,
    rate: 5.00,
    image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800",
    max_guests: 3
  },

  // --- ОТЕЛИ ---
  {
    title: "Four Seasons Hotel Baku",
    description: "Роскошный 5-звездочный отель на берегу Каспийского моря с премиальным сервисом.",
    type: "hotel",
    category: "services",
    location: "Баку, пр. Нефтяников 1",
    latitude: 40.3625,
    longitude: 49.8339,
    price: 450,
    rate: 4.98,
    image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800",
    max_guests: 2
  },
  {
    title: "JW Marriott Absheron Baku",
    description: "Элегантный отель в центре города с панорамным бассейном на крыше и СПА.",
    type: "hotel",
    category: "services",
    location: "Баку, пл. Свободы",
    latitude: 40.3758,
    longitude: 49.8532,
    price: 320,
    rate: 4.91,
    image_url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800",
    max_guests: 2
  },
  {
    title: "Boutique Hotel Old City",
    description: "Уютный бутик-отель с традиционным азербайджанским колоритом и крышей с видом на Девичью Башню.",
    type: "hotel",
    category: "services",
    location: "Баку, Ичери Шехер",
    latitude: 40.3655,
    longitude: 49.8350,
    price: 110,
    rate: 4.75,
    image_url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800",
    max_guests: 2
  }
];

async function seed() {
  console.log("🌱 Начинаем очистку и заполнение базы данных...");

  try {
    // 1. Очищаем таблицу перед новым заполнением
    await sql`TRUNCATE TABLE accommodations RESTART IDENTITY CASCADE`;

    // 2. Вставляем массив данных в базу одним массовым запросом
    for (const item of accommodations) {
      await sql`
        INSERT INTO accommodations (
          title, description, type, category, location, 
          latitude, longitude, price, rate, image_url, max_guests
        ) VALUES (
          ${item.title}, ${item.description}, ${item.type}, ${item.category}, ${item.location},
          ${item.latitude}, ${item.longitude}, ${item.price}, ${item.rate}, ${item.image_url}, ${item.max_guests}
        )
      `;
    }

    console.log("✅ База данных успешно заполнена тестовыми данными!");
  } catch (error) {
    console.error("❌ Ошибка при заполнении базы:", error);
  } finally {
    process.exit(0);
  }
}

seed();