import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import "./index.css";
import { Link } from "react-router-dom";

function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        name,
        password,
      });
      const { token, isLoggedIn, userId } = response.data;
      localStorage.setItem("token", token);
      if (isLoggedIn) {
        setUser({ userId, name });
        navigate("/account"); // Przekierowanie na stronę główną
      } else {
        console.log("Użytkownik nie jest zalogowany.");
      }
    } catch (error) {
      console.error("Błąd logowania:", error);
    }
  };

  return (
    <form onSubmit={handleLogin} id="login">
      <div className="form-content">
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
          <button type="submit">Login</button>
        </div>
        <div id="register">
          <div>Don't have an account?{" "}</div>
          <Link to="/account/register" className="register-button">
            Create one
          </Link>
        </div>
      </div>
    </form>
  );
}

export default LoginPage;
