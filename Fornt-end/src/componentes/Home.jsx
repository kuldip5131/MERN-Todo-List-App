import React, { useState, useEffect } from "react";
import Addform from "./Addform";
import List from "./List";

const Home = () => {
    const [data, setData] = useState([]);

    // Fetch tasks when the component loads
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/");
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {/* Left: Add Task Form */}
            <Addform setData={setData} />
            {/* Right: Task List */}
            <List data={data} setData={setData} />
        </div>
    );
};

export default Home;
