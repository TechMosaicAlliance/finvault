import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const EXPENSE_CATEGORIES = [
  "Feeding",
  "Transportation",
  "Housing",
  "Grooming",
  "Utilities",
  "Gifts",
  "Entertainment",
  "Healthcare",
  "Education",
  "Savings",
  "Investment",
  "Clothing",
  "Other",
];

const INCOME_CATEGORIES = [
  "Salary",
  "Freelance",
  "Business",
  "Investment Return",
  "Gift Received",
  "Refund",
  "Other Income",
];

export interface TransactionFormData {
  type: "income" | "expense" | "transfer";
  date: Date;
  amount: number;
  category: string;
  accountId: string;
  fromAccountId: string;
  toAccountId: string;
  note: string;
  description: string;
}

interface TransactionFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (tx: TransactionFormData) => void;
  initialData?: Partial<TransactionFormData>;
  accounts: { id: string; name: string }[];
}

// ─── Wheel Date Picker ───────────────────────────────────────────────────────

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function daysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

interface WheelColumnProps {
  items: (string | number)[];
  selectedIndex: number;
  onChange: (index: number) => void;
  label: string;
}

function WheelColumn({
  items,
  selectedIndex,
  onChange,
  label,
}: WheelColumnProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const ITEM_H = 40;
  const isScrolling = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = selectedIndex * ITEM_H;
  }, [selectedIndex]);

  function handleScroll() {
    if (isScrolling.current) return;
    const el = scrollRef.current;
    if (!el) return;
    isScrolling.current = true;
    requestAnimationFrame(() => {
      const idx = Math.round(el.scrollTop / ITEM_H);
      const clamped = Math.max(0, Math.min(idx, items.length - 1));
      if (clamped !== selectedIndex) onChange(clamped);
      isScrolling.current = false;
    });
  }

  return (
    <div className="flex flex-col items-center flex-1">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
        {label}
      </span>
      <div className="relative w-full h-[200px] overflow-hidden">
        {/* Selection highlight */}
        <div
          className="absolute left-0 right-0 pointer-events-none z-10"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            height: ITEM_H,
            background: "oklch(var(--primary) / 0.12)",
            borderTop: "1px solid oklch(var(--primary) / 0.3)",
            borderBottom: "1px solid oklch(var(--primary) / 0.3)",
            borderRadius: 8,
          }}
        />
        {/* Fade masks */}
        <div
          className="absolute inset-x-0 top-0 h-16 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, oklch(var(--card)), transparent)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-16 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to top, oklch(var(--card)), transparent)",
          }}
        />
        <div
          ref={scrollRef}
          className="h-full overflow-y-auto"
          style={{
            scrollSnapType: "y mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingTop: `${ITEM_H * 2}px`,
            paddingBottom: `${ITEM_H * 2}px`,
          }}
          onScroll={handleScroll}
        >
          {items.map((item, i) => (
            <button
              key={String(item)}
              type="button"
              className="flex items-center justify-center font-semibold text-sm transition-smooth cursor-pointer w-full border-0 bg-transparent p-0"
              style={{
                height: ITEM_H,
                scrollSnapAlign: "center",
                color:
                  i === selectedIndex
                    ? "oklch(var(--foreground))"
                    : "oklch(var(--muted-foreground))",
                fontSize: i === selectedIndex ? 15 : 13,
              }}
              onClick={() => {
                const el = scrollRef.current;
                if (el) el.scrollTo({ top: i * ITEM_H, behavior: "smooth" });
                onChange(i);
              }}
            >
              {String(item).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

interface WheelDatePickerProps {
  value: Date;
  onChange: (d: Date) => void;
}

function WheelDatePicker({ value, onChange }: WheelDatePickerProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1970 + 1 },
    (_, i) => 1970 + i,
  );

  const dayIdx = value.getDate() - 1;
  const monthIdx = value.getMonth();
  const yearIdx = years.indexOf(value.getFullYear());

  const days = Array.from(
    { length: daysInMonth(monthIdx, value.getFullYear()) },
    (_, i) => i + 1,
  );

  function update(day: number, month: number, year: number) {
    const maxDay = daysInMonth(month, year);
    const safeDay = Math.min(day, maxDay);
    onChange(new Date(year, month, safeDay));
  }

  return (
    <div className="flex gap-2 px-2">
      <WheelColumn
        label="Day"
        items={days}
        selectedIndex={dayIdx}
        onChange={(i) => update(i + 1, monthIdx, years[yearIdx])}
      />
      <WheelColumn
        label="Month"
        items={MONTHS}
        selectedIndex={monthIdx}
        onChange={(i) => update(dayIdx + 1, i, years[yearIdx])}
      />
      <WheelColumn
        label="Year"
        items={years}
        selectedIndex={yearIdx === -1 ? years.length - 1 : yearIdx}
        onChange={(i) => update(dayIdx + 1, monthIdx, years[i])}
      />
    </div>
  );
}

// ─── Main TransactionForm ────────────────────────────────────────────────────

const TYPE_TABS: {
  value: TransactionFormData["type"];
  label: string;
  color: string;
}[] = [
  { value: "expense", label: "Expense", color: "var(--destructive)" },
  { value: "income", label: "Income", color: "var(--accent)" },
  { value: "transfer", label: "Transfer", color: "var(--primary)" },
];

function defaultFormData(): TransactionFormData {
  return {
    type: "expense",
    date: new Date(),
    amount: 0,
    category: "",
    accountId: "",
    fromAccountId: "",
    toAccountId: "",
    note: "",
    description: "",
  };
}

export function TransactionForm({
  open,
  onClose,
  onSubmit,
  initialData,
  accounts,
}: TransactionFormProps) {
  const [form, setForm] = useState<TransactionFormData>(() => ({
    ...defaultFormData(),
    ...initialData,
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setForm({ ...defaultFormData(), ...initialData });
      setErrors({});
    }
  }, [open, initialData]);

  function field<K extends keyof TransactionFormData>(
    key: K,
    value: TransactionFormData[K],
  ) {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  const categories =
    form.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!form.amount || form.amount <= 0)
      errs.amount = "Enter an amount greater than 0";
    if (form.type !== "transfer" && !form.category)
      errs.category = "Select a category";
    if (form.type === "transfer") {
      if (!form.fromAccountId) errs.fromAccountId = "Select source account";
      if (!form.toAccountId) errs.toAccountId = "Select destination account";
      if (form.fromAccountId && form.fromAccountId === form.toAccountId)
        errs.toAccountId = "Accounts must be different";
    } else {
      if (!form.accountId) errs.accountId = "Select an account";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit() {
    if (validate()) {
      onSubmit(form);
      onClose();
    }
  }

  const activeType = TYPE_TABS.find((t) => t.value === form.type);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        data-ocid="transaction_form.dialog"
        className="p-0 gap-0 border-0 max-w-[400px] w-[95vw] overflow-hidden"
        style={{
          background: "oklch(var(--card))",
          border: "1px solid oklch(var(--border))",
          borderRadius: 24,
          boxShadow:
            "0 20px 60px oklch(var(--primary) / 0.18), inset 0 1px 2px rgba(255,255,255,0.1)",
        }}
      >
        <DialogHeader className="px-5 pt-5 pb-3">
          <DialogTitle className="text-foreground font-display font-bold text-lg">
            {initialData ? "Edit Transaction" : "Add Transaction"}
          </DialogTitle>
        </DialogHeader>

        {/* Type tabs */}
        <div
          className="flex mx-5 mb-3 p-1 rounded-xl"
          style={{ background: "oklch(var(--muted))" }}
        >
          {TYPE_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              data-ocid={`transaction_form.type_${tab.value}`}
              onClick={() => {
                field("type", tab.value);
                field("category", "");
              }}
              className={cn(
                "flex-1 py-1.5 text-sm font-semibold rounded-lg transition-smooth",
                form.type === tab.value
                  ? "text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
              style={{
                background:
                  form.type === tab.value
                    ? `oklch(${tab.color})`
                    : "transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="px-5 pb-5 space-y-4 overflow-y-auto max-h-[60vh]">
          {/* Amount */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-sm">
                ₦
              </span>
              <Input
                data-ocid="transaction_form.amount_input"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={form.amount || ""}
                onChange={(e) =>
                  field("amount", Number.parseFloat(e.target.value) || 0)
                }
                className="pl-7 font-semibold text-base"
                style={{
                  background: "oklch(var(--muted) / 0.5)",
                  borderColor: errors.amount
                    ? "oklch(var(--destructive))"
                    : "oklch(var(--border))",
                }}
              />
            </div>
            {errors.amount && (
              <p
                data-ocid="transaction_form.amount_error"
                className="text-xs text-destructive"
              >
                {errors.amount}
              </p>
            )}
          </div>

          {/* Date Wheel Picker */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Date
            </Label>
            <div
              className="rounded-2xl overflow-hidden py-2"
              style={{
                background: "oklch(var(--muted) / 0.4)",
                border: "1px solid oklch(var(--border))",
              }}
            >
              <WheelDatePicker
                value={form.date}
                onChange={(d) => field("date", d)}
              />
            </div>
          </div>

          {/* Category — only for income/expense */}
          {form.type !== "transfer" && (
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Category
              </Label>
              <Select
                value={form.category}
                onValueChange={(v) => field("category", v)}
              >
                <SelectTrigger
                  data-ocid="transaction_form.category_select"
                  style={{
                    background: "oklch(var(--muted) / 0.5)",
                    borderColor: errors.category
                      ? "oklch(var(--destructive))"
                      : "oklch(var(--border))",
                  }}
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p
                  data-ocid="transaction_form.category_error"
                  className="text-xs text-destructive"
                >
                  {errors.category}
                </p>
              )}
            </div>
          )}

          {/* Account selectors */}
          {form.type !== "transfer" ? (
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Account
              </Label>
              <Select
                value={form.accountId}
                onValueChange={(v) => field("accountId", v)}
              >
                <SelectTrigger
                  data-ocid="transaction_form.account_select"
                  style={{
                    background: "oklch(var(--muted) / 0.5)",
                    borderColor: errors.accountId
                      ? "oklch(var(--destructive))"
                      : "oklch(var(--border))",
                  }}
                >
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((a) => (
                    <SelectItem key={a.id} value={a.id}>
                      {a.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.accountId && (
                <p
                  data-ocid="transaction_form.account_error"
                  className="text-xs text-destructive"
                >
                  {errors.accountId}
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  From
                </Label>
                <Select
                  value={form.fromAccountId}
                  onValueChange={(v) => field("fromAccountId", v)}
                >
                  <SelectTrigger
                    data-ocid="transaction_form.from_account_select"
                    style={{
                      background: "oklch(var(--muted) / 0.5)",
                      borderColor: errors.fromAccountId
                        ? "oklch(var(--destructive))"
                        : "oklch(var(--border))",
                    }}
                  >
                    <SelectValue placeholder="From" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.fromAccountId && (
                  <p className="text-xs text-destructive">
                    {errors.fromAccountId}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  To
                </Label>
                <Select
                  value={form.toAccountId}
                  onValueChange={(v) => field("toAccountId", v)}
                >
                  <SelectTrigger
                    data-ocid="transaction_form.to_account_select"
                    style={{
                      background: "oklch(var(--muted) / 0.5)",
                      borderColor: errors.toAccountId
                        ? "oklch(var(--destructive))"
                        : "oklch(var(--border))",
                    }}
                  >
                    <SelectValue placeholder="To" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.toAccountId && (
                  <p className="text-xs text-destructive">
                    {errors.toAccountId}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Note */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Note
            </Label>
            <Input
              data-ocid="transaction_form.note_input"
              placeholder="Short label (e.g. Shoprite run)"
              value={form.note}
              onChange={(e) => field("note", e.target.value)}
              style={{
                background: "oklch(var(--muted) / 0.5)",
                borderColor: "oklch(var(--border))",
              }}
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Description
            </Label>
            <Textarea
              data-ocid="transaction_form.description_textarea"
              placeholder="Optional details about this transaction"
              value={form.description}
              onChange={(e) => field("description", e.target.value)}
              rows={2}
              className="resize-none"
              style={{
                background: "oklch(var(--muted) / 0.5)",
                borderColor: "oklch(var(--border))",
              }}
            />
          </div>
        </div>

        {/* Footer actions */}
        <div
          className="flex gap-3 px-5 py-4 border-t"
          style={{ borderColor: "oklch(var(--border))" }}
        >
          <Button
            type="button"
            data-ocid="transaction_form.cancel_button"
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            data-ocid="transaction_form.submit_button"
            className="flex-1 font-bold"
            onClick={handleSubmit}
            style={{
              background: `oklch(${activeType?.color})`,
              color: "oklch(var(--primary-foreground))",
            }}
          >
            {initialData ? "Save Changes" : "Add Transaction"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
