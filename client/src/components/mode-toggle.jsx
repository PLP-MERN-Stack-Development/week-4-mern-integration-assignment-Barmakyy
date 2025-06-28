import { useTheme } from "./theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem",
        border: "1px solid #ccc",
        background: theme === "dark" ? "#23272f" : "#fff",
        color: theme === "dark" ? "#f3f4f6" : "#23272f",
        cursor: "pointer",
        fontWeight: 600,
        transition: "all 0.2s"
      }}
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  )
} 