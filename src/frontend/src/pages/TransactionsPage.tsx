import { Badge } from "@/components/ui/badge";
import { type Transaction, formatNaira, mockData } from "@/data/mockData";
import { Zap } from "lucide-react";
import { useState } from "react";

type FilterMode = "Daily" | "Weekly" | "Monthly" | "Yearly" | "Custom";

const TODAY = "2026-05-12";
const CURRENT_MONTH = "2026-05";
const CURRENT_YEAR = "2026";

function getWeekStart(): string {
  // 7 days ago from TODAY
  const d = new Date(TODAY);
  d.setDate(d.getDate() - 6);
  return d.toISOString().slice(0, 10);
}

function filterTransactions(
  txs: Transaction[],
  mode: FilterMode,
  customFrom: string,
  customTo: string,
): Transaction[] {
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

// ─── Category colors ──────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  Income: "oklch(var(--accent))",
  Housing: "oklch(var(--chart-2))",
  Feeding: "oklch(var(--chart-4))",
  Transportation: "oklch(var(--chart-3))",
  Grooming: "oklch(var(--chart-5))",
  Gifts: "oklch(var(--destructive))",
  Savings: "oklch(var(--primary))",
  Investment: "oklch(var(--chart-2))",
  Utilities: "oklch(var(--muted-foreground))",
};

// ─── Transaction Row ──────────────────────────────────────────────────────
function TxRow({ tx, index }: { tx: Transaction; index: number }) {
  const isCredit = tx.transactionType === "credit";
  const catColor =
    CATEGORY_COLORS[tx.category] ?? "oklch(var(--muted-foreground))";
  return (
    <div
      data-ocid={`transactions.item.${index + 1}`}
      className="flex items-center gap-3 py-3.5 border-b border-border/20 last:border-0"
    >
      <div
        className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg flex-shrink-0 shadow-sm"
        style={{ background: catColor.replace(")", " / 0.12)") }}
        aria-hidden="true"
      >
        <span role="img" aria-label={tx.category}>
          {tx.icon}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <p className="text-sm font-semibold text-foreground truncate leading-tight">
            {tx.description}
          </p>
          {tx.isAutoParsed && (
            <span
              className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
              style={{
                background: "oklch(0.75 0.15 55 / 0.18)",
                color: "oklch(0.68 0.20 55)",
                border: "1px solid oklch(0.75 0.15 55 / 0.35)",
              }}
              title="Auto-parsed by AI"
            >
              <Zap size={7} />
              AI
            </span>
          )}
        </div>
        <span
          className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{
            background: catColor.replace(")", " / 0.12)"),
            color: catColor,
          }}
        >
          {tx.category}
        </span>
      </div>
      <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
        <span
          className="text-sm font-bold leading-tight"
          style={{
            color: isCredit
              ? "oklch(var(--accent))"
              : "oklch(var(--foreground))",
          }}
        >
          {isCredit ? "+" : "−"}
          {formatNaira(tx.amount)}
        </span>
        <span className="text-[10px] text-muted-foreground">{tx.date}</span>
      </div>
    </div>
  );
}

// ─── Summary Strip ────────────────────────────────────────────────────────
function SummaryStrip({ txs }: { txs: Transaction[] }) {
  const spent = txs
    .filter((t) => t.transactionType === "debit")
    .reduce((s, t) => s + t.amount, 0);
  const received = txs
    .filter((t) => t.transactionType === "credit")
    .reduce((s, t) => s + t.amount, 0);
  const aiCount = txs.filter((t) => t.isAutoParsed).length;
  return (
    <div
      className="flex gap-2 rounded-2xl px-4 py-3"
      style={{
        background: "oklch(var(--muted) / 0.55)",
        border: "1px solid oklch(var(--border) / 0.4)",
      }}
    >
      <div className="flex flex-col items-center flex-1 gap-0.5">
        <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-widest">
          Received
        </span>
        <span
          className="text-xs font-bold"
          style={{ color: "oklch(var(--accent))" }}
        >
          +{formatNaira(received)}
        </span>
      </div>
      <div
        className="w-px"
        style={{ background: "oklch(var(--border) / 0.4)" }}
      />
      <div className="flex flex-col items-center flex-1 gap-0.5">
        <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-widest">
          Spent
        </span>
        <span className="text-xs font-bold text-foreground">
          −{formatNaira(spent)}
        </span>
      </div>
      <div
        className="w-px"
        style={{ background: "oklch(var(--border) / 0.4)" }}
      />
      <div className="flex flex-col items-center flex-1 gap-0.5">
        <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-widest">
          Count
        </span>
        <span className="text-xs font-bold text-foreground">{txs.length}</span>
      </div>
      <div
        className="w-px"
        style={{ background: "oklch(var(--border) / 0.4)" }}
      />
      <div className="flex flex-col items-center flex-1 gap-0.5">
        <span
          className="text-[9px] font-semibold uppercase tracking-widest"
          style={{ color: "oklch(0.68 0.20 55)" }}
        >
          AI
        </span>
        <span
          className="flex items-center gap-0.5 text-xs font-bold"
          style={{ color: "oklch(0.68 0.20 55)" }}
        >
          <Zap size={9} />
          {aiCount}
        </span>
      </div>
    </div>
  );
}

