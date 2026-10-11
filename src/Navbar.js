import React from "react";
import { Link, useNavigate } from "react-router-dom";

export function BrandMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" aria-hidden="true">
      <rect width="36" height="36" rx="10" fill="currentColor" />
      <path d="M18 9 7 14l11 5 11-5-11-5Z" fill="#fff" />
      <path d="M12 18.5v4.2c0 1.5 2.7 3.3 6 3.3s6-1.8 6-3.3v-4.2l-6 2.7-6-2.7Z" fill="#fff" opacity=".8" />
    </svg>
  );
}

function Navbar() {
  const navigate = useNavigate();
  const signOut = () => {
    sessionStorage.removeItem("signedIn");
    navigate("/");
  };

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/student" className="nav__brand">
          <span className="nav__mark"><BrandMark /></span>
          Student Records
        </Link>
        <button type="button" className="btn btn--ghost" onClick={signOut}>
          Sign out
        </button>
      </div>
    </header>
  );
}

export default Navbar;
