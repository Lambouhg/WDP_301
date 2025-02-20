import { useUser, UserButton, useClerk } from "@clerk/nextjs";
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
} from "react-icons/fi";

const Sidebar = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const returnToHome = () => {
    router.push("/");
  };
  const toDashboard = () => {
    router.push("/users/dashboard");
  };
  const toMessageCenter = () => {
    router.push("/MessageCenter");
  };
  const toMyApplication = () => {
    router.push("/UserMyApplication");
  };
  const toJobFinder = () => {
    router.push("/JobFinderPage");
  };

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
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
            active={router.pathname === "users/dashboard"}
          />
          <NavItem
            icon={<FiMessageSquare />}
            label="Messages"
            href="/MessageCenter"
            active={router.pathname === "/MessageCenter"}
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
