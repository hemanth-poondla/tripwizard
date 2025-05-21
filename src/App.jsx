
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Wizard from "./components/itineraryWizard/Wizard";
import Dashboard from "./components/dashboard/Dashboard";
import { ThemeProvider } from "./context/ThemeContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const basename = process.env.NODE_ENV === "production" ? "/tripwizard" : "/";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (!u) {
        navigate("/login");
      } else {
        setUser(u);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return user ? children : null;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/wizard" element={
        <ProtectedRoute>
          <Wizard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router basename={basename}>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
