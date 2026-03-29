import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  <h2 style={{ marginBottom: "20px" }}>Tasks</h2>;

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/auth/login?email=${email}&password=${password}`,
      );

      localStorage.setItem("token", res.data);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#1e1e1e",
          padding: "30px",
          borderRadius: "10px",
          width: "300px",
        }}
      >
        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button style={btn} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  marginBottom: "10px",
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "#4CAF50",
  border: "none",
  borderRadius: "6px",
  color: "white",
};

export default Login;
