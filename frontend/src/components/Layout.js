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
          gap: "15px",
        }}
      >
        <h2>TaskApp</h2>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>

        <NavItem
          to="/dashboard"
          label="Home"
          active={location.pathname === "/dashboard"}
        />
        <NavItem
          to="/tasks"
          label="Tasks"
          active={location.pathname === "/tasks"}
        />
        <NavItem
          to="/create"
          label="Create Task"
          active={location.pathname === "/create"}
        />
        <NavItem
          to="/users"
          label="Users"
          active={location.pathname === "/users"}
        />
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: "30px",
          overflowY: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function NavItem({ to, label, active }) {
  return (
    <Link
      to={to}
      style={{
        color: active ? "#4CAF50" : "white",
        textDecoration: "none",
        fontWeight: active ? "bold" : "normal",
      }}
    >
      {label}
    </Link>
  );
}

export default Layout;
