export const PropertyCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse"
        >
          {/* Image placeholder */}
          <div className="relative h-64 bg-gray-200"></div>

          {/* Content placeholder */}
          <div className="p-6 space-y-3">
            {/* Title */}
            <div className="h-6 w-3/4 bg-gray-300 rounded"></div>

            {/* Three small lines */}
            <div className="space-y-2">
              <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
              <div className="h-4 w-4/6 bg-gray-300 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
            </div>

            {/* Details (beds, baths, size) */}
            <div className="flex items-center gap-4 flex-wrap mt-2">
              <div className="h-4 w-12 bg-gray-300 rounded"></div>
              <div className="h-4 w-12 bg-gray-300 rounded"></div>
              <div className="h-4 w-16 bg-gray-300 rounded"></div>
            </div>

            {/* Price & Button */}
            <div className="flex items-center justify-between mt-3">
              <div className="h-6 w-20 bg-gray-300 rounded"></div>
              <div className="h-8 w-24 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


