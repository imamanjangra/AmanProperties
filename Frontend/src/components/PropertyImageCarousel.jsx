import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function PropertyImageCarousel({ images }) {
  const [active, setActive] = useState(0);

  if (!images || images.length === 0) return null; // No images yet

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setActive((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [images]); // re-run if images array changes

  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-b-2xl shadow-xl">
      {/* Image */}
      <img
        src={images[active]}
        alt={`Property ${active + 1}`}
        className="w-full h-full object-cover transition-all duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      {/* Prev/Next Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white transition"
      >
        <ChevronLeft size={26} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white transition"
      >
        <ChevronRight size={26} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all ${
              active === i
                ? "bg-[#d4af37] w-8"
                : "bg-white/50 w-2 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
