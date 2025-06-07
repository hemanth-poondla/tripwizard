import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) return setError("Enter a valid email.");
    if (!validatePassword(password)) return setError("Password must be at least 6 characters.");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("That email is already in use.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box glass">
        <h2>Create Your Account</h2>
        <form onSubmit={handleRegister}>
          <Input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-field">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password (min 6 characters)"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {error && <p className="error">{error}</p>}
          <Button type="submit" className="btn-cta">Register</Button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
