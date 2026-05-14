import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNaira, mockData } from "@/data/mockData";
import type { BankAccount, CashflowEntry } from "@/data/mockData";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ChevronRight,
  CreditCard,
  Edit2,
  Plus,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AccountCategory {
  id: string;
  name: string;
  color: string;
  accountIds: string[];
}

interface AccountBranding {
  primaryColor: string;
  logoUrl: string;
}

const DEFAULT_CATEGORIES: AccountCategory[] = [
  {
    id: "cat-banks",
    name: "Banks",
    color: "#1A2B4C",
    accountIds: ["acct-1", "acct-2", "acct-3"],
  },
  { id: "cat-savings", name: "Savings", color: "#2D6A4F", accountIds: [] },
  { id: "cat-invest", name: "Investment", color: "#6B21A8", accountIds: [] },
  { id: "cat-loans", name: "Loans", color: "#CC2027", accountIds: [] },
];

// ─── Bank card gradients ──────────────────────────────────────────────────────
const BANK_GRADIENTS: Record<
  string,
  { from: string; to: string; shadow: string }
> = {
  GTBank: { from: "#0D7C66", to: "#0A5C4C", shadow: "#0D7C6655" },
  "Access Bank": { from: "#CC2027", to: "#8B0000", shadow: "#CC202755" },
  "Zenith Bank": { from: "#6B21A8", to: "#4C1D95", shadow: "#6B21A855" },
};

function getGradient(bankName: string, branding?: AccountBranding) {
  if (branding?.primaryColor) {
    const c = branding.primaryColor;
    return { from: c, to: `${c}cc`, shadow: `${c}55` };
  }
  return (
    BANK_GRADIENTS[bankName] ?? {
      from: "#1A2B4C",
      to: "#0d1a30",
      shadow: "#1A2B4C55",
    }
  );
}

// ─── ChipIcon SVG ────────────────────────────────────────────────────────────
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

