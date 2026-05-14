import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useSettings } from "@/context/SettingsContext";
import type {
  DateFormat,
  Language,
  Theme,
  ViewStyle,
} from "@/context/SettingsContext";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronRight,
  Globe,
  Moon,
  Palette,
  RefreshCw,
  Sun,
} from "lucide-react";

const LANGUAGES: { value: Language; label: string; flag: string }[] = [
  { value: "en", label: "English", flag: "🇬🇧" },
  { value: "de", label: "Deutsch", flag: "🇩🇪" },
  { value: "fr", label: "Français", flag: "🇫🇷" },
  { value: "zh", label: "中文", flag: "🇨🇳" },
  { value: "es", label: "Español", flag: "🇪🇸" },
  { value: "ja", label: "日本語", flag: "🇯🇵" },
  { value: "pt", label: "Português", flag: "🇵🇹" },
];

const DATE_FORMATS: { value: DateFormat; example: string }[] = [
  { value: "DD-MM-YY", example: "13-05-26" },
  { value: "YYYY-MM-DD", example: "2026-05-13" },
  { value: "MM/DD/YYYY", example: "05/13/2026" },
  { value: "YYYY/MM/DD", example: "2026/05/13" },
];

const CURRENCIES = [
  "NGN",
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CNY",
  "CAD",
  "AUD",
  "KES",
  "GHS",
  "ZAR",
];

function SectionHeader({
  icon,
  title,
}: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3 mt-1">
      <span className="text-accent">{icon}</span>
      <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
    </div>
  );
}

