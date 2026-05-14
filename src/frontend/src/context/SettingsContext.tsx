import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Language = "en" | "de" | "fr" | "zh" | "es" | "ja" | "pt";
export type Theme = "light" | "dark";
export type ViewStyle = "glassmorphic" | "classic";
export type DateFormat =
  | "DD-MM-YY"
  | "YYYY-MM-DD"
  | "MM/DD/YYYY"
  | "YYYY/MM/DD";

interface SettingsState {
  language: Language;
  theme: Theme;
  viewStyle: ViewStyle;
  dateFormat: DateFormat;
  mainCurrency: string;
  subCurrency: string;
  exchangeRate: number;
}

interface SettingsContextValue extends SettingsState {
  setLanguage: (v: Language) => void;
  setTheme: (v: Theme) => void;
  setViewStyle: (v: ViewStyle) => void;
  setDateFormat: (v: DateFormat) => void;
  setMainCurrency: (v: string) => void;
  setSubCurrency: (v: string) => void;
  setExchangeRate: (v: number) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

const STORAGE_KEY = "finvault-settings";

function loadSettings(): SettingsState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaults, ...JSON.parse(raw) };
  } catch {
    // ignore
  }
  return defaults;
}

const defaults: SettingsState = {
  language: "en",
  theme: "light",
  viewStyle: "glassmorphic",
  dateFormat: "DD-MM-YY",
  mainCurrency: "NGN",
  subCurrency: "USD",
  exchangeRate: 1,
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SettingsState>(loadSettings);

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Apply theme to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [state.theme]);

  // Apply viewStyle to <html> dataset
  useEffect(() => {
    document.documentElement.dataset.viewStyle = state.viewStyle;
  }, [state.viewStyle]);

  function set<K extends keyof SettingsState>(key: K, value: SettingsState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <SettingsContext.Provider
      value={{
        ...state,
        setLanguage: (v) => set("language", v),
        setTheme: (v) => set("theme", v),
        setViewStyle: (v) => set("viewStyle", v),
        setDateFormat: (v) => set("dateFormat", v),
        setMainCurrency: (v) => set("mainCurrency", v),
        setSubCurrency: (v) => set("subCurrency", v),
        setExchangeRate: (v) => set("exchangeRate", v),
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
