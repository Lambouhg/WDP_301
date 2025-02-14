"use client";
import { useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { FiLogOut } from "react-icons/fi";

export default function AdminDashboard() {
  const { signOut } = useClerk();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/callback/route", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();

        if (data.user && data.user.role === "admin") {
          setHasAccess(true);
        } else {
          setHasAccess(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (hasAccess) {
      fetchUsers();
    }
  }, [hasAccess]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white text-lg">Bạn không có quyền truy cập vào trang này.</div>
      </div>
    );
  }

  const filteredUsers = users.filter((user) => user.role !== "admin");

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await fetch("/api/admin/updaterole", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });

      const data = await response.json();
      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
      } else {
        console.error("Error updating role:", data.message);
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-400">Admin Dashboard</h1>
        <button
          onClick={() => signOut({ redirectUrl: "/" })}
          className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 transition-colors text-white px-4 py-2 rounded-lg shadow-md"
        >
          <FiLogOut className="text-lg" />
          <span className="text-sm font-medium">Đăng xuất</span>
        </button>
      </div>

      {/* Danh sách user */}
      <h2 className="text-xl font-semibold mb-4 text-gray-300">Danh sách người dùng:</h2>
      {filteredUsers.length === 0 ? (
        <div className="text-gray-400">Không có người dùng nào.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-gray-300 font-semibold">ID</th>
                <th className="px-4 py-2 text-left text-gray-300 font-semibold">Email</th>
                <th className="px-4 py-2 text-left text-gray-300 font-semibold">Name</th>
                <th className="px-4 py-2 text-left text-gray-300 font-semibold">Role</th>
                <th className="px-4 py-2 text-left text-gray-300 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-2 text-gray-400">{user.clerkId}</td>
                  <td className="px-4 py-2 text-gray-400">{user.email}</td>
                  <td className="px-4 py-2 text-gray-400">{user.name}</td>
                  <td className="px-4 py-2 text-gray-400">{user.role}</td>
                  <td className="px-4 py-2">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="bg-gray-700 text-gray-300 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                    >
                      <option value="user">User</option>
                      <option value="company">Company</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}