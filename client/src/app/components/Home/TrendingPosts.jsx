import Link from 'next/link';

export default function TrendingPosts() {
  const posts = [
    {
      slug: 'halloween-from-home',
      category: 'Mom',
      time: '5 min read',
      title: 'How to Celebrate Halloween From Home',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
      image: '/image1.jpg',
    },
    {
      slug: 'winter-car-seat-safety',
      category: 'DIY',
      time: '5 min read',
      title: 'Winter Car Seat Safety Tips',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
      image: '/image2.jpg',
    },
    {
      slug: 'mindfulness-kids',
      category: 'Fitness',
      time: '5 min read',
      title: 'Mindfulness Activities for Kids & Toddlers',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.',
      image: '/image3.jpg',
    },
  ];

  return (
    <section className="px-4 py-12 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-300">Trending</h2>
          <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <Link href="/blog" className="border text-gray-300 border-gray-900 text-sm px-4 py-2 rounded hover:bg-gray-400 transition">
            View all
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <div key={index} className="flex flex-col">
            <img
              src="/asests/profile.jpg"
              alt={post.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <div className="flex items-center text-sm text-gray-400 space-x-4 mb-2">
              <span className="font-medium">{post.category}</span>
              <span>{post.time}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-300 mb-2">{post.title}</h3>
            <p className="text-gray-500 mb-4">{post.description}</p>
            <Link href={`/blog/${post.slug}`} className="text-blue-500 font-medium hover:underline text-sm flex items-center gap-1">
           
                Read more <span>&rarr;</span>
             
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
