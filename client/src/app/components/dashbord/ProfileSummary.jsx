export default function ProfileSummary() {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    totalPosts: 5,
    totalLikes: 125,
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">👋 Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Total Posts: {user.totalPosts}</p>
      <p>Total Likes: {user.totalLikes}</p>
    </div>
  );
}
