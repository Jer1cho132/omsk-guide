import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// =====================
// DATA
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
        info: "Проспект Мира, 11",
      },
      {
        name: "Приемная комиссия ОмГТУ",
        coords: [55.02645, 73.2912],
        info: "Прием документов",
      },
      {
        name: "Общежития ОмГТУ",
        coords: [55.0282, 73.2879],
        info: "Студенческие общежития",
      },
    ],
  },
  {
    id: 2,
    title: "2 День: Пеш.com",
    concept:
      "Изучаем район ОмГТУ пешком и ключевые точки вокруг университета.",
    checklist: [
      "Обойти корпуса ОмГТУ",
      "Перекус: Foodпарк / беляшка",
      "Посетить Советский парк",
    ],
    places: [
      { name: "Главный корпус", coords: [55.026151, 73.290756], info: "ОмГТУ" },
      { name: "1 корпус", coords: [55.0271, 73.292], info: "Учебный корпус" },
      { name: "2 корпус", coords: [55.0265, 73.294], info: "Учебный корпус" },
      { name: "5 и 7 корпуса", coords: [55.0252, 73.2955], info: "Корпуса" },
      { name: "6 корпус", coords: [55.0243, 73.2935], info: "Учебный корпус" },
      { name: "8 корпус", coords: [55.0238, 73.2912], info: "Учебный корпус" },
      { name: "ТК Терминал", coords: [55.0279, 73.2865], info: "Фудкорт" },
      { name: "Беляшка", coords: [55.0267, 73.2893], info: "Перекус" },
      { name: "Советский парк", coords: [55.031, 73.2715], info: "Парк" },
    ],
  },
  {
    id: 3,
    title: "3 День: Культурный",
    concept:
      "Культурный Омск: театры, улицы и исторический центр города.",
    checklist: [
      "Пройти культурные места",
      "Посетить памятники",
      "Изучить центр города",
    ],
    places: [
      { name: "Улица Ленина", coords: [54.982383, 73.376611], info: "Центр" },
      { name: "Музыкальный театр", coords: [54.9728, 73.3747], info: "Театр" },
      { name: "Любинский проспект", coords: [54.9813, 73.3774], info: "Прогулки" },
      { name: "Омская крепость", coords: [54.985367, 73.363665], info: "История" },
    ],
  },
  {
    id: 4,
    title: "4 День: Спортивный",
    concept: "Спортивный Омск и ключевые арены города.",
    checklist: [
      "Посетить спорткомплексы",
      "Увидеть G-Drive Арену",
      "Изучить спортивную инфраструктуру",
    ],
    places: [
      { name: "G-Drive Арена", coords: [54.9897, 73.319], info: "Арена" },
      { name: "Динамо", coords: [54.978, 73.3695], info: "Комплекс" },
      { name: "Ледовый дворец", coords: [54.998, 73.342], info: "Лед" },
      { name: "Сибирский Нефтяник", coords: [55.0312, 73.2863], info: "Спорт" },
      { name: "Авангард Академия", coords: [54.9901, 73.3201], info: "Академия" },
    ],
  },
  {
    id: 5,
    title: "5 День: Зеленый день",
    concept:
      "Парки и зеленые зоны Омска + студенческий городок ОмГАУ.",
    checklist: [
      "Провести день в парках",
      "Посетить Птичью гавань",
      "Изучить ОмГАУ",
    ],
    places: [
      { name: "Птичья гавань", coords: [54.9487, 73.315], info: "Парк" },
      { name: "Парк Победы", coords: [54.9562, 73.414], info: "Парк" },
      { name: "Зеленый остров", coords: [54.997, 73.351], info: "Парк" },
      { name: "Парк ВЛКСМ", coords: [54.963, 73.438], info: "Парк" },
      { name: "ОмГАУ", coords: [55.011, 73.3215], info: "Университет" },
      { name: "Ботанический сад", coords: [55.012, 73.319], info: "Сад" },
    ],
  },
];

// =====================
// MAP
// =====================

function YandexMap({ places, onSelect }) {
  const ref = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      if (!window.ymaps || !ref.current) return;

      window.ymaps.ready(() => {
        if (mapRef.current) return;

        mapRef.current = new window.ymaps.Map(ref.current, {
          center: [55.02, 73.28],
          zoom: 12,
        });

        places.forEach((p) => {
          const marker = new window.ymaps.Placemark(p.coords, {
            balloonContent: p.name,
          });

          marker.events.add("click", () => onSelect(p));
          mapRef.current.geoObjects.add(marker);
        });
      });
    };

    if (!window.ymaps) {
      const script = document.createElement("script");
      script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, [places, onSelect]);

  return <div ref={ref} className="w-full h-[500px] rounded-xl border" />;
}

// =====================
// APP
// =====================

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [done, setDone] = useState({});

  const current = DAYS.find((d) => d.id === selectedDay);

  const toggle = (key) => {
    setDone((p) => ({ ...p, [key]: !p[key] }));
  };

  const isDayCompleted = (day) => {
    return day.checklist.every((_, i) => done[`${day.id}-${i}`]);
  };

  if (screen === "home") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 text-center">
        <h1 className="text-4xl font-bold text-blue-700">Омск за 5 дней</h1>
        <p className="text-gray-600 mt-3">Гид для абитуриентов ОмГТУ</p>
        <Button className="mt-6" onClick={() => setScreen("days")}>Начать</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {screen === "days" && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Дни маршрута</h1>

          <div className="space-y-4">
            {DAYS.map((d) => {
              const completed = isDayCompleted(d);

              return (
                <Card key={d.id}>
                  <CardContent className={`p-4 flex justify-between ${completed ? "opacity-60" : ""}`}>
                    <div>
                      <div className={`font-bold ${completed ? "line-through" : ""}`}>{d.title}</div>
                      <div className="text-gray-600">{d.concept}</div>
                    </div>

                    <Button
                      onClick={() => {
                        setSelectedDay(d.id);
                        setScreen("day");
                      }}
                    >
                      {completed ? "Пройдено →" : "Открыть"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {screen === "day" && current && (
        <div>
          <Button onClick={() => setScreen("days")} className="mb-4">← Назад</Button>

          <h1 className="text-2xl font-bold mb-2">{current.title}</h1>
          <p className="text-gray-600 mb-4">{current.concept}</p>

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <h2 className="font-bold mb-3">Чеклист</h2>

              <div className="space-y-3">
                {current.checklist.map((c, i) => {
                  const k = `${current.id}-${i}`;

                  return (
                    <Card key={k}>
                      <CardContent onClick={() => toggle(k)} className="p-4 flex gap-3 cursor-pointer">
                        <span>{done[k] ? "✅" : "⬜"}</span>
                        <span className={done[k] ? "line-through text-gray-400" : ""}>{c}</span>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="font-bold mb-3">Карта</h2>
              <YandexMap places={current.places} onSelect={setSelectedPlace} />

              {selectedPlace && (
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <div className="font-bold">📍 {selectedPlace.name}</div>
                    <div className="text-gray-600 mt-2">{selectedPlace.info}</div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
