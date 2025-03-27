/* eslint-disable @next/next/no-img-element */
"use client";
import DashboardHeader from "../../components/DashboardHeader";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notificationsList, setNotificationsList] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Hiệu ứng chuyển hướng khi chưa đăng nhập
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  // Lấy số lượng thông báo chưa đọc
  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (!user) return;
      try {
        const response = await axios.get("/api/calender/count-unread");
        setNotificationCount(response.data.count);
      } catch (error) {
        console.error("Lỗi lấy số lượng thông báo:", error);
      }
    };
    if (user) {
      fetchUnreadCount();
    }
  }, [user]);

  // Lấy danh sách thông báo chi tiết khi mở modal
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user || !showNotification) return;
      try {
        const response = await axios.get("/api/calender/get-notifications");
        setNotificationsList(response.data);
      } catch (error) {
        console.error("Lỗi lấy danh sách thông báo:", error);
      }
    };
    if (showNotification) {
      fetchNotifications();
    }
  }, [user, showNotification]);

  // Xử lý đánh dấu đã đọc và mở modal
  const toggleNotification = async () => {
    setShowNotification(!showNotification);

    // Đánh dấu tất cả thành đã đọc khi mở modal
    if (showNotification) {
      try {
        await axios.post("/api/calender/mark-as-read");
        setNotificationCount(0);
        setNotificationsList(
          notificationsList.map((n) => ({ ...n, read: true }))
        );
      } catch (error) {
        console.error("Lỗi đánh dấu đã đọc:", error);
      }
    }
  };

  const handleNotificationClick = (notification) => {
    // Đánh dấu thông báo đã đọc
    const updatedNotifications = notificationsList.map((n) =>
      n.id === notification.id ? { ...n, read: true } : n
    );
    setNotificationsList(updatedNotifications);

    // Giảm số lượng thông báo chưa đọc nếu thông báo chưa đọc trước đó
    if (!notification.read) {
      setNotificationCount(notificationCount - 1);
    }

    // Chuyển sang xem chi tiết
    setSelectedNotification(notification);
  };

  // Dữ liệu giả cho ứng dụng
  const applications = [
    {
      id: 1,
      position: "Social Media Assistant",
      company: "Nomad",
      location: "Paris, France",
      type: "Full-Time",
      dateApplied: "24 July 2021",
      status: "In Review",
    },
    {
      id: 2,
      position: "Social Media Assistant",
      company: "Udacity",
      location: "New York, USA",
      type: "Full-Time",
      dateApplied: "23 July 2021",
      status: "In Review",
    },
    {
      id: 3,
      position: "Social Media Assistant",
      company: "Packer",
      location: "Madrid, Spain",
      type: "Full-Time",
      dateApplied: "22 July 2021",
      status: "In Review",
    },
  ];

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen w-full overflow-hidden relative">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="w-full overflow-y-auto md:h-screen pb-10">
        <main className="flex-1">
          <div className="w-full mt-6 px-4 border-b-2 border-gray-200 mb-12">
            <DashboardHeader dashboardHeaderName={"Dashboard"} />
          </div>
          <div className="ml-4 md:ml-6 mr-4 md:mr-6">
            <h1 className="text-xl font-bold mt-5">
              Welcome back, {user.fullName}!
            </h1>
            <p className="text-gray-600">
              Here is what is happening with your job search applications from
              today.
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">
              <div className="flex flex-col gap-y-4 md:gap-y-16">
                <StatCard title="Total Jobs Applied" value="45" />
                <StatCard title="Interviewed" value="18" />
              </div>

              <CardChart
                title="Jobs Applied Status"
                data={[40, 60]}
                className="col-span-1 md:col-span-1"
              />

              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center col-span-1 md:col-span-1">
                <h2 className="text-start font-semibold border-b-2 text-gray-500 w-full">
                  Upcoming Interviews
                </h2>
                <div className="flex items-center justify-between w-full mt-5">
                  <h2 className="text-start font-semibold">
                    Today, <span className="font-normal">26 November</span>
                  </h2>
                  <span className="ml-auto text-lg">{"<  >"}</span>
                </div>
                {/* Nội dung lịch phỏng vấn */}
              </div>
            </div>

            {/* Recent Applications */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">
                Recent Applications History
              </h3>
              <div className="border rounded-lg shadow-sm">
                <div className="p-0">
                  <div className="divide-y">
                    {applications.map((app) => (
                      <div
                        key={app.id}
                        className="p-4 flex flex-col md:grid md:grid-cols-2 gap-4 items-center justify-between"
                      >
                        <div className="flex items-center gap-4 w-full">
                          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <div className="w-6 h-6 bg-emerald-500 rounded" />
                          </div>
                          <div>
                            <h4 className="font-medium">{app.position}</h4>
                            <p className="text-sm text-gray-500">
                              {app.company} • {app.location} • {app.type}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full space-y-2 md:space-y-0">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">
                              Date Applied
                            </p>
                            <p className="text-sm">{app.dateApplied}</p>
                          </div>
                          <div className="px-3 py-1 rounded-full bg-orange-50 text-orange-500 text-sm">
                            {app.status}
                          </div>
                          <button className="p-2 hover:bg-gray-100 rounded-full">
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button className="text-blue-700 hover:underline">
                  View all applications history →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Nút thông báo */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleNotification}
          className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition duration-200 focus:outline-none relative"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 15.2V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v4.2c0 .399-.158.78-.405 1.06L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>
      </div>

      {/* Modal thông báo */}
      {showNotification && (
        <div className="fixed top-12 right-6 w-96 bg-white border rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-50 p-4 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-blue-800">Thông Báo</h3>{" "}
              {/* Đổi lại tên tiếng Việt */}
              <button
                onClick={() => setShowNotification(false)}
                className="text-blue-500 hover:text-blue-700"
              >
                {/* Icon đóng */}
              </button>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notificationsList.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                Chưa có thông báo mới
              </div>
            )}
            {notificationsList.map((notification) => (
              <div
                key={notification.id}
                className={`px-4 py-3 border-b cursor-pointer hover:bg-gray-50 transition duration-200 ${
                  notification.read ? "bg-gray-100" : "bg-blue-50/20"
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      notification.read ? "bg-gray-300" : "bg-blue-500"
                    }`}
                  ></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {notification.title || notification.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {`${notification.date} ${notification.time}`}{" "}
                      {/* Sử dụng date/time từ API */}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popup chi tiết thông báo */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="bg-blue-600 text-white p-6">
              <h3 className="text-xl font-bold">
                {selectedNotification.title}
              </h3>
              <p className="text-sm text-blue-100 mt-1">
                {`${selectedNotification.time} ${selectedNotification.date}`}
              </p>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Location:
                </p>
                <p className="text-gray-600">
                  {selectedNotification.location || "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Description:
                </p>
                <p className="text-gray-600">
                  {selectedNotification.description || "No additional details"}
                </p>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, children }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md  cursor-pointer w-full h-full">
      <h3 className="text-xl font-semibold ">{title}</h3>
      {children || <p className="text-5xl font-bold">{value}</p>}
    </div>
  );
}

function CardChart({ title, data }) {
  const chartData = {
    labels: ["Unsuitable", "Interviewed"],
    datasets: [
      {
        data: data, // [40, 60]
        backgroundColor: ["#2563eb", "#d1d5db"], // Màu sắc
        hoverBackgroundColor: ["#1e40af", "#9ca3af"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    cutout: "70%", // Độ rỗng bên trong
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    animation: { animateRotate: true, animateScale: true },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h3 className="text-xl font-semibold mb-5">{title}</h3>
      <div className="relative w-36 h-36 mx-auto">
        <Doughnut data={chartData} options={options} />
        <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
          {data[0]}%
        </div>
      </div>
      <div className="flex justify-center gap-5 mt-5">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
          <p>Unsuitable</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
          <p>Interviewed</p>
        </div>
      </div>
      <a className="text-blue-800 font-semibold mt-5 inline-block" href="#">
        View All Applications {"->"}
      </a>
    </div>
  );
}
