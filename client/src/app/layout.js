import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./contexts/authContext/AuthContext";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ReduxProviders from "./components/Redux/ReduxProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MERN Project",
  description: "MERN Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProviders>
          <AuthProvider>
            <Nav />
            {children}
            <Footer />
          </AuthProvider>
        </ReduxProviders>
      </body>
    </html>
  );
}
