import { useUser, UserButton, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  FiHome,
  FiMessageSquare,
  FiUsers,
  FiUser,
  FiBriefcase,
  FiCalendar,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const CompanySidebar = () => {
  const { user, isLoaded } = useUser(); // Kiểm tra isLoaded để tránh redirect sớm
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return <div>Loading...</div>; // Chờ Clerk tải xong user
  }

  if (!user) {
    return <div>Redirecting...</div>; // Nếu user không tồn tại sau khi tải xong, sẽ điều hướng
  }

  return (
    <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between h-screen">
      <div>
        <h2
          className="text-3xl font-bold text-blue-600 mb-8 cursor-pointer"
          onClick={() => router.push("/")}
        >
          Job Finder
        </h2>
        <nav className="space-y-4">
          <NavItem
            icon={<FiHome />}
            label="Dashboard"
            href="/company/companydashboard"
          />
          <NavItem
            icon={<FiMessageSquare />}
            label="Messages"
            href="/company/companymessage"
          />
          <NavItem
            icon={<FiUser />}
            label="Company Profile"
            href="/company/companyprofile"
          />
          <NavItem
            icon={<FiUsers />}
            label="All Applicants"
            href="/company/AllApplication"
          />
          <NavItem
            icon={<FiBriefcase />}
            label="Job Listings"
            href="/company/JobListingCompany"
          />
          <NavItem
            icon={<FiCalendar />}
            label="My Schedule"
            href="/company/Calender"
          />
          <NavItem
            icon={<FiSettings />}
            label="Settings"
            href="/company/Settings"
          />
        </nav>
      </div>

      <div className="space-y-4 border-t-2 gray-500 pt-4">
        <div className="flex items-center space-x-3">
          <UserButton />
          <div>
            <p className="text-sm font-semibold">{user.fullName}</p>
            <p className="text-xs text-gray-500">
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("user");
            signOut({ redirectUrl: "/" });
          }}
          className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer text-red-600 hover:bg-red-100 w-full"
        >
          <FiLogOut className="text-lg" />
          <span className="text-sm font-medium">Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

function NavItem({ icon, label, href }) {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <div
      onClick={() => router.push(href)}
      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300
        ${
          isActive
            ? "bg-blue-100 text-blue-600"
            : "text-gray-700 hover:bg-gray-200"
        }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

export default CompanySidebar;