// ─── Transactions Page ────────────────────────────────────────────────────
export default function TransactionsPage() {
  const [filterMode, setFilterMode] = useState<FilterMode>("Monthly");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const filters: FilterMode[] = [
    "Daily",
    "Weekly",
    "Monthly",
    "Yearly",
    "Custom",
  ];

  const filtered = filterTransactions(
    mockData.transactions,
    filterMode,
    customFrom,
    customTo,
  );

  return (
    <div className="flex flex-col gap-4 pb-8" data-ocid="transactions.page">
      {/* ── Page Title ── */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground tracking-tight">
          Transactions
        </h1>
        <Badge
          variant="secondary"
          className="text-[10px] px-2 py-0.5 rounded-full"
        >
          {filtered.length} records
        </Badge>
      </div>

      {/* ── Filter Tabs ── */}
      <div
        className="flex items-center rounded-2xl p-1"
        data-ocid="transactions.filter_tabs"
        style={{ background: "oklch(var(--muted))" }}
      >
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            data-ocid={`transactions.tab.${f.toLowerCase()}`}
            onClick={() => setFilterMode(f)}
            className="relative flex-1 py-1.5 rounded-xl text-[11px] font-bold transition-smooth"
            style={{
              background:
                filterMode === f ? "oklch(var(--primary))" : "transparent",
              color:
                filterMode === f
                  ? "oklch(var(--primary-foreground))"
                  : "oklch(var(--muted-foreground))",
              boxShadow:
                filterMode === f
                  ? "0 2px 10px oklch(var(--primary) / 0.35)"
                  : "none",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── Custom Date Range Picker ── */}
      {filterMode === "Custom" && (
        <div
          className="flex gap-3 rounded-2xl px-4 py-3"
          style={{
            background: "oklch(var(--muted) / 0.5)",
            border: "1px solid oklch(var(--border) / 0.4)",
          }}
        >
          <div className="flex flex-col gap-1 flex-1">
            <label
              htmlFor="tx-custom-from"
              className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider"
            >
              From
            </label>
            <input
              id="tx-custom-from"
              type="date"
              data-ocid="transactions.custom_from_input"
              value={customFrom}
              onChange={(e) => setCustomFrom(e.target.value)}
              className="rounded-xl border border-border/50 bg-card/60 text-xs px-3 py-2 text-foreground w-full focus:outline-none focus:ring-2 focus:ring-ring/50"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label
              htmlFor="tx-custom-to"
              className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider"
            >
              To
            </label>
            <input
              id="tx-custom-to"
              type="date"
              data-ocid="transactions.custom_to_input"
              value={customTo}
              onChange={(e) => setCustomTo(e.target.value)}
              className="rounded-xl border border-border/50 bg-card/60 text-xs px-3 py-2 text-foreground w-full focus:outline-none focus:ring-2 focus:ring-ring/50"
            />
          </div>
        </div>
      )}

      {/* ── Summary Strip ── */}
      <SummaryStrip txs={filtered} />

      {/* ── Transaction List ── */}
      {filtered.length > 0 ? (
        <div
          className="glass-card glow-inner px-4 py-1"
          data-ocid="transactions.list"
        >
          {filtered.map((tx, i) => (
            <TxRow key={tx.id} tx={tx} index={i} />
          ))}
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-16 rounded-3xl gap-3"
          data-ocid="transactions.empty_state"
          style={{
            background: "oklch(var(--muted) / 0.4)",
            border: "1px solid oklch(var(--border) / 0.3)",
          }}
        >
          <span className="text-4xl">📭</span>
          <p className="text-sm font-semibold text-foreground">
            No transactions found
          </p>
          <p className="text-xs text-muted-foreground text-center max-w-[200px]">
            {filterMode === "Custom" && (!customFrom || !customTo)
              ? "Select a date range above to filter transactions"
              : "No transactions recorded for this period"}
          </p>
        </div>
      )}
    </div>
  );
}
