import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const API = "https://6aa17f862703577aa1e3be6d.mockapi.io/student";

const initials = (name = "") =>
  name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("") || "?";

function Student() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const location = useLocation();
  const navigate = useNavigate();
  const [toast, setToast] = useState(location.state?.toast || "");

  const load = () => {
    setStatus("loading");
    fetch(API)
      .then((r) => r.json())
      .then((rows) => {
        setData(Array.isArray(rows) ? rows : []);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  };

  useEffect(load, []);

  // Show the toast passed from Add/Update, then clear it so a refresh doesn't repeat it.
  useEffect(() => {
    if (!toast) return;
    navigate(location.pathname, { replace: true, state: null });
    const t = setTimeout(() => setToast(""), 3200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  const deleteStudent = async (s) => {
    if (!window.confirm(`Delete ${s.name || "this student"}? This can't be undone.`)) return;
    try {
      await fetch(`${API}/${s.id}`, { method: "DELETE" });
      setData((rows) => rows.filter((r) => r.id !== s.id));
      setToast("Student deleted");
    } catch {
      setToast("Couldn't delete. Check your connection and try again.");
    }
  };

  const q = search.trim().toLowerCase();
  const filtered = data.filter(
    (s) =>
      (s.name || "").toLowerCase().includes(q) ||
      String(s.rno || "").toLowerCase().includes(q)
  );

  return (
    <>
      <Navbar />
      <main className="page">
        <div className="page__head">
          <div>
            <h1>Students</h1>
            <p className="muted">
              {status === "ready"
                ? `${data.length} ${data.length === 1 ? "student" : "students"} on record`
                : "Loading records…"}
            </p>
          </div>
          <Link to="/student/add" className="btn btn--primary">Add student</Link>
        </div>

        <div className="card">
          <div className="toolbar">
            <div className="search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
              </svg>
              <input
                type="search"
                placeholder="Search by name or roll no."
                aria-label="Search students"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {status === "ready" && search && (
              <span className="muted small">{filtered.length} found</span>
            )}
          </div>

          {status === "loading" && (
            <div className="skeletons" aria-busy="true">
              {[0, 1, 2, 3].map((i) => <div key={i} className="skeleton" />)}
            </div>
          )}

          {status === "error" && (
            <div className="empty">
              <h3>Couldn't load students</h3>
              <p className="muted">Check your connection, then try again.</p>
              <button className="btn btn--primary" onClick={load}>Try again</button>
            </div>
          )}

          {status === "ready" && filtered.length === 0 && (
            <div className="empty">
              <h3>{data.length === 0 ? "No students yet" : "No matches"}</h3>
              <p className="muted">
                {data.length === 0
                  ? "Add your first student to start the register."
                  : "Try a different name or roll number."}
              </p>
              {data.length === 0 && <Link to="/student/add" className="btn btn--primary">Add student</Link>}
            </div>
          )}

          {status === "ready" && filtered.length > 0 && (
            <div className="tableWrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Roll no.</th>
                    <th>Gender</th>
                    <th className="right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <div className="person">
                          {s.profile ? (
                            <img className="avatar" src={s.profile} alt="" />
                          ) : (
                            <span className="avatar avatar--fallback">{initials(s.name)}</span>
                          )}
                          <div>
                            <div className="person__name">{s.name || "Unnamed"}</div>
                            <div className="muted small">ID {s.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>{s.rno}</td>
                      <td>{s.gender ? <span className="pill">{s.gender}</span> : <span className="muted">—</span>}</td>
                      <td className="right">
                        <div className="actions">
                          <Link to={"/update/" + s.id} className="btn btn--soft btn--sm">Edit</Link>
                          <button className="btn btn--danger btn--sm" onClick={() => deleteStudent(s)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}

export default Student;
