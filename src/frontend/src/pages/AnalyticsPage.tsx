import { formatNaira, mockData } from "@/data/mockData";
import { Flame, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const CATEGORY_COLORS: Record<string, string> = {
  Grooming: "#7C3AED",
  Feeding: "#2D6A4F",
  Transportation: "#1A2B4C",
  Gifts: "#F59E0B",
};

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

function DonutCenterOverlay({ ratio }: { ratio: number }) {
  const isHealthy = ratio >= 0.25;
  const pct = (ratio * 100).toFixed(0);
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

function ExpensesView({ savingsRatio }: { savingsRatio: number }) {
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
      {/* Donut Chart */}
      <div
        className="glass-card glow-inner p-4"
        data-ocid="analytics.donut_chart_card"
      >
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Expenditure Breakdown
        </p>
        <div className="relative" style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseCategories}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={130}
                paddingAngle={3}
                dataKey="amount"
                startAngle={90}
                endAngle={-270}
              >
                {expenseCategories.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={CATEGORY_COLORS[entry.name] ?? entry.color}
                    stroke="transparent"
                    strokeWidth={0}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [formatNaira(value), "Amount"]}
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
          <DonutCenterOverlay ratio={savingsRatio} />
        </div>

        {/* Chart Legend */}
        <div
          className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 pt-3 border-t"
          style={{ borderColor: "oklch(var(--border))" }}
        >
          {expenseCategories.map((cat) => (
            <div
              key={cat.name}
              className="flex items-center gap-2"
              data-ocid={`analytics.legend.${cat.name.toLowerCase()}`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: CATEGORY_COLORS[cat.name] ?? cat.color,
                }}
              />
              <span className="text-xs font-medium text-foreground truncate">
                {cat.name}
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                {(
                  (cat.amount /
                    expenseCategories.reduce((s, c) => s + c.amount, 0)) *
                  100
                ).toFixed(0)}
                %
              </span>
            </div>
          ))}
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
