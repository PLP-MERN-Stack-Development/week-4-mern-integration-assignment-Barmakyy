import * as React from "react"

const ThemeContext = React.createContext()

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme" }) {
  const [theme, setTheme] = React.useState(() => {
    if (typeof window === "undefined") return defaultTheme
    const stored = window.localStorage.getItem(storageKey)
    if (stored) return stored
    if (defaultTheme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return defaultTheme
  })

  React.useEffect(() => {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
    window.localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  const value = React.useMemo(() => ({ theme, setTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within a ThemeProvider")
  return context
} 