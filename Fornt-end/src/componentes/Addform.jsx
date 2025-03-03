import React, { useState } from 'react'

const Addform = () => {

    const [taskinput, setTaskinput] = useState("")
    const [priority, setPriority] = useState("")

    const handleSummit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/createData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task: taskinput, priority: priority })
            });
            setTaskinput("");
            setPriority("");
            // if (!response.ok) {
            //     throw new Error(Error:${response.status} ${response.statusText});
            // }
            // const data = await response.json();
            // console.log("Successfully: ", data);
        } catch (error) {
            console.error("Fetch Error: ", error);
        }
        console.log(taskinput, priority);
    };
    // console.log(taskinput.value)
    return (
        <>
            <div className="container add">
                <h2 className="text-center mt-3 mb-4">Todo List Application</h2>
                <form action="" className="task-form" onSubmit={handleSummit}>
                    <input type="text" value={taskinput} name="" id="" placeholder='Enter Task' className="form-control mb-4" onChange={(e) => setTaskinput(e.target.value)} />
                    <select name="" value={priority} id="" className="form-control" onChange={(e) => setPriority(e.target.value)}>
                        <option value="" hidden>Select the Priority{""}</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <button type="submit" className="btn btn-primary" style={{ marginTop: "30px" }}>Add Task</button>
                </form>
            </div>
        </>
    )
}

export default Addform