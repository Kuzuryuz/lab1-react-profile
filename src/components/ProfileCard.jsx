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

  const [searchTerm, setSearchTerm] = useState("");

  const deleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
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

      <div
        style={{
          marginBottom: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search skills"
        />
        <ul>
          {skills
            .map((skill, i) => ({ skill, i }))
            .filter(({ skill }) =>
              skill.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(({ skill, i }) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <li
                  style={{
                    color: skill.includes("React") ? "blue" : undefined,
                    fontWeight: skill.includes("React") ? "bold" : undefined,
                  }}
                >
                  {skill}
                </li>
                <button onClick={() => deleteSkill(i)}>x</button>
              </div>
            ))}
        </ul>
        <div>
          <input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a new skill"
            style={{ marginRight: 5 }}
          />
          <button onClick={addSkill}>Add Skill</button>
        </div>
      </div>

      {/* ส่วนที่เพิ่มใหม่ */}
      <button onClick={() => setLikes(likes + 1)}>💜 Like: {likes}</button>
    </div>
  );
}

export default ProfileCard;
