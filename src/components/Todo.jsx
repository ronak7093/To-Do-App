import React from 'react'
import { useState, useEffect } from "react";
import "../css/Todo.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todo = () => {

    const [task, setTask] = useState("");
    const [submit, setSubmit] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : []
    });
    const [error, setError] = useState();
    const [isediting, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(submit))
    }, [submit])

    const handleTask = () => {
        if (task.trim() === "") {
            setError("Please Enter a task.");
            toast.error("Task cannot be empty!", {
                className: "custom-toast-error",
            });
            return;
        }
        if (isediting) {
            const updatedtask = [...submit];
            updatedtask[editIndex] = task;
            setSubmit(updatedtask);
            toast.success("Task Updated successfully", {
                className: "custom-toast-success",
            });
            setIsEditing(false);
            setEditIndex(null);
        } else {
            setSubmit([...submit, task]);
            toast.success("Task added successfully!", {
                className: "custom-toast-success",
            });
        }
        setTask("");
        setError("");
    };

    const handleDelete = (indexToDelete) => {
        console.log(indexToDelete, "ndectodelete");
        const updateTask = submit.filter((_, i) => i !== indexToDelete);
        setSubmit(updateTask);
        toast.info("Task deleted successfully!", {
            className: "custom-toast-info",
        });

        if (isediting && indexToDelete === editIndex) {
            setTask("");
            setIsEditing(false);
            setEditIndex(null);
        }
    };

    const handleEdit = (indexToEdit) => {
        setTask(submit[indexToEdit]);
        setIsEditing(true);
        setEditIndex(indexToEdit);
    };
    return (
        <>
            <h1>To-Do LIST</h1>
            <input
                type="text"
                onChange={(event) => setTask(event.target.value)}
                value={task}
                placeholder="Enter a Task"
            />
            <button onClick={handleTask}>Submit</button>

            {error && <p className="error-msg">{error}</p>}

            {submit.length > 0 ? (
                <>
                    <h3>Submitted Task:</h3>
                    <ul>
                        {submit.map((item, index) => (
                            <li key={index}>
                                <span className="task-text">{item}</span>
                                <div className="button-group">
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(index)}
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(index)}
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>No task left!</p>
            )}
            {/* Toast container */}
            <ToastContainer position="top-right" />
        </>
    );
}

export default Todo;