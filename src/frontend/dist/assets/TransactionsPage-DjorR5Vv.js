import { r as reactExports, j as jsxRuntimeExports } from "./index-BioT_-jz.js";
import { B as Badge } from "./badge-Cn0Q6EId.js";
import { m as mockData, f as formatNaira } from "./mockData-CWBf041B.js";
import { Z as Zap } from "./zap-BLjbhaOG.js";
import "./index-CNbxDuKD.js";
import "./utils-BIDdo8o-.js";
import "./clsx-DgYk2OaC.js";
const TODAY = "2026-05-12";
const CURRENT_MONTH = "2026-05";
const CURRENT_YEAR = "2026";
function getWeekStart() {
  const d = new Date(TODAY);
  d.setDate(d.getDate() - 6);
  return d.toISOString().slice(0, 10);
}
function filterTransactions(txs, mode, customFrom, customTo) {
  if (mode === "Daily") return txs.filter((t) => t.date === TODAY);
  if (mode === "Weekly")
    return txs.filter((t) => t.date >= getWeekStart() && t.date <= TODAY);
  if (mode === "Monthly")
    return txs.filter((t) => t.date.startsWith(CURRENT_MONTH));
  if (mode === "Yearly")
    return txs.filter((t) => t.date.startsWith(CURRENT_YEAR));
  if (mode === "Custom" && customFrom && customTo)
    return txs.filter((t) => t.date >= customFrom && t.date <= customTo);
  return [];
}
const CATEGORY_COLORS = {
  Income: "oklch(var(--accent))",
  Housing: "oklch(var(--chart-2))",
  Feeding: "oklch(var(--chart-4))",
  Transportation: "oklch(var(--chart-3))",
  Grooming: "oklch(var(--chart-5))",
  Gifts: "oklch(var(--destructive))",
  Savings: "oklch(var(--primary))",
  Investment: "oklch(var(--chart-2))",
  Utilities: "oklch(var(--muted-foreground))"
};
function TxRow({ tx, index }) {
  const isCredit = tx.transactionType === "credit";
  const catColor = CATEGORY_COLORS[tx.category] ?? "oklch(var(--muted-foreground))";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `transactions.item.${index + 1}`,
      className: "flex items-center gap-3 py-3.5 border-b border-border/20 last:border-0",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-10 h-10 rounded-2xl flex items-center justify-center text-lg flex-shrink-0 shadow-sm",
            style: { background: catColor.replace(")", " / 0.12)") },
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { role: "img", "aria-label": tx.category, children: tx.icon })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate leading-tight", children: tx.description }),
            tx.isAutoParsed && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0",
                style: {
                  background: "oklch(0.75 0.15 55 / 0.18)",
                  color: "oklch(0.68 0.20 55)",
                  border: "1px solid oklch(0.75 0.15 55 / 0.35)"
                },
                title: "Auto-parsed by AI",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 7 }),
                  "AI"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full",
              style: {
                background: catColor.replace(")", " / 0.12)"),
                color: catColor
              },
              children: tx.category
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-0.5 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "text-sm font-bold leading-tight",
              style: {
                color: isCredit ? "oklch(var(--accent))" : "oklch(var(--foreground))"
              },
              children: [
                isCredit ? "+" : "−",
                formatNaira(tx.amount)
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: tx.date })
        ] })
      ]
    }
  );
}
function SummaryStrip({ txs }) {
  const spent = txs.filter((t) => t.transactionType === "debit").reduce((s, t) => s + t.amount, 0);
  const received = txs.filter((t) => t.transactionType === "credit").reduce((s, t) => s + t.amount, 0);
  const aiCount = txs.filter((t) => t.isAutoParsed).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex gap-2 rounded-2xl px-4 py-3",
      style: {
        background: "oklch(var(--muted) / 0.55)",
        border: "1px solid oklch(var(--border) / 0.4)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center flex-1 gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground font-semibold uppercase tracking-widest", children: "Received" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "text-xs font-bold",
              style: { color: "oklch(var(--accent))" },
              children: [
                "+",
                formatNaira(received)
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-px",
            style: { background: "oklch(var(--border) / 0.4)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center flex-1 gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground font-semibold uppercase tracking-widest", children: "Spent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-foreground", children: [
            "−",
            formatNaira(spent)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-px",
            style: { background: "oklch(var(--border) / 0.4)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center flex-1 gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground font-semibold uppercase tracking-widest", children: "Count" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-foreground", children: txs.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-px",
            style: { background: "oklch(var(--border) / 0.4)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center flex-1 gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[9px] font-semibold uppercase tracking-widest",
              style: { color: "oklch(0.68 0.20 55)" },
              children: "AI"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "flex items-center gap-0.5 text-xs font-bold",
              style: { color: "oklch(0.68 0.20 55)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 9 }),
                aiCount
              ]
            }
          )
        ] })
      ]
    }
  );
}
function TransactionsPage() {
  const [filterMode, setFilterMode] = reactExports.useState("Monthly");
  const [customFrom, setCustomFrom] = reactExports.useState("");
  const [customTo, setCustomTo] = reactExports.useState("");
  const filters = [
    "Daily",
    "Weekly",
    "Monthly",
    "Yearly",
    "Custom"
  ];
  const filtered = filterTransactions(
    mockData.transactions,
    filterMode,
    customFrom,
    customTo
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 pb-8", "data-ocid": "transactions.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground tracking-tight", children: "Transactions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "secondary",
          className: "text-[10px] px-2 py-0.5 rounded-full",
          children: [
            filtered.length,
            " records"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center rounded-2xl p-1",
        "data-ocid": "transactions.filter_tabs",
        style: { background: "oklch(var(--muted))" },
        children: filters.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `transactions.tab.${f.toLowerCase()}`,
            onClick: () => setFilterMode(f),
            className: "relative flex-1 py-1.5 rounded-xl text-[11px] font-bold transition-smooth",
            style: {
              background: filterMode === f ? "oklch(var(--primary))" : "transparent",
              color: filterMode === f ? "oklch(var(--primary-foreground))" : "oklch(var(--muted-foreground))",
              boxShadow: filterMode === f ? "0 2px 10px oklch(var(--primary) / 0.35)" : "none"
            },
            children: f
          },
          f
        ))
      }
    ),
    filterMode === "Custom" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex gap-3 rounded-2xl px-4 py-3",
        style: {
          background: "oklch(var(--muted) / 0.5)",
          border: "1px solid oklch(var(--border) / 0.4)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "tx-custom-from",
                className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider",
                children: "From"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "tx-custom-from",
                type: "date",
                "data-ocid": "transactions.custom_from_input",
                value: customFrom,
                onChange: (e) => setCustomFrom(e.target.value),
                className: "rounded-xl border border-border/50 bg-card/60 text-xs px-3 py-2 text-foreground w-full focus:outline-none focus:ring-2 focus:ring-ring/50"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "tx-custom-to",
                className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider",
                children: "To"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "tx-custom-to",
                type: "date",
                "data-ocid": "transactions.custom_to_input",
                value: customTo,
                onChange: (e) => setCustomTo(e.target.value),
                className: "rounded-xl border border-border/50 bg-card/60 text-xs px-3 py-2 text-foreground w-full focus:outline-none focus:ring-2 focus:ring-ring/50"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryStrip, { txs: filtered }),
    filtered.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass-card glow-inner px-4 py-1",
        "data-ocid": "transactions.list",
        children: filtered.map((tx, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TxRow, { tx, index: i }, tx.id))
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 rounded-3xl gap-3",
        "data-ocid": "transactions.empty_state",
        style: {
          background: "oklch(var(--muted) / 0.4)",
          border: "1px solid oklch(var(--border) / 0.3)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "📭" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "No transactions found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center max-w-[200px]", children: filterMode === "Custom" && (!customFrom || !customTo) ? "Select a date range above to filter transactions" : "No transactions recorded for this period" })
        ]
      }
    )
  ] });
}
export {
  TransactionsPage as default
};
