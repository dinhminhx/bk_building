import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";
import Calendar from "react-calendar";
import { differenceInCalendarWeeks } from "date-fns";
import "react-calendar/dist/Calendar.css";
import "./date.css";

function DatePage(props) {
    const navigate = useNavigate();
    const buildingColors = props.buildingColors;
    const rooms = props.rooms;
    const [visible, setVisible] = useState(false);
    const [startDate] = useState(new Date("2024-01-01")); // Ngày bắt đầu của kỳ học
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    let filteredRooms = rooms;

    const handleMapClick = () => {
        setVisible(!visible);
    };
    const closeModal = () => {
        setVisible(false);
    };
    const handleBackClick = () => {
        navigate(-1);
    };

    const calculateWeekNumber = (date) => {
        return differenceInCalendarWeeks(new Date(date), startDate) + 1;
    };

    const [selectedWeek, setSelectedWeek] = useState(
        calculateWeekNumber(new Date())
    );
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setDate(date);
        const weekNumber = calculateWeekNumber(date);
        setSelectedWeek(weekNumber);
    };
    const currentDay = selectedDate.toLocaleString("vi-VN", { weekday: "long" });
    filteredRooms = rooms.filter((room) => {
        return (
            !selectedWeek ||
            (room.startWeek <= selectedWeek && room.endWeek >= selectedWeek && room.day === currentDay)
        );
    });
    return (
        <div style={{ backgroundColor: "white", height: "100%" }}>
            <div
                style={{
                    backgroundColor: "#5B904A",
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                }}
            >
                <FaArrowLeft
                    onClick={() => handleBackClick()}
                    style={{ cursor: "pointer" }}
                />
                <h1
                    style={{
                        display: "flex",
                        width: "95%",
                        color: "white",
                        justifyContent: "center",
                    }}
                >
                    Ngày
                </h1>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "20px",
                }}
            >
                <Calendar onChange={handleDateChange} value={date} />
            </div>
            {filteredRooms.map((room, index) => (
                <div key={index} className="room-card">
                    <div
                        className="room-building"
                        style={{
                            backgroundColor: buildingColors[room.building],
                        }}
                    >
                        {room.building}
                    </div>
                    <div className="room-details">
                        <div className="room-name">{room.room}</div>
                        <div className="room-time">{room.time}</div>
                    </div>
                    <FaInfoCircle className="info-icon" />
                </div>
            ))}
            <FaMapMarkerAlt
                className="map-float-icon"
                style={{ fontSize: "50px" }}
                onClick={() => handleMapClick()}
            />
            {visible && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={require(".././images/map-dhbk.jpg")}
                            alt="Map"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default DatePage;
