import React, { useState, useEffect } from "react";

const Second = () => {
  const [blocks, setBlocks] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks((prev) => {
        if (prev < 30) {
          return prev + 1;
        } else {
          return 0;
        }
      }); // Добавляем блоки, потом сбрасываем
    }, 100); // Интервал появления блоков

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (blocks === 0) {
      loaded();
    }
  }, [blocks]);

  const loaded = () => {
    window.electron.sendAction("shutdown");
  };

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#000080",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: 24,
        flexDirection: "column", // Элементы идут вертикально
      }}
    >
      <div style={{ textAlign: "center" }}>
        Пожалуйста, подождите
        <br />
        <div style={{ marginTop: 25 }}>
          Идет процес форматирования дисков
          <br /> Не выключайте компьютер
        </div>
      </div>
      <div
        style={{
          marginTop: 20,
          width: "400px",
          height: 30,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          backgroundColor: "transparent",
          border: "2px solid white",
        }}
      >
        {Array.from({ length: 30 }).map((_, index) => (
          <div
            key={index}
            style={{
              width: "10%", // Ширина каждого блока
              height: "80%", // Высота каждого блока
              margin: "0 1px", // Отступы между блоками
              backgroundColor: index < blocks ? "white" : "transparent", // Появление блока
              transition: "background-color 0.3s", // Плавное заполнение
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Second;
