"use client";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import './globals.css'
export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const saveUserToDatabase = async () => {
        try {
          const response = await fetch("/api/auth/callback/route", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          const data = await response.json();
          console.log("Thông tin người dùng đã được lưu:", data);
  
          // Chỉ điều hướng nếu người dùng đăng nhập và không ở dashboard
          if (!window.location.pathname.startsWith("/dashboard")) {
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Lỗi khi lưu người dùng vào database:", error);
        }
      };
      saveUserToDatabase();
    }
  }, [user, router]);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/20">
        {/* Glass effect header with decorative elements */}
        <div className="relative text-center space-y-4 mb-12">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 pt-8">
            Welcome Back
          </h1>
          <p className="text-lg text-gray-600">
            Đăng nhập để trải nghiệm những tính năng tuyệt vời
          </p>
        </div>

        {/* Authentication Cards */}
        <div className="mt-8 max-w-md mx-auto">
          <SignedIn>
            <div className="flex flex-col items-center space-y-8">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75"></div>
                <div className="relative p-4 bg-white rounded-full shadow-xl">
                  <UserButton />
                </div>
              </div>
              <Link href="/dashboard" className="w-full">
                <button className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl
                  font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300
                  hover:scale-105 active:scale-95">
                  Truy cập Dashboard
                </button>
              </Link>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="space-y-6">
              <SignInButton mode="modal">
                <button className="w-full px-8 py-4 bg-white rounded-xl font-semibold text-lg
                  border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300
                  hover:scale-105 active:scale-95 group">
                  <div className="flex items-center justify-center space-x-3">
                    <svg className="w-6 h-6 text-gray-800" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z"
                      />
                    </svg>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 group-hover:text-gray-800 transition-colors">
                      Đăng nhập với Google
                    </span>
                  </div>
                </button>
              </SignInButton>
            </div>
          </SignedOut>
        </div>

        {/* Features Grid with Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            {
              icon: "🛡️",
              title: "Bảo mật tối đa",
              description: "Bảo vệ dữ liệu của bạn với công nghệ mã hóa tiên tiến"
            },
            {
              icon: "⚡",
              title: "Trải nghiệm mượt mà",
              description: "Giao diện được tối ưu cho trải nghiệm người dùng tốt nhất"
            },
            {
              icon: "🎯",
              title: "Tính năng thông minh",
              description: "Các công cụ hiện đại giúp nâng cao hiệu suất làm việc"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white/40 backdrop-blur-md rounded-2xl border border-white/20
                hover:bg-white/60 transition-all duration-300 hover:shadow-xl group"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <span className="text-4xl transform group-hover:scale-110 transition-transform">
                  {feature.icon}
                </span>
                <h3 className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
    </div>
  );
}