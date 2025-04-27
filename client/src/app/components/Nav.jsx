"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../contexts/authContext/AuthContext";

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isLoading, singOutUser, logout } = useAuth();

  const renderSkeleton = () => (
    <div className="hidden md:flex space-x-4 animate-pulse">
      <div className="bg-gray-700 h-6 w-20 rounded"></div>
      <div className="bg-gray-700 h-6 w-24 rounded"></div>
      <div className="bg-gray-700 h-6 w-16 rounded"></div>
    </div>
  );

  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-999">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {/* Add your logo here if needed */}
          </div>

          {/* Desktop Menu */}
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
              {!user && (
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
              {user?.user?.isAdmin === false && (
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
              {user && (
                <button
                  className="hover:bg-gray-700 px-3 py-2 rounded"
                  onClick={() => logout()}
                >
                  Log Out
                </button>
              )}
            </div>
          )}

          {/* Search */}
          <div className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-900 text-sm px-4 py-2 rounded-l focus:outline-none focus:ring"
            />
            <button className="bg-teal-500 px-4 py-2 rounded-r hover:bg-teal-600">
              Search
            </button>
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
              {!user && (
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
              {user && (
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
