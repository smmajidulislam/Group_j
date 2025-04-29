// components/FeaturedSection.jsx
export default function HeroSection() {
    return (
      <section className="px-4 text-gray-200 py-12 md:py-20 max-w-7xl mx-auto">
        <p className="text-sm text-gray-500 font-semibold mb-2">Blog</p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-400 mb-4">
          Unlock the Secrets of Ddsgnr <br className="hidden md:block" />
          with Our Expert Analysis
        </h2>
        <p className="text-gray-500 mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
  
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Image */}
          <div className="flex-shrink-0 w-full lg:w-1/2">
            <img
              src="/asests/profile.jpg"
              alt="Stacked books"
              className="w-full h-auto rounded-md object-cover"
            />
          </div>
  
          {/* Content Card */}
          <div className="flex flex-col gap-2 w-full lg:w-1/2">
            <p className="text-sm text-gray-500 font-semibold">Business</p>
            <h3 className="text-xl font-bold text-gray-400">
              How to Get Any Startup Idea Funded
            </h3>
            <p className="text-gray-500 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
            </p>
  
            <div className="flex items-center gap-3">
              <img
                src="/asests/profile.jpg"
                alt="Author"
                className="w-8 h-8 rounded-full"
              />
              <div className="text-sm text-gray-500">
                <p className="font-medium text-gray-400">Ester Esposito</p>
                <p>11 Jan 2022 · 5 min read</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  