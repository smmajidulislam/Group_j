import Link from "next/link";

export default function FeaturedBlogPosts() {
  const posts = [
    {
        _id:1,
      category: "Finance",
      time: "5 min read",
      title: "A Tricycle is the Perfect First Birthday Gift",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      image: "/image1.jpg",
    },
    {
        _id:2,
      category: "Books",
      time: "5 min read",
      title: "Setting Intentions Instead of Resolutions for 2021",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      image: "/image2.jpg",
    },
    {
        _id:3,
      category: "Parenting",
      time: "5 min read",
      title: "How Doona and Liki Make For The Perfect Summer Road Trip",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      image: "/image3.jpg",
    },
  ];

  return (
    <section className="px-4 py-12 max-w-7xl mx-auto">
      <h2 className="text-xl text-gray-300 font-semibold mb-8">
        Featured blog posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <div key={index} className="flex flex-col">
            <img
              src="/asests/profile.jpg"
              alt={post.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <div className="flex items-center text-sm text-gray-500 space-x-4 mb-2">
              <span className="font-medium">{post.category}</span>
              <span>{post.time}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-400 mb-2">
              {post.title}
            </h3>
            <p className="text-gray-500 mb-4">{post.description}</p>
            <Link href={`/blog/${post._id}`}  className="text-blue-600 font-medium hover:underline text-sm flex items-center gap-1">
               
                Read more <span>&rarr;</span>
          
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
