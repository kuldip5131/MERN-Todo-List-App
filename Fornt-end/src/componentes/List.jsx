import React, { useState } from "react";

const List = ({ data, setData }) => {
    const [editId, setEditId] = useState(null);
    const [editTask, setEditTask] = useState("");
    const [editPriority, setEditPriority] = useState("");

    const handleEdit = (task) => {
        setEditId(task._id);
        setEditTask(task.task);
        setEditPriority(task.priority);
    };

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
                setEditId(null);
            }
        } catch (error) {
            console.log("Error updating data:", error);
        }
    };

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
        <div className="container list">
            <h1 className="text-center mt-5">Task List</h1>
            <div className="table-responsive">
                <table className="table table-success table-striped">
                    <thead className="text-center">
                        <tr>
                            <th>ID</th>
                            <th>Task</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {data.map((ele) => (
                            <tr key={ele._id}>
                                <td>{ele._id}</td>
                                <td>
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
                                <td>
                                    {editId === ele._id ? (
                                        <button className="btn btn-success btn-sm" onClick={() => handleSave(ele._id)}>
                                            Save
                                        </button>
                                    ) : (
                                        <button className="btn btn-info btn-sm text-white" onClick={() => handleEdit(ele)}>
                                            Edit
                                        </button>
                                    )}
                                    <button className="btn btn-danger btn-sm ms-2" onClick={() => removeData(ele._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default List;
