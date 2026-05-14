import { formatNaira, mockData } from "@/data/mockData";
import {
  CheckCircle2,
  ChevronDown,
  Flame,
  PieChart as PieIcon,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  type PieLabelRenderProps,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const CATEGORY_COLORS: Record<string, string> = {
  Grooming: "#7C3AED",
  Feeding: "#2D6A4F",
  Transportation: "#1A2B4C",
  Gifts: "#F59E0B",
};

const INCOME_COLORS: Record<string, string> = {
  Salary: "#2D6A4F",
  "Side Hustle": "#1A7B5A",
};

// Budget planner target allocations (% of total budget)
const BUDGET_TARGETS: Record<string, number> = {
  Grooming: 10,
  Feeding: 40,
  Transportation: 25,
  Gifts: 10,
  Other: 15,
};

type ChartView = "income" | "expenses";

type Tab = "income" | "expenses";

function BurnRateBar({ value, max = 12 }: { value: number; max?: number }) {
  const pct = Math.min((value / max) * 100, 100);
  const color = value < 1 ? "#C0392B" : value < 3 ? "#F59E0B" : "#2D6A4F";
  return (
    <div className="w-full mt-3">
      <div className="flex justify-between mb-1.5">
        <span className="text-[10px] text-muted-foreground">0 months</span>
        <span className="text-[10px] text-muted-foreground">{max} months</span>
      </div>
      <div
        className="h-2.5 w-full rounded-full overflow-hidden"
        style={{ backgroundColor: "oklch(var(--muted))" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] font-semibold" style={{ color }}>
          {value.toFixed(2)} months
        </span>
        <span className="text-[10px] text-muted-foreground">
          {((value / max) * 100).toFixed(0)}% runway used
        </span>
      </div>
    </div>
  );
}

function InsightBadge() {
  return (
    <span
      className="inline-flex items-center gap-0.5 text-[9px] font-bold px-2 py-0.5 rounded-full"
      style={{ backgroundColor: "#F97316", color: "#fff" }}
    >
      Over Budget ⚠
    </span>
  );
}

function CategoryRow({
  cat,
  index,
}: { cat: (typeof mockData.expenseCategories)[0]; index: number }) {
  const dotColor = CATEGORY_COLORS[cat.name] ?? cat.color;
  const budgetPct = Math.min((cat.amount / cat.budgeted) * 100, 100);
  const barColor = cat.isOverBudget ? "#F97316" : dotColor;

  return (
    <motion.div
      data-ocid={`analytics.expense.item.${index + 1}`}
      className="glass-card glow-inner p-4"
      style={cat.isOverBudget ? { borderColor: "rgba(249,115,22,0.35)" } : {}}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
    >
      <div className="flex items-start justify-between mb-2.5">
        <div className="flex items-center gap-2.5">
          <span
            className="w-3.5 h-3.5 rounded-full flex-shrink-0 mt-0.5"
            style={{ backgroundColor: dotColor }}
          />
          <span className="text-sm font-semibold text-foreground">
            {cat.name}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {cat.isOverBudget && <InsightBadge />}
          <span className="text-sm font-bold text-foreground">
            {formatNaira(cat.amount)}
          </span>
        </div>
      </div>
      <div
        className="h-1.5 w-full rounded-full overflow-hidden"
        style={{ backgroundColor: "oklch(var(--muted))" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: barColor }}
          initial={{ width: 0 }}
          animate={{ width: `${budgetPct}%` }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
            delay: 0.2 + index * 0.07,
          }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-[10px] text-muted-foreground">
          Budget: {formatNaira(cat.budgeted)}
        </span>
        <span
          className="text-[10px] font-medium"
          style={{
            color: cat.isOverBudget
              ? "#F97316"
              : "oklch(var(--muted-foreground))",
          }}
        >
          {budgetPct.toFixed(0)}% used
        </span>
      </div>
    </motion.div>
  );
}

function renderPieLabel(
  props: PieLabelRenderProps & { name?: string; percent?: number },
) {
  const { cx, cy, midAngle, outerRadius, name, percent } = props;
  const cxNum = Number(cx ?? 0);
  const cyNum = Number(cy ?? 0);
  const outerNum = Number(outerRadius ?? 130);
  const RADIAN = Math.PI / 180;
  const radius = outerNum + 22;
  const x = cxNum + radius * Math.cos(-midAngle * RADIAN);
  const y = cyNum + radius * Math.sin(-midAngle * RADIAN);
  const pct = ((percent ?? 0) * 100).toFixed(0);
  if ((percent ?? 0) < 0.06) return null; // hide tiny labels
  return (
    <text
      x={x}
      y={y}
      textAnchor={x > cxNum ? "start" : "end"}
      dominantBaseline="central"
      style={{ fontSize: 10, fontWeight: 600, fill: "oklch(0.72 0.04 265)" }}
    >
      {name} {pct}%
    </text>
  );
}

function DonutCenterOverlay({
  ratio,
  chartView,
}: { ratio: number; chartView: ChartView }) {
  const isHealthy = ratio >= 0.25;
  const pct = (ratio * 100).toFixed(0);
  const { cashflowInflows } = mockData;
  const totalIncome = cashflowInflows.reduce((s, i) => s + i.amount, 0);

  if (chartView === "income") {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          style={{
            backdropFilter: "blur(12px)",
            background: "oklch(var(--card) / 0.6)",
            border: "1px solid oklch(var(--border) / 0.6)",
            borderRadius: "50%",
            width: 110,
            height: 110,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "inset 0 1px 3px rgba(255,255,255,0.2)",
          }}
        >
          <span className="text-[9px] font-semibold text-muted-foreground leading-tight text-center mb-0.5">
            Total
          </span>
          <span
            className="text-base font-black leading-none"
            style={{ color: "#2D6A4F" }}
          >
            {formatNaira(totalIncome)}
          </span>
          <span className="text-[9px] font-semibold text-muted-foreground mt-0.5 leading-tight text-center">
            Income
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        style={{
          backdropFilter: "blur(12px)",
          background: "oklch(var(--card) / 0.6)",
          border: "1px solid oklch(var(--border) / 0.6)",
          borderRadius: "50%",
          width: 110,
          height: 110,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "inset 0 1px 3px rgba(255,255,255,0.2)",
        }}
      >
        <span
          className="text-3xl font-black leading-none"
          style={{ color: isHealthy ? "#2D6A4F" : "#C0392B" }}
        >
          {pct}%
        </span>
        <span className="text-[9px] font-semibold text-muted-foreground mt-0.5 leading-tight text-center">
          Savings
          <br />
          Ratio
        </span>
      </div>
    </div>
  );
}

function IncomeView() {
  const { cashflowInflows } = mockData;
  const totalIncome = cashflowInflows.reduce((s, i) => s + i.amount, 0);

  return (
    <motion.div
      className="flex flex-col gap-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Total Income Header */}
      <div
        className="glass-card glow-inner p-5"
        data-ocid="analytics.income_total_card"
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Total Income
          </span>
          <TrendingUp className="w-4 h-4" style={{ color: "#2D6A4F" }} />
        </div>
        <div className="text-4xl font-black text-foreground">
          {formatNaira(totalIncome)}
        </div>
        <div className="text-[11px] text-muted-foreground mt-1">
          May 2026 · 2 sources
        </div>
      </div>

      {/* Income Sources */}
      <div className="flex flex-col gap-3" data-ocid="analytics.income_list">
        {cashflowInflows.map((source, i) => (
          <motion.div
            key={source.name}
            data-ocid={`analytics.income.item.${i + 1}`}
            className="glass-card glow-inner p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: "oklch(var(--accent) / 0.12)" }}
                >
                  {source.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {source.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {((source.amount / totalIncome) * 100).toFixed(0)}% of
                    income
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base font-bold" style={{ color: "#2D6A4F" }}>
                  +{formatNaira(source.amount)}
                </p>
              </div>
            </div>
            {/* Share bar */}
            <div
              className="mt-3 h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: "oklch(var(--muted))" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: "#2D6A4F" }}
                initial={{ width: 0 }}
                animate={{ width: `${(source.amount / totalIncome) * 100}%` }}
                transition={{
                  duration: 0.9,
                  ease: "easeOut",
                  delay: 0.2 + i * 0.1,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Income vs Expense Summary */}
      <div
        className="glass-card glow-inner p-4"
        data-ocid="analytics.income_vs_expense_card"
      >
        <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
          Income vs Expenses
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div
            className="rounded-2xl p-3"
            style={{ background: "oklch(var(--accent) / 0.08)" }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp
                className="w-3.5 h-3.5"
                style={{ color: "#2D6A4F" }}
              />
              <span className="text-[10px] font-medium text-muted-foreground">
                Income
              </span>
            </div>
            <p className="text-lg font-black" style={{ color: "#2D6A4F" }}>
              {formatNaira(totalIncome)}
            </p>
          </div>
          <div
            className="rounded-2xl p-3"
            style={{ background: "oklch(var(--destructive) / 0.06)" }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingDown className="w-3.5 h-3.5 text-destructive" />
              <span className="text-[10px] font-medium text-muted-foreground">
                Expenses
              </span>
            </div>
            <p className="text-lg font-black text-destructive">
              {formatNaira(
                mockData.expenseCategories.reduce((s, c) => s + c.amount, 0),
              )}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BudgetPlannerSection() {
  const { expenseCategories, cashflowInflows } = mockData;
  const totalAllIncome = cashflowInflows.reduce((s, i) => s + i.amount, 0);

  // Income source selector state: null = all sources
  const [selectedSourceName, setSelectedSourceName] = useState<string | null>(
    null,
  );
  const [selectorOpen, setSelectorOpen] = useState(false);

  const selectedAmount =
    selectedSourceName === null
      ? totalAllIncome
      : (cashflowInflows.find((s) => s.name === selectedSourceName)?.amount ??
        totalAllIncome);

  const selectedLabel =
    selectedSourceName === null
      ? `All Income Sources (${formatNaira(totalAllIncome)})`
      : `${selectedSourceName} (${formatNaira(selectedAmount)})`;

  const totalBudget = expenseCategories.reduce((s, c) => s + c.budgeted, 0);
  const totalSpent = expenseCategories.reduce((s, c) => s + c.amount, 0);
  const unallocated = Math.max(totalBudget - totalSpent, 0);

  function getBudgetBarColor(pct: number): string {
    if (pct > 70) return "oklch(0.60 0.25 25)";
    if (pct > 50) return "oklch(0.70 0.18 45)";
    if (pct > 20) return "oklch(var(--muted-foreground))";
    return "oklch(0.65 0.15 142)";
  }

  return (
    <motion.section
      data-ocid="analytics.budget_planner_section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Budget Planner
        </h2>
      </div>
      <div
        className="glass-card glow-inner p-4"
        style={{
          borderColor: "oklch(var(--border) / 0.5)",
          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.06)",
        }}
      >
        {/* Income Source Selector */}
        <div
          className="mb-4"
          data-ocid="analytics.budget.income_source_selector"
        >
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
            Calculate against
          </p>
          <div className="relative">
            <button
              type="button"
              data-ocid="analytics.budget.income_source_toggle"
              onClick={() => setSelectorOpen((o) => !o)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-foreground transition-smooth"
              style={{
                background: "oklch(var(--card) / 0.7)",
                border: "1px solid oklch(var(--border) / 0.6)",
                backdropFilter: "blur(8px)",
                boxShadow: "inset 0 1px 2px rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor:
                      selectedSourceName === null
                        ? "#2D6A4F"
                        : (INCOME_COLORS[selectedSourceName] ?? "#2D6A4F"),
                  }}
                />
                <span className="truncate">{selectedLabel}</span>
              </div>
              <ChevronDown
                className="w-4 h-4 flex-shrink-0 ml-2 transition-transform duration-200"
                style={{
                  color: "oklch(var(--muted-foreground))",
                  transform: selectorOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>

            <AnimatePresence>
              {selectorOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="absolute z-20 left-0 right-0 mt-1.5 rounded-xl overflow-hidden"
                  style={{
                    background: "oklch(var(--card) / 0.92)",
                    border: "1px solid oklch(var(--border) / 0.7)",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 8px 24px oklch(var(--primary) / 0.18)",
                  }}
                >
                  {/* All Sources option */}
                  <button
                    type="button"
                    data-ocid="analytics.budget.source.all"
                    onClick={() => {
                      setSelectedSourceName(null);
                      setSelectorOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold transition-smooth hover:bg-muted/40"
                    style={{
                      color:
                        selectedSourceName === null
                          ? "#2D6A4F"
                          : "oklch(var(--foreground))",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full bg-accent flex-shrink-0"
                        style={{ backgroundColor: "#2D6A4F" }}
                      />
                      <span>All Income Sources</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span
                        className="text-xs font-bold"
                        style={{ color: "oklch(var(--muted-foreground))" }}
                      >
                        {formatNaira(totalAllIncome)}
                      </span>
                      {selectedSourceName === null && (
                        <CheckCircle2
                          className="w-3.5 h-3.5"
                          style={{ color: "#2D6A4F" }}
                        />
                      )}
                    </div>
                  </button>

                  <div
                    className="mx-3"
                    style={{
                      borderTop: "1px solid oklch(var(--border) / 0.4)",
                    }}
                  />

                  {/* Individual sources */}
                  {cashflowInflows.map((src, i) => (
                    <button
                      key={src.name}
                      type="button"
                      data-ocid={`analytics.budget.source.${i + 1}`}
                      onClick={() => {
                        setSelectedSourceName(src.name);
                        setSelectorOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold transition-smooth hover:bg-muted/40"
                      style={{
                        color:
                          selectedSourceName === src.name
                            ? (INCOME_COLORS[src.name] ?? "#2D6A4F")
                            : "oklch(var(--foreground))",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor:
                              INCOME_COLORS[src.name] ?? "#2D6A4F",
                          }}
                        />
                        <span>{src.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <span
                          className="text-xs font-bold"
                          style={{ color: "oklch(var(--muted-foreground))" }}
                        >
                          {formatNaira(src.amount)}
                        </span>
                        {selectedSourceName === src.name && (
                          <CheckCircle2
                            className="w-3.5 h-3.5"
                            style={{
                              color: INCOME_COLORS[src.name] ?? "#2D6A4F",
                            }}
                          />
                        )}
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Context chip showing selected base */}
          <p className="text-[10px] text-muted-foreground mt-1.5 px-0.5">
            Budgets calculated as % of{" "}
            <span className="font-semibold text-foreground">
              {formatNaira(selectedAmount)}
            </span>
          </p>
        </div>

        {/* Divider */}
        <div
          className="mb-4 border-t"
          style={{ borderColor: "oklch(var(--border) / 0.4)" }}
        />

        <div className="flex flex-col gap-4">
          {expenseCategories.map((cat, i) => {
            const targetPct = BUDGET_TARGETS[cat.name] ?? BUDGET_TARGETS.Other;
            // Use selected income source as the base for all budget calculations
            const targetAmount = Math.round((targetPct / 100) * selectedAmount);
            const spentPct =
              targetAmount > 0
                ? Math.min((cat.amount / targetAmount) * 100, 100)
                : 0;
            const barColor = getBudgetBarColor(spentPct);
            const dotColor = CATEGORY_COLORS[cat.name] ?? cat.color;

            return (
              <motion.div
                key={cat.name}
                data-ocid={`analytics.budget.item.${i + 1}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: dotColor }}
                    />
                    <span className="text-sm font-semibold text-foreground">
                      {cat.name}
                    </span>
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{
                        background: `${barColor}22`,
                        color: barColor,
                      }}
                    >
                      {targetPct}% target
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-foreground">
                      {formatNaira(cat.amount)}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {" "}
                      / {formatNaira(targetAmount)}
                    </span>
                  </div>
                </div>
                <div
                  className="h-2 w-full rounded-full overflow-hidden"
                  style={{ backgroundColor: "oklch(var(--muted))" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: barColor }}
                    initial={{ width: 0 }}
                    animate={{ width: `${spentPct}%` }}
                    transition={{
                      duration: 0.9,
                      ease: "easeOut",
                      delay: 0.2 + i * 0.07,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-muted-foreground">
                    {spentPct.toFixed(0)}% of target used
                  </span>
                  {cat.isOverBudget && (
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{
                        background: "rgba(249,115,22,0.15)",
                        color: "#F97316",
                      }}
                    >
                      Over budget ⚠
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Divider */}
        <div
          className="my-4 border-t"
          style={{ borderColor: "oklch(var(--border) / 0.4)" }}
        />

        {/* Remaining Unallocated */}
        <div
          className="flex items-center justify-between rounded-2xl px-4 py-3"
          style={{ background: "oklch(var(--accent) / 0.07)" }}
          data-ocid="analytics.budget.unallocated"
        >
          <div>
            <p className="text-xs font-semibold text-muted-foreground">
              Remaining Unallocated Budget
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Total budget: {formatNaira(totalBudget)}
            </p>
          </div>
          <div className="text-right">
            <p
              className="text-xl font-black"
              style={{ color: unallocated > 0 ? "#2D6A4F" : "#C0392B" }}
            >
              {formatNaira(unallocated)}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {((unallocated / totalBudget) * 100).toFixed(0)}% free
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ExpensesView({ savingsRatio }: { savingsRatio: number }) {
  const [chartView, setChartView] = useState<ChartView>("expenses");
  const { expenseCategories, totalSavings, avgMonthlyExpenses, burnRate } =
    mockData;
  const isAlertBurn = burnRate < 1;
  const isWarnBurn = burnRate >= 1 && burnRate < 3;
  const burnAccentColor = isAlertBurn
    ? "#C0392B"
    : isWarnBurn
      ? "#F59E0B"
      : "#2D6A4F";
  const burnBg = isAlertBurn
    ? "oklch(var(--destructive) / 0.12)"
    : isWarnBurn
      ? "rgba(245,158,11,0.08)"
      : "oklch(var(--accent) / 0.08)";
  const burnBorder = isAlertBurn
    ? "rgba(192,57,43,0.4)"
    : isWarnBurn
      ? "rgba(245,158,11,0.3)"
      : "rgba(45,106,79,0.3)";

  return (
    <motion.div
      className="flex flex-col gap-5"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Donut Chart Card */}
      <div
        className="glass-card glow-inner p-4"
        data-ocid="analytics.donut_chart_card"
      >
        {/* Chart header with toggle */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {chartView === "expenses"
              ? "Expenditure Breakdown"
              : "Income Sources"}
          </p>
          {/* Chart view toggle */}
          <fieldset
            className="flex rounded-xl p-0.5 gap-0.5 border-0 m-0"
            style={{
              backgroundColor: "oklch(var(--muted))",
              padding: "0.125rem",
            }}
            aria-label="Chart view"
            data-ocid="analytics.chart_view_toggle"
          >
            {(["expenses", "income"] as ChartView[]).map((view) => (
              <button
                key={view}
                type="button"
                data-ocid={`analytics.chart_view.${view}`}
                onClick={() => setChartView(view)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-smooth"
                style={
                  chartView === view
                    ? {
                        background: "oklch(var(--card))",
                        color:
                          view === "income"
                            ? "#2D6A4F"
                            : "oklch(var(--foreground))",
                        boxShadow: "0 1px 4px oklch(var(--primary) / 0.14)",
                      }
                    : { color: "oklch(var(--muted-foreground))" }
                }
              >
                {view === "income" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <PieIcon className="w-3 h-3" />
                )}
                {view === "income" ? "Income" : "Expenses"}
              </button>
            ))}
          </fieldset>
        </div>

        {/* Animated chart swap */}
        <AnimatePresence mode="wait">
          <motion.div
            key={chartView}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
          >
            <div className="relative" style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 16, right: 36, bottom: 16, left: 36 }}>
                  <Pie
                    data={
                      chartView === "expenses"
                        ? expenseCategories
                        : mockData.cashflowInflows
                    }
                    cx="50%"
                    cy="50%"
                    innerRadius={72}
                    outerRadius={108}
                    paddingAngle={3}
                    dataKey="amount"
                    startAngle={90}
                    endAngle={-270}
                    label={renderPieLabel}
                    labelLine={false}
                  >
                    {(chartView === "expenses"
                      ? expenseCategories
                      : mockData.cashflowInflows
                    ).map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={
                          chartView === "expenses"
                            ? (CATEGORY_COLORS[entry.name] ??
                              (entry as { color?: string }).color ??
                              "#888")
                            : (INCOME_COLORS[entry.name] ?? "#2D6A4F")
                        }
                        stroke="transparent"
                        strokeWidth={0}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [
                      formatNaira(value),
                      "Amount",
                    ]}
                    contentStyle={{
                      backgroundColor: "oklch(0.16 0.03 265)",
                      border: "1px solid oklch(0.25 0.03 265)",
                      borderRadius: "14px",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <DonutCenterOverlay ratio={savingsRatio} chartView={chartView} />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Chart Legend */}
        <div
          className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 pt-3 border-t"
          style={{ borderColor: "oklch(var(--border))" }}
        >
          {(chartView === "expenses"
            ? expenseCategories
            : mockData.cashflowInflows
          ).map((item) => {
            const total =
              chartView === "expenses"
                ? expenseCategories.reduce((s, c) => s + c.amount, 0)
                : mockData.cashflowInflows.reduce((s, i) => s + i.amount, 0);
            const fillColor =
              chartView === "expenses"
                ? (CATEGORY_COLORS[item.name] ??
                  (item as { color?: string }).color ??
                  "#888")
                : (INCOME_COLORS[item.name] ?? "#2D6A4F");
            return (
              <div
                key={item.name}
                className="flex items-center gap-2"
                data-ocid={`analytics.legend.${item.name.toLowerCase().replace(/\s+/g, "_")}`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: fillColor }}
                />
                <span className="text-xs font-medium text-foreground truncate">
                  {item.name}
                </span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {((item.amount / total) * 100).toFixed(0)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Breakdown */}
      <section data-ocid="analytics.expense_section">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Category Details
        </p>
        <div className="flex flex-col gap-3">
          {expenseCategories.map((cat, i) => (
            <CategoryRow key={cat.name} cat={cat} index={i} />
          ))}
        </div>
      </section>

      {/* Budget Planner Section */}
      <BudgetPlannerSection />

      {/* Burn Rate Widget */}
      <motion.div
        data-ocid="analytics.burn_rate_card"
        className={`glass-card glow-inner p-5 ${isAlertBurn ? "animate-pulse-glow" : ""}`}
        style={{ background: burnBg, borderColor: burnBorder }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${burnAccentColor}20` }}
            >
              <Flame className="w-5 h-5" style={{ color: burnAccentColor }} />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">
                Burn Rate Calculator
              </p>
              <p className="text-[10px] text-muted-foreground">
                Financial runway indicator
              </p>
            </div>
          </div>
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: `${burnAccentColor}20`,
              color: burnAccentColor,
            }}
          >
            {isAlertBurn ? "⚠ Critical" : isWarnBurn ? "⚡ Caution" : "✓ Safe"}
          </span>
        </div>

        {/* Survival Time */}
        <div className="mb-1">
          <p className="text-xs font-semibold text-muted-foreground mb-0.5">
            Survival Time
          </p>
          <p
            className="text-5xl font-black leading-none tracking-tight"
            style={{ color: burnAccentColor }}
          >
            {burnRate.toFixed(2)}
            <span
              className="text-2xl font-bold ml-2"
              style={{ color: burnAccentColor }}
            >
              Months
            </span>
          </p>
        </div>

        {/* Formula */}
        <p className="text-[11px] text-muted-foreground mt-2 mb-0.5">
          Total Savings ÷ Avg Monthly Expenses
        </p>
        <p className="text-xs font-semibold text-foreground">
          {formatNaira(totalSavings)} ÷ {formatNaira(avgMonthlyExpenses)}
        </p>

        {/* Progress Bar */}
        <BurnRateBar value={burnRate} />

        {/* Stats Row */}
        <div
          className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t"
          style={{ borderColor: `${burnAccentColor}25` }}
        >
          <div className="text-center">
            <p className="text-[9px] text-muted-foreground uppercase tracking-wide mb-0.5">
              Savings
            </p>
            <p className="text-xs font-bold text-foreground">
              {formatNaira(totalSavings)}
            </p>
          </div>
          <div
            className="text-center"
            style={{
              borderLeft: `1px solid ${burnAccentColor}20`,
              borderRight: `1px solid ${burnAccentColor}20`,
            }}
          >
            <p className="text-[9px] text-muted-foreground uppercase tracking-wide mb-0.5">
              Avg/Mo
            </p>
            <p className="text-xs font-bold text-foreground">
              {formatNaira(avgMonthlyExpenses)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-[9px] text-muted-foreground uppercase tracking-wide mb-0.5">
              Ratio
            </p>
            <p className="text-xs font-bold" style={{ color: burnAccentColor }}>
              {burnRate.toFixed(2)}×
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("expenses");
  const { expenseCategories, totalSavings } = mockData;
  const totalExpenses = expenseCategories.reduce((s, c) => s + c.amount, 0);
  const savingsRatio = totalSavings / (totalSavings + totalExpenses);

  return (
    <div className="flex flex-col gap-5" data-ocid="analytics.page">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-foreground tracking-tight">
          Analytics
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Income &amp; Expenses breakdown
        </p>
      </div>

      {/* Tab Toggle */}
      <div
        className="flex rounded-2xl p-1 gap-1"
        style={{ backgroundColor: "oklch(var(--muted))" }}
        role="tablist"
        data-ocid="analytics.tab_group"
      >
        {(["income", "expenses"] as Tab[]).map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            data-ocid={`analytics.${tab}.tab`}
            onClick={() => setActiveTab(tab)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-smooth capitalize"
            style={
              activeTab === tab
                ? {
                    background: "oklch(var(--card))",
                    color: "oklch(var(--foreground))",
                    boxShadow: "0 2px 8px oklch(var(--primary) / 0.12)",
                  }
                : { color: "oklch(var(--muted-foreground))" }
            }
          >
            {tab === "income" ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <Wallet className="w-4 h-4" />
            )}
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "income" ? (
          <IncomeView key="income" />
        ) : (
          <ExpensesView key="expenses" savingsRatio={savingsRatio} />
        )}
      </AnimatePresence>
    </div>
  );
}
