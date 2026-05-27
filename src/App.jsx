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
        coords: [55.025389, 73.292490],
        info: "Прием документов",
      },
      {
        name: "Общежития ОмГТУ",
        coords: [55.026468, 73.302401],
        info: "Студенческие общежития №3,4,5,6,7",
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
      "Перекус: Foodпарк / Горячие Беляши",
      "Посетить Советский парк",
    ],
    places: [
      { name: "Главный корпус", coords: [55.026151, 73.290756], info: "ОмГТУ" },
      { name: "1 корпус", coords: [55.025887, 73.292487], info: "Учебный корпус" },
      { name: "5 и 7 корпуса", coords: [55.026989, 73.293890], info: "Учебные корпуса" },
      { name: "6 корпус", coords: [55.027395, 73.287880], info: "Учебный корпус" },
      { name: "8 корпус", coords: [55.024935, 73.293402], info: "Учебный корпус" },
      { name: "ТК Терминал", coords: [55.024836, 73.294939], info: "Фудкорт" },
      { name: "Беляшка", coords: [55.026518, 73.291737], info: "Легендарные политеховские" },
      { name: "Советский парк", coords: [55.024848, 73.283849], info: "Парк" },
    ],
  },
  {
    id: 3,
    title: "3 День: Культурный",
    concept:
      "Культурный Омск: театры, улицы и исторический центр города.",
    checklist: [
      "Пройти по главной молодежной улице",
      "Посетить Омский государственный музыкальный театр",
      "Изучить памятники и арт-объекты",
    ],
    places: [
      { name: "Улица Ленина", coords: [54.984301, 73.375386], info: "Центр" },
      { name: "Музыкальный театр", coords: [54.982461, 73.382930], info: "Театр" },
      { name: "Любочка", coords: [54.986009, 73.374706], info: "Арт-объект" },
      { name: "Слесарь Степаныч", coords: [54.985364, 73.374412], info: "Арт-объект" },
    ],
  },
  {
    id: 4,
    title: "4 День: Спортивный",
    concept: "Спортивный Омск и ключевые арены города.",
    checklist: [
      "Посетить спорткомплексы",
      "Увидеть G-Drive Арену",
    ],
    places: [
      { name: "G-Drive Арена", coords: [55.009121, 73.297532], info: "Арена" },
      { name: "Динамо", coords: [54.988545, 73.360331], info: "Комплекс" },
      { name: "Ледовый дворец", coords: [55.024226, 73.287987], info: "Лед" },
      { name: "Сибирский Нефтяник", coords: [55.023686, 73.289721], info: "Спорт" },
      { name: "Авангард Академия", coords: [55.018826, 73.305957], info: "Академия" },
    ],
  },
  {
    id: 5,
    title: "5 День: Зеленый день",
    concept:
      "Парки и зеленые зоны Омска + студенческий городок ОмГАУ.",
    checklist: [
      "Провести день в парке",
      "Изучить ОмГАУ",
    ],
    places: [
      { name: "Птичья гавань", coords: [54.972451, 73.343295], info: "Парк" },
      { name: "Парк Победы", coords: [54.962636, 73.352795], info: "Парк" },
      { name: "Зеленый остров", coords: [55.004241, 73.334599], info: "Парк" },
      { name: "Парк ВЛКСМ", coords: [54.972472, 73.413911], info: "Парк" },
      { name: "ОмГАУ", coords: [55.019822, 73.317514], info: "Университет" },
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
