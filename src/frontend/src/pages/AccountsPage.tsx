import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNaira, mockData } from "@/data/mockData";
import {
  ArrowDown,
  ArrowUp,
  CreditCard,
  Edit2,
  Plus,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Bank card gradients per institution ───────────────────────────────────
const BANK_GRADIENTS: Record<
  string,
  { from: string; to: string; shadow: string }
> = {
  GTBank: { from: "#0D7C66", to: "#0A5C4C", shadow: "#0D7C6655" },
  "Access Bank": { from: "#CC2027", to: "#8B0000", shadow: "#CC202755" },
  "Zenith Bank": { from: "#6B21A8", to: "#4C1D95", shadow: "#6B21A855" },
};

function getGradient(bankName: string) {
  return (
    BANK_GRADIENTS[bankName] ?? {
      from: "#1A2B4C",
      to: "#0d1a30",
      shadow: "#1A2B4C55",
    }
  );
}

// ─── Chip SVG ──────────────────────────────────────────────────────────────
function ChipIcon() {
  return (
    <svg
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="22"
        rx="4"
        fill="rgba(255,255,255,0.25)"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="0.8"
      />
      <rect x="11" y="1" width="10" height="22" fill="rgba(255,255,255,0.12)" />
      <rect x="1" y="8" width="30" height="8" fill="rgba(255,255,255,0.12)" />
      <rect
        x="13"
        y="9"
        width="6"
        height="6"
        rx="1"
        fill="rgba(255,255,255,0.35)"
      />
    </svg>
  );
}

// ─── Individual Bank Card ─────────────────────────────────────────────────
function BankCard({
  account,
  index,
  onAddCashflow,
}: {
  account: (typeof mockData.accounts)[0];
  index: number;
  onAddCashflow: (bankName: string) => void;
}) {
  const grad = getGradient(account.bankName);
  return (
    <div
      data-ocid={`accounts.card.${index + 1}`}
      className="relative overflow-hidden flex flex-col transition-smooth hover:scale-[1.01]"
      style={{
        borderRadius: 24,
        background: `linear-gradient(135deg, ${grad.from} 0%, ${grad.to} 100%)`,
        boxShadow: `0 12px 40px ${grad.shadow}, inset 0 1px 0 rgba(255,255,255,0.2)`,
        minHeight: 180,
        padding: "20px 22px 18px",
      }}
    >
      {/* Shine overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: 24,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)",
        }}
      />
      {/* Decorative circle */}
      <div
        className="absolute -right-8 -top-8 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />
      <div
        className="absolute -right-4 top-10 w-20 h-20 rounded-full pointer-events-none"
        style={{ background: "rgba(255,255,255,0.04)" }}
      />

      {/* Row 1: Bank name + chip */}
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-white/60 text-[10px] font-medium tracking-widest uppercase">
            Bank Account
          </p>
          <p className="text-white font-bold text-lg leading-tight mt-0.5">
            {account.bankName}
          </p>
        </div>
        <ChipIcon />
      </div>

      {/* Row 2: Balance (center) */}
      <div className="relative z-10 flex-1 flex flex-col justify-center mt-3">
        <p className="text-white/55 text-[10px] font-medium tracking-wide uppercase">
          Current Balance
        </p>
        <p className="text-white text-[26px] font-bold tracking-tight leading-none mt-1">
          {formatNaira(account.balance)}
        </p>
      </div>

      {/* Row 3: Card number + inflow/outflow */}
      <div className="relative z-10 mt-3 flex items-end justify-between">
        <div>
          <p className="text-white/50 text-xs font-mono tracking-widest">
            •••• •••• •••• {account.lastFour}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: "rgba(134,239,172,0.25)" }}
              >
                <ArrowUp size={9} className="text-green-300" />
              </div>
              <span className="text-white/70 text-[10px] font-semibold">
                {formatNaira(account.inflows)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: "rgba(252,165,165,0.25)" }}
              >
                <ArrowDown size={9} className="text-red-300" />
              </div>
              <span className="text-white/70 text-[10px] font-semibold">
                {formatNaira(account.outflows)}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            data-ocid={`accounts.edit_button.${index + 1}`}
            onClick={() => alert(`Editing ${account.bankName} account`)}
            className="text-[10px] font-semibold px-3 py-1.5 rounded-xl transition-smooth"
            style={{
              background: "rgba(255,255,255,0.0)",
              border: "1px solid rgba(255,255,255,0.45)",
              color: "white",
            }}
          >
            <span className="flex items-center gap-1">
              <Edit2 size={9} /> Edit
            </span>
          </button>
          <button
            type="button"
            data-ocid={`accounts.add_cashflow_button.${index + 1}`}
            onClick={() => onAddCashflow(account.bankName)}
            className="text-[10px] font-semibold px-3 py-1.5 rounded-xl transition-smooth"
            style={{
              background: "rgba(255,255,255,0.92)",
              color: grad.from,
            }}
          >
            <span className="flex items-center gap-1">
              <Plus size={9} /> Add Inflow/Outflow
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Cashflow SVG connector lines ─────────────────────────────────────────
function CashflowLines({
  inflowCount,
  outflowCount,
  nodeHeight,
  nodeGap,
}: {
  inflowCount: number;
  outflowCount: number;
  nodeHeight: number;
  nodeGap: number;
}) {
  const rowH = nodeHeight + nodeGap;
  const svgH = Math.max(inflowCount, outflowCount) * rowH;
  const midX = 60;

  const inflowYs = Array.from(
    { length: inflowCount },
    (_, i) => (i + 0.5) * rowH,
  );
  const outflowYs = Array.from(
    { length: outflowCount },
    (_, i) => (i + 0.5) * rowH,
  );

  return (
    <svg
      width={midX * 2}
      height={svgH}
      viewBox={`0 0 ${midX * 2} ${svgH}`}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2D6A4F" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#1A2B4C" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {inflowYs.flatMap((iy) =>
        outflowYs.map((oy) => (
          <path
            key={`${iy}-${oy}`}
            d={`M 0 ${iy} C ${midX * 0.6} ${iy}, ${midX * 0.4} ${oy}, ${midX * 2} ${oy}`}
            stroke="url(#flowGrad)"
            strokeWidth="1.5"
            opacity="0.5"
          />
        )),
      )}
    </svg>
  );
}