// ─── BankCard ─────────────────────────────────────────────────────────────────
function BankCard({
  account,
  index,
  branding,
  onEdit,
  onAddCashflow,
  onSelect,
}: {
  account: BankAccount;
  index: number;
  branding: AccountBranding;
  onEdit: () => void;
  onAddCashflow: (bankName: string) => void;
  onSelect: () => void;
}) {
  const grad = getGradient(account.bankName, branding);
  return (
    <button
      type="button"
      data-ocid={`accounts.card.${index + 1}`}
      className="relative overflow-hidden flex flex-col transition-smooth hover:scale-[1.01] cursor-pointer text-left w-full"
      style={{
        borderRadius: 24,
        background: `linear-gradient(135deg, ${grad.from} 0%, ${grad.to} 100%)`,
        boxShadow: `0 12px 40px ${grad.shadow}, inset 0 1px 0 rgba(255,255,255,0.2)`,
        minHeight: 180,
        padding: "20px 22px 18px",
      }}
      onClick={onSelect}
      aria-label={`View ${account.bankName} account details`}
    >
      {/* Shine */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: 24,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute -right-8 -top-8 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />
      <div
        className="absolute -right-4 top-10 w-20 h-20 rounded-full pointer-events-none"
        style={{ background: "rgba(255,255,255,0.04)" }}
      />

      {branding.logoUrl && (
        <img
          src={branding.logoUrl}
          alt={account.bankName}
          className="absolute top-4 right-14 w-8 h-8 rounded-lg object-cover z-10"
        />
      )}

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

      <div className="relative z-10 flex-1 flex flex-col justify-center mt-3">
        <p className="text-white/55 text-[10px] font-medium tracking-wide uppercase">
          Current Balance
        </p>
        <p className="text-white text-[26px] font-bold tracking-tight leading-none mt-1">
          {formatNaira(account.balance)}
        </p>
      </div>

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
        <div className="flex gap-2">
          <button
            type="button"
            data-ocid={`accounts.edit_button.${index + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
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
            onClick={(e) => {
              e.stopPropagation();
              onAddCashflow(account.bankName);
            }}
            className="text-[10px] font-semibold px-3 py-1.5 rounded-xl transition-smooth"
            style={{ background: "rgba(255,255,255,0.92)", color: grad.from }}
          >
            <span className="flex items-center gap-1">
              <Plus size={9} /> Add Inflow/Outflow
            </span>
          </button>
        </div>
      </div>
    </button>
  );
}

// ─── Edit Branding Modal ──────────────────────────────────────────────────────
function EditBrandingModal({
  account,
  branding,
  onSave,
  onClose,
}: {
  account: BankAccount;
  branding: AccountBranding;
  onSave: (b: AccountBranding) => void;
  onClose: () => void;
}) {
  const [color, setColor] = useState(
    branding.primaryColor || getGradient(account.bankName).from,
  );
  const [logoUrl, setLogoUrl] = useState(branding.logoUrl);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      data-ocid="accounts.edit_branding_dialog"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && e.target === overlayRef.current) onClose();
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
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
          <div>
            <h3 className="text-base font-bold text-foreground">
              Edit Branding
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {account.bankName}
            </p>
          </div>
          <button
            type="button"
            data-ocid="accounts.edit_branding_close_button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-smooth"
            style={{ background: "oklch(0.92 0.02 265)" }}
            aria-label="Close"
          >
            <X size={14} className="text-foreground" />
          </button>
        </div>
        <div className="px-5 py-4 flex flex-col gap-4">
          {/* Preview strip */}
          <div
            className="rounded-2xl h-14 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${color}, ${color}cc)`,
            }}
          >
            <span className="text-white/80 text-xs font-semibold">
              {account.bankName} — Preview
            </span>
          </div>
          <div>
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
              Card Primary Color
            </Label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                data-ocid="accounts.brand_color_input"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 rounded-xl border-2 border-border cursor-pointer"
                aria-label="Pick card color"
              />
              <Input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#1A2B4C"
                className="rounded-xl text-sm font-mono flex-1"
                maxLength={7}
              />
            </div>
          </div>
          <div>
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">
              Logo URL (optional)
            </Label>
            <Input
              data-ocid="accounts.logo_url_input"
              type="url"
              placeholder="https://example.com/logo.png"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              className="rounded-xl text-sm"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              data-ocid="accounts.edit_branding_cancel_button"
              onClick={onClose}
              className="flex-1 rounded-xl text-sm"
            >
              Cancel
            </Button>
            <Button
              type="button"
              data-ocid="accounts.edit_branding_save_button"
              onClick={() => {
                onSave({ primaryColor: color, logoUrl });
                onClose();
              }}
              className="flex-1 rounded-xl text-sm font-bold"
              style={{ background: color }}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Add Category Modal ───────────────────────────────────────────────────────
function AddCategoryModal({
  onAdd,
  onClose,
}: { onAdd: (name: string, color: string) => void; onClose: () => void }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#1A2B4C");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), color);
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      data-ocid="accounts.add_category_dialog"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && e.target === overlayRef.current) onClose();
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
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
          <h3 className="text-base font-bold text-foreground">Add Category</h3>
          <button
            type="button"
            data-ocid="accounts.add_category_close_button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-smooth"
            style={{ background: "oklch(0.92 0.02 265)" }}
            aria-label="Close"
          >
            <X size={14} className="text-foreground" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-5 py-4 flex flex-col gap-4">
          <div>
            <Label
              htmlFor="cat-name"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block"
            >
              Category Name
            </Label>
            <Input
              id="cat-name"
              data-ocid="accounts.category_name_input"
              placeholder="e.g. Property"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl text-sm"
              required
            />
          </div>
          <div>
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
              Badge Color
            </Label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                data-ocid="accounts.category_color_input"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 rounded-xl border-2 border-border cursor-pointer"
                aria-label="Pick badge color"
              />
              <Input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#1A2B4C"
                className="rounded-xl text-sm font-mono flex-1"
                maxLength={7}
              />
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              data-ocid="accounts.category_cancel_button"
              onClick={onClose}
              className="flex-1 rounded-xl text-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              data-ocid="accounts.category_confirm_button"
              className="flex-1 rounded-xl text-sm font-bold"
              style={{ background: color }}
            >
              Add Category
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Add Cashflow Modal ───────────────────────────────────────────────────────
function AddCashflowModal({
  bankName,
  onClose,
}: { bankName: string; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"inflow" | "outflow">("inflow");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

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
        if (e.key === "Escape" && e.target === overlayRef.current) onClose();
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
          className="px-5 py-4 flex flex-col gap-4"
        >
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

// ─── CashflowLines SVG ───────────────────────────────────────────────────────
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

// ─── FlowNode pill ────────────────────────────────────────────────────────────
function FlowNode({
  label,
  amount,
  icon,
  side,
}: { label: string; amount: number; icon: string; side: "in" | "out" }) {
  const isIn = side === "in";
  return (
    <div
      className="flex items-center gap-2 px-3 py-2.5 rounded-2xl"
      style={{
        background: isIn
          ? "linear-gradient(135deg, oklch(0.35 0.14 143 / 0.18), oklch(0.45 0.18 143 / 0.10))"
          : "linear-gradient(135deg, oklch(0.35 0.13 265 / 0.18), oklch(0.25 0.10 265 / 0.10))",
        border: `1px solid ${isIn ? "oklch(0.52 0.19 143 / 0.35)" : "oklch(0.35 0.13 265 / 0.30)"}`,
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

// ─── CashflowMapSection ─────────────────────────────────────────────────────
function CashflowMapSection({
  inflows,
  outflows,
}: { inflows: CashflowEntry[]; outflows: CashflowEntry[] }) {
  const NODE_H = 56;
  const NODE_GAP = 10;
  const totalIn = inflows.reduce((s, i) => s + i.amount, 0);
  const totalOut = outflows.reduce((s, o) => s + o.amount, 0);
  const netFlow = totalIn - totalOut;
  const isNetNeg = netFlow < 0;

  if (inflows.length === 0 && outflows.length === 0) {
    return (
      <div
        className="glass-card p-6 text-center"
        style={{ background: "oklch(0.97 0.01 265 / 0.7)", borderRadius: 20 }}
      >
        <p className="text-sm text-muted-foreground">
          No cashflow entries for this account.
        </p>
      </div>
    );
  }

  return (
    <div
      className="glass-card glow-inner p-4"
      style={{
        background: "oklch(0.97 0.01 265 / 0.7)",
        boxShadow: "0 8px 32px oklch(0.35 0.13 265 / 0.07)",
        borderRadius: 20,
      }}
    >
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
      <div className="flex items-stretch gap-0">
        <div
          className="flex flex-col justify-around flex-1"
          style={{
            gap: NODE_GAP,
            paddingTop: NODE_GAP / 2,
            paddingBottom: NODE_GAP / 2,
          }}
        >
          {inflows.length > 0 ? (
            inflows.map((inflow) => (
              <FlowNode
                key={inflow.name}
                label={inflow.name}
                amount={inflow.amount}
                icon={inflow.icon}
                side="in"
              />
            ))
          ) : (
            <p className="text-xs text-muted-foreground px-2 py-4">
              No inflows
            </p>
          )}
        </div>
        <div className="flex items-center shrink-0" style={{ width: 80 }}>
          <CashflowLines
            inflowCount={Math.max(inflows.length, 1)}
            outflowCount={Math.max(outflows.length, 1)}
            nodeHeight={NODE_H}
            nodeGap={NODE_GAP}
          />
        </div>
        <div
          className="flex flex-col justify-around flex-1"
          style={{
            gap: NODE_GAP,
            paddingTop: NODE_GAP / 2,
            paddingBottom: NODE_GAP / 2,
          }}
        >
          {outflows.length > 0 ? (
            outflows.map((outflow) => (
              <FlowNode
                key={outflow.name}
                label={outflow.name}
                amount={outflow.amount}
                icon={outflow.icon}
                side="out"
              />
            ))
          ) : (
            <p className="text-xs text-muted-foreground px-2 py-4">
              No outflows
            </p>
          )}
        </div>
      </div>
      <div
        className="mt-4 pt-3 flex items-center justify-between gap-3"
        style={{ borderTop: "1px solid oklch(0.90 0.02 265)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center"
            style={{ background: "oklch(0.52 0.19 143 / 0.15)" }}
          >
            <TrendingUp size={13} style={{ color: "oklch(0.52 0.19 143)" }} />
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
        <div className="text-lg font-light text-muted-foreground">–</div>
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center"
            style={{ background: "oklch(0.35 0.13 265 / 0.12)" }}
          >
            <TrendingDown size={13} style={{ color: "oklch(0.35 0.13 265)" }} />
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
        <div className="text-lg font-light text-muted-foreground">=</div>
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-2xl"
          style={{
            background: isNetNeg
              ? "oklch(0.55 0.22 25 / 0.12)"
              : "oklch(0.52 0.19 143 / 0.12)",
            border: `1px solid ${isNetNeg ? "oklch(0.55 0.22 25 / 0.30)" : "oklch(0.52 0.19 143 / 0.30)"}`,
          }}
        >
          <div>
            <p className="text-[10px] text-muted-foreground">Net Flow</p>
            <p
              className="text-xs font-bold"
              style={{
                color: isNetNeg
                  ? "oklch(0.55 0.22 25)"
                  : "oklch(0.45 0.18 143)",
              }}
            >
              {isNetNeg ? "-" : "+"}
              {formatNaira(Math.abs(netFlow))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Account Detail View ──────────────────────────────────────────────────────
function AccountDetailView({
  account,
  branding,
  inflows,
  outflows,
  onBack,
}: {
  account: BankAccount;
  branding: AccountBranding;
  inflows: CashflowEntry[];
  outflows: CashflowEntry[];
  onBack: () => void;
}) {
  const grad = getGradient(account.bankName, branding);
  const totalIn = inflows.reduce((s, i) => s + i.amount, 0);
  const totalOut = outflows.reduce((s, o) => s + o.amount, 0);
  const maxBar = Math.max(totalIn, totalOut, 1);

  return (
    <div className="flex flex-col gap-5" data-ocid="accounts.detail_view">
      <button
        type="button"
        data-ocid="accounts.back_button"
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft size={16} /> Back to Accounts
      </button>

      {/* Account hero */}
      <div
        className="relative overflow-hidden flex flex-col"
        style={{
          borderRadius: 24,
          background: `linear-gradient(135deg, ${grad.from} 0%, ${grad.to} 100%)`,
          boxShadow: `0 12px 40px ${grad.shadow}, inset 0 1px 0 rgba(255,255,255,0.2)`,
          padding: "22px 24px",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: 24,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute -right-8 -top-8 w-36 h-36 rounded-full pointer-events-none"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        {branding.logoUrl && (
          <img
            src={branding.logoUrl}
            alt={account.bankName}
            className="absolute top-5 right-6 w-10 h-10 rounded-xl object-cover z-10"
          />
        )}
        <div className="relative z-10">
          <p className="text-white/60 text-[10px] font-medium tracking-widest uppercase">
            Account Details
          </p>
          <p className="text-white font-bold text-xl leading-tight mt-0.5">
            {account.bankName}
          </p>
          <p className="text-white/50 text-xs font-mono tracking-widest mt-1">
            •••• •••• •••• {account.lastFour}
          </p>
        </div>
        <div className="relative z-10 mt-4">
          <p className="text-white/55 text-[10px] font-medium tracking-wide uppercase">
            Current Balance
          </p>
          <p className="text-white text-[32px] font-bold tracking-tight leading-none mt-1">
            {formatNaira(account.balance)}
          </p>
        </div>
      </div>

      {/* Income vs Expense */}
      <div
        className="glass-card p-4"
        style={{
          background: "oklch(0.97 0.01 265 / 0.85)",
          borderRadius: 20,
          boxShadow: "0 4px 20px oklch(0.35 0.13 265 / 0.06)",
        }}
      >
        <h3 className="text-sm font-bold text-foreground mb-3">
          Income vs Expense
        </h3>
        <div className="flex flex-col gap-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "oklch(0.52 0.19 143)" }}
                />
                <span className="text-xs font-semibold text-foreground">
                  Total Inflows
                </span>
              </div>
              <span
                className="text-xs font-bold"
                style={{ color: "oklch(0.45 0.18 143)" }}
              >
                {formatNaira(totalIn)}
              </span>
            </div>
            <div
              className="h-2.5 rounded-full"
              style={{ background: "oklch(0.92 0.02 265)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(totalIn / maxBar) * 100}%`,
                  background:
                    "linear-gradient(90deg, oklch(0.52 0.19 143), oklch(0.62 0.19 143))",
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "oklch(0.55 0.22 25)" }}
                />
                <span className="text-xs font-semibold text-foreground">
                  Total Outflows
                </span>
              </div>
              <span
                className="text-xs font-bold"
                style={{ color: "oklch(0.55 0.22 25)" }}
              >
                {formatNaira(totalOut)}
              </span>
            </div>
            <div
              className="h-2.5 rounded-full"
              style={{ background: "oklch(0.92 0.02 265)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(totalOut / maxBar) * 100}%`,
                  background:
                    "linear-gradient(90deg, oklch(0.55 0.22 25), oklch(0.65 0.22 25))",
                }}
              />
            </div>
          </div>
          <div
            className="flex items-center justify-between pt-2"
            style={{ borderTop: "1px solid oklch(0.90 0.02 265)" }}
          >
            <span className="text-xs font-semibold text-muted-foreground">
              Net
            </span>
            <span
              className="text-sm font-bold"
              style={{
                color:
                  totalIn >= totalOut
                    ? "oklch(0.45 0.18 143)"
                    : "oklch(0.55 0.22 25)",
              }}
            >
              {totalIn >= totalOut ? "+" : "-"}
              {formatNaira(Math.abs(totalIn - totalOut))}
            </span>
          </div>
        </div>
      </div>

      {/* Account cashflow map */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-2">Cashflow Map</h3>
        <p className="text-[11px] text-muted-foreground mb-3">
          Flows attributed to this account
        </p>
        <CashflowMapSection inflows={inflows} outflows={outflows} />
      </div>
    </div>
  );
}

// ─── CategoryChip ───────────────────────────────────────────────────────────
function CategoryChip({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span
        className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
        style={{
          background: `${color}22`,
          color,
          border: `1px solid ${color}44`,
        }}
      >
        {name}
      </span>
      <div className="flex-1 h-px" style={{ background: `${color}22` }} />
    </div>
  );
}

// ─── Empty Category placeholder ───────────────────────────────────────────────
function EmptyCategoryPlaceholder({
  categoryName,
  onAddAccount,
}: { categoryName: string; onAddAccount: () => void }) {
  return (
    <div
      data-ocid="accounts.empty_state"
      className="rounded-2xl border-2 border-dashed p-5 flex flex-col items-center justify-center gap-2 text-center"
      style={{
        borderColor: "oklch(0.85 0.02 265)",
        background: "oklch(0.98 0.005 265)",
      }}
    >
      <div
        className="w-10 h-10 rounded-2xl flex items-center justify-center"
        style={{ background: "oklch(0.94 0.02 265)" }}
      >
        <CreditCard size={18} className="text-muted-foreground" />
      </div>
      <p className="text-xs font-semibold text-muted-foreground">
        No {categoryName} accounts yet
      </p>
      <button
        type="button"
        data-ocid="accounts.empty_add_account_button"
        onClick={onAddAccount}
        className="text-[10px] font-bold px-3 py-1.5 rounded-xl transition-smooth"
        style={{ background: "oklch(0.25 0.10 265)", color: "white" }}
      >
        <span className="flex items-center gap-1">
          <Plus size={9} /> Add Account
        </span>
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AccountsPage() {
  const { accounts, cashflowInflows, cashflowOutflows } = mockData;

  const [categories, setCategories] =
    useState<AccountCategory[]>(DEFAULT_CATEGORIES);
  const [brandings, setBrandings] = useState<Record<string, AccountBranding>>(
    Object.fromEntries(
      accounts.map((a) => [a.id, { primaryColor: "", logoUrl: "" }]),
    ),
  );
  const [modalBank, setModalBank] = useState<string | null>(null);
  const [editingAccountId, setEditingAccountId] = useState<string | null>(null);
  const [detailAccountId, setDetailAccountId] = useState<string | null>(null);
  const [showAddCategory, setShowAddCategory] = useState(false);

  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);
  const totalExpenditure = accounts.reduce((s, a) => s + a.outflows, 0);

  const handleSaveBranding = (accountId: string, b: AccountBranding) => {
    setBrandings((prev) => ({ ...prev, [accountId]: b }));
  };

  const handleAddCategory = (name: string, color: string) => {
    setCategories((prev) => [
      ...prev,
      { id: `cat-${Date.now()}`, name, color, accountIds: [] },
    ]);
  };

  // Detail view — conditional render
  const detailAccount = accounts.find((a) => a.id === detailAccountId) ?? null;
  if (detailAccount) {
    const accountInflows = detailAccount.id === "acct-1" ? cashflowInflows : [];
    const accountOutflows =
      detailAccount.id === "acct-1"
        ? cashflowOutflows.slice(0, 2)
        : detailAccount.id === "acct-2"
          ? cashflowOutflows.slice(2)
          : [];
    return (
      <AccountDetailView
        account={detailAccount}
        branding={
          brandings[detailAccount.id] ?? { primaryColor: "", logoUrl: "" }
        }
        inflows={accountInflows}
        outflows={accountOutflows}
        onBack={() => setDetailAccountId(null)}
      />
    );
  }

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
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            data-ocid="accounts.add_category_button"
            onClick={() => setShowAddCategory(true)}
            className="rounded-xl gap-1 text-xs"
          >
            <Plus size={12} /> Add Category
          </Button>
          <Button
            size="sm"
            variant="outline"
            data-ocid="accounts.add_account_button"
            className="rounded-xl gap-1 text-xs"
          >
            <Plus size={12} /> Add Account
          </Button>
        </div>
      </div>

      {/* ── Total Balance Hero ── */}
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
        <div
          className="flex gap-2 mt-4 pt-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          {accounts.map((a) => {
            const pct = Math.round((a.balance / totalBalance) * 100);
            const grad = getGradient(a.bankName, brandings[a.id]);
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

      {/* ── Account Categories ── */}
      <div className="flex flex-col gap-6">
        {categories.map((cat) => {
          const catAccounts = accounts.filter((a) =>
            cat.accountIds.includes(a.id),
          );
          return (
            <section key={cat.id} data-ocid="accounts.category_section">
              <CategoryChip name={cat.name} color={cat.color} />
              {catAccounts.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {catAccounts.map((acct, i) => (
                    <BankCard
                      key={acct.id}
                      account={acct}
                      index={i}
                      branding={
                        brandings[acct.id] ?? { primaryColor: "", logoUrl: "" }
                      }
                      onEdit={() => setEditingAccountId(acct.id)}
                      onAddCashflow={(name) => setModalBank(name)}
                      onSelect={() => setDetailAccountId(acct.id)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyCategoryPlaceholder
                  categoryName={cat.name}
                  onAddAccount={() => {}}
                />
              )}
            </section>
          );
        })}
      </div>

      {/* ── Global Cashflow Map ── */}
      <section data-ocid="accounts.cashflow_section">
        <h2 className="text-sm font-bold text-foreground mb-1">
          Global Cashflow Map
        </h2>
        <p className="text-[11px] text-muted-foreground mb-3">
          Where your money comes from and goes
        </p>
        <CashflowMapSection
          inflows={cashflowInflows}
          outflows={cashflowOutflows}
        />
      </section>

      {/* ── Footer Totals — unpinned, scrolls with page ── */}
      <div
        data-ocid="accounts.footer_totals"
        className="glass-card p-4 flex items-center justify-between gap-4"
        style={{
          background: "oklch(0.97 0.01 265 / 0.85)",
          borderRadius: 20,
          boxShadow: "0 4px 20px oklch(0.35 0.13 265 / 0.06)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-2xl flex items-center justify-center"
            style={{ background: "oklch(0.52 0.19 143 / 0.12)" }}
          >
            <TrendingUp size={16} style={{ color: "oklch(0.45 0.18 143)" }} />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
              Total Assets
            </p>
            <p
              className="text-sm font-bold"
              style={{ color: "oklch(0.32 0.14 143)" }}
            >
              {formatNaira(totalBalance)}
            </p>
          </div>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-2xl flex items-center justify-center"
            style={{ background: "oklch(0.55 0.22 25 / 0.12)" }}
          >
            <TrendingDown size={16} style={{ color: "oklch(0.55 0.22 25)" }} />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
              Total Expenditure
            </p>
            <p
              className="text-sm font-bold"
              style={{ color: "oklch(0.55 0.22 25)" }}
            >
              {formatNaira(totalExpenditure)}
            </p>
          </div>
        </div>
        <ChevronRight size={14} className="text-muted-foreground ml-auto" />
      </div>

      {/* ── Modals ── */}
      {modalBank !== null && (
        <AddCashflowModal
          bankName={modalBank}
          onClose={() => setModalBank(null)}
        />
      )}
      {editingAccountId !== null &&
        (() => {
          const acct = accounts.find((a) => a.id === editingAccountId);
          return acct ? (
            <EditBrandingModal
              account={acct}
              branding={brandings[acct.id] ?? { primaryColor: "", logoUrl: "" }}
              onSave={(b) => handleSaveBranding(acct.id, b)}
              onClose={() => setEditingAccountId(null)}
            />
          ) : null;
        })()}
      {showAddCategory && (
        <AddCategoryModal
          onAdd={handleAddCategory}
          onClose={() => setShowAddCategory(false)}
        />
      )}
    </div>
  );
}
