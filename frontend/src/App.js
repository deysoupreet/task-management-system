import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import CreateTask from "./pages/CreateTask";
import Users from "./pages/Users";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/tasks" element={<Layout><Tasks /></Layout>} />
        <Route path="/create" element={<Layout><CreateTask /></Layout>} />
        <Route path="/users" element={<Layout><Users /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;