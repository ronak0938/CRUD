import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentForm from "./StudentForm";

const API = "https://6aa17f862703577aa1e3be6d.mockapi.io/student";

function Updatestudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({ rno: "", name: "", gender: "", profile: "" });

  useEffect(() => {
    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then(setData);
  }, [id]);

  const save = () => {
    setSaving(true);
    fetch(`${API}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => navigate("/student", { state: { toast: "Changes saved" } }))
      .catch(() => {
        setSaving(false);
        alert("Couldn't save. Check your connection and try again.");
      });
  };

  return (
    <StudentForm
      title="Edit student"
      subtitle="Update the details below, then save your changes."
      data={data}
      setData={setData}
      submitLabel="Save changes"
      onSubmit={save}
      saving={saving}
    />
  );
}

export default Updatestudent;
