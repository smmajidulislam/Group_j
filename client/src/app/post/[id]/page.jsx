// Your other imports...

import Singelpost from "@/app/components/Singelpost";

const Page = async({ params }) => {
  const id = await params?.id;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 text-white">
      {/* Check if postID is available */}
      {id ? (
        <div>
          <Singelpost id={id} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Page;
