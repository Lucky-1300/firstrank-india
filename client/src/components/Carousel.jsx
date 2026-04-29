import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({
  items,
  autoPlay = true,
  interval = 5000,
  showArrows = true,
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [current, autoPlay, interval, items.length]);

  const next = () => setCurrent((prev) => (prev + 1) % items.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out w-full"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="min-w-full w-full flex-shrink-0"
          >
            {item}
          </div>
        ))}
      </div>

      {showArrows && (
        <>
          {/* Left */}
          <button
            onClick={prev}
            className="absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Right */}
          <button
            onClick={next}
            className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              current === i
                ? "w-8 bg-orange-500"
                : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}