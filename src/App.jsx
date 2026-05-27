import { useState } from "react";
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
      "Главная задача абитуриента — подать документы в ОмГТУ и освоиться.",
    checklist: [
      "Собрать документы",
      "Добраться до ОмГТУ",
      "Подать документы в приёмной комиссии",
    ],
    places: [
      {
        name: "Главный корпус ОмГТУ",
        coords: [55.026151, 73.290756],
        info: "Проспект Мира, 11",
      },
      {
        name: "Приёмная комиссия",
        coords: [55.02645, 73.2912],
        info: "Приём документов",
      },
    ],
  },
  {
    id: 2,
    title: "2 День: Пеш.com",
    concept: "Пешие маршруты вокруг ОмГТУ.",
    checklist: [
      "Обойти корпуса",
      "Перекусить (Foodпарк / беляшка)",
      "Сходить в Советский парк",
    ],
    places: [
      { name: "Главный корпус", coords: [55.026151, 73.290756] },
      { name: "Советский парк", coords: [55.031, 73.2715] },
      { name: "ТК Терминал", coords: [55.0279, 73.2865] },
    ],
  },
];

// =====================
// CHECKLIST STATE
// =====================

function DayView({ day, onBack }) {
  const [done, setDone] = useState({});

  const toggle = (item) => {
    setDone((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (
    <div>
      <Button onClick={onBack} className="mb-4">
        ← Назад
      </Button>

      <h1 className="text-2xl font-bold text-blue-700">{day.title}</h1>
      <p className="text-gray-600 mb-4">{day.concept}</p>

      <h2 className="font-bold mb-2">Чеклист</h2>

      <div className="space-y-2">
        {day.checklist.map((item) => (
          <Card
            key={item}
            onClick={() => toggle(item)}
            className="cursor-pointer hover:bg-gray-50 transition"
          >
            <CardContent className="p-3 flex gap-2 items-center">
              <span className="text-lg">
                {done[item] ? "✅" : "⬜"}
              </span>

              <span
                className={
                  done[item]
                    ? "line-through text-gray-400"
                    : ""
                }
              >
                {item}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// =====================
// APP
// =====================

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedDay, setSelectedDay] = useState(null);

  if (screen === "home") {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50">
        <h1 className="text-4xl font-bold text-blue-700">
          Омск за 5 дней
        </h1>

        <Button className="mt-6" onClick={() => setScreen("days")}>
          Начать
        </Button>
      </div>
    );
  }

  if (screen === "days") {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Дни маршрута</h1>

        <div className="space-y-4">
          {DAYS.map((d) => (
            <Card key={d.id}>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <div className="font-bold">{d.title}</div>
                  <div className="text-sm text-gray-600">{d.concept}</div>
                </div>

                <Button
                  onClick={() => {
                    setSelectedDay(d);
                    setScreen("day");
                  }}
                >
                  Открыть
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (screen === "day" && selectedDay) {
    return (
      <div className="p-6">
        <DayView day={selectedDay} onBack={() => setScreen("days")} />
      </div>
    );
  }

  return null;
}
