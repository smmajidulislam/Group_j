"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/authContext/AuthContext";
import { useSearchPostsQuery } from "../features/api/searchSlice/searchSlice";
import { useRouter } from "next/navigation"; // for redirection

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  // RTK Query call with skip if search term is empty
  const {
    data: posts,
    isLoading: isSearching,
    isError,
  } = useSearchPostsQuery(searchTerm, {
    skip: searchTerm.trim() === "",
  });

  const filteredSuggestions =
    posts
      ?.map((post) => ({
        title: post.title,
        _id: post._id,
      }))
      .slice(0, 5) || [];

  // Close suggestion box when clicked outside
  const searchRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  const renderSkeleton = () => (
    <div className="hidden md:flex space-x-4 animate-pulse">
      <div className="bg-gray-700 h-6 w-20 rounded"></div>
      <div className="bg-gray-700 h-6 w-24 rounded"></div>
      <div className="bg-gray-700 h-6 w-16 rounded"></div>
    </div>
  );

  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">LOGO</div>

          {isLoading ? (
            renderSkeleton()
          ) : (
            <div className="hidden md:flex space-x-4">
              <Link href="/" className="hover:bg-gray-700 px-3 py-2 rounded">
                Home
              </Link>
              <Link
                href="/service"
                className="hover:bg-gray-700 px-3 py-2 rounded"
              >
                Service
              </Link>
              {!user?.token && (
                <>
                  <Link
                    href="/login"
                    className="hover:bg-gray-700 px-3 py-2 rounded"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="hover:bg-gray-700 px-3 py-2 rounded"
                  >
                    Signup
                  </Link>
                </>
              )}
              <Link
                href="/about"
                className="hover:bg-gray-700 px-3 py-2 rounded"
              >
                About Us
              </Link>
              {user?.token && (
                <Link
                  href="/dashbord"
                  className="hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Dashboard
                </Link>
              )}
              {user?.user?.isAdmin === true && (
                <Link
                  href="/admindashbord"
                  className="hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Admin Dashboard
                </Link>
              )}
              {user?.token && (
                <button
                  className="hover:bg-gray-700 px-3 py-2 rounded"
                  onClick={() => logout()}
                >
                  Log Out
                </button>
              )}
            </div>
          )}

          {/* Search Box */}
          <div
            ref={searchRef}
            className="hidden md:flex flex-col items-start relative"
          >
            <div className="flex">
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                className="bg-gray-900 text-sm px-4 py-2 rounded-l focus:outline-none focus:ring"
              />
              <button
                className="bg-teal-500 px-4 py-2 rounded-r hover:bg-teal-600"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            {searchTerm && (
              <div className="absolute top-full mt-1 bg-white text-black rounded-md shadow-lg w-full z-50 border border-gray-300">
                {isSearching ? (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    Searching...
                  </div>
                ) : isError ? (
                  <div className="px-4 py-2 text-sm text-red-500">
                    Error fetching posts
                  </div>
                ) : filteredSuggestions.length === 0 ? (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    No suggestions
                  </div>
                ) : (
                  filteredSuggestions?.map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 text-sm hover:bg-gray-300 cursor-pointer transition-all duration-150 border-b"
                      onClick={() => {
                        setSearchTerm(item?.title);
                        router.push(`/post/?id=${item?._id}`);
                        setSearchTerm("");
                      }}
                    >
                      {item.length > 30
                        ? item?.title.slice(0, 30) + "..."
                        : item?.title}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 px-4 pb-4 space-y-2">
          {isLoading ? (
            <div className="animate-pulse space-y-2">
              <div className="bg-gray-700 h-6 w-24 rounded"></div>
              <div className="bg-gray-700 h-6 w-20 rounded"></div>
              <div className="bg-gray-700 h-6 w-28 rounded"></div>
            </div>
          ) : (
            <>
              <Link
                href="/"
                className="block hover:bg-gray-700 px-3 py-2 rounded"
              >
                Home
              </Link>
              <Link
                href="/service"
                className="block hover:bg-gray-700 px-3 py-2 rounded"
              >
                Service
              </Link>
              {!user?.token && (
                <>
                  <Link
                    href="/login"
                    className="block hover:bg-gray-700 px-3 py-2 rounded"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block hover:bg-gray-700 px-3 py-2 rounded"
                  >
                    Signup
                  </Link>
                </>
              )}
              <Link
                href="/about"
                className="block hover:bg-gray-700 px-3 py-2 rounded"
              >
                About Us
              </Link>
              {user?.user?.isAdmin === false && (
                <Link
                  href="/dashbord"
                  className="block hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Dashboard
                </Link>
              )}
              {user?.user?.isAdmin === true && (
                <Link
                  href="/admindashbord"
                  className="block hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Admin Dashboard
                </Link>
              )}
              {user?.token && (
                <button
                  className="hover:bg-gray-700 px-3 py-2 rounded"
                  onClick={() => logout()}
                >
                  Log Out
                </button>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;
