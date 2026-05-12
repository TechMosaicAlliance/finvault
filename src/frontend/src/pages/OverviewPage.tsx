import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Transaction, formatNaira, mockData } from "@/data/mockData";
import {
  ChevronRight,
  Plus,
  TrendingDown,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ViewMode = "Daily" | "Monthly" | "Annual";

// ─── Circular Progress Ring ────────────────────────────────────────────────
function CircularProgressRing({
  percent,
  value,
}: {
  percent: number;
  value: number;
}) {
  const size = 200;
  const strokeWidth = 12;
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
    <div className="flex flex-col items-center justify-center pt-6 pb-4 px-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
          aria-hidden="true"
        >
          {/* Outer decorative dashed ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius + 10}
            fill="none"
            stroke="oklch(var(--border) / 0.4)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="oklch(var(--muted))"
            strokeWidth={strokeWidth}
          />
          {/* Progress arc */}
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
              filter: "drop-shadow(0 0 10px oklch(var(--accent) / 0.6))",
            }}
          />
          {/* Inner depth ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius - 14}
            fill="none"
            stroke="oklch(var(--accent) / 0.12)"
            strokeWidth="4"
            strokeDasharray={`${circumference * 0.3} ${circumference * 0.7}`}
            strokeDashoffset={circumference * 0.15}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-xs font-bold tracking-widest uppercase mb-1"
            style={{ color: "oklch(var(--accent))" }}
          >
            {percent}%
          </span>
          <span className="text-3xl font-bold text-foreground leading-none">
            {formatNaira(value)}
          </span>
          <span className="text-xs text-muted-foreground mt-1.5 font-medium">
            Safe to Spend
          </span>
        </div>
      </div>
      <h2 className="text-lg font-bold text-foreground mt-1 tracking-tight">
        Safe to Spend Today
      </h2>
      <p className="text-xs text-muted-foreground mt-0.5">Updated just now</p>
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
    <div className="glass-card glow-inner flex-1 p-4 flex flex-col gap-0.5 overflow-hidden">
      <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-widest">
        {label}
      </span>
      <span className="text-xl font-bold text-foreground leading-tight">
        {formatNaira(value)}
      </span>
      <div className="flex items-center gap-1 mt-0.5">
        <Icon size={12} style={{ color }} />
        <span className="text-[11px] font-semibold" style={{ color }}>
          {delta}
        </span>
        <span className="text-[11px] text-muted-foreground">{deltaLabel}</span>
      </div>
      <SparkLine data={sparkData} color={color} />
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
  const isCredit = tx.transactionType === "credit";
  const catColor =
    CATEGORY_COLORS[tx.category] ?? "oklch(var(--muted-foreground))";

  return (
    <div
      data-ocid={`activity.item.${index + 1}`}
      className="flex items-center gap-3 py-3.5 border-b border-border/20 last:border-0"
    >
      {/* Icon circle */}
      <div
        className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg flex-shrink-0 shadow-sm"
        style={{ background: catColor.replace(")", " / 0.12)") }}
        aria-hidden="true"
      >
        <span role="img" aria-label={tx.category}>
          {tx.icon}
        </span>
      </div>

      {/* Center: description + AI badge + category */}
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

      {/* Amount + date */}
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
        <span className="text-[10px] text-muted-foreground">
          {tx.date.slice(5)}
        </span>
      </div>
    </div>
  );
}

// ─── Manual Entry Modal ────────────────────────────────────────────────────
const CATEGORIES = [
  "Feeding",
  "Transportation",
  "Housing",
  "Grooming",
  "Gifts",
  "Savings",
  "Investment",
  "Utilities",
  "Other",
];

