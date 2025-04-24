import { NextResponse } from "next/server";

export const config = {
  matcher: ["/about", "/dashboard", "/admin/:path*"], // যে রাউটগুলো প্রটেক্ট করতে চাও
};

export function middleware(req) {
  const token = req.cookies.get("token")?.value; // HTTP-only cookie থেকে token নিচ্ছি

  const url = req.nextUrl.clone();

  // যদি টোকেন না থাকে, তাহলে login পেজে রিডাইরেক্ট
  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // যদি admin route হয়, তাহলে role চেক করো
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const user = parseJwt(token);
    if (user?.role !== "admin") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next(); // সব ঠিক থাকলে request কে যেতে দাও
}

// Helper function: JWT token থেকে ডেটা বের করার জন্য
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}
