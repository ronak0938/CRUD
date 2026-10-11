import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const GENDERS = ["Male", "Female", "Other"];

// Shrinks the chosen photo so we store a small image instead of a multi-MB string.
function resizeImage(file, max = 320) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function StudentForm({ title, subtitle, data, setData, submitLabel, onSubmit, saving }) {
  const [error, setError] = useState("");

  const imgChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const profile = await resizeImage(file);
      setData((d) => ({ ...d, profile }));
    } catch {
      setError("That image couldn't be read. Try a different file.");
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (!String(data.rno).trim() || !String(data.name).trim()) {
      setError("Enter a roll number and a name.");
      return;
    }
    setError("");
    onSubmit();
  };

  const initial = (data.name || "").trim()[0]?.toUpperCase();
  const gender = (data.gender || "").toLowerCase();
  const known = GENDERS.map((g) => g.toLowerCase());

  return (
    <>
      <Navbar />
      <main className="page page--narrow">
        <Link to="/student" className="back">← Back to students</Link>
        <form className="card form" onSubmit={submit} noValidate>
          <h1>{title}</h1>
          <p className="muted">{subtitle}</p>

          {error && <div className="alert" role="alert">{error}</div>}

          <div className="photo">
            {data.profile ? (
              <img className="avatar avatar--xl" src={data.profile} alt="Profile preview" />
            ) : (
              <span className="avatar avatar--xl avatar--fallback">{initial || "?"}</span>
            )}
            <div>
              <label className="btn btn--soft btn--sm filebtn">
                {data.profile ? "Change photo" : "Upload photo"}
                <input type="file" accept="image/*" onChange={imgChange} />
              </label>
              <p className="muted small">JPG or PNG. It's resized automatically.</p>
            </div>
          </div>

          <div className="grid2">
            <div className="field">
              <label htmlFor="rno">Roll no.</label>
              <input
                id="rno"
                className="input"
                type="text"
                value={data.rno}
                onChange={(e) => setData({ ...data, rno: e.target.value })}
              />
            </div>
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                className="input"
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
          </div>

          <fieldset className="field">
            <legend>Gender</legend>
            <div className="segments">
              {GENDERS.map((g) => (
                <label key={g} className={"segment" + (gender === g.toLowerCase() ? " is-on" : "")}>
                  <input
                    type="radio"
                    name="gender"
                    value={g.toLowerCase()}
                    checked={gender === g.toLowerCase()}
                    onChange={(e) => setData({ ...data, gender: e.target.value })}
                  />
                  {g}
                </label>
              ))}
              {gender && !known.includes(gender) && (
                <label className="segment is-on">
                  <input type="radio" checked readOnly />
                  {data.gender}
                </label>
              )}
            </div>
          </fieldset>

          <div className="form__actions">
            <Link to="/student" className="btn btn--ghost">Cancel</Link>
            <button type="submit" className="btn btn--primary" disabled={saving}>
              {saving ? "Saving…" : submitLabel}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default StudentForm;
