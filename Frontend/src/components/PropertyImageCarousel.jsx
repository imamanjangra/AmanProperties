import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function PropertyImageCarousel({ images }) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  if (!images?.length) return null;

  // Show only first 4 images on left side
  const visibleImages = images.slice(0, 4);

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setActive((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // Stop auto slide when fullscreen or gallery is open
  useEffect(() => {
    if (fullscreen || showGallery) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [fullscreen, showGallery, images.length]);

  return (
    <>
      <div className="flex gap-4 h-[400px]">
        {/* Left Side Thumbnails */}
        <div className="hidden md:flex flex-col gap-3 w-24">
          {visibleImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`rounded-xl overflow-hidden border-2 transition-all duration-300
              ${
                active === index
                  ? "border-yellow-500 scale-105"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-24 h-20 object-cover"
              />
            </button>
          ))}

          {/* Show All Images Button */}
          {images.length > 4 && (
            <button
              onClick={() => setShowGallery(true)}
              className="
                w-24 h-20 rounded-xl
                bg-gray-900 text-white
                hover:bg-black transition
                text-sm font-medium
                flex flex-col items-center justify-center
              "
            >
              <span className="text-lg font-bold">
                +{images.length - 4}
              </span>
              <span>More</span>
            </button>
          )}
        </div>

        {/* Main Image */}
        <div className="relative flex-1 rounded-2xl overflow-hidden bg-gray-100 group">
          <img
            src={images[active]}
            alt={`Property ${active + 1}`}
            className="w-full h-full object-cover transition-all duration-500"
          />

          {/* Fullscreen Button */}
          <button
            onClick={() => setFullscreen(true)}
            className="
              absolute top-4 right-4
              bg-black/50 hover:bg-black/70
              p-3 rounded-full text-white
              transition
            "
          >
            <Maximize2 size={20} />
          </button>

          {/* Previous */}
          <button
            onClick={prevSlide}
            className="
              absolute left-4 top-1/2 -translate-y-1/2
              bg-black/50 hover:bg-black/70
              p-3 rounded-full text-white
              transition
            "
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next */}
          <button
            onClick={nextSlide}
            className="
              absolute right-4 top-1/2 -translate-y-1/2
              bg-black/50 hover:bg-black/70
              p-3 rounded-full text-white
              transition
            "
          >
            <ChevronRight size={24} />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
            {active + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-white text-2xl font-bold">
                All Images
              </h2>

              <button
                onClick={() => setShowGallery(false)}
                className="text-white hover:text-gray-300"
              >
                <X size={36} />
              </button>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActive(index);
                    setShowGallery(false);
                    setFullscreen(true);
                  }}
                  className="overflow-hidden rounded-xl"
                >
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="
                      w-full h-56 object-cover
                      hover:scale-105 transition duration-300
                    "
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Modal */}
      {fullscreen && (
        <div className="fixed inset-0 bg-black z-[60] flex items-center justify-center">
          {/* Close */}
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-5 right-5 text-white"
          >
            <X size={35} />
          </button>

          {/* Previous */}
          <button
            onClick={prevSlide}
            className="absolute left-5 text-white"
          >
            <ChevronLeft size={50} />
          </button>

          {/* Image */}
          <img
            src={images[active]}
            alt={`Fullscreen ${active + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />

          {/* Next */}
          <button
            onClick={nextSlide}
            className="absolute right-5 text-white"
          >
            <ChevronRight size={50} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 text-white text-lg">
            {active + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}