// ─── Cashflow Node pill ───────────────────────────────────────────────────
function FlowNode({
  label,
  amount,
  icon,
  side,
}: {
  label: string;
  amount: number;
  icon: string;
  side: "in" | "out";
}) {
  const isIn = side === "in";
  return (
    <div
      className="flex items-center gap-2 px-3 py-2.5 rounded-2xl"
      style={{
        background: isIn
          ? "linear-gradient(135deg, oklch(0.35 0.14 143 / 0.18), oklch(0.45 0.18 143 / 0.10))"
          : "linear-gradient(135deg, oklch(0.35 0.13 265 / 0.18), oklch(0.25 0.10 265 / 0.10))",
        border: `1px solid ${
          isIn ? "oklch(0.52 0.19 143 / 0.35)" : "oklch(0.35 0.13 265 / 0.30)"
        }`,
        backdropFilter: "blur(8px)",
      }}
    >
      <span className="text-base leading-none">{icon}</span>
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-semibold text-foreground truncate">
          {label}
        </span>
        <span
          className="text-[10px] font-bold mt-0.5"
          style={{
            color: isIn ? "oklch(0.52 0.19 143)" : "oklch(0.55 0.08 265)",
          }}
        >
          {formatNaira(amount)}
        </span>
      </div>
    </div>
  );
}

