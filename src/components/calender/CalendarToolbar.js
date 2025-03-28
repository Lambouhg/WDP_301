import React from "react";
import { motion } from "framer-motion";
import { neumorphicButton, gradientText } from "./NeumorphicStyles";

const CalendarToolbar = ({ onNavigate, onView, label, view }) => {
  if (!onNavigate || !onView) {
    console.error("Missing required props: onNavigate or onView");
    return null;
  }

  const goToBack = () => onNavigate("PREV");
  const goToNext = () => onNavigate("NEXT");
  const goToCurrent = () => onNavigate("TODAY");

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "inset 3px 3px 10px #d1d5db" },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between mb-6 p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-[5px_5px_15px_#d1d5db,-5px_-5px_15px_#ffffff]"
    >
      <div className="flex items-center space-x-4">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={goToCurrent}
          className={`${neumorphicButton} font-medium`}
        >
          Today
        </motion.button>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={goToBack}
          className={neumorphicButton}
        >
          Previous
        </motion.button>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={goToNext}
          className={neumorphicButton}
        >
          Next
        </motion.button>
      </div>

      <h3 className={`text-xl font-semibold ${gradientText}`}>{label || "Calendar"}</h3>

      <div className="flex items-center space-x-4">
        {["month", "week", "day"].map((key) => (
          <motion.button
            key={key}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => onView(key)}
            className={`${neumorphicButton} ${
              view === key ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white" : ""
            }`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default CalendarToolbar;