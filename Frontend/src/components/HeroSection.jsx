import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navlink = useNavigate()
  return (
    <section className="relative h-[75vh] w-full ">

      {/* Background Image */}
      <div className="rounded-b-2xl">

      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        alt="Real Estate"
        className="absolute inset-0 w-full h-full rounded-b-3xl object-cover"
      />
      <div className="absolute inset-0 bg-black/55 rounded-b-3xl"></div>
      </div>

      {/* Dark Overlay */}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">

          {/* Left text */}
          <div className="max-w-lg">
            <h1 className="font-script text-3xl md:text-4xl font-bold text-white leading-snug">
              Find Your Dream Property
            </h1>

            <p className=" mt-4 text-base md:text-lg text-gray-200">
              Premium residential and commercial properties
              with trusted real-estate professionals.
            </p>

            <div className="mt-6 flex gap-4">
              <button onClick={() => navlink(`/properties`)} className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                Explore Properties
              </button>

              <button onClick={() => navlink(`/contact`)} className="px-6 py-3 rounded-lg border border-white/30 text-white hover:bg-white/10 transition">
                Contact
              </button>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default HeroSection;
