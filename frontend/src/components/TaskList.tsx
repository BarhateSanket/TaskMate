import React, { useEffect, useState } from "react";
import { API } from "../api";
import type { Task } from "../types";
import "./TaskList.css";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await API.get<Task[]>("/tasks");
      setTasks(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async (task: Task) => {
    try {
      await API.put(`/tasks/${task._id}`, { completed: !task.completed });
      load();
    } catch (err) {
      console.error(err);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await API.delete(`/tasks/${id}`);
      load();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {tasks.length === 0 ? (
        <div>No tasks yet</div>
      ) : (
        tasks.map((t) => (
          <div className="task" key={t._id}>
            <label>
              <input 
                type="checkbox" 
                checked={t.completed} 
                onChange={() => toggle(t)}
                title={`Mark "${t.title}" as ${t.completed ? 'incomplete' : 'complete'}`}
              />
              <div className={`title ${t.completed ? 'completed' : ''}`}>
                {t.title}
              </div>
            </label>
            <button className="secondary" onClick={() => toggle(t)}>
              {t.completed ? "Undo" : "Done"}
            </button>
            <button className="danger" onClick={() => remove(t._id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
