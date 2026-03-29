import { useState } from "react";
import axios from "axios";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const createTask = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/tasks",
        {
          title,
          description,
          createdBy: { id: 1 },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Task created!");
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Error creating task", err);
    }
  };

  return (
    <div>
      <h2>Create Task</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={input}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={input}
      />

      <button style={btn} onClick={createTask}>
        Create
      </button>
    </div>
  );
}

<h2 style={{ marginBottom: "20px" }}>Tasks</h2>;

const input = {
  display: "block",
  marginBottom: "10px",
  // padding: "8px",
  // borderRadius: "5px",
  border: "none",
  padding: "10px",
  borderRadius: "6px",
  background: "#1e1e1e"
};

const btn = {
  padding: "8px 16px",
  background: "#4CAF50",
  border: "none",
  borderRadius: "5px",
  color: "white",
};

export default CreateTask;
