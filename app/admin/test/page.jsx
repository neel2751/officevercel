import React from "react";

const page = () => {
  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-16 px-6 md:px-20">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-snug animate-fadeInUp">
            Our Legacy of Excellence
          </h1>
          <p className="text-lg leading-relaxed animate-fadeInUp delay-200">
            Since 2018, CDC has been a leader in building high-performance,
            energy-efficient, and sustainable office spaces. We are committed to
            innovation, quality, and exceeding our clients' expectations.
          </p>
          <button className="bg-blue-700 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 animate-fadeInUp delay-400">
            Learn More
          </button>
        </div>
        <div className="md:w-1/2 relative">
          <div className="relative">
            <img
              src="https://via.placeholder.com/500"
              alt="Modern Office"
              className="rounded-lg shadow-md transform hover:scale-105 transition-transform duration-500 animate-zoomIn"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/40 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center animate-fadeInUp delay-600">
        <div className="group">
          <h2 className="text-5xl font-bold group-hover:text-blue-400 transition-colors">
            105
          </h2>
          <p className="mt-2 text-sm text-gray-300 group-hover:text-white transition-colors">
            Projects Completed
          </p>
        </div>
        <div className="group">
          <h2 className="text-5xl font-bold group-hover:text-blue-400 transition-colors">
            100%
          </h2>
          <p className="mt-2 text-sm text-gray-300 group-hover:text-white transition-colors">
            Fulfillment Rate
          </p>
        </div>
        <div className="group">
          <h2 className="text-5xl font-bold group-hover:text-blue-400 transition-colors">
            99%
          </h2>
          <p className="mt-2 text-sm text-gray-300 group-hover:text-white transition-colors">
            Client Satisfaction
          </p>
        </div>
        <div className="group">
          <h2 className="text-5xl font-bold group-hover:text-blue-400 transition-colors">
            30+
          </h2>
          <p className="mt-2 text-sm text-gray-300 group-hover:text-white transition-colors">
            Years of Experience
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-wrap justify-center gap-6 mt-16 animate-fadeInUp delay-800">
        <div className="bg-blue-800 hover:bg-blue-700 p-6 rounded-lg shadow-lg w-64 text-center transition-transform transform hover:scale-105">
          <p className="font-semibold">Always Building Quality Industrial</p>
        </div>
        <div className="bg-blue-800 hover:bg-blue-700 p-6 rounded-lg shadow-lg w-64 text-center transition-transform transform hover:scale-105">
          <p className="font-semibold">Best Manufacturing Service Provider</p>
        </div>
        <div className="bg-blue-800 hover:bg-blue-700 p-6 rounded-lg shadow-lg w-64 text-center transition-transform transform hover:scale-105">
          <p className="font-semibold">Using the Newest Manufacturing Tech</p>
        </div>
        <div className="bg-blue-800 hover:bg-blue-700 p-6 rounded-lg shadow-lg w-64 text-center transition-transform transform hover:scale-105">
          <p className="font-semibold">Experienced Trusted Contractor</p>
        </div>
      </div>
    </div>
  );
};

export default page;