function SettingRow({
  children,
  last,
}: { children: React.ReactNode; last?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between py-3 ${!last ? "border-b" : ""}`}
      style={{ borderColor: "oklch(var(--border) / 0.5)" }}
    >
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const s = useSettings();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3 pt-1">
        <button
          type="button"
          data-ocid="settings.back_button"
          onClick={() => navigate({ to: "/" })}
          className="flex items-center justify-center w-9 h-9 rounded-xl transition-smooth"
          style={{
            background: "oklch(var(--muted) / 0.6)",
            color: "oklch(var(--foreground))",
          }}
          aria-label="Go back"
        >
          <ArrowLeft size={18} strokeWidth={2} />
        </button>
        <div>
          <h1 className="text-xl font-display font-bold text-foreground">
            Settings
          </h1>
          <p className="text-xs text-muted-foreground">
            Customize your FinVault experience
          </p>
        </div>
      </div>

      {/* ── Appearance ─────────────────────────── */}
      <section
        className="rounded-2xl p-4"
        style={{
          background: "oklch(var(--card))",
          border: "1px solid oklch(var(--border))",
          boxShadow: "0 4px 16px oklch(var(--primary) / 0.06)",
        }}
      >
        <SectionHeader icon={<Palette size={16} />} title="Appearance" />

        {/* Theme toggle */}
        <SettingRow>
          <div>
            <p className="text-sm font-semibold text-foreground">Color Mode</p>
            <p className="text-xs text-muted-foreground">
              Switch between light and dark mode
            </p>
          </div>
          <button
            type="button"
            data-ocid="settings.theme_toggle"
            onClick={() => s.setTheme(s.theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold transition-smooth"
            style={{
              background: "oklch(var(--muted))",
              color: "oklch(var(--foreground))",
            }}
          >
            {s.theme === "dark" ? <Moon size={14} /> : <Sun size={14} />}
            {s.theme === "dark" ? "Dark" : "Light"}
          </button>
        </SettingRow>

        {/* View style */}
        <SettingRow last>
          <div>
            <p className="text-sm font-semibold text-foreground">Card Style</p>
            <p className="text-xs text-muted-foreground">
              Glassmorphic or flat classic look
            </p>
          </div>
          <div
            className="flex p-1 rounded-xl gap-1"
            style={{ background: "oklch(var(--muted))" }}
          >
            {(["glassmorphic", "classic"] as ViewStyle[]).map((v) => (
              <button
                key={v}
                type="button"
                data-ocid={`settings.view_style_${v}`}
                onClick={() => s.setViewStyle(v)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-smooth"
                style={{
                  background:
                    s.viewStyle === v ? "oklch(var(--primary))" : "transparent",
                  color:
                    s.viewStyle === v
                      ? "oklch(var(--primary-foreground))"
                      : "oklch(var(--muted-foreground))",
                }}
              >
                {v === "glassmorphic" ? "Glass" : "Classic"}
              </button>
            ))}
          </div>
        </SettingRow>
      </section>

      {/* ── Language ─────────────────────────── */}
      <section
        className="rounded-2xl p-4"
        style={{
          background: "oklch(var(--card))",
          border: "1px solid oklch(var(--border))",
          boxShadow: "0 4px 16px oklch(var(--primary) / 0.06)",
        }}
      >
        <SectionHeader icon={<Globe size={16} />} title="Language" />
        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.map(({ value, label, flag }) => (
            <button
              key={value}
              type="button"
              data-ocid={`settings.language_${value}`}
              onClick={() => s.setLanguage(value)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth text-left"
              style={{
                background:
                  s.language === value
                    ? "oklch(var(--accent) / 0.15)"
                    : "oklch(var(--muted) / 0.5)",
                border:
                  s.language === value
                    ? "1px solid oklch(var(--accent) / 0.5)"
                    : "1px solid oklch(var(--border) / 0.3)",
                color:
                  s.language === value
                    ? "oklch(var(--accent))"
                    : "oklch(var(--foreground))",
              }}
            >
              <span className="text-base">{flag}</span>
              <span className="font-semibold">{label}</span>
              {s.language === value && (
                <Badge
                  className="ml-auto text-[9px] py-0 px-1.5 h-4"
                  style={{
                    background: "oklch(var(--accent) / 0.2)",
                    color: "oklch(var(--accent))",
                    border: "none",
                  }}
                >
                  Active
                </Badge>
              )}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center">
          All text stays in English for now. Full translations coming soon.
        </p>
      </section>

      {/* ── Date Format ─────────────────────────── */}
      <section
        className="rounded-2xl p-4"
        style={{
          background: "oklch(var(--card))",
          border: "1px solid oklch(var(--border))",
          boxShadow: "0 4px 16px oklch(var(--primary) / 0.06)",
        }}
      >
        <SectionHeader icon={<ChevronRight size={16} />} title="Date Format" />
        <div className="flex flex-col gap-2">
          {DATE_FORMATS.map(({ value, example }) => (
            <button
              key={value}
              type="button"
              data-ocid={`settings.date_format_${value.replace(/[^a-z0-9]/gi, "_").toLowerCase()}`}
              onClick={() => s.setDateFormat(value)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl transition-smooth"
              style={{
                background:
                  s.dateFormat === value
                    ? "oklch(var(--primary) / 0.1)"
                    : "oklch(var(--muted) / 0.5)",
                border:
                  s.dateFormat === value
                    ? "1px solid oklch(var(--primary) / 0.4)"
                    : "1px solid oklch(var(--border) / 0.3)",
              }}
            >
              <span
                className="text-sm font-semibold font-mono"
                style={{
                  color:
                    s.dateFormat === value
                      ? "oklch(var(--primary))"
                      : "oklch(var(--foreground))",
                }}
              >
                {value}
              </span>
              <span className="text-xs text-muted-foreground">{example}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Currency ─────────────────────────── */}
      <section
        className="rounded-2xl p-4"
        style={{
          background: "oklch(var(--card))",
          border: "1px solid oklch(var(--border))",
          boxShadow: "0 4px 16px oklch(var(--primary) / 0.06)",
        }}
      >
        <SectionHeader icon={<RefreshCw size={16} />} title="Currency" />

        <SettingRow>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Main Currency
            </p>
            <p className="text-xs text-muted-foreground">
              Primary currency for display
            </p>
          </div>
          <select
            data-ocid="settings.main_currency_select"
            value={s.mainCurrency}
            onChange={(e) => s.setMainCurrency(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-sm font-semibold transition-smooth outline-none"
            style={{
              background: "oklch(var(--muted))",
              color: "oklch(var(--foreground))",
              border: "1px solid oklch(var(--border))",
              cursor: "pointer",
            }}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </SettingRow>

        <SettingRow>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Sub Currency
            </p>
            <p className="text-xs text-muted-foreground">
              Secondary reference currency
            </p>
          </div>
          <select
            data-ocid="settings.sub_currency_select"
            value={s.subCurrency}
            onChange={(e) => s.setSubCurrency(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-sm font-semibold transition-smooth outline-none"
            style={{
              background: "oklch(var(--muted))",
              color: "oklch(var(--foreground))",
              border: "1px solid oklch(var(--border))",
              cursor: "pointer",
            }}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </SettingRow>

        <SettingRow last>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Exchange Rate
            </p>
            <p className="text-xs text-muted-foreground">
              {s.mainCurrency} → {s.subCurrency} rate
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <Input
              data-ocid="settings.exchange_rate_input"
              type="number"
              min="0"
              step="0.0001"
              value={s.exchangeRate}
              onChange={(e) =>
                s.setExchangeRate(Number.parseFloat(e.target.value) || 1)
              }
              className="w-24 text-sm font-semibold text-right"
              style={{
                background: "oklch(var(--muted) / 0.5)",
                borderColor: "oklch(var(--border))",
              }}
            />
            <button
              type="button"
              data-ocid="settings.exchange_rate_refresh"
              title="Refresh rate"
              className="p-1.5 rounded-lg transition-smooth"
              style={{ color: "oklch(var(--accent))" }}
              onClick={() => {}}
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </SettingRow>
      </section>

      {/* Footer note */}
      <p className="text-center text-xs text-muted-foreground pb-2">
        FinVault V2 · Settings are saved locally on your device
      </p>
    </div>
  );
}
