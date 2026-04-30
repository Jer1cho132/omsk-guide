import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// =====================
// REALISTIC DATA LAYER (OMSK)
// =====================

const TASKS = [
  {
    id: 1,
    title: "Добраться до ОмГТУ",
    desc: "Главный корпус — стартовая точка абитуриента",
    done: false,
  },
  {
    id: 2,
    title: "Подать документы в ОмГТУ",
    desc: "Приёмная комиссия университета",
    done: false,
  },
  {
    id: 3,
    title: "Изучить район университета",
    desc: "Кафе, транспорт, улицы рядом с ОмГТУ",
    done: false,
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

function YandexMap({ onSelect }) {
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

        PLACES.forEach((place) => {
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
  const [tasks, setTasks] = useState(TASKS);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const progress = calculateProgress(tasks);

  if (screen === "home") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 p-6 text-center">
        <h1 className="text-3xl font-bold text-blue-700">
          Омск: гид абитуриента 🏙
        </h1>
        <p className="text-gray-600 mt-2 max-w-md">
          ОмГТУ, улица Ленина, набережная Иртыша и студенческая жизнь города
        </p>
        <Button onClick={() => setScreen("dashboard")} className="mt-6">
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
          <Button onClick={() => setScreen("dashboard")} className="mb-4">
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
          <Button onClick={() => setScreen("dashboard")} className="mb-4">
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