function AddTransactionModal({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Feeding");
  const [type, setType] = useState<"credit" | "debit">("debit");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onClose();
    setDesc("");
    setAmount("");
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-ocid="add_transaction.dialog"
        className="max-w-sm mx-auto p-0 overflow-hidden border-0 rounded-3xl"
        style={{
          background: "oklch(var(--card) / 0.92)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="p-6">
          <DialogHeader className="mb-5">
            <DialogTitle className="text-lg font-bold text-foreground">
              Add Transaction
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Type toggle */}
            <div
              className="flex gap-2 p-1 rounded-2xl"
              style={{ background: "oklch(var(--muted))" }}
            >
              {(["debit", "credit"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  data-ocid={`add_transaction.type.${t}`}
                  onClick={() => setType(t)}
                  className="flex-1 py-2 rounded-xl text-sm font-semibold transition-smooth"
                  style={{
                    background:
                      type === t
                        ? t === "credit"
                          ? "oklch(var(--accent) / 0.2)"
                          : "oklch(var(--destructive) / 0.2)"
                        : "transparent",
                    color:
                      type === t
                        ? t === "credit"
                          ? "oklch(var(--accent))"
                          : "oklch(var(--destructive))"
                        : "oklch(var(--muted-foreground))",
                    border:
                      type === t
                        ? `1px solid ${t === "credit" ? "oklch(var(--accent) / 0.4)" : "oklch(var(--destructive) / 0.4)"}`
                        : "1px solid transparent",
                  }}
                >
                  {t === "credit" ? "↑ Income" : "↓ Expense"}
                </button>
              ))}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="tx-desc"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Description
              </Label>
              <Input
                ref={inputRef}
                id="tx-desc"
                data-ocid="add_transaction.description_input"
                placeholder="e.g. Shoprite Groceries"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="rounded-xl border-border/50 bg-muted/50 text-sm"
              />
            </div>

            {/* Amount */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="tx-amount"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Amount (₦)
              </Label>
              <Input
                id="tx-amount"
                data-ocid="add_transaction.amount_input"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="rounded-xl border-border/50 bg-muted/50 text-sm"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="tx-cat"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Category
              </Label>
              <select
                id="tx-cat"
                data-ocid="add_transaction.category_select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-xl border border-border/50 bg-muted/50 text-sm px-3 py-2 text-foreground w-full focus:outline-none focus:ring-2 focus:ring-ring/50"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-2">
              <Button
                type="button"
                variant="outline"
                data-ocid="add_transaction.cancel_button"
                onClick={onClose}
                className="flex-1 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                data-ocid="add_transaction.submit_button"
                disabled={!desc || !amount}
                className="flex-1 rounded-xl"
                style={{
                  background: "oklch(var(--primary))",
                  color: "oklch(var(--primary-foreground))",
                }}
              >
                Save Entry
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Overview Page ────────────────────────────────────────────────────
export default function OverviewPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("Monthly");
  const [fabOpen, setFabOpen] = useState(false);
  const modes: ViewMode[] = ["Daily", "Monthly", "Annual"];
  const {
    safeToSpend,
    safeToSpendPercent,
    startingBalance,
    currentBalance,
    transactions,
  } = mockData;

  const delta = currentBalance - startingBalance;
  const deltaPercent = ((Math.abs(delta) / startingBalance) * 100).toFixed(1);
  const recentTxs = transactions.slice(0, 6);
  const aiParsedCount = recentTxs.filter((t) => t.isAutoParsed).length;

  return (
    <div className="flex flex-col gap-5 pb-28" data-ocid="overview.page">
      {/* ── View Mode Toggle ── */}
      <div
        className="flex items-center rounded-2xl p-1 self-center mt-1"
        data-ocid="overview.view_toggle"
        style={{ background: "oklch(var(--muted))" }}
      >
        {modes.map((mode) => (
          <button
            key={mode}
            type="button"
            data-ocid={`overview.tab.${mode.toLowerCase()}`}
            onClick={() => setViewMode(mode)}
            className="relative px-5 py-1.5 rounded-xl text-xs font-bold transition-smooth"
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

      {/* ── Safe to Spend Ring Card ── */}
      <div
        className="glass-card glow-inner overflow-hidden relative"
        data-ocid="overview.safe_to_spend_card"
      >
        {/* Background radial accent */}
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

        {/* Quick stats strip */}
        <div
          className="flex divide-x"
          style={{ borderTop: "1px solid oklch(var(--border) / 0.5)" }}
        >
          <div className="flex-1 flex flex-col items-center py-3">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">
              Inflow
            </span>
            <span
              className="text-sm font-bold"
              style={{ color: "oklch(var(--accent))" }}
            >
              +{formatNaira(160000)}
            </span>
          </div>
          <div className="flex-1 flex flex-col items-center py-3">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">
              Outflow
            </span>
            <span className="text-sm font-bold text-foreground">
              −{formatNaira(220900)}
            </span>
          </div>
          <div className="flex-1 flex flex-col items-center py-3">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">
              Saved
            </span>
            <span
              className="text-sm font-bold"
              style={{ color: "oklch(var(--accent))" }}
            >
              {formatNaira(75000)}
            </span>
          </div>
        </div>
      </div>

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
          <button
            type="button"
            data-ocid="overview.view_all_button"
            className="flex items-center gap-0.5 text-xs font-semibold transition-smooth hover:opacity-80"
            style={{ color: "oklch(var(--accent))" }}
          >
            View all <ChevronRight size={12} />
          </button>
        </div>

        {/* Summary strip */}
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

      {/* ── FAB ── */}
      <button
        type="button"
        data-ocid="overview.add_button"
        onClick={() => setFabOpen(true)}
        aria-label="Add transaction"
        className="fixed bottom-24 right-5 w-14 h-14 rounded-full flex items-center justify-center transition-smooth hover:scale-110 active:scale-95 z-40"
        style={{
          background:
            "linear-gradient(135deg, oklch(var(--primary)), oklch(0.42 0.16 265))",
          color: "oklch(var(--primary-foreground))",
          boxShadow:
            "0 4px 24px oklch(var(--primary) / 0.5), 0 0 0 3px oklch(var(--primary) / 0.15)",
        }}
      >
        <Plus size={24} strokeWidth={2.5} />
      </button>

      {/* ── Add Transaction Modal ── */}
      <AddTransactionModal open={fabOpen} onClose={() => setFabOpen(false)} />
    </div>
  );
}
