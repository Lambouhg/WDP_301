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
    return <div className="p-6">Đang tải...</div>;
  }

  if (!hasAccess) {
    return <div className="p-6">Bạn không có quyền truy cập vào trang này.</div>;
  }

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
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => signOut({ redirectUrl: "/" })}
          className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          <FiLogOut className="text-lg" />
          <span className="text-sm font-medium">Đăng xuất</span>
        </button>
      </div>
      {/* Danh sách user */}
      <h2 className="text-xl font-semibold mb-4">Danh sách người dùng:</h2>
      {users.length === 0 ? (
        <p>Không có người dùng nào.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Tên</th>
              <th className="border p-2">Vai trò</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border p-2">{user.clerkId}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2"><select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="bg-gray-100 border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="company">Company</option>
                  </select></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}