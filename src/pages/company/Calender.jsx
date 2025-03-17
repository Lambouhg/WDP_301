import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import SidebarCompany from "../../components/SidebarCompany";
import DasborderHeader from "../../components/HeaderCompany";
import { Calendar, momentLocalizer } from "react-big-calendar";
import axios from "axios";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarApp = () => {
  const [events, setEvents] = useState([]);
  console.log("event" + JSON.stringify(events));

  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // Track selected event
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false); // Form state
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
  const [selectedSlot, setSelectedSlot] = useState(null); // Track selected slot

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/calender/");
        setEvents(res.data);
      } catch (err) {
        setError("Không thể tải sự kiện.");
      }
    };

    fetchEvents();
  }, []);

  const handleSelectSlot = ({ start, end }) => {
    setSelectedSlot({ start, end });
    setIsFormOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = async () => {
    try {
      const { start, end } = selectedSlot;
      const date = moment(start).format("YYYY-MM-DD");
      const time = moment(start).format("HH:mm:ss");

      const newEvent = {
        ...formValues,
        date,
        time,
      };

      await axios.post("http://localhost:3000/api/calender/", newEvent);
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setIsFormOpen(false);
      alert("Sự kiện đã được tạo thành công!");
    } catch (err) {
      setError("Không thể tạo sự kiện.");
    }
  };

  const handleUpdateEvent = async (updatedData) => {
    try {
      await axios.put(`http://localhost:3000/api/calender/`, {
        id: selectedEvent.id,
        updatedEvent: updatedData,
      });
      setEvents((prevEvents) =>
        prevEvents.map((evt) =>
          evt.id === selectedEvent.id ? { ...evt, ...updatedData } : evt
        )
      );
      setIsModalOpen(false);
      alert("Sự kiện đã được cập nhật thành công!");
    } catch (err) {
      setError("Không thể cập nhật sự kiện.");
    }
  };

  const handleDeleteEvent = async () => {
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
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50 p-4">
      <SidebarCompany />
      <div className="overflow-y-auto w-full p-6">
        <DasborderHeader />
        <div className="mx-auto mt-4">
          <div className="gap-4">
            <div>
              <button className="flex w-full items-center gap-2 rounded-lg border bg-white text-blue-600">
                <Plus size={20} />
                Create Event
              </button>

              {/* Categories */}
              <div className="p-6">
                <h1 className="text-xl font-bold mb-4">Lịch phỏng vấn</h1>
                {error && <p className="text-red-500">{error}</p>}
                <Calendar
                  localizer={localizer}
                  events={events}
                  selectable
                  onSelectSlot={handleSelectSlot}
                  onSelectEvent={handleSelectEvent}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 600 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form for Creating Events */}
        {isFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Tạo Sự Kiện</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tiêu đề
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formValues.title}
                    onChange={handleFormChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mô tả
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formValues.description}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Địa điểm
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formValues.location}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Ngày
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={moment(selectedSlot?.start).format("YYYY-MM-DD")}
                    onChange={handleFormChange}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Thời gian
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={moment(selectedSlot?.start).format("HH:mm")}
                    onChange={handleFormChange}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded"
                    onClick={() => setIsFormOpen(false)}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-500 text-white rounded"
                  >
                    Tạo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal for Event Details */}
        {isModalOpen && selectedEvent && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">{selectedEvent.title}</h2>
              <p className="mb-2">
                <strong>Mô tả:</strong> {selectedEvent.description}
              </p>
              <p className="mb-2">
                <strong>Địa điểm:</strong> {selectedEvent.location}
              </p>
              <p className="mb-2">
                <strong>Bắt đầu:</strong>{" "}
                {moment(selectedEvent.start).format("LLL")}
              </p>
              <p className="mb-2">
                <strong>Kết thúc:</strong>{" "}
                {moment(selectedEvent.end).format("LLL")}
              </p>
              <div className="flex justify-end">
                <button
                  className="mr-2 px-4 py-2 bg-indigo-500 text-white rounded"
                  onClick={() => {
                    const newTitle = prompt(
                      "Cập nhật tiêu đề:",
                      selectedEvent.title
                    );
                    if (newTitle) {
                      handleUpdateEvent({ title: newTitle });
                    }
                  }}
                >
                  Edit
                </button>
                <button
                  className="mr-2 px-4 py-2 bg-red-500 text-white rounded"
                  onClick={handleDeleteEvent}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarApp;
