import { TransactionForm } from "@/components/TransactionForm";
import { Badge } from "@/components/ui/badge";
import { type Transaction, formatNaira, mockData } from "@/data/mockData";
import { Link } from "@tanstack/react-router";
import {
  ChevronRight,
  Plus,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

type ViewMode = "Daily" | "Weekly" | "Monthly" | "Annual";

// ─── Compact Circular Progress Ring ─────────────────────────────────────────
function CircularProgressRing({
  percent,
  value,
}: {
  percent: number;
  value: number;
}) {
  const size = 110;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [animated, setAnimated] = useState(false);
  const strokeDashoffset = animated
    ? circumference - (percent / 100) * circumference
    : circumference;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex items-center gap-4 px-4 pt-3 pb-3">
      <div
        className="relative flex-shrink-0"
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
          aria-hidden="true"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius + 5}
            fill="none"
            stroke="oklch(var(--border) / 0.3)"
            strokeWidth="1"
            strokeDasharray="3 5"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="oklch(var(--muted))"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="oklch(var(--accent))"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
              filter: "drop-shadow(0 0 6px oklch(var(--accent) / 0.55))",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-[9px] font-bold tracking-widest uppercase"
            style={{ color: "oklch(var(--accent))" }}
          >
            {percent}%
          </span>
          <span className="text-base font-bold text-foreground leading-none">
            {formatNaira(value)}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <h2 className="text-base font-bold text-foreground tracking-tight leading-tight">
          Safe to Spend
        </h2>
        <p className="text-xs text-muted-foreground">Updated just now</p>
        <div className="flex gap-3 mt-1.5">
          <div className="flex flex-col">
            <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-widest">
              Inflow
            </span>
            <span
              className="text-xs font-bold"
              style={{ color: "oklch(var(--accent))" }}
            >
              +{formatNaira(160000)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-widest">
              Outflow
            </span>
            <span className="text-xs font-bold text-foreground">
              −{formatNaira(220900)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-widest">
              Saved
            </span>
            <span
              className="text-xs font-bold"
              style={{ color: "oklch(var(--accent))" }}
            >
              {formatNaira(75000)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sparkline ────────────────────────────────────────────────────────────
const SPARKLINE_START: [number, number][] = [
  [0, 56],
  [18, 48],
  [36, 52],
  [54, 38],
  [72, 42],
  [90, 32],
  [108, 36],
  [126, 24],
];
const SPARKLINE_CURRENT: [number, number][] = [
  [0, 48],
  [18, 42],
  [36, 28],
  [54, 34],
  [72, 20],
  [90, 26],
  [108, 16],
  [126, 10],
];

function SparkLine({
  data,
  color,
}: { data: [number, number][]; color: string }) {
  const pointsStr = data.map(([x, y]) => `${x},${y}`).join(" ");
  const lastX = data[data.length - 1][0];
  const firstX = data[0][0];
  const fillStr = `${pointsStr} ${lastX},70 ${firstX},70`;
  const gradId = `fill-${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg
      viewBox="0 0 128 72"
      preserveAspectRatio="none"
      className="w-full h-8 mt-2"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fillStr} fill={`url(#${gradId})`} />
      <polyline
        points={pointsStr}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Balance Card ──────────────────────────────────────────────────────────
function BalanceCard({
  label,
  value,
  delta,
  deltaLabel,
  sparkData,
  isUp,
}: {
  label: string;
  value: number;
  delta: string;
  deltaLabel: string;
  sparkData: [number, number][];
  isUp: boolean;
}) {
  const color = isUp ? "oklch(var(--accent))" : "oklch(var(--chart-4))";
  const Icon = isUp ? TrendingUp : TrendingDown;
  return (
    <div className="glass-card glow-inner flex-1 p-4 flex flex-col gap-0.5 overflow-hidden relative">
      <span className="relative z-10 text-[11px] text-muted-foreground font-semibold uppercase tracking-widest text-center">
        {label}
      </span>
      <span className="relative z-10 text-xl font-black text-foreground leading-tight text-center">
        {formatNaira(value)}
      </span>
      <div className="relative z-10 flex items-center justify-center gap-1 mt-0.5">
        <Icon size={12} style={{ color }} />
        <span className="text-[11px] font-semibold" style={{ color }}>
          {delta}
        </span>
        <span className="text-[11px] text-muted-foreground">{deltaLabel}</span>
      </div>
      {/* Underlay sparkline — z-0, behind text */}
      <div className="absolute bottom-0 left-0 right-0 z-0 opacity-60">
        <SparkLine data={sparkData} color={color} />
      </div>
    </div>
  );
}

// ─── Category colors ─────────────────────────────────────────────────────
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

// ─── Transaction Row ───────────────────────────────────────────────────────
function TransactionRow({ tx, index }: { tx: Transaction; index: number }) {
  // Color by transaction semantic type: income=green, expense=red, transfer=grey
  const amountColor =
    tx.transactionType === "credit"
      ? "oklch(var(--accent))"
      : "oklch(var(--destructive))";
  const catColor =
    CATEGORY_COLORS[tx.category] ?? "oklch(var(--muted-foreground))";
  const iconBg =
    tx.transactionType === "credit"
      ? "oklch(var(--accent) / 0.12)"
      : "oklch(var(--destructive) / 0.10)";

  return (
    <div
      data-ocid={`activity.item.${index + 1}`}
      className="flex items-center gap-3 py-3.5 border-b border-border/20 last:border-0"
    >
      <div
        className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg flex-shrink-0 shadow-sm"
        style={{ background: iconBg }}
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
          style={{ color: amountColor }}
        >
          {tx.transactionType === "credit" ? "+" : "−"}
          {formatNaira(tx.amount)}
        </span>
        <span className="text-[10px] text-muted-foreground">
          {tx.date.slice(5)}
        </span>
      </div>
    </div>
  );
}

// ─── Period Detail Panel ───────────────────────────────────────────────────
const TODAY = "2026-05-12";
const CURRENT_MONTH = "2026-05";
const CURRENT_YEAR = "2026";

function getWeekRange(): { start: string; end: string } {
  const today = new Date(TODAY);
  const day = today.getDay(); // 0=Sun
  const diff = day === 0 ? 6 : day - 1; // Mon-based
  const mon = new Date(today);
  mon.setDate(today.getDate() - diff);
  const sun = new Date(mon);
  sun.setDate(mon.getDate() + 6);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return { start: fmt(mon), end: fmt(sun) };
}

function getPeriodData(
  mode: ViewMode,
  transactions: Transaction[],
): { spent: number; received: number } {
  let filtered: Transaction[] = [];
  if (mode === "Daily") {
    filtered = transactions.filter((t) => t.date === TODAY);
  } else if (mode === "Weekly") {
    const { start, end } = getWeekRange();
    filtered = transactions.filter((t) => t.date >= start && t.date <= end);
  } else if (mode === "Monthly") {
    filtered = transactions.filter((t) => t.date.startsWith(CURRENT_MONTH));
  } else if (mode === "Annual") {
    filtered = transactions.filter((t) => t.date.startsWith(CURRENT_YEAR));
  }
  const spent = filtered
    .filter((t) => t.transactionType === "debit")
    .reduce((s, t) => s + t.amount, 0);
  const received = filtered
    .filter((t) => t.transactionType === "credit")
    .reduce((s, t) => s + t.amount, 0);
  return { spent, received };
}

function PeriodDetailPanel({
  mode,
  transactions,
}: {
  mode: ViewMode;
  transactions: Transaction[];
}) {
  const { spent, received } = getPeriodData(mode, transactions);
  const periodLabel =
    mode === "Daily"
      ? "Today"
      : mode === "Weekly"
        ? "This Week"
        : mode === "Monthly"
          ? "This Month"
          : "This Year";

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "oklch(var(--muted) / 0.5)",
        border: "1px solid oklch(var(--border) / 0.4)",
      }}
    >
      <div className="flex divide-x px-1 py-3">
        <div className="flex-1 flex flex-col items-center gap-0.5 px-2">
          <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-widest">
            Received · {periodLabel}
          </span>
          <span
            className="text-sm font-bold"
            style={{ color: "oklch(var(--accent))" }}
          >
            +{formatNaira(received)}
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-0.5 px-2">
          <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-widest">
            Spent · {periodLabel}
          </span>
          <span
            className="text-sm font-bold"
            style={{ color: "oklch(var(--destructive))" }}
          >
            −{formatNaira(spent)}
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-0.5 px-2">
          <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-widest">
            Net
          </span>
          <span
            className="text-sm font-bold"
            style={{
              color:
                received - spent >= 0
                  ? "oklch(var(--accent))"
                  : "oklch(var(--destructive))",
            }}
          >
            {received - spent >= 0 ? "+" : "−"}
            {formatNaira(Math.abs(received - spent))}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Overview Page ────────────────────────────────────────────────────
export default function OverviewPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("Monthly");
  const [fabOpen, setFabOpen] = useState(false);
  const modes: ViewMode[] = ["Daily", "Weekly", "Monthly", "Annual"];
  const {
    safeToSpend,
    safeToSpendPercent,
    startingBalance,
    currentBalance,
    transactions,
    accounts,
  } = mockData;

  const delta = currentBalance - startingBalance;
  const deltaPercent = ((Math.abs(delta) / startingBalance) * 100).toFixed(1);
  const recentTxs = transactions.slice(0, 6);
  const aiParsedCount = recentTxs.filter((t) => t.isAutoParsed).length;

  return (
    <div
      className="flex flex-col gap-4 pb-28 relative"
      data-ocid="overview.page"
    >
      {/* ── Safe to Spend Ring Card ── */}
      <div
        className="glass-card glow-inner overflow-hidden relative"
        data-ocid="overview.safe_to_spend_card"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 100%, oklch(var(--accent) / 0.07) 0%, transparent 70%)",
          }}
        />
        <CircularProgressRing
          percent={safeToSpendPercent}
          value={safeToSpend}
        />
      </div>

      {/* ── View Mode Tabs (below Safe to Spend) ── */}
      <div
        className="flex items-center rounded-2xl p-1 self-stretch"
        data-ocid="overview.view_toggle"
        style={{ background: "oklch(var(--muted))" }}
      >
        {modes.map((mode) => (
          <button
            key={mode}
            type="button"
            data-ocid={`overview.tab.${mode.toLowerCase()}`}
            onClick={() => setViewMode(mode)}
            className="relative flex-1 py-1.5 rounded-xl text-xs font-bold transition-smooth"
            style={{
              background:
                viewMode === mode ? "oklch(var(--primary))" : "transparent",
              color:
                viewMode === mode
                  ? "oklch(var(--primary-foreground))"
                  : "oklch(var(--muted-foreground))",
              boxShadow:
                viewMode === mode
                  ? "0 2px 10px oklch(var(--primary) / 0.35)"
                  : "none",
            }}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* ── Period Detail Panel (tab-driven) ── */}
      <PeriodDetailPanel mode={viewMode} transactions={transactions} />

      {/* ── Balance Cards ── */}
      <div className="flex gap-3" data-ocid="overview.balance_section">
        <BalanceCard
          label="Starting Balance"
          value={startingBalance}
          delta="+12.4%"
          deltaLabel="vs last month"
          sparkData={SPARKLINE_START}
          isUp={false}
        />
        <BalanceCard
          label="Current Reality"
          value={currentBalance}
          delta={`−${deltaPercent}%`}
          deltaLabel="change"
          sparkData={SPARKLINE_CURRENT}
          isUp
        />
      </div>

      {/* ── Recent Activity ── */}
      <section data-ocid="overview.activity_section">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-foreground">
            Recent Activity
          </h3>
          <Link
            to="/transactions"
            data-ocid="overview.transactions_button"
            className="flex items-center gap-0.5 text-xs font-semibold transition-smooth hover:opacity-80"
            style={{ color: "oklch(var(--accent))" }}
          >
            Transactions <ChevronRight size={12} />
          </Link>
        </div>
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl mb-3"
          style={{
            background: "oklch(var(--muted) / 0.6)",
            border: "1px solid oklch(var(--border) / 0.5)",
          }}
        >
          <span className="text-xs text-muted-foreground flex-1">
            {recentTxs.length} transactions this month
          </span>
          <span
            className="flex items-center gap-1 text-xs font-semibold"
            style={{ color: "oklch(0.68 0.20 55)" }}
          >
            <Zap size={10} />
            {aiParsedCount} auto-parsed
          </span>
          <Badge
            variant="secondary"
            className="text-[10px] px-2 py-0.5 rounded-full"
          >
            {recentTxs.length} items
          </Badge>
        </div>
        <div
          className="glass-card glow-inner px-4 py-1"
          data-ocid="overview.activity_list"
        >
          {recentTxs.map((tx, i) => (
            <TransactionRow key={tx.id} tx={tx} index={i} />
          ))}
        </div>
      </section>

      {/* ── FAB — fixed above bottom nav ── */}
      <button
        type="button"
        data-ocid="overview.add_button"
        onClick={() => setFabOpen(true)}
        aria-label="Add transaction"
        className="fixed right-4 w-14 h-14 rounded-full flex items-center justify-center transition-smooth hover:scale-110 active:scale-95 z-40"
        style={{
          bottom: "80px",
          background:
            "linear-gradient(135deg, oklch(var(--primary)), oklch(0.42 0.16 265))",
          color: "oklch(var(--primary-foreground))",
          boxShadow:
            "0 4px 24px oklch(var(--primary) / 0.5), 0 0 0 3px oklch(var(--primary) / 0.15)",
        }}
      >
        <Plus size={24} strokeWidth={2.5} />
      </button>

      {/* ── Unified Transaction Form ── */}
      <TransactionForm
        open={fabOpen}
        onClose={() => setFabOpen(false)}
        onSubmit={(data) => {
          console.log("New transaction:", data);
          setFabOpen(false);
        }}
        accounts={accounts.map((a) => ({ id: a.id, name: a.bankName }))}
      />
    </div>
  );
}
