import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa"; // Importing icons from react-icons

function Building(props) {
    const navigate = useNavigate();
    const buildingColors = props.buildingColors;
    const rooms = props.rooms;
    const [visible, setVisible] = useState(false);
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const [showBuildings, setShowBuildings] = useState(true);
    const handleBuildingClick = (building) => {
        setSelectedBuilding(building);
        setShowBuildings(false);
    };

    const handleMapClick = () => {
        setVisible(!visible);
    };
    const closeModal = () => {
        setVisible(false);
    };
    const handleBackClick = () => {
        if (!showBuildings) {
            setShowBuildings(true);
            setSelectedBuilding(null);
        } else {
            navigate(-1);
        }
    }
    const filteredRooms = selectedBuilding
        ? rooms.filter((room) => room.building === selectedBuilding)
        : rooms;
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
                    {selectedBuilding === null ? `Tòa` : selectedBuilding}
                </h1>
            </div>

            <div className="building-list">
                {showBuildings ? (
                    <div className="building-list" style={{ width: "100%" }}>
                        {Object.keys(buildingColors).map((building) => (
                            <div
                                key={building}
                                className="building-item"
                                onClick={() => handleBuildingClick(building)}
                            >
                                {building}
                            </div>
                        ))}
                    </div>
                ) : (
                    filteredRooms.map((room, index) => (
                        <div
                            key={index}
                            className="room-card"
                            style={{ width: "100%" }}
                        >
                            <div
                                className="room-building"
                                style={{
                                    backgroundColor:
                                        buildingColors[room.building],
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
                    ))
                )}
            </div>
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

export default Building;
