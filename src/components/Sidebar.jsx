import { useUser, UserButton, useClerk } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  FiMessageSquare,
  FiBriefcase,
  FiSearch,
  FiHome,
  FiSettings,
  FiLogOut,
  FiUser,
  FiGlobe,
} from "react-icons/fi";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const returnToHome = () => {
    router.push("/");
  };
  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/");
    }
  }, [isLoaded, user, router]);

  if (!user) {
    return <div>Redirecting...</div>; // Nếu user không tồn tại sau khi tải xong, sẽ điều hướng
  }
  if (!isLoaded) {
    return <div>Loading...</div>; // Chờ Clerk tải xong user
  }

  return (
    <>
      {/* Nút mở menu trên Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar cho Desktop */}
      <aside className="hidden md:flex w-64 bg-white shadow-md p-6 flex-col justify-between">
        <div>
          <h2
            className="text-3xl font-bold text-blue-600 mb-8 cursor-pointer"
            onClick={returnToHome}
          >
            Job Finder
          </h2>
          <nav className="space-y-4">
            <NavItem
              icon={<FiHome />}
              label="Dashboard"
              href="/users/dashboard"
              active={router.pathname === "/users/dashboard"}
            />
            <NavItem
              icon={<FiMessageSquare />}
              label="Messages"
              href="/messages/MessageCenter"
              active={router.pathname === "/messages/MessageCenter"}
            />
            <NavItem
              icon={<FiBriefcase />}
              label="My Applications"
              href="/UserMyApplication"
              active={router.pathname === "/UserMyApplication"}
            />
            <NavItem
              icon={<FiSearch />}
              label="Find Jobs"
              href="/JobFinderPage"
              active={router.pathname === "/JobFinderPage"}
            />
            <NavItem
              icon={<FiGlobe />}
              label="Browse Companies"
              href="/FindCompaniesPage"
              active={router.pathname === "/FindCompaniesPage"}
            />
            <NavItem
              icon={<FiUser />}
              label="My Public Profile"
              href="/users/UserProfile"
              active={router.pathname === "/users/UserProfile"}
            />
            <NavItem
              icon={<FiSettings />}
              label="Settings"
              href="/settings/Profile"
              active={router.pathname === "/settings/Profile"}
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
              localStorage.removeItem("user"); // Xóa dữ liệu người dùng
              signOut({ redirectUrl: "/" }); // Đăng xuất và chuyển hướng về trang chủ
            }}
            className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer text-red-600 hover:bg-red-100 w-full"
          >
            <FiLogOut className="text-lg" />
            <span className="text-sm font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Sidebar Overlay cho Mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 ${
          isOpen ? "block" : "hidden"
        } md:hidden`}
        onClick={toggleSidebar}
      >
        {/* Sidebar Mobile */}
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()} // Ngăn không đóng khi nhấn vào sidebar
        >
          <div className="p-4">
            {/* Nút đóng menu */}
            <button className="absolute top-4 right-4" onClick={toggleSidebar}>
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Menu */}
            <nav className="mt-12 space-y-4">
              <NavItem
                icon={<FiHome />}
                label="Dashboard"
                href="/users/dashboard"
                active={router.pathname === "/users/dashboard"}
              />
              <NavItem
                icon={<FiMessageSquare />}
                label="Messages"
                href="/messages/MessageCenter"
                active={router.pathname === "/messages/MessageCenter"}
              />
              <NavItem
                icon={<FiBriefcase />}
                label="My Applications"
                href="/UserMyApplication"
                active={router.pathname === "/UserMyApplication"}
              />
              <NavItem
                icon={<FiSearch />}
                label="Find Jobs"
                href="/JobFinderPage"
                active={router.pathname === "/JobFinderPage"}
              />
              <NavItem
                icon={<FiGlobe />}
                label="Browse Companies"
                href="/FindCompaniesPage"
                active={router.pathname === "/FindCompaniesPage"}
              />
              <NavItem
                icon={<FiUser />}
                label="My Public Profile"
                href="/users/UserProfile"
                active={router.pathname === "/users/UserProfile"}
              />
              <NavItem
                icon={<FiSettings />}
                label="Settings"
                href="/settings/Profile"
                active={router.pathname === "/settings/Profile"}
              />
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

function NavItem({ icon, label, href, active }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300
        ${
          active
            ? "bg-blue-100 text-blue-600"
            : "text-gray-700 hover:bg-gray-200"
        }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

export default Sidebar;
