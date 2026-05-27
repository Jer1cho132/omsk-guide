import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// =====================
// REALISTIC DATA LAYER (OMSK)
// =====================

const DAYS = [
  {
    id: 1,
    title: "1 День: Учебный",
    concept:
      "Главная задача абитуриента — успешно подать документы и освоиться в ОмГТУ.",
    checklist: [
      "Собрать нужные документы",
      "Добраться до главного корпуса",
      "Подать документы в приемной комиссии",
    ],
    places: [
      {
        name: "Главный корпус ОмГТУ",
        coords: [55.026151, 73.290756],
        info: "Главный корпус ОмГТУ, проспект Мира 11",
      },
      {
        name: "Приемная комиссия ОмГТУ",
        coords: [55.02645, 73.2912],
        info: "Приемная комиссия университета",
      },
      {
        name: "Общежития ОмГТУ",
        coords: [55.0282, 73.2879],
        info: "Основные студенческие общежития",
      },
    ],
  },
  {
    id: 2,
    title: "2 День: Пеш.com",
    concept:
      "Изучаем район ОмГТУ пешком и открываем важные места рядом с университетом.",
    checklist: [
      "Посмотреть главные корпуса вуза",
      "Перекус тайм чек: беляшка и Foodпарк",
      "Посетить Советский парк",
    ],
    places: [
      { name: "Главный корпус", coords: [55.026151, 73.290756], info: "Главный корпус" },
      { name: "1 корпус", coords: [55.0271, 73.292], info: "Учебный корпус" },
      { name: "2 корпус", coords: [55.0265, 73.294], info: "Учебный корпус" },
      { name: "5 и 7 корпуса", coords: [55.0252, 73.2955], info: "Корпуса ОмГТУ" },
      { name: "6 корпус", coords: [55.0243, 73.2935], info: "Учебный корпус" },
      { name: "8 корпус", coords: [55.0238, 73.2912], info: "Учебный корпус" },
      { name: "ТК Терминал", coords: [55.0279, 73.2865], info: "Foodпарк и торговый комплекс" },
      { name: "Беляшка на остановке", coords: [55.0267, 73.2893], info: "Студенческий перекус" },
      { name: "Советский парк", coords: [55.031, 73.2715], info: "Главный парк района" },
    ],
  },
  {
    id: 3,
    title: "3 День: Культурный",
    concept:
      "Омск — молодежная культурная столица 2026. Исследуем главные культурные объекты города.",
    checklist: [
      "Посетить главную культурную улицу",
      "Посмотреть памятники города",
      "Посетить главные культурные объекты",
    ],
    places: [
      { name: "Улица Ленина", coords: [54.982383, 73.376611], info: "Исторический центр" },
      { name: "Музыкальный театр", coords: [54.9728, 73.3747], info: "Главный театр" },
      { name: "Любинский проспект", coords: [54.9813, 73.3774], info: "Главное прогулочное пространство" },
      { name: "Омская крепость", coords: [54.985367, 73.363665], info: "Исторический комплекс" },
    ],
  },
  {
    id: 4,
    title: "4 День: Спортивный",
    concept: "Омск — город с мощной хоккейной и спортивной историей.",
    checklist: [
      "Посетить спортивные комплексы",
      "Увидеть G-Drive Арену",
      "Изучить хоккейную инфраструктуру города",
    ],
    places: [
      { name: "G-Drive Арена", coords: [54.9897, 73.319], info: "Главная арена" },
      { name: "Динамо", coords: [54.978, 73.3695], info: "Спорткомплекс" },
      { name: "Ледовый дворец Шастина", coords: [54.998, 73.342], info: "Ледовый комплекс" },
      { name: "Сибирский Нефтяник", coords: [55.0312, 73.2863], info: "Спортивный комплекс" },
      { name: "Академия Авангард", coords: [54.9901, 73.3201], info: "Хоккейная академия" },
    ],
  },
  {
    id: 5,
    title: "5 День: Зеленый день",
    concept:
      "Исследуем зеленые зоны Омска и студенческий городок ОмГАУ.",
    checklist: [
      "Провести день в парках",
      "Посетить Птичью гавань",
      "Изучить студгородок ОмГАУ",
    ],
    places: [
      { name: "Птичья гавань", coords: [54.9487, 73.315], info: "Природный парк" },
      { name: "Парк 30-летия Победы", coords: [54.9562, 73.414], info: "Мемориальный парк" },
      { name: "Зеленый остров", coords: [54.997, 73.351], info: "Городской парк" },
      { name: "Парк 30-летия ВЛКСМ", coords: [54.963, 73.438], info: "Парк культуры" },
      { name: "ОмГАУ", coords: [55.011, 73.3215], info: "Студгородок ОмГАУ" },
      { name: "Ботанический сад", coords: [55.012, 73.319], info: "Ботанический сад" },
    ],
  },
];

// =====================
// REAL LOCATIONS (corrected & aligned to Omsk geography)
// =====================

