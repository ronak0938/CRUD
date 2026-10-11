import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentForm from "./StudentForm";

const API = "https://6aa17f862703577aa1e3be6d.mockapi.io/student";

function Addstudent() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({ rno: "", name: "", gender: "", profile: "" });

  const save = () => {
    setSaving(true);
    fetch(API, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => navigate("/student", { state: { toast: "Student added" } }))
      .catch(() => {
        setSaving(false);
        alert("Couldn't save. Check your connection and try again.");
      });
  };

  return (
    <StudentForm
      title="Add student"
      subtitle="Enter the student's details to add them to the register."
      data={data}
      setData={setData}
      submitLabel="Add student"
      onSubmit={save}
      saving={saving}
    />
  );
}

export default Addstudent;
