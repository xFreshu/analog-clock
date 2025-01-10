import { useEffect, useRef } from "react";

const Clock = () => {
  const canvasRef = useRef(null);

  const drawClock = (ctx) => {
    const now = new Date();
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const radius = Math.min(width, height) / 2;

    ctx.clearRect(0, 0, width, height);

    // Translacja na środek płótna
    ctx.translate(width / 2, height / 2);

    // Rysowanie tarczy zegara
    ctx.beginPath();
    ctx.arc(0, 0, radius - 10, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Rysowanie cyfr na tarczy zegara
    ctx.font = `${radius * 0.15}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let num = 1; num <= 12; num++) {
      const angle = ((num - 3) * Math.PI) / 6; // Korygujemy pozycje liczb
      const x = Math.cos(angle) * (radius - 30);
      const y = Math.sin(angle) * (radius - 30);
      ctx.fillStyle = "black";
      ctx.fillText(num, x, y);
    }

    // Funkcja do rysowania wskazówek
    const drawHand = (value, length, width, maxValue) => {
      const angle = (value * Math.PI) / (maxValue / 2) - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(angle) * length, Math.sin(angle) * length);
      ctx.strokeStyle = "black";
      ctx.lineWidth = width;
      ctx.stroke();
    };

    // Pobieranie aktualnego czasu
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Rysowanie wskazówek
    drawHand(hours * 5 + (minutes / 60) * 5, radius * 0.5, 6, 60); // Wskazówka godzinowa
    drawHand(minutes, radius * 0.7, 4, 60); // Wskazówka minutowa
    drawHand(seconds, radius * 0.9, 2, 60); // Wskazówka sekundowa

    // Resetowanie translacji
    ctx.translate(-width / 2, -height / 2);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const interval = setInterval(() => {
      drawClock(ctx);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width="300"
      height="300"
      style={{ display: "block", margin: "0 auto" }}
    ></canvas>
  );
};

export default Clock;
