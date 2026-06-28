import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function PropertyImageCarousel({
  images = [],
  videos = [],
}) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  // Combine images and videos
  const media = [
    ...images.map((url) => ({
      type: "image",
      url,
    })),
    ...videos.map((url) => ({
      type: "video",
      url,
    })),
  ];

  if (!media.length) return null;

  const visibleMedia = media.slice(0, 4);

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % media.length);
  };

  const prevSlide = () => {
    setActive((prev) =>
      prev === 0 ? media.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (fullscreen || showGallery) return;

    // Don't auto-slide if current media is a video
    if (media[active]?.type === "video") return;

    const interval = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, [fullscreen, showGallery, active]);

  return (
    <>
      <div className="flex gap-4 h-[400px]">
        {/* Left Thumbnails */}
        <div className="hidden md:flex flex-col gap-3 w-24">
          {visibleMedia.map((item, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300
              ${
                active === index
                  ? "border-yellow-500 scale-105"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {item.type === "image" ? (
                <img
                  src={item.url}
                  className="w-24 h-20 object-cover"
                  alt=""
                />
              ) : (
                <>
                  <video
                    src={item.url}
                    className="w-24 h-20 object-cover"
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play
                      size={20}
                      className="text-white fill-white"
                    />
                  </div>
                </>
              )}
            </button>
          ))}

          {/* More Button */}
          {media.length > 4 && (
            <button
              onClick={() => setShowGallery(true)}
              className="w-24 h-20 rounded-xl bg-gray-900 text-white hover:bg-black transition text-sm font-medium flex flex-col items-center justify-center"
            >
              <span className="text-lg font-bold">
                +{media.length - 4}
              </span>
              <span>More</span>
            </button>
          )}
        </div>

        {/* Main Media */}
        <div className="relative flex-1 rounded-2xl overflow-hidden bg-gray-100 group">
          {media[active].type === "image" ? (
            <img
              src={media[active].url}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={media[active].url}
              className="w-full h-full object-cover"
              controls
              autoPlay
            />
          )}

          {/* Fullscreen */}
          <button
            onClick={() => setFullscreen(true)}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 p-3 rounded-full text-white transition"
          >
            <Maximize2 size={20} />
          </button>

          {/* Prev */}
          {media.length > 1 && (
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full text-white transition"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Next */}
          {media.length > 1 && (
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full text-white transition"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
            {active + 1} / {media.length}
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-white text-2xl font-bold">
                All Media
              </h2>

              <button
                onClick={() => setShowGallery(false)}
                className="text-white hover:text-gray-300"
              >
                <X size={36} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {media.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActive(index);
                    setShowGallery(false);
                    setFullscreen(true);
                  }}
                  className="relative overflow-hidden rounded-xl"
                >
                  {item.type === "image" ? (
                    <img
                      src={item.url}
                      className="w-full h-56 object-cover hover:scale-105 transition duration-300"
                      alt=""
                    />
                  ) : (
                    <>
                      <video
                        src={item.url}
                        className="w-full h-56 object-cover"
                        muted
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play
                          size={40}
                          className="text-white fill-white"
                        />
                      </div>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen */}
      {fullscreen && (
        <div className="fixed inset-0 bg-black z-[60] flex items-center justify-center">
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-5 right-5 text-white z-20"
          >
            <X size={35} />
          </button>

          {media.length > 1 && (
            <button
              onClick={prevSlide}
              className="absolute left-5 text-white z-20"
            >
              <ChevronLeft size={50} />
            </button>
          )}

          {media[active].type === "image" ? (
            <img
              src={media[active].url}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              alt=""
            />
          ) : (
            <video
              src={media[active].url}
              className="max-w-[90vw] max-h-[90vh]"
              controls
              autoPlay
            />
          )}

          {media.length > 1 && (
            <button
              onClick={nextSlide}
              className="absolute right-5 text-white z-20"
            >
              <ChevronRight size={50} />
            </button>
          )}

          <div className="absolute bottom-6 text-white text-lg">
            {active + 1} / {media.length}
          </div>
        </div>
      )}
    </>
  );
}