import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";

export default function Properties_u({
  onSearch,
  onTypeChange,
  onPriceChange,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#fafafa] rounded-2xl p-6 mb-8 border border-transparent shadow-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* SEARCH */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Search
          </label>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search by title or location..."
              onChange={(e) => onSearch(e.target.value)} // ✅ IMPORTANT
              className="w-full pl-12 pr-4 py-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-xl
              focus:outline-none focus:ring-2 focus:ring-[#c6a46c] transition-all"
            />
          </div>
        </div>

        {/* PROPERTY TYPE */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Property Type
          </label>

          <div className="relative">
            <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            <select
              onChange={(e) => onTypeChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-xl
              focus:outline-none focus:ring-2 focus:ring-[#c6a46c] transition-all appearance-none"
            >
              <option value="">All</option>
              <option value="Home">Home</option>
              <option value="Floor">Floor</option>
              <option value="Plot">Plot</option>
              <option value="Villa">Villa</option>
            </select>
          </div>
        </div>

        {/* PRICE RANGE */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Price Range
          </label>

          <select
            onChange={(e) => onPriceChange(e.target.value)}
            className="w-full px-4 py-3 bg-[#f9fafb] border border-[#e5e7eb] rounded-xl
            focus:outline-none focus:ring-2 focus:ring-[#c6a46c] transition-all appearance-none"
          >
            <option value="">All</option>
            <option value="under1">Under 1M</option>
            <option value="1to3">1M - 3M</option>
            <option value="above3">Above 3M</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}
