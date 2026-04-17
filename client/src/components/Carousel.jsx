import { useEffect, useState } from "react";

export default function Carousel({
  items = [],
  autoPlay = true,
  interval = 5000,
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);

  const next = () =>
    setCurrent((prev) => (prev + 1) % items.length);

  const prev = () =>
    setCurrent((prev) =>
      prev === 0 ? items.length - 1 : prev - 1
    );

  if (!items.length) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl">

      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="w-full shrink-0"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 backdrop-blur hover:bg-white shadow"
          >
            ←
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 backdrop-blur hover:bg-white shadow"
          >
            →
          </button>
        </>
      )}

      {/* Dots */}
      {items.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current
                  ? "w-8 bg-orange-500"
                  : "w-2 bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}