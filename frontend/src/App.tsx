import React from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./styles.css";

const App: React.FC = () => {
  const [refreshKey, setRefreshKey] = React.useState(0);
  return (
    <div className="container">
      <h1>TaskMate</h1>
      <p>Simple full-stack task manager (React + Node + MongoDB)</p>
      <TaskForm onAdded={() => setRefreshKey(k => k + 1)} />
      {/* Key changes to force reload - simpler than lifting load logic for this small app */}
      <React.Suspense fallback={<div>Loading tasks...</div>}>
        <TaskList key={refreshKey} />
      </React.Suspense>
    </div>
  );
};

export default App;
