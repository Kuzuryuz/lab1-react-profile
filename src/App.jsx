import { useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const username = "Kuzuryuz";

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("User not found");
          }
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setGithubData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      console.error("Failed to save theme to localStorage", e);
    }
  }, [theme]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        backgroundColor: theme === "dark" ? "#323232ff" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#000000",
        position: "relative",
      }}
    >
      <h1>My Team Portfolio</h1>
      <button
        onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        style={{ position: "absolute", top: 10, right: 10 }}
      >
        {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>❌ {error}</p>
      ) : (
        <>
          <ProfileCard
            name={githubData.name || githubData.login}
            role="GitHub User"
            bio={githubData.bio || "No bio available"}
          />
        </>
      )}
    </div>
  );
}

export default App;
