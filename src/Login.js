import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrandMark } from "./Navbar";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const login = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      sessionStorage.setItem("signedIn", "true");
      navigate("/student");
    } else {
      setError("That username or password doesn't match. Check both and try again.");
    }
  };

  return (
    <div className="login">
      <aside className="login__hero">
        <div className="login__heroTop">
          <span className="login__mark"><BrandMark size={40} /></span>
          <span className="login__brand">Student Records</span>
        </div>
        <div className="login__heroBody">
          <h1>Every student, one tidy register.</h1>
          <p>Add new students, update their details and find anyone in seconds.</p>
        </div>
        <ul className="login__list" aria-hidden="true">
          <li><span>Roll no.</span><b>2026-014</b></li>
          <li><span>Roll no.</span><b>2026-015</b></li>
          <li><span>Roll no.</span><b>2026-016</b></li>
        </ul>
      </aside>

      <main className="login__panel">
        <form className="login__card" onSubmit={login} noValidate>
          <h2>Sign in</h2>
          <p className="muted">Use your admin account to manage students.</p>

          {error && <div className="alert" role="alert">{error}</div>}

          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className="input"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(""); }}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="input"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              required
            />
          </div>

          <label className="check">
            <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} />
            Show password
          </label>

          <button type="submit" className="btn btn--primary btn--block">Sign in</button>
          <button
            type="button"
            className="link"
            onClick={() => setError("Password resets are handled by your administrator.")}
          >
            Forgot password?
          </button>
        </form>
      </main>
    </div>
  );
}

export default Login;