const PLACES = [
  {
    id: "omgtu_main",
    name: "ОмГТУ — главный корпус",
    coords: [55.026151, 73.290756], // пр. Мира, 11 (район ОмГТУ)
    info: "Омский государственный технический университет. Главный корпус и приёмная комиссия.",
  },
  {
    id: "lenina_street",
    name: "Улица Ленина",
    coords: [54.982383, 73.376611],
    info: "Центральная улица Омска с исторической застройкой и кафе.",
  },
  {
    id: "embankment",
    name: "Набережная Иртыша",
    coords: [54.960633, 73.378884],
    info: "Зона прогулок и отдыха у реки Иртыш.",
  },
  {
    id: "kremlin",
    name: "Омская крепость",
    coords: [54.985367, 73.363665],
    info: "Историческое место основания города Омска.",
  },
];

// =====================
// YANDEX MAP COMPONENT
// =====================

function YandexMap({ onSelect, places }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    const loadMap = () => {
      if (!window.ymaps) return;

      window.ymaps.ready(() => {
        mapInstance.current = new window.ymaps.Map(mapRef.current, {
          center: [54.9925, 73.35], // центр ближе к ОмГТУ
          zoom: 12,
        });

        places.forEach((place) => {
          const placemark = new window.ymaps.Placemark(
            place.coords,
            { balloonContent: place.name },
            { preset: "islands#blueIcon" }
          );

          placemark.events.add("click", () => onSelect(place));
          mapInstance.current.geoObjects.add(placemark);
        });
      });
    };

    if (!window.ymaps) {
      const script = document.createElement("script");
      script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
      script.onload = loadMap;
      document.head.appendChild(script);
    } else {
      loadMap();
    }
  }, []);

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden border">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}

// =====================
// LOGIC
// =====================

function calculateProgress(tasks) {
  const done = tasks.filter((t) => t.done).length;
  return Math.round((done / tasks.length) * 100);
}

// =====================
// LEISURE (updated)
// =====================

const LEISURE = [
  {
    title: "🍔 Foodпарк в Терминале",
    desc: "Фудкорт в ТК 'Терминал' рядом со студенческими маршрутами",
    rating: "4.7/5",
  },
  {
    title: "📍 Точка кипения ОмГТУ",
    desc: "Коворкинг и образовательное пространство университета",
    rating: "4.9/5",
  },
  {
    title: "🌉 Любинский проспект",
    desc: "Главное место прогулок студентов",
    rating: "4.9/5",
  },
  {
    title: "🌊 Набережная Иртыша",
    desc: "Вечерние прогулки у реки",
    rating: "4.7/5",
  },
  {
    title: "🎬 Кинотеатр ‘Маяковский’",
    desc: "Популярное место отдыха",
    rating: "4.5/5",
  },
  {
    title: "🛍 ТК ‘Терминал’",
    desc: "Торговый комплекс и студенческий фудкорт",
    rating: "4.4/5",
  },
  {
    title: "🌳 Парк культуры и отдыха «Советский»",
    desc: "Один из крупнейших парков города для прогулок и спорта",
    rating: "4.6/5",
  },
];

// =====================
// APP
// =====================

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const currentDay = DAYS.find((d) => d.id === selectedDay);

  if (screen === "home") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 p-6 text-center">
        <h1 className="text-3xl font-bold text-blue-700">
          Омск за 5 дней
        </h1>
        <p className="text-gray-600 mt-2 max-w-md">
          Интерактивный гид для иногородних абитуриентов ОмГТУ
        </p>
        <Button onClick={() => setScreen("days")} className="mt-6">
          Начать
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-blue-700">ОмГТУ / Омск</h1>
        <div className="text-sm text-gray-600">Прогресс: {progress}%</div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-4">
          {tasks.map((t) => (
            <Card key={t.id}>
              <CardContent className="p-4 flex justify-between">
                <div>
                  <div className="font-semibold">📌 {t.title}</div>
                  <div className="text-sm text-gray-500">{t.desc}</div>
                </div>
                <button onClick={() => toggleTask(t.id)}>
                  {t.done ? "✅" : "⬜"}
                </button>
              </CardContent>
            </Card>
          ))}

          <Button onClick={() => setScreen("map")} variant="outline">
            🗺️ Открыть карту Омска
          </Button>
          <Button onClick={() => setScreen("leisure")} variant="outline">
            Досуг
          </Button>
        </div>
      </div>

      {screen === "map" && (
        <div className="mt-6">
          <Button onClick={() => setScreen("days")} className="mb-4">
            ← Назад
          </Button>

          <YandexMap onSelect={setSelectedPlace} />

          {selectedPlace && (
            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="font-bold">📍 {selectedPlace.name}</div>
                <div className="text-sm text-gray-600 mt-2">
                  {selectedPlace.info}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {screen === "leisure" && (
        <div>
          <Button onClick={() => setScreen("days")} className="mb-4">
            ← Назад
          </Button>

          <h2 className="text-lg font-bold mb-4">Студенческий Омск</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {LEISURE.map((item, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="font-semibold flex justify-between">
                    {item.title}
                    <span className="text-sm text-yellow-600">⭐ {item.rating}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {item.desc}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
