import React, { useState, useEffect } from "react";
import { Select, Checkbox, Col, DatePicker, Row } from "antd";
import { FaInfoCircle, FaMapMarkerAlt } from "react-icons/fa";
import { differenceInCalendarWeeks } from "date-fns";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Import Vietnamese locale for dayjs
import "./dashboard.css";

const Dashboard = (props) => {
    const rooms = props.rooms;
    const buildingColors = props.buildingColors;
    const buildings = props.buildings;
    const [visible, setVisible] = useState(false);
    const [checkboxStates, setCheckboxStates] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
    });
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [filteredRoomSet, setFilteredRoomSet] = useState(rooms);
    const [selectedDate, setSelectedDate] = useState(dayjs().locale("vi")); // Set locale to Vietnamese
    const [startDate] = useState(dayjs("2024-01-01").locale("vi")); // Ngày bắt đầu của kỳ học

    const handleMapClick = () => {
        setVisible(true);
    };

    const closeModal = () => {
        setVisible(false);
    };

    const handleCheckboxChange = (e, checkbox) => {
        setCheckboxStates({
            ...checkboxStates,
            [checkbox]: e.target.checked,
        });
        if (checkbox === "checkbox1" && !e.target.checked) {
            setSelectedBuilding(null);
        }
        if (checkbox === "checkbox2" && !e.target.checked) {
            setStartTime(null);
            setEndTime(null);
        }
        if (checkbox === "checkbox3" && !e.target.checked) {
            setSelectedDate(dayjs().locale("vi"));
        }
    };

    const handleBuildingFilterChange = (value) => {
        setSelectedBuilding(value);
    };

    const generateTimeSlots = (startTime, intervalMinutes, endTime) => {
        const slots = [];
        let currentTime = dayjs(`1970-01-01T${startTime}:00`);
        const end = dayjs(`1970-01-01T${endTime}:00`);

        while (currentTime <= end) {
            slots.push(currentTime.format("HH:mm"));
            currentTime = currentTime.add(intervalMinutes, "minute");
        }

        return slots;
    };

    const timeSlots = generateTimeSlots("06:45", 45, "18:00");

    const calculateWeekNumber = (date) => {
        return differenceInCalendarWeeks(date.toDate(), startDate.toDate()) + 1;
    };

    const [selectedWeek, setSelectedWeek] = useState(
        calculateWeekNumber(dayjs().locale("vi"))
    );

    const handleDateChange = (date) => {
        if (date) {
            setSelectedDate(date.locale("vi"));
            const weekNumber = calculateWeekNumber(date);
            setSelectedWeek(weekNumber);
        }
    };

    const formatText = (text) => {
        const words = text.split(" ");

        const capitalizedWords = words.map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        });

        return capitalizedWords.join(" ");
    };

    const currentDay = selectedDate.format("dddd");

    const filterRooms = () => {
        let filteredRooms = rooms;

        if (checkboxStates.checkbox1 && selectedBuilding) {
            filteredRooms = filteredRooms.filter(
                (room) => room.building === selectedBuilding
            );
        }

        if (checkboxStates.checkbox2) {
            filteredRooms = filteredRooms.filter((room) => {
                const roomStartTime = room.time.split(" - ")[0];
                const roomEndTime = room.time.split(" - ")[1];
                if (startTime && endTime) {
                    return roomStartTime >= startTime && roomEndTime <= endTime;
                } else if (startTime) {
                    return roomStartTime >= startTime;
                } else if (endTime) {
                    return roomEndTime <= endTime;
                } else {
                    return true;
                }
            });
        }

        if (checkboxStates.checkbox3 && selectedDate) {
            filteredRooms = filteredRooms.filter(
                (room) =>
                    room.startWeek <= selectedWeek &&
                    room.endWeek >= selectedWeek &&
                    room.day === formatText(currentDay)
            );
        }

        setFilteredRoomSet(filteredRooms);
    };

    useEffect(() => {
        filterRooms();
    }, [selectedBuilding, startTime, endTime, checkboxStates, selectedDate]);

    return (
        <div className="dashboard">
            <div className="header">
                <div
                    wrap
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Row
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "5px",
                        }}
                    >
                        <Col style={{ display: "flex", alignItems: "center" }}>
                            <Checkbox
                                onChange={(e) =>
                                    handleCheckboxChange(e, "checkbox1")
                                }
                            >
                                Tòa
                            </Checkbox>
                        </Col>
                        <Col style={{ width: "50%" }}>
                            <Select
                                style={{ width: "100%" }}
                                disabled={!checkboxStates.checkbox1}
                                onChange={handleBuildingFilterChange}
                                options={buildings.map((building) => ({
                                    value: building,
                                    label: building,
                                }))}
                            />
                        </Col>
                    </Row>
                    <Row
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "5px",
                        }}
                    >
                        <Col style={{ display: "flex", alignItems: "center" }}>
                            <Checkbox
                                onChange={(e) =>
                                    handleCheckboxChange(e, "checkbox2")
                                }
                            >
                                Thời gian
                            </Checkbox>
                        </Col>
                        <Col style={{ width: "50%" }}>
                            <Select
                                style={{ width: "100%", marginBottom: "5px" }}
                                disabled={!checkboxStates.checkbox2}
                                placeholder="Từ"
                                onChange={(value) => setStartTime(value)}
                                options={timeSlots.map((slot) => ({
                                    value: slot,
                                    label: slot,
                                }))}
                            />
                            <Select
                                style={{ width: "100%" }}
                                disabled={!checkboxStates.checkbox2}
                                placeholder="Đến"
                                onChange={(value) => setEndTime(value)}
                                options={timeSlots.map((slot) => ({
                                    value: slot,
                                    label: slot,
                                }))}
                            />
                        </Col>
                    </Row>
                    <Row
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "5px",
                        }}
                    >
                        <Col style={{ display: "flex", alignItems: "center" }}>
                            <Checkbox
                                onChange={(e) =>
                                    handleCheckboxChange(e, "checkbox3")
                                }
                            >
                                Ngày
                            </Checkbox>
                        </Col>
                        <Col style={{ width: "50%" }}>
                            <DatePicker
                                style={{ width: "100%" }}
                                disabled={!checkboxStates.checkbox3}
                                onChange={(date) => handleDateChange(date)}
                                value={selectedDate}
                                locale="vi"
                            />
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="main">
                {filteredRoomSet.map((room, index) => (
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
                            <div className="room-name">
                                {`Phòng ` + room.room}
                            </div>
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
