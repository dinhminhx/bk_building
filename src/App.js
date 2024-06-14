import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard";
import Navbar from "./pages/navbar";
import Building from "./pages/building";
import Time from "./pages/time";
import DatePage from "./pages/date";

const rooms = [
    {
        building: "D1",
        room: "Phòng 101",
        time: "08h00 - 08h45",
        startWeek: 1,
        endWeek: 15,
        day: "Thứ Hai"
    },
    {
        building: "D1",
        room: "Phòng 102",
        time: "09h00 - 09h45",
        startWeek: 1,
        endWeek: 15,
        day: "Thứ Ba"
    },
    {
        building: "D2",
        room: "Phòng 201",
        time: "10h15 - 11h00",
        startWeek: 17,
        endWeek: 34,
        day: "Thứ Tư"
    },
    {
        building: "D2",
        room: "Phòng 202",
        time: "11h15 - 11h45",
        startWeek: 17,
        endWeek: 34,
        day: "Thứ Năm"
    },
    {
        building: "D3",
        room: "Phòng 301",
        time: "13h00 - 13h45",
        startWeek: 1,
        endWeek: 15,
        day: "Thứ Sáu"
    },
    {
        building: "D3",
        room: "Phòng 302",
        time: "14h00 - 14h45",
        startWeek: 1,
        endWeek: 15,
        day: "Thứ Hai"
    },
    {
        building: "D4",
        room: "Phòng 401",
        time: "15h00 - 15h45",
        startWeek: 17,
        endWeek: 34,
        day: "Thứ Ba"
    },
    {
        building: "D4",
        room: "Phòng 402",
        time: "16h00 - 16h45",
        startWeek: 17,
        endWeek: 34,
        day: "Thứ Tư"
    },
    {
        building: "D5",
        room: "Phòng 501",
        time: "08h00 - 08h45",
        startWeek: 1,
        endWeek: 15,
        day: "Thứ Năm"
    },
    {
        building: "D5",
        room: "Phòng 502",
        time: "09h00 - 09h45",
        startWeek: 1,
        endWeek: 15,
        day: "Thứ Sáu"
    },
    {
        building: "D6",
        room: "Phòng 601",
        time: "10h15 - 11h00",
        startWeek: 17,
        endWeek: 34,
        day: "Thứ Hai"
    },
    {
        building: "D6",
        room: "Phòng 602",
        time: "11h15 - 11h45",
        startWeek: 17,
        endWeek: 34,
        day: "Thứ Ba"
    },
    {
        building: "D7",
        room: "Phòng 701",
        time: "13h00 - 13h45",
        startWeek: 1,
        endWeek: 15,
        day: "Thứ Tư"
    },
    {
        building: "D7",
        room: "Phòng 702",
        time: "14h00 - 14h45",
        startWeek: 1,
        endWeek: 15,
        day: "Thứ Năm"
    },
    {
        building: "D8",
        room: "Phòng 801",
        time: "15h00 - 15h45",
        startWeek: 17,
        endWeek: 34,
        day: "Thứ Sáu"
    },
    {
        building: "D8",
        room: "Phòng 802",
        time: "16h00 - 16h45",
        startWeek: 17,
        endWeek: 34,
        day: "Thứ Hai"
    },
    {
        building: "D9",
        room: "Phòng 201",
        time: "10h15 - 11h00",
        startWeek: 1,
        endWeek: 15,
        day: "Thứ Ba"
    },
    {
        building: "D9",
        room: "Phòng 203",
        time: "10h15 - 11h00",
        startWeek: 17,
        endWeek: 34,
        day: "Thứ Tư"
    },
    {
        building: "D9",
        room: "Phòng 401",
        time: "10h15 - 11h00",
        startWeek: 1,
        endWeek: 15,
        day: "Thứ Năm"
    },
    {
        building: "D9",
        room: "Phòng 305",
        time: "10h15 - 11h00",
        startWeek: 1,
        endWeek: 15,
        day: "Thứ Sáu"
    },
    {
        building: "D9",
        room: "Phòng 201",
        time: "12h30 - 13h15",
        startWeek: 17,
        endWeek: 34,
        day: "Thứ Hai"
    },
    {
        building: "D9",
        room: "Phòng 402",
        time: "12h30 - 13h15",
        startWeek: 17,
        endWeek: 34,
        day: "Thứ Ba"
    },
    {
        building: "D9",
        room: "Phòng 403",
        time: "12h30 - 13h15",
        startWeek: 17,
        endWeek: 34,
        day: "Thứ Tư"
    },
    {
        building: "D9",
        room: "Phòng 404",
        time: "12h30 - 13h15",
        startWeek: 17,
        endWeek: 34,
        day: "Thứ Năm"
    },
];

rooms.sort((a, b) => a.building.localeCompare(b.building));
const buildingColors = {
    D1: "#EC407A", // Pink
    D2: "#26A69A", // Teal
    D3: "#FFEE58", // Light Yellow
    D4: "#7E57C2", // Dark Purple
    D5: "#26C6DA", // Cyan
    D6: "#FF7043", // Orange
    D7: "#D4E157", // Lime
    D8: "#FFA726", // Deep Orange
    D9: "#29B6F6", // Light Blue
};

function App() {
    return (
        <Router>
            <Main />
        </Router>
    );
}

function Main() {
    const location = useLocation();
    const showNavbar = location.pathname === "/";

    return (
        <div className="app" style={{ backgroundColor: "#5B904A" }}>
            {showNavbar && <Navbar />}
            <Routes>
                <Route
                    path="/"
                    element={
                        <Dashboard
                            rooms={rooms}
                            buildingColors={buildingColors}
                        />
                    }
                />
                <Route
                    path="/building"
                    element={
                        <Building
                            rooms={rooms}
                            buildingColors={buildingColors}
                        />
                    }
                />
                <Route
                    path="/time"
                    element={
                        <Time rooms={rooms} buildingColors={buildingColors} />
                    }
                />
                <Route
                    path="/date"
                    element={
                        <DatePage
                            rooms={rooms}
                            buildingColors={buildingColors}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
