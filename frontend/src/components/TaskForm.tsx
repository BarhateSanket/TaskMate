import React, { useState } from "react";
import { API } from "../api";
import "./TaskForm.css";

type Props = { onAdded: () => void };

const TaskForm: React.FC<Props> = ({ onAdded }) => {
  const [title, setTitle] = useState("");

  const add = async () => {
    if (!title.trim()) return;
    try {
      await API.post("/tasks", { title });
      setTitle("");
      onAdded();
    } catch (err) {
      console.error(err);
      alert("Error adding task");
    }
  };

  return (
    <div>
      <div className="form-row">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New task title" />
        <button onClick={add}>Add</button>
      </div>
    </div>
  );
};

export default TaskForm;
