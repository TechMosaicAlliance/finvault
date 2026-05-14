import { c as createLucideIcon, u as useSettings, f as useNavigate, j as jsxRuntimeExports } from "./index-SZyiZD1w.js";
import { B as Badge } from "./badge-wzkZc_00.js";
import { C as ChevronRight, I as Input } from "./input-sDMFg_6v.js";
import { A as ArrowLeft } from "./arrow-left-XSg9GjhM.js";
import "./index-DnskHVOQ.js";
import "./utils-lxxLwjQ-.js";
import "./clsx-DgYk2OaC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
];
const Moon = createLucideIcon("moon", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
      key: "e79jfc"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
];
const Palette = createLucideIcon("palette", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
];
const Sun = createLucideIcon("sun", __iconNode);
const LANGUAGES = [
  { value: "en", label: "English", flag: "🇬🇧" },
  { value: "de", label: "Deutsch", flag: "🇩🇪" },
  { value: "fr", label: "Français", flag: "🇫🇷" },
  { value: "zh", label: "中文", flag: "🇨🇳" },
  { value: "es", label: "Español", flag: "🇪🇸" },
  { value: "ja", label: "日本語", flag: "🇯🇵" },
  { value: "pt", label: "Português", flag: "🇵🇹" }
];
const DATE_FORMATS = [
  { value: "DD-MM-YY", example: "13-05-26" },
  { value: "YYYY-MM-DD", example: "2026-05-13" },
  { value: "MM/DD/YYYY", example: "05/13/2026" },
  { value: "YYYY/MM/DD", example: "2026/05/13" }
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
  "ZAR"
];
function SectionHeader({
  icon,
  title
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3 mt-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold uppercase tracking-wider text-muted-foreground", children: title })
  ] });
}
function SettingRow({
  children,
  last
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `flex items-center justify-between py-3 ${!last ? "border-b" : ""}`,
      style: { borderColor: "oklch(var(--border) / 0.5)" },
      children
    }
  );
}
function SettingsPage() {
  const s = useSettings();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "settings.back_button",
          onClick: () => navigate({ to: "/" }),
          className: "flex items-center justify-center w-9 h-9 rounded-xl transition-smooth",
          style: {
            background: "oklch(var(--muted) / 0.6)",
            color: "oklch(var(--foreground))"
          },
          "aria-label": "Go back",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18, strokeWidth: 2 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: "Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Customize your FinVault experience" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "rounded-2xl p-4",
        style: {
          background: "oklch(var(--card))",
          border: "1px solid oklch(var(--border))",
          boxShadow: "0 4px 16px oklch(var(--primary) / 0.06)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { size: 16 }), title: "Appearance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Color Mode" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Switch between light and dark mode" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "settings.theme_toggle",
                onClick: () => s.setTheme(s.theme === "dark" ? "light" : "dark"),
                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold transition-smooth",
                style: {
                  background: "oklch(var(--muted))",
                  color: "oklch(var(--foreground))"
                },
                children: [
                  s.theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { size: 14 }),
                  s.theme === "dark" ? "Dark" : "Light"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingRow, { last: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Card Style" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Glassmorphic or flat classic look" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex p-1 rounded-xl gap-1",
                style: { background: "oklch(var(--muted))" },
                children: ["glassmorphic", "classic"].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `settings.view_style_${v}`,
                    onClick: () => s.setViewStyle(v),
                    className: "px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-smooth",
                    style: {
                      background: s.viewStyle === v ? "oklch(var(--primary))" : "transparent",
                      color: s.viewStyle === v ? "oklch(var(--primary-foreground))" : "oklch(var(--muted-foreground))"
                    },
                    children: v === "glassmorphic" ? "Glass" : "Classic"
                  },
                  v
                ))
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "rounded-2xl p-4",
        style: {
          background: "oklch(var(--card))",
          border: "1px solid oklch(var(--border))",
          boxShadow: "0 4px 16px oklch(var(--primary) / 0.06)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 16 }), title: "Language" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: LANGUAGES.map(({ value, label, flag }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `settings.language_${value}`,
              onClick: () => s.setLanguage(value),
              className: "flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth text-left",
              style: {
                background: s.language === value ? "oklch(var(--accent) / 0.15)" : "oklch(var(--muted) / 0.5)",
                border: s.language === value ? "1px solid oklch(var(--accent) / 0.5)" : "1px solid oklch(var(--border) / 0.3)",
                color: s.language === value ? "oklch(var(--accent))" : "oklch(var(--foreground))"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: flag }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: label }),
                s.language === value && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: "ml-auto text-[9px] py-0 px-1.5 h-4",
                    style: {
                      background: "oklch(var(--accent) / 0.2)",
                      color: "oklch(var(--accent))",
                      border: "none"
                    },
                    children: "Active"
                  }
                )
              ]
            },
            value
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-3 text-center", children: "All text stays in English for now. Full translations coming soon." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "rounded-2xl p-4",
        style: {
          background: "oklch(var(--card))",
          border: "1px solid oklch(var(--border))",
          boxShadow: "0 4px 16px oklch(var(--primary) / 0.06)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 }), title: "Date Format" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: DATE_FORMATS.map(({ value, example }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `settings.date_format_${value.replace(/[^a-z0-9]/gi, "_").toLowerCase()}`,
              onClick: () => s.setDateFormat(value),
              className: "flex items-center justify-between px-3 py-2.5 rounded-xl transition-smooth",
              style: {
                background: s.dateFormat === value ? "oklch(var(--primary) / 0.1)" : "oklch(var(--muted) / 0.5)",
                border: s.dateFormat === value ? "1px solid oklch(var(--primary) / 0.4)" : "1px solid oklch(var(--border) / 0.3)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-sm font-semibold font-mono",
                    style: {
                      color: s.dateFormat === value ? "oklch(var(--primary))" : "oklch(var(--foreground))"
                    },
                    children: value
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: example })
              ]
            },
            value
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "rounded-2xl p-4",
        style: {
          background: "oklch(var(--card))",
          border: "1px solid oklch(var(--border))",
          boxShadow: "0 4px 16px oklch(var(--primary) / 0.06)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 16 }), title: "Currency" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Main Currency" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Primary currency for display" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                "data-ocid": "settings.main_currency_select",
                value: s.mainCurrency,
                onChange: (e) => s.setMainCurrency(e.target.value),
                className: "px-3 py-1.5 rounded-xl text-sm font-semibold transition-smooth outline-none",
                style: {
                  background: "oklch(var(--muted))",
                  color: "oklch(var(--foreground))",
                  border: "1px solid oklch(var(--border))",
                  cursor: "pointer"
                },
                children: CURRENCIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Sub Currency" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Secondary reference currency" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                "data-ocid": "settings.sub_currency_select",
                value: s.subCurrency,
                onChange: (e) => s.setSubCurrency(e.target.value),
                className: "px-3 py-1.5 rounded-xl text-sm font-semibold transition-smooth outline-none",
                style: {
                  background: "oklch(var(--muted))",
                  color: "oklch(var(--foreground))",
                  border: "1px solid oklch(var(--border))",
                  cursor: "pointer"
                },
                children: CURRENCIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SettingRow, { last: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Exchange Rate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                s.mainCurrency,
                " → ",
                s.subCurrency,
                " rate"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "settings.exchange_rate_input",
                  type: "number",
                  min: "0",
                  step: "0.0001",
                  value: s.exchangeRate,
                  onChange: (e) => s.setExchangeRate(Number.parseFloat(e.target.value) || 1),
                  className: "w-24 text-sm font-semibold text-right",
                  style: {
                    background: "oklch(var(--muted) / 0.5)",
                    borderColor: "oklch(var(--border))"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "settings.exchange_rate_refresh",
                  title: "Refresh rate",
                  className: "p-1.5 rounded-lg transition-smooth",
                  style: { color: "oklch(var(--accent))" },
                  onClick: () => {
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 14 })
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground pb-2", children: "FinVault V2 · Settings are saved locally on your device" })
  ] });
}
export {
  SettingsPage as default
};
