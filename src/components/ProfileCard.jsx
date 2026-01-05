// src/components/ProfileCard.jsx
import { useState } from "react";

function ProfileCard({ name, role, bio }) {
  const [likes, setLikes] = useState(0); // สร้าง State สำหรับเก็บจำนวน Like

  const [skills, setSkills] = useState(["React", "Git"]);
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>{name}</h2>
      <p>
        <strong>Role:</strong> {role}
      </p>
      <p>{bio}</p>

      <div style={{ marginTop: 10 }}>
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a new skill"
          style={{ marginRight: 10 }}
        />
        <button onClick={addSkill}>Add Skill</button>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      {/* ส่วนที่เพิ่มใหม่ */}
      <button onClick={() => setLikes(likes + 1)}>💜 Like: {likes}</button>
    </div>
  );
}

export default ProfileCard;
