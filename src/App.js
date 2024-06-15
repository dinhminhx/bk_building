import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard";
import Navbar from "./pages/navbar";
var rooms = require("./data/data.json");
rooms.sort((a, b) => a.building.localeCompare(b.building));
var buildings = require("./data/sorted_buildings.json");
const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`;
};
const buildingColors = {};
buildings.forEach((building) => {
    buildingColors[building] = generateRandomColor();
});
function App() {
    return (
        <Router>
            <Main />
        </Router>
    );
}

function Main() {
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    const handleFilterClick = () => {
        setFilterModalVisible(true);
    };
    return (
        <div className="app" style={{ backgroundColor: "#5B904A" }}>
            <Navbar onFilterClick={handleFilterClick} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Dashboard
                            rooms={rooms}
                            buildingColors={buildingColors}
                            buildings={buildings}
                            filterModalVisible={filterModalVisible}
                            setFilterModalVisible={setFilterModalVisible}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
