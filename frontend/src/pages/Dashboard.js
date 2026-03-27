import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("");

  const token = localStorage.getItem("token");

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

  const createTask = async () => {
    if (!title || !description) return;

    try {
      await axios.post(
        "http://localhost:8080/api/tasks",
        {
          title,
          description,
          createdBy: { id: 1 }, // keep simple
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.error("Error creating task", err);
    }
  };

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

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <hr />

      <h3>Create Task</h3>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={createTask}>Create</button>

      <hr />

      <h3>Filter Tasks</h3>
      <input
        placeholder="Enter status (TODO / IN_PROGRESS / DONE)"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <hr />

      <h3>Tasks</h3>

      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>

            <button onClick={() => markDone(task)}>Mark Done</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
