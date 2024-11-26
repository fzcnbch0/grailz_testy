import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./indexx.css";
import { Link } from "react-router-dom";

function RegisterComponent() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login/register", {
        name,
        password,
        city,
      });
      if (response.status === 201) {
        console.log("User registered successfully:", response.data);
        navigate("/account");
      } else {
        console.log("Failed to register user.");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <form onSubmit={handleRegister} id="register">
      <div id="form-content">
        <div id="buttons">
          <input
            type="text"
            placeholder="Nazwa użytkownika"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Miasto"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Register</button>
        </div>
        <div id="login">
          <div>Already have an account?{" "}</div>
          <Link to="/account" className="login-button">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
}

export default RegisterComponent;
