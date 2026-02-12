import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function PropertyImageCarousel({ images }) {
  const [active, setActive] = useState(0);

  if (!images || images.length === 0) return null;

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setActive((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [images]);

  return (
<div className="relative w-full h-70 sm:h-125 lg:h-screen 
overflow-hidden rounded-b-2xl lg:rounded-none">      
      {/* Image */}
      <img
        src={images[active]}
        alt={`Property ${active + 1}`}
        className="w-full h-full object-cover transition-all duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/40" />

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 sm:p-3 rounded-full text-white transition"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 sm:p-3 rounded-full text-white transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all ${
              active === i
                ? "bg-[#d4af37] w-6 sm:w-8"
                : "bg-white/50 w-2 sm:w-3 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
