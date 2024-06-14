import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";

function Time(props) {
    const navigate = useNavigate();
    const buildingColors = props.buildingColors;
    const rooms = props.rooms;
    const [visible, setVisible] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const parseTime = (timeStr) => {
        const [hours, minutes] = timeStr.split("h").map(Number);
        return new Date(1970, 0, 1, hours, minutes);
    };
    const filterRoomsByTime = (rooms, startTime, endTime) => {
        const start = startTime ? parseTime(startTime) : null;
        const end = endTime ? parseTime(endTime) : null;

        return rooms.filter((room) => {
            const [startRoomTime, endRoomTime] = room.time
                .split(" - ")
                .map(parseTime);

            if (start && end) {
                return startRoomTime >= start && endRoomTime <= end;
            } else if (start) {
                return startRoomTime >= start;
            } else if (end) {
                return endRoomTime <= end;
            } else {
                return true;
            }
        });
    };
    let filteredRooms = rooms;
    filteredRooms = filterRoomsByTime(rooms, startTime, endTime);
    const generateTimeSlots = (startTime, intervalMinutes, endTime) => {
        const slots = [];
        let currentTime = new Date(
            1970,
            0,
            1,
            ...startTime.split(":").map(Number)
        );
        const end = new Date(1970, 0, 1, ...endTime.split(":").map(Number));

        while (currentTime <= end) {
            const hours = currentTime.getHours().toString().padStart(2, "0");
            const minutes = currentTime
                .getMinutes()
                .toString()
                .padStart(2, "0");
            slots.push(`${hours}h${minutes}`);
            currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
        }

        return slots;
    };

    const timeSlots = generateTimeSlots("06:45", 45, "18:00");
    const handleMapClick = () => {
        setVisible(!visible);
    };
    const closeModal = () => {
        setVisible(false);
    };
    const handleBackClick = () => {
        navigate(-1);
    };
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
                    Khung giờ
                </h1>
            </div>
            <div
                style={{
                    backgroundColor: "#5B904A",
                    padding: "15px",
                    borderRadius: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "20px",
                }}
            >
                <div style={{ marginRight: "10px" }}>
                    <label style={{ color: "white", marginRight: "5px" }}>
                        Từ
                    </label>
                    <select
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        style={{ padding: "5px", borderRadius: "4px", width: "45%" }}
                    >
                        <option value="">Select Start Time</option>
                        {timeSlots.map((time, index) => (
                            <option key={index} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ marginRight: "10px" }}>
                    <label style={{ color: "white", marginRight: "5px" }}>
                        đến
                    </label>
                    <select
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        style={{ padding: "5px", borderRadius: "4px", width: "45%" }}
                    >
                        <option value="">Select End Time</option>
                        {timeSlots.map((time, index) => (
                            <option key={index} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>
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

export default Time;
