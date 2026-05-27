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
      { name: "Любинский проспект", coords: [54.9813, 73.3774], info: "Главное пространство" },
      { name: "Омская крепость", coords: [54.985367, 73.363665], info: "Исторический комплекс" },
    ],
  },
  {
    id: 4,
    title: "4 День: Спортивный",
    concept: "Омск — город с мощной спортивной историей.",
    checklist: [
      "Посетить спортивные комплексы",
      "Увидеть G-Drive Арену",
      "Изучить инфраструктуру города",
    ],
    places: [
      { name: "G-Drive Арена", coords: [54.9897, 73.319], info: "Арена" },
      { name: "Динамо", coords: [54.978, 73.3695], info: "Спорткомплекс" },
      { name: "Ледовый дворец", coords: [54.998, 73.342], info: "Ледовый" },
      { name: "Сибирский Нефтяник", coords: [55.0312, 73.2863], info: "Комплекс" },
      { name: "Академия Авангард", coords: [54.9901, 73.3201], info: "Академия" },
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

  useEffect(() => {
    const init = () => {
      if (!window.ymaps) return;

      window.ymaps.ready(() => {
        const map = new window.ymaps.Map(ref.current, {
          center: [54.9925, 73.35],
          zoom: 12,
        });

        places.forEach((p) => {
          const mark = new window.ymaps.Placemark(p.coords, {
            balloonContent: p.name,
          });

          mark.events.add("click", () => onSelect(p));
          map.geoObjects.add(mark);
        });
      });
    };

    if (!window.ymaps) {
      const s = document.createElement("script");
      s.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
      s.onload = init;
      document.head.appendChild(s);
    } else init();
  }, [places]);

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

  if (screen === "home") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50">
        <h1 className="text-3xl font-bold">Омск за 5 дней</h1>
        <Button onClick={() => setScreen("days")} className="mt-6">
          Начать
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {screen === "days" && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Дни маршрута</h1>

          {DAYS.map((d) => (
            <Card key={d.id}>
              <CardContent className="p-4 flex justify-between">
                <div>
                  <div className="font-bold">{d.title}</div>
                  <div className="text-gray-600">{d.concept}</div>
                </div>

                <Button onClick={() => {
                  setSelectedDay(d.id);
                  setScreen("day");
                }}>
                  Открыть
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {screen === "day" && current && (
        <div>
          <Button onClick={() => setScreen("days")} className="mb-4">Назад</Button>

          <h1 className="text-xl font-bold">{current.title}</h1>

          <div className="mt-4 grid grid-cols-2 gap-6">
            <div>
              {current.checklist.map((c, i) => {
                const k = `${current.id}-${i}`;
                return (
                  <Card key={k} onClick={() => toggle(k)} className="cursor-pointer">
                    <CardContent className="p-3 flex gap-2">
                      <span>{done[k] ? "✅" : "⬜"}</span>
                      <span>{c}</span>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <YandexMap places={current.places} onSelect={setSelectedPlace} />
          </div>
        </div>
      )}
    </div>
  );
}