// ─── Add Cashflow Modal ───────────────────────────────────────────────────
function AddCashflowModal({
  bankName,
  onClose,
}: {
  bankName: string;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"inflow" | "outflow">("inflow");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div
      ref={overlayRef}
      data-ocid="accounts.dialog"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      onKeyDown={(e) => {
        if (
          (e.key === "Escape" || e.key === "Enter") &&
          e.target === overlayRef.current
        )
          onClose();
      }}
    >
      <div
        className="glass-card w-full max-w-sm"
        style={{
          background: "oklch(0.97 0.01 265)",
          boxShadow: "0 24px 80px oklch(0.35 0.13 265 / 0.25)",
          borderRadius: 24,
        }}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
          <div>
            <h3 className="text-base font-bold text-foreground">
              Add Cashflow Path
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{bankName}</p>
          </div>
          <button
            type="button"
            data-ocid="accounts.close_button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-smooth"
            style={{ background: "oklch(0.92 0.02 265)" }}
            aria-label="Close modal"
          >
            <X size={14} className="text-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4 flex flex-col gap-4">
          {/* Type toggle */}
          <div>
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
              Type
            </Label>
            <div className="flex gap-2">
              {(["inflow", "outflow"] as const).map((t) => (
                <button
                  type="button"
                  key={t}
                  data-ocid={`accounts.type_${t}_toggle`}
                  onClick={() => setType(t)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-smooth"
                  style={{
                    background:
                      type === t
                        ? t === "inflow"
                          ? "oklch(0.52 0.19 143)"
                          : "oklch(0.35 0.13 265)"
                        : "oklch(0.92 0.02 265)",
                    color: type === t ? "white" : "oklch(0.45 0.04 265)",
                    border: "none",
                  }}
                >
                  {t === "inflow" ? "↑ Inflow" : "↓ Outflow"}
                </button>
              ))}
            </div>
          </div>

          {/* Channel name */}
          <div>
            <Label
              htmlFor="cf-title"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block"
            >
              Channel Name
            </Label>
            <Input
              id="cf-title"
              data-ocid="accounts.channel_name_input"
              placeholder="e.g. Freelance Income"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl text-sm"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <Label
              htmlFor="cf-amount"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block"
            >
              Monthly Amount (₦)
            </Label>
            <Input
              id="cf-amount"
              data-ocid="accounts.amount_input"
              type="number"
              placeholder="e.g. 50000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="rounded-xl text-sm"
              min="0"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              data-ocid="accounts.cancel_button"
              onClick={onClose}
              className="flex-1 rounded-xl text-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              data-ocid="accounts.confirm_button"
              className="flex-1 rounded-xl text-sm font-bold"
              style={{
                background:
                  type === "inflow"
                    ? "oklch(0.52 0.19 143)"
                    : "oklch(0.35 0.13 265)",
              }}
            >
              Add {type === "inflow" ? "Inflow" : "Outflow"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────
export default function AccountsPage() {
  const { accounts, cashflowInflows, cashflowOutflows } = mockData;
  const [modalBank, setModalBank] = useState<string | null>(null);

  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);
  const totalIn = cashflowInflows.reduce((s, i) => s + i.amount, 0);
  const totalOut = cashflowOutflows.reduce((s, o) => s + o.amount, 0);
  const netFlow = totalIn - totalOut;
  const isNetNegative = netFlow < 0;

  // Heights for SVG connectors (px)
  const NODE_H = 56;
  const NODE_GAP = 10;

  return (
    <div className="flex flex-col gap-6" data-ocid="accounts.page">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Accounts</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Bank accounts &amp; cashflow
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          data-ocid="accounts.add_account_button"
          className="rounded-xl gap-1 text-xs"
        >
          <Plus size={12} /> Add Account
        </Button>
      </div>

      {/* ── Total Balance Summary ── */}
      <div
        data-ocid="accounts.total_balance_card"
        className="glass-card glow-inner px-5 py-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.25 0.10 265 / 0.92), oklch(0.20 0.08 265 / 0.95))",
          border: "1px solid oklch(0.40 0.10 265 / 0.4)",
          boxShadow:
            "0 12px 48px oklch(0.25 0.10 265 / 0.30), inset 0 1px 0 rgba(255,255,255,0.10)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                <CreditCard size={13} className="text-white/80" />
              </div>
              <p className="text-white/60 text-xs font-medium">
                Total Portfolio Balance
              </p>
            </div>
            <p className="text-white text-3xl font-bold tracking-tight">
              {formatNaira(totalBalance)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/50 text-[10px] uppercase tracking-wide">
              {accounts.length} accounts
            </p>
            <div className="flex items-center gap-1 mt-1 justify-end">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "oklch(0.65 0.19 143)" }}
              />
              <p
                className="text-[11px] font-semibold"
                style={{ color: "oklch(0.65 0.19 143)" }}
              >
                Active
              </p>
            </div>
            <p className="text-white/40 text-[10px] mt-1">as of today</p>
          </div>
        </div>

        {/* Per-account mini breakdown */}
        <div
          className="flex gap-2 mt-4 pt-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          {accounts.map((a) => {
            const pct = Math.round((a.balance / totalBalance) * 100);
            const grad = getGradient(a.bankName);
            return (
              <div key={a.id} className="flex-1 flex flex-col gap-1">
                <div
                  className="h-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.12)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${grad.from}, ${grad.to})`,
                    }}
                  />
                </div>
                <p className="text-white/50 text-[9px] truncate">
                  {a.bankName.split(" ")[0]}
                </p>
                <p className="text-white/75 text-[10px] font-semibold">
                  {pct}%
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bank Cards ── */}
      <section data-ocid="accounts.cards_section">
        <h2 className="text-sm font-bold text-foreground mb-3">
          Bank Accounts
        </h2>
        <div className="flex flex-col gap-4">
          {accounts.map((acct, i) => (
            <BankCard
              key={acct.id}
              account={acct}
              index={i}
              onAddCashflow={(name) => setModalBank(name)}
            />
          ))}
        </div>
      </section>

      {/* ── Cashflow Map ── */}
      <section data-ocid="accounts.cashflow_section">
        <h2 className="text-sm font-bold text-foreground mb-1">Cashflow Map</h2>
        <p className="text-[11px] text-muted-foreground mb-3">
          Where your money comes from and goes
        </p>

        <div
          className="glass-card glow-inner p-4"
          style={{
            background: "oklch(0.97 0.01 265 / 0.7)",
            boxShadow: "0 8px 32px oklch(0.35 0.13 265 / 0.07)",
          }}
        >
          {/* Column headers */}
          <div className="flex items-center justify-between mb-3">
            <p
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "oklch(0.52 0.19 143)" }}
            >
              Inflow Channels
            </p>
            <p
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "oklch(0.35 0.13 265)" }}
            >
              Outflow Channels
            </p>
          </div>

          {/* Flow diagram row */}
          <div className="flex items-stretch gap-0">
            {/* Inflow nodes */}
            <div
              className="flex flex-col justify-around flex-1"
              style={{
                gap: NODE_GAP,
                paddingTop: NODE_GAP / 2,
                paddingBottom: NODE_GAP / 2,
              }}
            >
              {cashflowInflows.map((inflow) => (
                <FlowNode
                  key={inflow.name}
                  label={inflow.name}
                  amount={inflow.amount}
                  icon={inflow.icon}
                  side="in"
                />
              ))}
            </div>

            {/* SVG connector */}
            <div className="flex items-center shrink-0" style={{ width: 80 }}>
              <CashflowLines
                inflowCount={cashflowInflows.length}
                outflowCount={cashflowOutflows.length}
                nodeHeight={NODE_H}
                nodeGap={NODE_GAP}
              />
            </div>

            {/* Outflow nodes */}
            <div
              className="flex flex-col justify-around flex-1"
              style={{
                gap: NODE_GAP,
                paddingTop: NODE_GAP / 2,
                paddingBottom: NODE_GAP / 2,
              }}
            >
              {cashflowOutflows.map((outflow) => (
                <FlowNode
                  key={outflow.name}
                  label={outflow.name}
                  amount={outflow.amount}
                  icon={outflow.icon}
                  side="out"
                />
              ))}
            </div>
          </div>

          {/* Net flow summary */}
          <div
            className="mt-4 pt-3 flex items-center justify-between gap-3"
            style={{ borderTop: "1px solid oklch(0.90 0.02 265)" }}
          >
            {/* Total In */}
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center"
                style={{ background: "oklch(0.52 0.19 143 / 0.15)" }}
              >
                <TrendingUp
                  size={13}
                  style={{ color: "oklch(0.52 0.19 143)" }}
                />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Total In</p>
                <p
                  className="text-xs font-bold"
                  style={{ color: "oklch(0.45 0.18 143)" }}
                >
                  {formatNaira(totalIn)}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="text-lg font-light text-muted-foreground">–</div>

            {/* Total Out */}
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center"
                style={{ background: "oklch(0.35 0.13 265 / 0.12)" }}
              >
                <TrendingDown
                  size={13}
                  style={{ color: "oklch(0.35 0.13 265)" }}
                />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Total Out</p>
                <p
                  className="text-xs font-bold"
                  style={{ color: "oklch(0.35 0.13 265)" }}
                >
                  {formatNaira(totalOut)}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="text-lg font-light text-muted-foreground">=</div>

            {/* Net */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-2xl"
              style={{
                background: isNetNegative
                  ? "oklch(0.55 0.22 25 / 0.12)"
                  : "oklch(0.52 0.19 143 / 0.12)",
                border: `1px solid ${
                  isNetNegative
                    ? "oklch(0.55 0.22 25 / 0.30)"
                    : "oklch(0.52 0.19 143 / 0.30)"
                }`,
              }}
            >
              <div>
                <p className="text-[10px] text-muted-foreground">Net Flow</p>
                <p
                  className="text-xs font-bold"
                  style={{
                    color: isNetNegative
                      ? "oklch(0.55 0.22 25)"
                      : "oklch(0.45 0.18 143)",
                  }}
                >
                  {isNetNegative ? "-" : "+"}
                  {formatNaira(Math.abs(netFlow))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Add Cashflow Modal ── */}
      {modalBank !== null && (
        <AddCashflowModal
          bankName={modalBank}
          onClose={() => setModalBank(null)}
        />
      )}
    </div>
  );
}
