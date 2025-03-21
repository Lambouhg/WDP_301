// src/pages/calendar/CalendarApp.jsx
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

const CalendarApp = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [view, setView] = useState("month"); // Quản lý trạng thái view
  const [date, setDate] = useState(new Date()); // Quản lý trạng thái ngày

  const [formValues, setFormValues] = useState({
    jobID: "",
    companyID: "",
    applicantID: "",
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const storedUser = localStorage.getItem("user");
      const userData = JSON.parse(storedUser);
      console.log("user: " + JSON.stringify(userData.companyId));
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
  console.log("events: " + JSON.stringify(events));
  const handleSelectSlot = ({ start }) => {
    // Set the selected date
    const selectedDate = moment(start).format("YYYY-MM-DD");

    // Reset form values and set the selected date
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
      alert("Vui lòng chọn thời gian cho sự kiện.");
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
        applicantID: "",
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
      });
      alert("Sự kiện đã được tạo thành công!");
    } catch (err) {
      setError("Không thể tạo sự kiện.");
      console.error("Error creating event:", err);
    }
  };

  const handleUpdateEvent = async (updatedData) => {
    try {
      await axios.put(`/api/calender/`, {
        id: selectedEvent.id,
        updatedEvent: updatedData,
      });

      // Update the event in state
      setEvents((prevEvents) =>
        prevEvents.map((evt) =>
          evt.id === selectedEvent.id ? { ...evt, ...updatedData } : evt
        )
      );

      setIsModalOpen(false);
      alert("Sự kiện đã được cập nhật thành công!");
    } catch (err) {
      setError("Không thể cập nhật sự kiện.");
      console.error("Error updating event:", err);
    }
  };

  const handleDeleteEvent = async () => {
    // Confirm before deleting
    if (!window.confirm("Bạn có chắc chắn muốn xóa sự kiện này?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/calender/`, {
        data: { idCalender: selectedEvent.id },
      });

      setEvents((prevEvents) =>
        prevEvents.filter((evt) => evt.id !== selectedEvent.id)
      );

      setIsModalOpen(false);
      alert("Sự kiện đã được xóa thành công!");
    } catch (err) {
      setError("Không thể xóa sự kiện.");
      console.error("Error deleting event:", err);
    }
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
      </div>
    </div>
  );
};

export default CalendarApp;
