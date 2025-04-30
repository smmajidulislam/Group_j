import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-8 pb-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo + Description */}
          <div>
            <p className="text-xl font-bold text-white">WatchBuddy </p>
            <p className="mt-2 text-sm text-gray-400">
              WatchBuddy is your ultimate partner in entertainment and earning.
              We bring you a platform where you can watch videos that follow
              YouTube and Facebook’s community guidelines — and get rewarded for
              your time!
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <p className="text-lg font-semibold text-white mb-2">Quick Links</p>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <p className="text-lg font-semibold text-white mb-2">Contact</p>
            <ul className="text-sm space-y-1">
              <li>
                <a
                  href="mailto:smmajidulislam77@gmail.com"
                  className="hover:text-white"
                >
                  Email: smmajidulislam77@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+8801709803348" className="hover:text-white">
                  Phone: +880 1709-803348
                </a>
              </li>
              <li>Address: Khulna, Bangladesh</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-sm text-center text-gray-400">
          © {new Date().getFullYear()} Money Exchange. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
