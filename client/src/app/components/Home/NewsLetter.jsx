export default function NewsLetter() {
  return (
    <section className="bg-transparent py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* হেডার */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            আমাদের নিউজলেটারে সাইন আপ করুন
          </h2>

          {/* বর্ণনা */}
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            শিখুন কিভাবে রঙ এবং প্রিন্ট, কথোপকথন এবং শিল্পকে সমর্থন করতে হয়।
          </p>

          {/* নিউজলেটার ফর্ম */}
          <form className="w-full max-w-md">
            <div className="flex flex-col md:flex-row gap-4">
              {/* ইমেল ইনপুট */}
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="আপনার ইমেল দিন"
                  className="flex-grow px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
                {/* স্লেটন লোডিং স্টেট */}
                <div className="absolute top-0 left-0 w-full h-full animate-pulse bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
              </div>

              {/* সাবস্ক্রাইব বাটন */}
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                সাবস্ক্রাইব করুন
              </button>
            </div>

            {/* স্লেটন লোডিং সাবস্ক্রাইব বাটনের জন্য */}
            <div className="w-full md:w-auto mt-4 h-12 bg-gray-200 dark:bg-gray-600 animate-pulse rounded-lg"></div>
          </form>
        </div>
      </div>
    </section>
  );
}
