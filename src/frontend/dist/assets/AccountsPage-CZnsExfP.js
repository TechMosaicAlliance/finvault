import { c as createLucideIcon, r as reactExports, m as mockData, j as jsxRuntimeExports, C as CreditCard, f as formatNaira } from "./index-DPcbY0g3.js";
import { B as Button, P as Plus, X, L as Label, I as Input } from "./label-CrnIurBM.js";
import { T as TrendingUp, a as TrendingDown } from "./clsx-Cx-b8D_3.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
];
const ArrowDown = createLucideIcon("arrow-down", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
];
const ArrowUp = createLucideIcon("arrow-up", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode);
const BANK_GRADIENTS = {
  GTBank: { from: "#0D7C66", to: "#0A5C4C", shadow: "#0D7C6655" },
  "Access Bank": { from: "#CC2027", to: "#8B0000", shadow: "#CC202755" },
  "Zenith Bank": { from: "#6B21A8", to: "#4C1D95", shadow: "#6B21A855" }
};
function getGradient(bankName) {
  return BANK_GRADIENTS[bankName] ?? {
    from: "#1A2B4C",
    to: "#0d1a30",
    shadow: "#1A2B4C55"
  };
}
function ChipIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "32",
      height: "24",
      viewBox: "0 0 32 24",
      fill: "none",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "1",
            y: "1",
            width: "30",
            height: "22",
            rx: "4",
            fill: "rgba(255,255,255,0.25)",
            stroke: "rgba(255,255,255,0.4)",
            strokeWidth: "0.8"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "11", y: "1", width: "10", height: "22", fill: "rgba(255,255,255,0.12)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "1", y: "8", width: "30", height: "8", fill: "rgba(255,255,255,0.12)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "13",
            y: "9",
            width: "6",
            height: "6",
            rx: "1",
            fill: "rgba(255,255,255,0.35)"
          }
        )
      ]
    }
  );
}
function BankCard({
  account,
  index,
  onAddCashflow
}) {
  const grad = getGradient(account.bankName);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `accounts.card.${index + 1}`,
      className: "relative overflow-hidden flex flex-col transition-smooth hover:scale-[1.01]",
      style: {
        borderRadius: 24,
        background: `linear-gradient(135deg, ${grad.from} 0%, ${grad.to} 100%)`,
        boxShadow: `0 12px 40px ${grad.shadow}, inset 0 1px 0 rgba(255,255,255,0.2)`,
        minHeight: 180,
        padding: "20px 22px 18px"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              borderRadius: 24,
              background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute -right-8 -top-8 w-32 h-32 rounded-full pointer-events-none",
            style: { background: "rgba(255,255,255,0.06)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute -right-4 top-10 w-20 h-20 rounded-full pointer-events-none",
            style: { background: "rgba(255,255,255,0.04)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-[10px] font-medium tracking-widest uppercase", children: "Bank Account" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold text-lg leading-tight mt-0.5", children: account.bankName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChipIcon, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex-1 flex flex-col justify-center mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/55 text-[10px] font-medium tracking-wide uppercase", children: "Current Balance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-[26px] font-bold tracking-tight leading-none mt-1", children: formatNaira(account.balance) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mt-3 flex items-end justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/50 text-xs font-mono tracking-widest", children: [
              "•••• •••• •••• ",
              account.lastFour
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-4 h-4 rounded-full flex items-center justify-center",
                    style: { background: "rgba(134,239,172,0.25)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { size: 9, className: "text-green-300" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/70 text-[10px] font-semibold", children: formatNaira(account.inflows) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-4 h-4 rounded-full flex items-center justify-center",
                    style: { background: "rgba(252,165,165,0.25)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { size: 9, className: "text-red-300" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/70 text-[10px] font-semibold", children: formatNaira(account.outflows) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `accounts.edit_button.${index + 1}`,
                onClick: () => alert(`Editing ${account.bankName} account`),
                className: "text-[10px] font-semibold px-3 py-1.5 rounded-xl transition-smooth",
                style: {
                  background: "rgba(255,255,255,0.0)",
                  border: "1px solid rgba(255,255,255,0.45)",
                  color: "white"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 9 }),
                  " Edit"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `accounts.add_cashflow_button.${index + 1}`,
                onClick: () => onAddCashflow(account.bankName),
                className: "text-[10px] font-semibold px-3 py-1.5 rounded-xl transition-smooth",
                style: {
                  background: "rgba(255,255,255,0.92)",
                  color: grad.from
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 9 }),
                  " Add Inflow/Outflow"
                ] })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function CashflowLines({
  inflowCount,
  outflowCount,
  nodeHeight,
  nodeGap
}) {
  const rowH = nodeHeight + nodeGap;
  const svgH = Math.max(inflowCount, outflowCount) * rowH;
  const midX = 60;
  const inflowYs = Array.from(
    { length: inflowCount },
    (_, i) => (i + 0.5) * rowH
  );
  const outflowYs = Array.from(
    { length: outflowCount },
    (_, i) => (i + 0.5) * rowH
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: midX * 2,
      height: svgH,
      viewBox: `0 0 ${midX * 2} ${svgH}`,
      fill: "none",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "flowGrad", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#2D6A4F", stopOpacity: "0.7" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#1A2B4C", stopOpacity: "0.6" })
        ] }) }),
        inflowYs.flatMap(
          (iy) => outflowYs.map((oy) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: `M 0 ${iy} C ${midX * 0.6} ${iy}, ${midX * 0.4} ${oy}, ${midX * 2} ${oy}`,
              stroke: "url(#flowGrad)",
              strokeWidth: "1.5",
              opacity: "0.5"
            },
            `${iy}-${oy}`
          ))
        )
      ]
    }
  );
}
function FlowNode({
  label,
  amount,
  icon,
  side
}) {
  const isIn = side === "in";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-2 px-3 py-2.5 rounded-2xl",
      style: {
        background: isIn ? "linear-gradient(135deg, oklch(0.35 0.14 143 / 0.18), oklch(0.45 0.18 143 / 0.10))" : "linear-gradient(135deg, oklch(0.35 0.13 265 / 0.18), oklch(0.25 0.10 265 / 0.10))",
        border: `1px solid ${isIn ? "oklch(0.52 0.19 143 / 0.35)" : "oklch(0.35 0.13 265 / 0.30)"}`,
        backdropFilter: "blur(8px)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base leading-none", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground truncate", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] font-bold mt-0.5",
              style: {
                color: isIn ? "oklch(0.52 0.19 143)" : "oklch(0.55 0.08 265)"
              },
              children: formatNaira(amount)
            }
          )
        ] })
      ]
    }
  );
}
function AddCashflowModal({
  bankName,
  onClose
}) {
  const [title, setTitle] = reactExports.useState("");
  const [amount, setAmount] = reactExports.useState("");
  const [type, setType] = reactExports.useState("inflow");
  const overlayRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: overlayRef,
      "data-ocid": "accounts.dialog",
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4",
      style: { background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" },
      onClick: (e) => {
        if (e.target === overlayRef.current) onClose();
      },
      onKeyDown: (e) => {
        if ((e.key === "Escape" || e.key === "Enter") && e.target === overlayRef.current)
          onClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-card w-full max-w-sm",
          style: {
            background: "oklch(0.97 0.01 265)",
            boxShadow: "0 24px 80px oklch(0.35 0.13 265 / 0.25)",
            borderRadius: 24
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 pt-5 pb-4 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-foreground", children: "Add Cashflow Path" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: bankName })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "accounts.close_button",
                  onClick: onClose,
                  className: "w-8 h-8 rounded-full flex items-center justify-center transition-smooth",
                  style: { background: "oklch(0.92 0.02 265)" },
                  "aria-label": "Close modal",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, className: "text-foreground" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "px-5 py-4 flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block", children: "Type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["inflow", "outflow"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `accounts.type_${t}_toggle`,
                    onClick: () => setType(t),
                    className: "flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-smooth",
                    style: {
                      background: type === t ? t === "inflow" ? "oklch(0.52 0.19 143)" : "oklch(0.35 0.13 265)" : "oklch(0.92 0.02 265)",
                      color: type === t ? "white" : "oklch(0.45 0.04 265)",
                      border: "none"
                    },
                    children: t === "inflow" ? "↑ Inflow" : "↓ Outflow"
                  },
                  t
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "cf-title",
                    className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block",
                    children: "Channel Name"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "cf-title",
                    "data-ocid": "accounts.channel_name_input",
                    placeholder: "e.g. Freelance Income",
                    value: title,
                    onChange: (e) => setTitle(e.target.value),
                    className: "rounded-xl text-sm",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "cf-amount",
                    className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block",
                    children: "Monthly Amount (₦)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "cf-amount",
                    "data-ocid": "accounts.amount_input",
                    type: "number",
                    placeholder: "e.g. 50000",
                    value: amount,
                    onChange: (e) => setAmount(e.target.value),
                    className: "rounded-xl text-sm",
                    min: "0",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    "data-ocid": "accounts.cancel_button",
                    onClick: onClose,
                    className: "flex-1 rounded-xl text-sm",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "submit",
                    "data-ocid": "accounts.confirm_button",
                    className: "flex-1 rounded-xl text-sm font-bold",
                    style: {
                      background: type === "inflow" ? "oklch(0.52 0.19 143)" : "oklch(0.35 0.13 265)"
                    },
                    children: [
                      "Add ",
                      type === "inflow" ? "Inflow" : "Outflow"
                    ]
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function AccountsPage() {
  const { accounts, cashflowInflows, cashflowOutflows } = mockData;
  const [modalBank, setModalBank] = reactExports.useState(null);
  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);
  const totalIn = cashflowInflows.reduce((s, i) => s + i.amount, 0);
  const totalOut = cashflowOutflows.reduce((s, o) => s + o.amount, 0);
  const netFlow = totalIn - totalOut;
  const isNetNegative = netFlow < 0;
  const NODE_H = 56;
  const NODE_GAP = 10;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", "data-ocid": "accounts.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Accounts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Bank accounts & cashflow" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "outline",
          "data-ocid": "accounts.add_account_button",
          className: "rounded-xl gap-1 text-xs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 }),
            " Add Account"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "accounts.total_balance_card",
        className: "glass-card glow-inner px-5 py-4",
        style: {
          background: "linear-gradient(135deg, oklch(0.25 0.10 265 / 0.92), oklch(0.20 0.08 265 / 0.95))",
          border: "1px solid oklch(0.40 0.10 265 / 0.4)",
          boxShadow: "0 12px 48px oklch(0.25 0.10 265 / 0.30), inset 0 1px 0 rgba(255,255,255,0.10)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-7 h-7 rounded-xl flex items-center justify-center",
                    style: { background: "rgba(255,255,255,0.12)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 13, className: "text-white/80" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-xs font-medium", children: "Total Portfolio Balance" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-3xl font-bold tracking-tight", children: formatNaira(totalBalance) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/50 text-[10px] uppercase tracking-wide", children: [
                accounts.length,
                " accounts"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1 justify-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-1.5 h-1.5 rounded-full",
                    style: { background: "oklch(0.65 0.19 143)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-[11px] font-semibold",
                    style: { color: "oklch(0.65 0.19 143)" },
                    children: "Active"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-[10px] mt-1", children: "as of today" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex gap-2 mt-4 pt-3",
              style: { borderTop: "1px solid rgba(255,255,255,0.08)" },
              children: accounts.map((a) => {
                const pct = Math.round(a.balance / totalBalance * 100);
                const grad = getGradient(a.bankName);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-1.5 rounded-full",
                      style: { background: "rgba(255,255,255,0.12)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-full rounded-full",
                          style: {
                            width: `${pct}%`,
                            background: `linear-gradient(90deg, ${grad.from}, ${grad.to})`
                          }
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-[9px] truncate", children: a.bankName.split(" ")[0] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/75 text-[10px] font-semibold", children: [
                    pct,
                    "%"
                  ] })
                ] }, a.id);
              })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "accounts.cards_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-foreground mb-3", children: "Bank Accounts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: accounts.map((acct, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        BankCard,
        {
          account: acct,
          index: i,
          onAddCashflow: (name) => setModalBank(name)
        },
        acct.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "accounts.cashflow_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-foreground mb-1", children: "Cashflow Map" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mb-3", children: "Where your money comes from and goes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-card glow-inner p-4",
          style: {
            background: "oklch(0.97 0.01 265 / 0.7)",
            boxShadow: "0 8px 32px oklch(0.35 0.13 265 / 0.07)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[10px] font-bold uppercase tracking-widest",
                  style: { color: "oklch(0.52 0.19 143)" },
                  children: "Inflow Channels"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[10px] font-bold uppercase tracking-widest",
                  style: { color: "oklch(0.35 0.13 265)" },
                  children: "Outflow Channels"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-stretch gap-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex flex-col justify-around flex-1",
                  style: {
                    gap: NODE_GAP,
                    paddingTop: NODE_GAP / 2,
                    paddingBottom: NODE_GAP / 2
                  },
                  children: cashflowInflows.map((inflow) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    FlowNode,
                    {
                      label: inflow.name,
                      amount: inflow.amount,
                      icon: inflow.icon,
                      side: "in"
                    },
                    inflow.name
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center shrink-0", style: { width: 80 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                CashflowLines,
                {
                  inflowCount: cashflowInflows.length,
                  outflowCount: cashflowOutflows.length,
                  nodeHeight: NODE_H,
                  nodeGap: NODE_GAP
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex flex-col justify-around flex-1",
                  style: {
                    gap: NODE_GAP,
                    paddingTop: NODE_GAP / 2,
                    paddingBottom: NODE_GAP / 2
                  },
                  children: cashflowOutflows.map((outflow) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    FlowNode,
                    {
                      label: outflow.name,
                      amount: outflow.amount,
                      icon: outflow.icon,
                      side: "out"
                    },
                    outflow.name
                  ))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "mt-4 pt-3 flex items-center justify-between gap-3",
                style: { borderTop: "1px solid oklch(0.90 0.02 265)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-7 h-7 rounded-xl flex items-center justify-center",
                        style: { background: "oklch(0.52 0.19 143 / 0.15)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          TrendingUp,
                          {
                            size: 13,
                            style: { color: "oklch(0.52 0.19 143)" }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Total In" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs font-bold",
                          style: { color: "oklch(0.45 0.18 143)" },
                          children: formatNaira(totalIn)
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-light text-muted-foreground", children: "–" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-7 h-7 rounded-xl flex items-center justify-center",
                        style: { background: "oklch(0.35 0.13 265 / 0.12)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          TrendingDown,
                          {
                            size: 13,
                            style: { color: "oklch(0.35 0.13 265)" }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Total Out" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs font-bold",
                          style: { color: "oklch(0.35 0.13 265)" },
                          children: formatNaira(totalOut)
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-light text-muted-foreground", children: "=" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex items-center gap-2 px-3 py-1.5 rounded-2xl",
                      style: {
                        background: isNetNegative ? "oklch(0.55 0.22 25 / 0.12)" : "oklch(0.52 0.19 143 / 0.12)",
                        border: `1px solid ${isNetNegative ? "oklch(0.55 0.22 25 / 0.30)" : "oklch(0.52 0.19 143 / 0.30)"}`
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Net Flow" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "p",
                          {
                            className: "text-xs font-bold",
                            style: {
                              color: isNetNegative ? "oklch(0.55 0.22 25)" : "oklch(0.45 0.18 143)"
                            },
                            children: [
                              isNetNegative ? "-" : "+",
                              formatNaira(Math.abs(netFlow))
                            ]
                          }
                        )
                      ] })
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    ] }),
    modalBank !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddCashflowModal,
      {
        bankName: modalBank,
        onClose: () => setModalBank(null)
      }
    )
  ] });
}
export {
  AccountsPage as default
};
