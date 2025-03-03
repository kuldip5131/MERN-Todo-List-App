import React, { useEffect, useState } from "react";

const List = () => {
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editTask, setEditTask] = useState("");
    const [editPriority, setEditPriority] = useState("");

    // Fetch Data from API
    const fetchingData = async () => {
        try {
            const res = await fetch("http://localhost:3000/");
            const result = await res.json();
            setData(result);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchingData();
    }, [fetchingData]);

    // Edit Button Click - Set Data for Editing
    const handleEdit = (task) => {
        setEditId(task._id);
        setEditTask(task.task);
        setEditPriority(task.priority);
    };

    // Save Updated Data Without Reloading
    const handleSave = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/updateData/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ task: editTask, priority: editPriority }),
            });

            if (res.ok) {
                setData(
                    data.map((item) =>
                        item._id === id ? { ...item, task: editTask, priority: editPriority } : item
                    )
                );
                setEditId(null); // Exit Edit Mode
            }
        } catch (error) {
            console.log("Error updating data:", error);
        }
    };

    // Remove Data Without Reloading
    const removeData = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/deleteData/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setData(data.filter((task) => task._id !== id));
            }
        } catch (error) {
            console.log("Error deleting data:", error);
        }
    };

    return (
        <>
            <div className="container list">
                <h1 className="text-center mt-5">Task List</h1>
                <div className="table-responsive">
                    <table className="table table-success table-striped">
                        <thead className="text-center">
                            <tr>
                                <th scope="col" className="hidden-column">ID</th>
                                <th scope="col">Task</th>
                                <th scope="col">Priority</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {data.map((ele) => (
                                <tr key={ele._id}>
                                    <th scope="row" className="hidden-column">{ele._id}</th>
                                    <td className="td-overflow">
                                        {editId === ele._id ? (
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                value={editTask}
                                                onChange={(e) => setEditTask(e.target.value)}
                                            />
                                        ) : (
                                            ele.task
                                        )}
                                    </td>
                                    <td>
                                        {editId === ele._id ? (
                                            <select
                                                className="form-select form-select-sm"
                                                value={editPriority}
                                                onChange={(e) => setEditPriority(e.target.value)}
                                            >
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                            </select>
                                        ) : (
                                            ele.priority
                                        )}
                                    </td>
                                    <td className="flex-column">
                                        {editId === ele._id ? (
                                            <button className="btn btn-success btn-sm my-1" style={{ width: "50px" }} onClick={() => handleSave(ele._id)}>
                                                <i className="fa fa-save"></i>
                                            </button>
                                        ) : (
                                            <button className="btn btn-info text-white btn-sm my-1" style={{ width: "50px" }} onClick={() => handleEdit(ele)}>
                                                <i className="fa fa-edit"></i>
                                            </button>
                                        )}
                                        <button className="btn btn-danger text-white btn-sm my-1" style={{ width: "50px" }} onClick={() => removeData(ele._id)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
};

export default List;
