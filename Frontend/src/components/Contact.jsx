export default function Contact() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <div>
          <span className="inline-block bg-[#c9a24d]/10 text-[#c9a24d] px-4 py-2 rounded-full mb-4">
            Get In Touch
          </span>

          <h2 className="text-4xl font-bold text-white mb-6">
            Let’s Find the Right Property for You
          </h2>

          <p className="text-slate-400 max-w-lg">
            Share your details and requirements. Our property experts will
            personally reach out to assist you with the best options available.
          </p>
        </div>

        {/* Form */}
        <form className="bg-white rounded-2xl p-8 shadow-2xl space-y-6">

          {/* Name */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                placeholder="Aman"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c9a24d]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Jangra"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c9a24d]"
              />
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c9a24d]"
            />
          </div>

          {/* Purpose */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Purpose
            </label>
            <select
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c9a24d]"
            >
              <option>Select purpose</option>
              <option>Buy Property</option>
              <option>Sell Property</option>
              <option>Rent Property</option>
              <option>Investment</option>
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Property Type
            </label>
            <select
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#c9a24d]"
            >
              <option>Select property type</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Commercial</option>
              <option>Plot / Land</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-3 rounded-lg
                       hover:bg-[#c9a24d] hover:text-slate-900 transition font-medium"
          >
            Request Consultation
          </button>
        </form>

      </div>
    </section>
  );
}
