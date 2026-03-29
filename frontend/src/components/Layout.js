import { Link, useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#1e1e1e",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h2>TaskApp</h2>

        <NavItem to="/dashboard" label="Home" current={location.pathname} />
        <NavItem to="/tasks" label="Tasks" current={location.pathname} />
        <NavItem to="/create" label="Create Task" current={location.pathname} />
        <NavItem to="/users" label="Users" current={location.pathname} />

        <button
          style={{
            marginTop: "auto",
            padding: "8px",
            background: "#f44336",
            border: "none",
            borderRadius: "6px",
            color: "white",
          }}
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: "30px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function NavItem({ to, label, current }) {
  const active = current === to;

  return (
    <Link
      to={to}
      style={{
        padding: "10px",
        borderRadius: "6px",
        textDecoration: "none",
        background: active ? "#2a2a2a" : "transparent",
        color: active ? "#4CAF50" : "white",
      }}
    >
      {label}
    </Link>
  );
}

export default Layout;