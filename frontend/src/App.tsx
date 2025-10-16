import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Default from "./layout/Default";
import Auth from "./layout/Auth";
import Protected from "./layout/Protected";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import Customer from "./pages/Customer";
import ProfilePage from "./pages/Profile";

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
        </Route>

        <Route element={<Protected />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}
