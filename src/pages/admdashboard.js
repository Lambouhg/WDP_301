"use client";
// import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs"
import {
    FiLogOut,
  } from "react-icons/fi";
export default function AdminDashboard() {
//   const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { signOut } = useClerk();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setUsers(data.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button onClick={() => {
              signOut({ redirectUrl: "/" });
            }}>
            <FiLogOut className="text-lg" />
                        <span className="text-sm font-medium">Đăng xuất</span>
          </button>
      </div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <h2 className="text-xl font-semibold mb-4">Danh sách người dùng:</h2>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Tên</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border p-2">{user.clerkId}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">
                  <Link href={`/admin/edit-user/${user._id}`} className="text-blue-500">
                    Chỉnh sửa
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
    </div>
    
  );
}