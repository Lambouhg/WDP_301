"use client";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

import SidebarCompany from "../../components/SidebarCompany";
import DasborderHeader from "../../components/HeaderCompany";
import EventForm from "../../components/calender/EventForm";
import EventModal from "../../components/calender/EventModal";
import CalendarToolbar from "../../components/calender/CalendarToolbar";
import { set } from "mongoose";

const localizer = momentLocalizer(moment);

// Time slots available for scheduling
const AVAILABLE_TIME_SLOTS = [
  { label: "8:00 AM", value: "08:00:00" },
  { label: "9:00 AM", value: "09:00:00" },
  { label: "10:00 AM", value: "10:00:00" },
  { label: "2:00 PM", value: "14:00:00" },
  { label: "3:00 PM", value: "15:00:00" },
  { label: "4:00 PM", value: "16:00:00" },
];

// Custom notification/confirmation dialog component
const Dialog = ({ type, message, onConfirm, onCancel, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="flex items-center mb-4">
          {type === "success" && (
            <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
          {type === "error" && (
            <div className="flex-shrink-0 bg-red-100 rounded-full p-2">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
          {type === "info" && (
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}
          {type === "warning" && (
            <div className="flex-shrink-0 bg-yellow-100 rounded-full p-2">
              <svg
                className="h-6 w-6 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          )}
          <h3 className="ml-3 text-lg font-medium text-gray-900">
            {type === "success" && "Thành công"}
            {type === "error" && "Lỗi"}
            {type === "warning" && "Xác nhận"}
            {type === "info" && "Thông báo"}
          </h3>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-500">{message}</p>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          {onCancel && (
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={onCancel}
            >
              Hủy
            </button>
          )}
          <button
            type="button"
            className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2
              ${
                type === "warning"
                  ? "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500"
                  : type === "error"
                  ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
              }`}
            onClick={onConfirm}
          >
            {onCancel ? "Xác nhận" : "Đóng"}
          </button>
        </div>
      </div>
    </div>
  );
};

const CalendarApp = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [view, setView] = useState("month"); // Quản lý trạng thái view
  const [date, setDate] = useState(new Date());
  const [applyUserName, setApplyUserName] = useState([]);

  // Dialog state
  const [dialog, setDialog] = useState({
    isOpen: false,
    type: "info",
    message: "",
    onConfirm: () => {},
    onCancel: null,
  });

  const [formValues, setFormValues] = useState({
    jobID: "",
    companyID: "",
    userID: "",
    applicantID: "",
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    fetchEvents();
    fetchAplly();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const storedUser = localStorage.getItem("user");
      const userData = JSON.parse(storedUser);
      const res = await axios.get(`/api/calender`, {
        params: { companyId: userData.companyId },
      });
      if (res.data) {
        const formattedEvents = res.data.map((event) => ({
          ...event,
          start: new Date(event.date + "T" + event.time),
          end: new Date(
            new Date(event.date + "T" + event.time).getTime() + 60 * 60 * 1000
          ),
        }));
        setEvents(formattedEvents);
      }
    } catch (err) {
      setError("Không thể tải sự kiện.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAplly = async () => {
    const storedUser = localStorage.getItem("user");
    const userData = JSON.parse(storedUser);
    const res = await axios.get(`/api/company/applicant/applyStatusCompany`, {
      params: { companyId: userData.companyId },
    });
    if (res.data) {
      setApplyUserName(res.data);
    }
  };

  const handleSelectSlot = ({ start }) => {
    const selectedDate = moment(start).format("YYYY-MM-DD");
    setFormValues({
      ...formValues,
      date: selectedDate,
      time: "", // Clear time to force user selection
    });

    setSelectedSlot({ start });
    setIsFormOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCreateEvent = async (event) => {
    event.preventDefault();

    if (!formValues.time) {
      setDialog({
        isOpen: true,
        type: "warning",
        message: "Vui lòng chọn thời gian cho sự kiện.",
        onConfirm: () => setDialog({ ...dialog, isOpen: false }),
        onCancel: null,
      });
      return;
    }

    try {
      const newEvent = {
        ...formValues,
      };
      const response = await axios.post("/api/calender/", newEvent);
      const createdEvent = {
        ...response.data,
        start: new Date(formValues.date + "T" + formValues.time),
        end: new Date(
          new Date(formValues.date + "T" + formValues.time).getTime() +
            60 * 60 * 1000
        ),
      };

      setEvents((prevEvents) => [...prevEvents, createdEvent]);
      setIsFormOpen(false);
      setFormValues({
        jobID: "",
        companyID: "",
        userID: "",
        applicantID: "",
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
      });

      setDialog({
        isOpen: true,
        type: "success",
        message: "Sự kiện đã được tạo thành công!",
        onConfirm: () => setDialog({ ...dialog, isOpen: false }),
        onCancel: null,
      });
    } catch (err) {
      setError("Không thể tạo sự kiện.");

      setDialog({
        isOpen: true,
        type: "error",
        message: "Không thể tạo sự kiện.",
        onConfirm: () => setDialog({ ...dialog, isOpen: false }),
        onCancel: null,
      });

      console.error("Error creating event:", err);
    }
  };

  const handleUpdateEvent = async (updatedData) => {
    console.log("updatedData: " + JSON.stringify(updatedData));
    console.log("selectedEvent: " + JSON.stringify(selectedEvent._id));
    try {
      await axios.put(`/api/calender/`, {
        id: selectedEvent._id,
        updatedEvent: updatedData,
      });

      // Update the event in state
      setEvents((prevEvents) =>
        prevEvents.map((evt) =>
          evt.id === selectedEvent.id ? { ...evt, ...updatedData } : evt
        )
      );

      setIsModalOpen(false);

      setDialog({
        isOpen: true,
        type: "success",
        message: "Sự kiện đã được cập nhật thành công!",
        onConfirm: () => setDialog({ ...dialog, isOpen: false }),
        onCancel: null,
      });
    } catch (err) {
      setError("Không thể cập nhật sự kiện.");

      setDialog({
        isOpen: true,
        type: "error",
        message: "Không thể cập nhật sự kiện.",
        onConfirm: () => setDialog({ ...dialog, isOpen: false }),
        onCancel: null,
      });

      console.error("Error updating event:", err);
    }
  };

  const handleDeleteEvent = async () => {
    // Show confirmation dialog before deleting
    setDialog({
      isOpen: true,
      type: "warning",
      message: "Bạn có chắc chắn muốn xóa sự kiện này?",
      onConfirm: async () => {
        try {
          await axios.delete(`/api/calender/`, {
            data: { idCalender: selectedEvent._id },
          });

          setEvents((prevEvents) =>
            prevEvents.filter((evt) => evt.id !== selectedEvent.id)
          );

          setIsModalOpen(false);
          setDialog({
            isOpen: true,
            type: "success",
            message: "Sự kiện đã được xóa thành công!",
            onConfirm: () => setDialog({ ...dialog, isOpen: false }),
            onCancel: null,
          });
        } catch (err) {
          setError("Không thể xóa sự kiện.");

          setDialog({
            isOpen: true,
            type: "error",
            message: "Không thể xóa sự kiện.",
            onConfirm: () => setDialog({ ...dialog, isOpen: false }),
            onCancel: null,
          });

          console.error("Error deleting event:", err);
        }
      },
      onCancel: () => setDialog({ ...dialog, isOpen: false }),
    });
  };

  // Check if a time slot is already booked for the selected date
  const isTimeSlotBooked = (date, time) => {
    return events.some(
      (event) =>
        moment(event.start).format("YYYY-MM-DD") === date &&
        moment(event.start).format("HH:mm:ss") === time
    );
  };

  // Get available time slots for the selected date
  const getAvailableTimeSlots = () => {
    if (!formValues.date) return [];

    return AVAILABLE_TIME_SLOTS.map((slot) => ({
      ...slot,
      disabled: isTimeSlotBooked(formValues.date, slot.value),
    }));
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      <SidebarCompany />
      <div className="overflow-y-auto w-full p-6">
        <DasborderHeader />
        <div className="mx-auto mt-4">
          <div className="gap-4">
            <div>
              <button
                className="flex w-full items-center gap-2 rounded-lg border bg-white text-blue-600 p-2 mb-4"
                onClick={() => {
                  setFormValues({
                    jobID: "",
                    companyID: "",
                    userID: "",
                    applicantID: "",
                    title: "",
                    description: "",
                    location: "",
                    date: moment().format("YYYY-MM-DD"),
                    time: "",
                  });
                  setIsFormOpen(true);
                }}
              >
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                  <span className="ml-2">Tạo Sự Kiện</span>
                </div>
              </button>

              <div className="p-6 bg-white rounded-lg shadow">
                <h1 className="text-xl font-bold mb-4">Lịch phỏng vấn</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}

                {loading ? (
                  <div className="flex justify-center items-center h-96">
                    <div className="text-blue-600">Đang tải dữ liệu...</div>
                  </div>
                ) : (
                  <Calendar
                    localizer={localizer}
                    events={events}
                    selectable
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600 }}
                    views={["month", "week", "day"]}
                    view={view}
                    date={date}
                    onNavigate={(newDate) => {
                      setDate(newDate);
                    }}
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    components={{
                      toolbar: (props) => (
                        <CalendarToolbar
                          {...props}
                          view={view}
                          onView={setView}
                        />
                      ),
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Form for Creating Events */}
        {isFormOpen && (
          <EventForm
            formValues={formValues}
            setFormValues={setFormValues}
            availableTimeSlots={getAvailableTimeSlots()}
            onSubmit={handleCreateEvent}
            applicants={applyUserName.applicants}
            onClose={() => setIsFormOpen(false)}
          />
        )}

        {/* Modal for Event Details */}
        {isModalOpen && selectedEvent && (
          <EventModal
            event={selectedEvent}
            onUpdate={handleUpdateEvent}
            onDelete={handleDeleteEvent}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        {/* Custom Dialog Component */}
        <Dialog
          isOpen={dialog.isOpen}
          type={dialog.type}
          message={dialog.message}
          onConfirm={dialog.onConfirm}
          onCancel={dialog.onCancel}
        />
      </div>
    </div>
  );
};

export default CalendarApp;
