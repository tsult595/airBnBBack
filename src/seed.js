import sql from "./config/db.js";

const accommodations = [
  // --- КВАРТИРЫ ---
  {
    title: "Роскошные апартаменты в центре Баку",
    description: "Просторная 3-комнатная квартира с панорамным видом на Каспийское море и Пламенные башни.",
    type: "apartment",
    category: "homes",
    location: "Баку, пр. Нефтяников",
    city: "Баку",
    latitude: 40.3683,
    longitude: 49.8392,
    price: 180,
    rate: 4.95,
    image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800",
    max_guests: 4
  },


  {
    title: "Loft-апартаменты на Торговой (ул. Низами)",
    description: "Стильный лофт в самом тусовочном центре города. Вся инфраструктура под боком.",
    type: "apartment",
    category: "homes",
    location: "Баку, ул. Низами",
    city: "Баку",
    latitude: 40.3725,
    longitude: 49.8432,
    price: 130,
    rate: 5.00,
    image_url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800",
    max_guests: 3
  },
   {
    title: "Современные апартаменты у Морского бульвара",
    description: "Светлые современные апартаменты рядом с набережной, ресторанами и главными достопримечательностями Баку.",
    type: "apartment",
    category: "homes",
    location: "Баку, пр. Нефтяников",
    city: "Баку",
    latitude: 40.3698,
    longitude: 49.8426,
    price: 145,
    rate: 4.92,
    image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800",
    max_guests: 4
  },

  {
    title: "Уютная квартира в историческом центре Tbilisi",
    description: "Атмосферная квартира в историческом центре Tbilisi рядом с Девичьей Башней и Старым городом.",
    type: "apartment",
    category: "homes",
    location: "Tbilisi, Ичери Шехер",
    city: "Tbilisi",
    latitude: 40.3661,
    longitude: 49.8348,
    price: 115,
    rate: 4.89,
    image_url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800",
    max_guests: 3
  },

  {
    title: "Премиум апартаменты с видом на Каспий",
    description: "Просторные дизайнерские апартаменты с панорамным видом на море, современной кухней и большой гостиной.",
    type: "apartment",
    category: "homes",
    location: "Баку, White City",
    city: "Баку",
    latitude: 40.3765,
    longitude: 49.8791,
    price: 220,
    rate: 4.97,
    image_url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800",
    max_guests: 5
  },

  {
    title: "Минималистичная квартира возле Fountain Square",
    description: "Стильная квартира в самом центре города, идеально подходящая для пары или небольшой семьи.",
    type: "apartment",
    category: "homes",
    location: "Баку, площадь Фонтанов",
    city: "Баку",
    latitude: 40.3709,
    longitude: 49.8389,
    price: 125,
    rate: 4.84,
    image_url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800",
    max_guests: 3
  },

  {
    title: "Семейные апартаменты в центре Баку",
    description: "Большие комфортные апартаменты с двумя спальнями, просторной кухней и удобным расположением.",
    type: "apartment",
    category: "homes",
    location: "Баку, ул. Хагани",
    city: "Баку",
    latitude: 40.3729,
    longitude: 49.8421,
    price: 180,
    rate: 4.91,
    image_url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800",
    max_guests: 6
  },

  {
    title: "Светлая квартира рядом с Низами",
    description: "Уютные современные апартаменты недалеко от улицы Низами с кафе, магазинами и ресторанами поблизости.",
    type: "apartment",
    category: "homes",
    location: "Баку, ул. Низами",
    city: "Баку",
    latitude: 40.3718,
    longitude: 49.8427,
    price: 105,
    rate: 4.78,
    image_url: "https://images.unsplash.com/photo-1560185008-b033106af5c3?q=80&w=800",
    max_guests: 2
  },

  {
    title: "Luxury Residence White City",
    description: "Роскошные апартаменты в современном жилом комплексе с дизайнерским интерьером и премиальной мебелью.",
    type: "apartment",
    category: "homes",
    location: "Баку, White City",
    city: "Баку",
    latitude: 40.3758,
    longitude: 49.8774,
    price: 260,
    rate: 4.95,
    image_url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800",
    max_guests: 4
  },

  {
    title: "Уютный лофт с панорамными окнами",
    description: "Современный лофт с большими окнами, стильным интерьером и прекрасным видом на город.",
    type: "apartment",
    category: "homes",
    location: "Баку, ул. Самеда Вургуна",
    city: "Баку",
    latitude: 40.3772,
    longitude: 49.8475,
    price: 150,
    rate: 4.86,
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
    max_guests: 3
  },
  // --- ОТЕЛИ ---
  {
    title: "Four Seasons Hotel Tbilisi",
    description: "Роскошный 5-звездочный отель на берегу Каспийского моря с премиальным сервисом.",
    type: "hotel",
    category: "services",
    location: "Tbilisi, пр. Нефтяников 1",
    city: "Tbilisi",
    latitude: 40.3625,
    longitude: 49.8339,
    price: 450,
    rate: 4.98,
    image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800",
    max_guests: 2
  },
   {
    title: "Fairmont Baku Flame Towers",
    description: "Современный роскошный отель в знаменитых Flame Towers с панорамным видом на Баку и Каспийское море.",
    type: "hotel",
    category: "services",
    location: "Баку, ул. М. Алиева 1",
    city: "Баку",
    latitude: 40.3597,
    longitude: 49.8254,
    price: 320,
    rate: 4.85,
    image_url: "https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=800",
    max_guests: 3
  },

  {
    title: "JW Marriott Absheron Baku",
    description: "Элегантный пятизвездочный отель на площади Свободы с просторными номерами и видом на Каспийское море.",
    type: "hotel",
    category: "services",
    location: "Баку, площадь Азадлыг 674",
    city: "Баку",
    latitude: 40.3714,
    longitude: 49.8480,
    price: 280,
    rate: 4.91,
    image_url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=800",
    max_guests: 3
  },

  {
    title: "The Merchant Baku",
    description: "Стильный бутик-отель в самом центре Старого города с уютными номерами и атмосферным интерьером.",
    type: "hotel",
    category: "services",
    location: "Баку, ул. Əkinçi 4",
    city: "Баку",
    latitude: 40.3662,
    longitude: 49.8357,
    price: 165,
    rate: 4.87,
    image_url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800",
    max_guests: 2
  },

  {
    title: "Shirvanshah Hotel",
    description: "Бутик-отель в историческом центре Баку с традиционной архитектурой и современными удобствами.",
    type: "hotel",
    category: "services",
    location: "Баку, ул. Асафа Зейналлы 29",
    city: "Баку",
    latitude: 40.3651,
    longitude: 49.8352,
    price: 145,
    rate: 4.79,
    image_url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800",
    max_guests: 2
  },

  {
    title: "Boulevard Hotel Baku",
    description: "Большой современный отель рядом с Бакинским бульваром с бассейном, спа и видом на море.",
    type: "hotel",
    category: "services",
    location: "Баку, пр. Ходжалы 1",
    city: "Баку",
    latitude: 40.3832,
    longitude: 49.8737,
    price: 190,
    rate: 4.72,
    image_url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800",
    max_guests: 4
  },

  {
    title: "Sapphire Inn Hotel",
    description: "Уютный городской отель в центре Баку рядом с основными достопримечательностями и ресторанами.",
    type: "hotel",
    category: "services",
    location: "Баку, ул. Сафарали 5",
    city: "Баку",
    latitude: 40.3693,
    longitude: 49.8371,
    price: 95,
    rate: 4.63,
    image_url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800",
    max_guests: 2
  },
   {
    title: "Sea Breeze Resort",
    description: "Современный курортный комплекс на побережье Каспийского моря с бассейнами, пляжем и просторными апартаментами.",
    type: "hotel",
    category: "services",
    location: "Баку, Нардеран",
    city: "Баку",
    latitude: 40.5892,
    longitude: 49.9864,
    price: 240,
    rate: 4.88,
    image_url: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=800",
    max_guests: 4
  },

  {
    title: "Crescent Beach Hotel",
    description: "Комфортный пляжный отель на побережье с прямым доступом к морю и спокойной курортной атмосферой.",
    type: "hotel",
    category: "services",
    location: "Баку, Шихово",
    city: "Баку",
    latitude: 40.2858,
    longitude: 49.7685,
    price: 130,
    rate: 4.68,
    image_url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800",
    max_guests: 3
  },
  {
    title: "JW Marriott Absheron Baku",
    description: "Элегантный отель в центре города с панорамным бассейном на крыше и СПА.",
    type: "hotel",
    category: "services",
    location: "Баку, пл. Свободы",
    city: "Баку",
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
    city: "Баку",
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
  let exitCode = 0;

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS accommodations (
        id BIGSERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        type TEXT NOT NULL,
        category TEXT NOT NULL,
        city TEXT NOT NULL DEFAULT 'Баку',
        location TEXT NOT NULL,
        latitude DOUBLE PRECISION NOT NULL,
        longitude DOUBLE PRECISION NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        rate NUMERIC(3, 2) NOT NULL,
        image_url TEXT NOT NULL,
        max_guests INTEGER NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id BIGSERIAL PRIMARY KEY,
        accommodation_id BIGINT NOT NULL REFERENCES accommodations(id) ON DELETE CASCADE,
        status TEXT NOT NULL DEFAULT 'pending',
        check_in DATE NOT NULL,
        check_out DATE NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      ALTER TABLE accommodations 
      ADD COLUMN IF NOT EXISTS city TEXT NOT NULL DEFAULT 'Баку';
    `;

    // 1. Очищаем таблицу перед новым заполнением
    await sql`TRUNCATE TABLE accommodations RESTART IDENTITY CASCADE`;

    // 2. Вставляем массив данных в базу одним массовым запросом
    for (const item of accommodations) {
      await sql`
        INSERT INTO accommodations (
          title, description, type, category,  location, city,
          latitude, longitude, price, rate, image_url, max_guests
        ) VALUES (
          ${item.title}, ${item.description}, ${item.type}, ${item.category}, ${item.city || 'Баку'}, ${item.location},
          ${item.latitude}, ${item.longitude}, ${item.price}, ${item.rate}, ${item.image_url}, ${item.max_guests}
        )
      `;
    }

    console.log("✅ База данных успешно заполнена тестовыми данными!");
  } catch (error) {
    exitCode = 1;
    console.error("❌ Ошибка при заполнении базы:", error);
  } finally {
    process.exit(exitCode);
  }
}

seed();