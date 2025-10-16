import React, { useState } from 'react';

const Addform = ({ setData }) => {

    const [taskinput, setTaskinput] = useState("");
    const [priority, setPriority] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/createData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ task: taskinput, priority: priority }),
            });

            if (response.ok) {
                // ✅ Fetch latest data after adding
                const updatedData = await fetch("http://localhost:3000/");
                const newTasks = await updatedData.json();
                setData(newTasks);

                // Clear inputs
                setTaskinput("");
                setPriority("");
            } else {
                console.error("Failed to create task:", response.statusText);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    };

    return (
        <div className="container add">
            <h2 className="text-center mt-3 mb-4">Todo List Application</h2>
            <form className="task-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Task"
                    className="form-control mb-4"
                    value={taskinput}
                    onChange={(e) => setTaskinput(e.target.value)}
                />
                <select
                    className="form-control"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="" hidden>Select the Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <button type="submit" className="btn btn-primary mt-3">Add Task</button>
            </form>
        </div>
    );
};

export default Addform;
