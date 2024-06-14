import React, { useState } from "react";
import {
    FaBuilding,
    FaClock,
    FaCalendarAlt,
    FaInfoCircle,
    FaMapMarkerAlt,
} from "react-icons/fa";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = (props) => {
    const navigate = useNavigate();
    const rooms = props.rooms;
    const buildingColors = props.buildingColors;
    const [visible, setVisible] = useState(false);
    const handleMapClick = () => {
        setVisible(true);
    };

    const closeModal = () => {
        setVisible(false);
    };

    return (
        <div className="dashboard">
            <div className="header">
                <div
                    className="header-block"
                    onClick={() => navigate("./building")}
                >
                    <FaBuilding className="icon" />
                    <span>Tòa</span>
                </div>
                <div
                    className="header-block"
                    onClick={() => navigate("./time")}
                >
                    <FaClock className="icon" />
                    <span>Khung giờ</span>
                </div>
                <div
                    className="header-block"
                    onClick={() => navigate("./date")}
                >
                    <FaCalendarAlt className="icon" />
                    <span>Ngày</span>
                </div>
            </div>
            <div className="main">
                {rooms.map((room, index) => (
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
            </div>

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
};

export default Dashboard;
