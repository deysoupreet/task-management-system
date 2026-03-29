import { useEffect, useState } from "react";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");

  const token = localStorage.getItem("token");

  <h2 style={{ marginBottom: "20px" }}>Tasks</h2>;

  const fetchTasks = async () => {
    try {
      const url = filter
        ? `http://localhost:8080/api/tasks?status=${filter}`
        : "http://localhost:8080/api/tasks";

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  const markDone = async (task) => {
    try {
      await axios.put(
        `http://localhost:8080/api/tasks/${task.id}`,
        { ...task, status: "DONE" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchTasks();
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  return (
    <div>
      <h2>Tasks</h2>

      <input
        placeholder="Filter (TODO / IN_PROGRESS / DONE)"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "none",
        }}
      />

      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="card">
            <h4>{task.title}</h4>
            <p style={{ color: "#aaa" }}>{task.description}</p>

            <p>
              Status:
              <span
                style={{
                  color:
                    task.status === "DONE"
                      ? "#4CAF50"
                      : task.status === "IN_PROGRESS"
                        ? "#ff9800"
                        : "#aaa",
                  marginLeft: "5px",
                }}
              >
                {task.status}
              </span>
            </p>

            <button className="btn btn-green" onClick={() => markDone(task)}>
              Done
            </button>

            <button className="btn btn-red" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

const btn = {
  marginRight: "10px",
  padding: "6px 12px",
  background: "#4CAF50",
  border: "none",
  borderRadius: "5px",
  color: "white",
};

const btnDanger = {
  padding: "6px 12px",
  background: "#f44336",
  border: "none",
  borderRadius: "5px",
  color: "white",
};

export default Tasks;
