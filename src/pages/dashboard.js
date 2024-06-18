import React, { useState, useEffect } from "react";
import { Select, Checkbox, Col, DatePicker, Row, Modal, Button } from "antd";
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
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [filteredRoomSet, setFilteredRoomSet] = useState(rooms);
    const [selectedDate, setSelectedDate] = useState(dayjs().locale("vi")); // Set locale to Vietnamese
    const [startDate] = useState(dayjs("2024-01-01").locale("vi")); // Ngày bắt đầu của kỳ học
    const [roomInfoModalVisible, setRoomInfoModalVisible] = useState(false);
    const handleMapClick = () => {
        setVisible(true);
    };
    const closeModal = () => {
        setVisible(false);
    };
    const handleInfoClick = (room) => {
        setRoomInfoModalVisible(true);
        setSelectedRoom(room);
    };
    const handleBuildingFilterChange = (value) => {
        if (value === "All") {
            setSelectedBuilding(null);
        } else {
            setSelectedBuilding(value);
        }
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
    const convertTimeToMinutes = (time) => {
        const [hours, minutes] = time.split(/[:h]/).map(Number);
        return hours * 60 + minutes;
    };
    const filterRooms = () => {
        let filteredRooms = rooms;

        if (selectedBuilding) {
            filteredRooms = filteredRooms.filter(
                (room) => room.building === selectedBuilding
            );
            console.log("Building");
        }
        console.log(startTime, endTime);
        if (startTime || endTime) {
            filteredRooms = filteredRooms.filter((room) => {
                const roomStartTime = convertTimeToMinutes(
                    room.time.split(" - ")[0]
                );
                const roomEndTime = convertTimeToMinutes(
                    room.time.split(" - ")[1]
                );
                if (startTime && endTime) {
                    if (
                        convertTimeToMinutes(startTime) >
                        convertTimeToMinutes(endTime)
                    ) {
                        return false;
                    }
                    return (
                        roomStartTime <= convertTimeToMinutes(startTime) &&
                        roomEndTime >= convertTimeToMinutes(endTime)
                    );
                } else if (startTime) {
                    return roomStartTime <= convertTimeToMinutes(startTime);
                } else if (endTime) {
                    return roomEndTime >= convertTimeToMinutes(endTime);
                } else {
                    return true;
                }
            });
            console.log("Time");
        }

        if (selectedDate) {
            console.log(selectedWeek);
            filteredRooms = filteredRooms.filter(
                (room) =>
                    room.startWeek <= selectedWeek &&
                    room.endWeek >= selectedWeek &&
                    room.day === formatText(currentDay)
            );
            console.log("Date");
        }

        setFilteredRoomSet(filteredRooms);
    };

    useEffect(() => {
        filterRooms();
    }, []);
    const handleFilter = () => {
        filterRooms();
        props.setFilterModalVisible(false);
    };

    return (
        <div className="dashboard">
            <Modal
                title="Lọc danh sách phòng trống"
                visible={props.filterModalVisible}
                onCancel={() => props.setFilterModalVisible(false)}
                footer={
                    <Button
                        onClick={handleFilter}
                        style={{ backgroundColor: "#5B904A" }}
                        className="filter-button"
                    >
                        Tìm kiếm
                    </Button>
                }
            >
                <div className="filter-content">
                    <Row
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "5px",
                        }}
                    >
                        <Col style={{ display: "flex", alignItems: "center" }}>
                            <div>Tòa</div>
                        </Col>
                        <Col style={{ width: "50%" }}>
                            <Select
                                style={{ width: "100%" }}
                                defaultValue="All"
                                onChange={handleBuildingFilterChange}
                                options={[
                                    { value: "All", label: "All" },
                                    ...buildings.map((building) => ({
                                        value: building,
                                        label: building,
                                    })),
                                ]}
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
                            <div>Thời gian</div>
                        </Col>
                        <Col style={{ width: "50%" }}>
                            <Select
                                style={{ width: "100%", marginBottom: "5px" }}
                                defaultValue="All"
                                placeholder="Từ"
                                onChange={(value) => {
                                    if (value === "All") setStartTime(null);
                                    else setStartTime(value);
                                }}
                                options={[
                                    { value: "All", label: "All" },
                                    ...timeSlots.map((slot) => ({
                                        value: slot,
                                        label: slot,
                                    })),
                                ]}
                            />
                            <Select
                                style={{ width: "100%" }}
                                defaultValue="All"
                                placeholder="Đến"
                                onChange={(value) => {
                                    if (value === "All") setEndTime(null);
                                    else setEndTime(value);
                                }}
                                options={[
                                    { value: "All", label: "All" },
                                    ...timeSlots.map((slot) => ({
                                        value: slot,
                                        label: slot,
                                    })),
                                ]}
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
                            <div>Ngày</div>
                        </Col>
                        <Col style={{ width: "50%" }}>
                            <DatePicker
                                style={{ width: "100%" }}
                                onChange={(date) => handleDateChange(date)}
                                value={selectedDate}
                                locale="vi"
                            />
                        </Col>
                    </Row>
                </div>
            </Modal>
            <div className="main">
                {filteredRoomSet.length === 0 ? (
                    <div className="no-data">Không có phòng trống</div>
                ) : (
                    filteredRoomSet.map((room, index) => (
                        <div key={index} className="room-card">
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
                                <div className="room-name">
                                    {`Phòng ` + room.room}
                                </div>
                                <div className="room-time">{room.time}</div>
                            </div>
                            <FaInfoCircle
                                className="info-icon"
                                onClick={() => handleInfoClick(room)}
                            />
                        </div>
                    ))
                )}
                {selectedRoom && (
                    <Modal
                        title={`Thông tin chi tiết phòng ${selectedRoom.room} tòa ${selectedRoom.building}`}
                        visible={roomInfoModalVisible}
                        onCancel={() => setRoomInfoModalVisible(false)}
                        footer={null}
                    >
                        <p>
                            Wifi:{" "}
                            {selectedRoom.wifi === 1
                                ? "OK"
                                : selectedRoom.wifi === -1
                                ? "Đang sửa"
                                : "Hỏng"}
                        </p>
                        <p>
                            Điều hòa:{" "}
                            {selectedRoom.air_conditioning === 1
                                ? "OK"
                                : selectedRoom.wifi === -1
                                ? "Đang sửa"
                                : "Hỏng"}
                        </p>
                        <p>Sức chứa: {selectedRoom.capacity}</p>
                    </Modal>
                )}
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
