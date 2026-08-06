import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  BURRITO_THEME_STORAGE_KEY,
  burritoThemeBootstrapScript,
} from "./theme-script";

export type BurritoTheme = "light" | "dark";
export type BurritoThemePreference = BurritoTheme | "system";

const DARK_THEME_COLOR = "#070D0B";
const LIGHT_THEME_COLOR = "#F5F8F5";

function systemTheme(): BurritoTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function normalizePreference(value: string | null): BurritoThemePreference {
  return value === "light" || value === "dark" || value === "system" ? value : "system";
}

export function resolveBurritoTheme(preference: BurritoThemePreference): BurritoTheme {
  return preference === "system" ? systemTheme() : preference;
}

export function applyBurritoTheme(theme: BurritoTheme) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = theme === "dark" ? DARK_THEME_COLOR : LIGHT_THEME_COLOR;
}

type BurritoThemeContextValue = {
  theme: BurritoTheme;
  preference: BurritoThemePreference;
  setPreference: (preference: BurritoThemePreference) => void;
  toggleTheme: () => void;
};

const BurritoThemeContext = createContext<BurritoThemeContextValue | null>(null);

export function BurritoThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<BurritoThemePreference>("system");
  const [theme, setTheme] = useState<BurritoTheme>("dark");

  const commit = useCallback((nextPreference: BurritoThemePreference) => {
    const nextTheme = resolveBurritoTheme(nextPreference);
    setPreferenceState(nextPreference);
    setTheme(nextTheme);
    applyBurritoTheme(nextTheme);
  }, []);

  useEffect(() => {
    const initialPreference = normalizePreference(window.localStorage.getItem(BURRITO_THEME_STORAGE_KEY));
    commit(initialPreference);
  }, [commit]);

  useEffect(() => {
    if (preference !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const handleChange = () => commit("system");
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [commit, preference]);

  const setPreference = useCallback(
    (nextPreference: BurritoThemePreference) => {
      window.localStorage.setItem(BURRITO_THEME_STORAGE_KEY, nextPreference);
      commit(nextPreference);
    },
    [commit],
  );

  const toggleTheme = useCallback(() => {
    setPreference(theme === "dark" ? "light" : "dark");
  }, [setPreference, theme]);

  const value = useMemo(
    () => ({ theme, preference, setPreference, toggleTheme }),
    [preference, setPreference, theme, toggleTheme],
  );

  return <BurritoThemeContext.Provider value={value}>{children}</BurritoThemeContext.Provider>;
}

export { BURRITO_THEME_STORAGE_KEY, burritoThemeBootstrapScript };

export function useBurritoTheme() {
  const context = useContext(BurritoThemeContext);
  if (!context) throw new Error("useBurritoTheme must be used inside BurritoThemeProvider");
  return context;
}

export function BurritoThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useBurritoTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      className={`bui-theme-toggle ${className}`.trim()}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      onClick={toggleTheme}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2.5v2M12 19.5v2M4.5 12h-2M21.5 12h-2M5.3 5.3 6.7 6.7M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z" />
    </svg>
  );
}
