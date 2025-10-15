import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Default from "./layout/Default";
import Auth from "./layout/Auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Default />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<Auth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
