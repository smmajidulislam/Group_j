import Image from "next/image";

export default function PostList() {
  const posts = [
    {
      id: 1,
      title: "My First Blog Post",
      likes: 40,
      comments: 8,
      image: "/blog1.jpg", // image inside /public folder
    },
    {
      id: 2,
      title: "Tips for React Developers",
      likes: 120,
      comments: 30,
      image: "/blog2.jpg",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">📝 My Blog Posts</h3>
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex items-center justify-between border-b py-4"
        >
          <div className="flex items-center space-x-4">
            <Image
              src={post.image}
              alt={post.title}
              width={64}
              height={64}
              className="rounded-lg object-cover"
              loading="lazy" // 👈 lazy loading is built-in
            />
            <div>
              <h4 className="font-medium">{post.title}</h4>
              <p className="text-sm text-gray-500">
                👍 {post.likes} | 💬 {post.comments}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="text-blue-600 hover:underline">Edit</button>
            <button className="text-red-500 hover:underline">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
