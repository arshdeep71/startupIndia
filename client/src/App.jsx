import { Routes, Route } from "react-router-dom";
import Navbar from "./navbar/navbar.jsx";
import Home from "./pages/Home.jsx";
import AddStartup from "./pages/addStartup";
import Dashboard from "./pages/dashboard.jsx";
import Analytics from "./pages/analytics.jsx";
import StartupAnalysis from "./pages/startupAnalysis.jsx";
import Login from "./pages/login.jsx";
import StartupDetails from "./pages/startupdetails.jsx";
import "./App.css";
import ProtectedRoute from "../routes/protectedRoute.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route
          path="/addStartup"
          element={
            <ProtectedRoute>
              <AddStartup />
            </ProtectedRoute>
          }
        />
        <Route path="/analytics/:id" element={<StartupAnalysis />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/startup/:id"
          element={
            <ProtectedRoute>
              <StartupDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
