import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import SidebarCompany from "../../components/SidebarCompany";
import DasborderHeader from "../../components/HeaderCompany";
const CalendarApp = () => {
  const events = [
    {
      title: "Interview session with Kathryn Murphy",
      start: "02:00",
      end: "05:00",
      date: "2021-11-24",
      category: "Interview Schedule",
    },
  ];

  const categories = [
    { name: "Interview Schedule", color: "bg-blue-500", checked: true },
    { name: "Internal Meeting", color: "bg-emerald-500", checked: true },
    { name: "Team Schedule", color: "bg-gray-200", checked: false },
    { name: "My Task", color: "bg-gray-200", checked: false },
    { name: "Reminders", color: "bg-gray-200", checked: false },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50 p-4">
      <SidebarCompany />
      <div className="overflow-y-auto w-full p-6">
        <DasborderHeader />
        <div className="mx-auto max-w-6xl mt-4">
          <div className="grid grid-cols-[250px_1fr] gap-4">
            {/* Sidebar */}
            <div className="space-y-4">
              <button className="flex w-full items-center gap-2 rounded-lg border bg-white p-3 text-blue-600">
                <Plus size={20} />
                Create Event
              </button>

              {/* Mini Calendar */}
              <Card className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-semibold">NOVEMBER 2021</span>
                  <div className="flex gap-2">
                    <ChevronLeft size={16} className="cursor-pointer" />
                    <ChevronRight size={16} className="cursor-pointer" />
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  <div className="p-1 text-gray-500">Sun</div>
                  <div className="p-1 text-gray-500">Mon</div>
                  <div className="p-1 text-gray-500">Tue</div>
                  <div className="p-1 text-gray-500">Wed</div>
                  <div className="p-1 text-gray-500">Thu</div>
                  <div className="p-1 text-gray-500">Fri</div>
                  <div className="p-1 text-gray-500">Sat</div>
                  {Array.from({ length: 35 }).map((_, i) => (
                    <div
                      key={i}
                      className={`p-1 ${
                        i === 23 ? "rounded-full bg-blue-600 text-white" : ""
                      }`}
                    >
                      {i < 30 ? i + 1 : ""}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Categories */}
              <Card className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-semibold">Categories</span>
                  <button className="flex items-center gap-1 text-blue-600">
                    <Plus size={16} />
                    Add Category
                  </button>
                </div>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <label key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={category.checked}
                        className="h-4 w-4"
                      />
                      <span>{category.name}</span>
                    </label>
                  ))}
                </div>
              </Card>
            </div>

            {/* Main Calendar */}
            <Card className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h1 className="text-xl font-bold">My Schedule</h1>
                  <button className="rounded bg-blue-100 px-3 py-1 text-blue-600">
                    Today
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <ChevronLeft className="cursor-pointer" />
                  <span>NOVEMBER 2021</span>
                  <ChevronRight className="cursor-pointer" />
                  <div className="flex gap-2">
                    <button className="rounded px-3 py-1">Day</button>
                    <button className="rounded bg-blue-600 px-3 py-1 text-white">
                      Week
                    </button>
                    <button className="rounded px-3 py-1">Month</button>
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-4">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                  (day, i) => (
                    <div key={i} className="text-center">
                      <div className="mb-1 text-sm text-gray-500">{day}</div>
                      <div className="text-sm">
                        {i === 1 && (
                          <div className="rounded-full bg-blue-600 px-2 py-1 text-white">
                            24
                          </div>
                        )}
                        {i !== 1 && 23 + i}
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Time Grid */}
              <div className="mt-4 grid grid-cols-[60px_1fr] gap-4">
                <div className="space-y-8 text-right text-sm text-gray-500">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i}>{`${i + 1} AM`}</div>
                  ))}
                </div>
                <div className="relative">
                  {events.map((event, i) => (
                    <div
                      key={i}
                      className="absolute left-0 w-full rounded bg-blue-500 p-2 text-white"
                      style={{
                        top: "40px",
                        height: "120px",
                      }}
                    >
                      <div className="text-sm font-medium">{event.title}</div>
                      <div className="text-xs">
                        {event.start} - {event.end}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarApp;
