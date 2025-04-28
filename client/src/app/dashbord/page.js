"use client";
 import CreatePostButton from "../components/dashbord/CreatePostButton";
 import ProfileSummary from "../components/dashbord/ProfileSummary";

 
 
export default function DashboardPage() {
  
  const posts = []

  return (
    <div className="space-y-6">
       
       <div className="max-w-4xl mx-auto p-4">
         <ProfileSummary />
      <div>
        <div className="flex justify-between">
        <h2 className="text-2xl text-gray-200 font-bold mb-4">My Posts</h2>
        <CreatePostButton/>
        </div>
        {posts.length === 0 ? (
          <p className="text-gray-200">No posts available.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post, idx) => (
              <div key={idx} className="bg-gray-100 p-4 rounded-md">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-700">{post.excerpt}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
