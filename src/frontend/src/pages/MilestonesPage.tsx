import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatNaira, getBurnRateStatus, mockData } from "@/data/mockData";
import type { FinancialGoal, FinancialProfile } from "@/data/mockData";
import {
  CheckCircle2,
  ChevronDown,
  Flame,
  Lock,
  Star,
  TrendingDown,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { useState } from "react";

// ─── Static data ──────────────────────────────────────────────────────────────

const roadmapNodes = [
  { label: "Where You Started", sublabel: "Jan 2023", status: "done" as const },
  {
    label: "Emergency Fund Built",
    sublabel: "₦500K saved",
    status: "done" as const,
  },
  {
    label: "Investment Portfolio",
    sublabel: "3 active funds",
    status: "done" as const,
  },
  {
    label: "Current Position",
    sublabel: "You are here",
    status: "current" as const,
  },
  {
    label: "Dream Destination",
    sublabel: "Financial Freedom",
    status: "future" as const,
  },
];

const achievementBadges = [
  {
    icon: "💰",
    label: "First ₦1M Saved",
    sublabel: "Milestone",
    unlocked: true,
    gradient: "linear-gradient(135deg, #2D6A4F 0%, #1A2B4C 100%)",
  },
  {
    icon: "🔥",
    label: "3-Month Streak",
    sublabel: "Discipline",
    unlocked: true,
    gradient: "linear-gradient(135deg, #F95738 0%, #C0392B 100%)",
  },
  {
    icon: "📊",
    label: "Budget Master",
    sublabel: "Control",
    unlocked: true,
    gradient: "linear-gradient(135deg, #1A2B4C 0%, #2D6A4F 100%)",
  },
  {
    icon: "🏡",
    label: "Property Owner",
    sublabel: "Wealth",
    unlocked: false,
    gradient: "",
  },
  {
    icon: "💳",
    label: "Debt Free",
    sublabel: "Freedom",
    unlocked: false,
    gradient: "",
  },
  {
    icon: "💎",
    label: "₦10M Club",
    sublabel: "Elite",
    unlocked: false,
    gradient: "",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProfileChip({
  profile,
  isActive,
  onClick,
  index,
}: {
  profile: FinancialProfile;
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <button
      type="button"
      data-ocid={`milestones.profile.item.${index + 1}`}
      onClick={onClick}
      className="flex flex-col items-center gap-1 px-3 py-2.5 rounded-2xl flex-shrink-0 transition-smooth"
      style={{
        minWidth: "62px",
        background: isActive
          ? "linear-gradient(135deg, oklch(var(--primary) / 0.25), oklch(var(--accent) / 0.15))"
          : "oklch(var(--card) / 0.5)",
        border: `1.5px solid ${
          isActive ? "oklch(var(--accent))" : "oklch(var(--border) / 0.6)"
        }`,
        boxShadow: isActive
          ? "0 0 14px oklch(var(--accent) / 0.35), inset 0 1px 3px rgba(255,255,255,0.1)"
          : "none",
      }}
    >
      <span className="text-xl leading-none">{profile.icon}</span>
      <span
        className="text-[9px] font-bold leading-tight text-center"
        style={{
          color: isActive
            ? "oklch(var(--accent))"
            : "oklch(var(--muted-foreground))",
        }}
      >
        {profile.name.replace("The ", "")}
      </span>
    </button>
  );
}

// ─── Goal Dialog ────────────────────────────────────────────────────────────

function getConsistencyRating(progressPercent: number): number {
  if (progressPercent > 50) return 72;
  if (progressPercent >= 25) return 48;
  return 21;
}

function getMonthsToCompletion(goal: FinancialGoal): string {
  const remaining = goal.targetAmount - goal.currentAmount;
  const monthlyContrib = goal.currentAmount / 6; // 6 months assumed since start
  if (monthlyContrib <= 0) return "30+";
  const months = remaining / monthlyContrib;
  if (months > 30) return "30+";
  return Math.ceil(months).toString();
}

function ConsistencyArc({ percent }: { percent: number }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const filled = (percent / 100) * circ * 0.75; // 270deg arc
  const isHigh = percent >= 60;
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 80, height: 80 }}
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        style={{ transform: "rotate(135deg)" }}
      >
        <title>Consistency arc</title>
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          strokeWidth="7"
          style={{ stroke: "oklch(var(--muted))" }}
          strokeDasharray={`${circ * 0.75} ${circ}`}
          strokeLinecap="round"
        />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          strokeWidth="7"
          style={{
            stroke: isHigh ? "oklch(var(--accent))" : "oklch(var(--primary))",
          }}
          strokeDasharray={`${filled} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-base font-bold"
          style={{
            color: isHigh ? "oklch(var(--accent))" : "oklch(var(--primary))",
          }}
        >
          {percent}%
        </span>
        <span className="text-[8px] text-muted-foreground font-medium">
          consist.
        </span>
      </div>
    </div>
  );
}

function GoalDetailDialog({
  goal,
  open,
  onClose,
}: { goal: FinancialGoal; open: boolean; onClose: () => void }) {
  const remaining = goal.targetAmount - goal.currentAmount;
  const consistency = getConsistencyRating(goal.progressPercent);
  const monthsToComplete = getMonthsToCompletion(goal);
  const isHighProgress = goal.progressPercent >= 60;
  const gradientFill = isHighProgress
    ? "linear-gradient(90deg, #2D6A4F 0%, #52c788 100%)"
    : "linear-gradient(90deg, #1A2B4C 0%, #3a6bc9 100%)";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-ocid="milestones.goal_detail.dialog"
        className="max-w-[360px] mx-auto rounded-[24px] border-0 p-0 overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, oklch(var(--card)) 0%, oklch(var(--background)) 100%)",
          border: "1.5px solid oklch(var(--border) / 0.8)",
          boxShadow:
            "0 24px 64px oklch(var(--primary) / 0.25), 0 0 0 1px oklch(var(--border) / 0.3)",
        }}
      >
        {/* Hero strip */}
        <div
          className="w-full px-6 pt-6 pb-5 flex items-center gap-4"
          style={{
            background: isHighProgress
              ? "linear-gradient(135deg, oklch(var(--accent) / 0.15), oklch(var(--accent) / 0.05))"
              : "linear-gradient(135deg, oklch(var(--primary) / 0.15), oklch(var(--primary) / 0.05))",
            borderBottom: "1px solid oklch(var(--border) / 0.4)",
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{
              background: isHighProgress
                ? "oklch(var(--accent) / 0.18)"
                : "oklch(var(--primary) / 0.18)",
              border: `2px solid ${isHighProgress ? "oklch(var(--accent) / 0.45)" : "oklch(var(--primary) / 0.35)"}`,
              boxShadow: `0 0 16px ${isHighProgress ? "oklch(var(--accent) / 0.3)" : "oklch(var(--primary) / 0.25)"}`,
            }}
          >
            {goal.icon}
          </div>
          <div className="flex-1 min-w-0">
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-foreground leading-tight">
                {goal.name}
              </DialogTitle>
            </DialogHeader>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Target: {goal.targetDate}
            </p>
            <div className="flex items-center gap-1 mt-1.5">
              <span
                className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: isHighProgress
                    ? "oklch(var(--accent) / 0.15)"
                    : "oklch(var(--primary) / 0.15)",
                  color: isHighProgress
                    ? "oklch(var(--accent))"
                    : "oklch(var(--primary))",
                  border: `1px solid ${isHighProgress ? "oklch(var(--accent) / 0.3)" : "oklch(var(--primary) / 0.3)"}`,
                }}
              >
                {goal.progressPercent}% complete
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Consistency + forecast row */}
          <div className="flex items-center gap-4">
            <ConsistencyArc percent={consistency} />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                Completion Forecast
              </p>
              <p className="text-sm font-bold text-foreground leading-snug">
                {monthsToComplete === "30+"
                  ? "30+ months"
                  : `${monthsToComplete} month${monthsToComplete === "1" ? "" : "s"}`}{" "}
                remaining
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                At current pace
              </p>
            </div>
          </div>

          {/* Amount progress */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Saved vs Target
              </span>
              <span className="text-[10px] text-muted-foreground">
                {formatNaira(remaining)} remaining
              </span>
            </div>
            <div
              className="h-3 rounded-full overflow-hidden"
              style={{ backgroundColor: "oklch(var(--muted))" }}
            >
              <div
                className="h-full rounded-full transition-smooth"
                style={{
                  width: `${goal.progressPercent}%`,
                  background: gradientFill,
                  boxShadow: isHighProgress
                    ? "0 0 10px oklch(var(--accent) / 0.5)"
                    : "0 0 10px oklch(var(--primary) / 0.4)",
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-bold"
                style={{
                  color: isHighProgress
                    ? "oklch(var(--accent))"
                    : "oklch(var(--primary))",
                }}
              >
                {formatNaira(goal.currentAmount)}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {formatNaira(goal.targetAmount)}
              </span>
            </div>
          </div>

          {/* Monthly contribution est. */}
          <div
            className="flex items-center gap-2.5 px-3 py-3 rounded-2xl"
            style={{
              background: isHighProgress
                ? "oklch(var(--accent) / 0.08)"
                : "oklch(var(--primary) / 0.08)",
              border: `1px solid ${isHighProgress ? "oklch(var(--accent) / 0.2)" : "oklch(var(--primary) / 0.2)"}`,
            }}
          >
            <Zap
              size={14}
              style={{
                color: isHighProgress
                  ? "oklch(var(--accent))"
                  : "oklch(var(--primary))",
                flexShrink: 0,
              }}
            />
            <p className="text-[11px] text-foreground font-medium">
              Monthly contribution:{" "}
              <span className="font-bold">
                {formatNaira(Math.round(goal.currentAmount / 6))}
              </span>{" "}
              · Keep going!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── GoalCard ─────────────────────────────────────────────────────────────────

function GoalCard({ goal, index }: { goal: FinancialGoal; index: number }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const remaining = goal.targetAmount - goal.currentAmount;
  const isHighProgress = goal.progressPercent >= 60;
  const gradientFill = isHighProgress
    ? "linear-gradient(90deg, #2D6A4F 0%, #52c788 100%)"
    : "linear-gradient(90deg, #1A2B4C 0%, #3a6bc9 100%)";

  return (
    <>
      <GoalDetailDialog
        goal={goal}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
      <button
        type="button"
        data-ocid={`milestones.goal.item.${index + 1}`}
        onClick={() => setDialogOpen(true)}
        className="w-full text-left glass-card glow-inner p-5 flex flex-col gap-4 transition-smooth hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{
                background: isHighProgress
                  ? "linear-gradient(135deg, oklch(var(--accent) / 0.2), oklch(var(--accent) / 0.05))"
                  : "linear-gradient(135deg, oklch(var(--primary) / 0.2), oklch(var(--primary) / 0.05))",
                border: `1.5px solid ${
                  isHighProgress
                    ? "oklch(var(--accent) / 0.4)"
                    : "oklch(var(--primary) / 0.3)"
                }`,
              }}
            >
              {goal.icon}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground leading-tight">
                {goal.name}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Target: {goal.targetDate}
              </p>
            </div>
          </div>
          <div
            className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full"
            style={{
              background: isHighProgress
                ? "oklch(var(--accent) / 0.12)"
                : "oklch(var(--primary) / 0.12)",
              border: `1px solid ${
                isHighProgress
                  ? "oklch(var(--accent) / 0.3)"
                  : "oklch(var(--primary) / 0.3)"
              }`,
            }}
          >
            <Star
              size={10}
              style={{
                color: isHighProgress
                  ? "oklch(var(--accent))"
                  : "oklch(var(--primary))",
              }}
            />
            <span
              className="text-xs font-bold"
              style={{
                color: isHighProgress
                  ? "oklch(var(--accent))"
                  : "oklch(var(--primary))",
              }}
            >
              {goal.progressPercent}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex flex-col gap-2">
          <div
            className="h-3 rounded-full overflow-hidden"
            style={{ backgroundColor: "oklch(var(--muted))" }}
          >
            <div
              className="h-full rounded-full transition-smooth"
              style={{
                width: `${goal.progressPercent}%`,
                background: gradientFill,
                boxShadow: isHighProgress
                  ? "0 0 10px oklch(var(--accent) / 0.5)"
                  : "0 0 10px oklch(var(--primary) / 0.4)",
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span
              className="text-[11px] font-semibold"
              style={{
                color: isHighProgress
                  ? "oklch(var(--accent))"
                  : "oklch(var(--primary))",
              }}
            >
              {formatNaira(goal.currentAmount)} saved
            </span>
            <span className="text-[10px] text-muted-foreground">
              {formatNaira(goal.targetAmount)} goal
            </span>
          </div>
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
            style={{ backgroundColor: "oklch(var(--muted) / 0.7)" }}
          >
            <Zap size={10} className="text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground font-medium">
              {formatNaira(remaining)} to go · Tap for details
            </span>
          </div>
        </div>
      </button>
    </>
  );
}

function RoadmapNode({
  node,
  index: _index,
  isLast,
}: {
  node: (typeof roadmapNodes)[0];
  index: number;
  isLast: boolean;
}) {
  const isDone = node.status === "done";
  const isCurrent = node.status === "current";

  return (
    <div className="flex items-stretch gap-4">
      {/* Node + connector column */}
      <div
        className="flex flex-col items-center"
        style={{ width: "32px", flexShrink: 0 }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: isDone
              ? "linear-gradient(135deg, #2D6A4F, #52c788)"
              : isCurrent
                ? "linear-gradient(135deg, #1A2B4C, #3a6bc9)"
                : "oklch(var(--muted))",
            border: isCurrent
              ? "2px solid oklch(var(--primary))"
              : "2px solid transparent",
            boxShadow: isCurrent
              ? "0 0 16px oklch(var(--primary) / 0.6), 0 0 32px oklch(var(--primary) / 0.25)"
              : "none",
          }}
        >
          {isDone ? (
            <CheckCircle2 size={14} color="white" />
          ) : isCurrent ? (
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: "white",
                boxShadow: "0 0 6px rgba(255,255,255,0.8)",
                animation: "pulse 2s infinite",
              }}
            />
          ) : (
            <Lock
              size={11}
              style={{ color: "oklch(var(--muted-foreground))" }}
            />
          )}
        </div>
        {!isLast && (
          <div
            className="w-0.5 flex-1"
            style={{
              minHeight: "20px",
              background: isDone
                ? "linear-gradient(180deg, oklch(var(--accent)) 0%, oklch(var(--primary) / 0.5) 100%)"
                : "oklch(var(--border))",
              marginTop: "2px",
            }}
          />
        )}
      </div>

      {/* Label */}
      <div className="flex-1 pb-4 min-w-0">
        <p
          className="text-sm font-bold leading-tight"
          style={{
            color: isDone
              ? "oklch(var(--foreground))"
              : isCurrent
                ? "oklch(var(--primary))"
                : "oklch(var(--muted-foreground))",
          }}
        >
          {node.label}
        </p>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          {node.sublabel}
        </p>
        {isCurrent && (
          <div
            className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold"
            style={{
              backgroundColor: "oklch(var(--primary) / 0.15)",
              color: "oklch(var(--primary))",
              border: "1px solid oklch(var(--primary) / 0.25)",
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: "oklch(var(--primary))",
                animation: "pulse 2s infinite",
              }}
            />
            Active
          </div>
        )}
        {node.status === "future" && (
          <span className="text-[9px] text-muted-foreground italic mt-0.5 block">
            Unlock by reaching your goals
          </span>
        )}
      </div>

      {/* Done chip */}
      {isDone && (
        <div
          className="flex-shrink-0 self-start mt-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold"
          style={{
            backgroundColor: "oklch(var(--accent) / 0.12)",
            color: "oklch(var(--accent))",
            border: "1px solid oklch(var(--accent) / 0.25)",
          }}
        >
          ✓ Done
        </div>
      )}
    </div>
  );
}

// ─── Badge Dialog ───────────────────────────────────────────────────────────

const badgeDetails = [
  {
    what: "Saved your first ₦1 million — a landmark achievement in your financial journey.",
    when: "March 2025",
    how: "Accumulated ₦1,000,000 across all savings accounts and goals.",
    unlockRequirement: "Accumulate ₦1,000,000 in total savings.",
  },
  {
    what: "Maintained a perfect 3-month saving streak without missing a single contribution.",
    when: "January 2025",
    how: "Made consistent monthly contributions for 3 consecutive months.",
    unlockRequirement:
      "Make savings contributions every month for 3 months straight.",
  },
  {
    what: "Stayed within budget across all expense categories for a full month.",
    when: "April 2025",
    how: "Tracked all spending and kept every category under its planned budget.",
    unlockRequirement:
      "Stay under budget in every expense category for one full month.",
  },
  {
    what: "Own a piece of property — land, house, or real estate investment.",
    when: "",
    how: "",
    unlockRequirement:
      "Log a property purchase or land ownership worth ₦2M or more.",
  },
  {
    what: "Eliminate all outstanding debt and liabilities from your financial profile.",
    when: "",
    how: "",
    unlockRequirement:
      "Zero out all logged debt entries in the Accounts section.",
  },
  {
    what: "Reach a total net worth of ₦10 million across all accounts and investments.",
    when: "",
    how: "",
    unlockRequirement:
      "Accumulate ₦10,000,000 total across all linked accounts and goals.",
  },
];

// Seed-based progress for locked badges (30–65%)
function getLockedProgress(badgeIndex: number): number {
  const seeds = [42, 58, 31, 65, 47];
  return seeds[badgeIndex % seeds.length] ?? 38;
}

function BadgeDialog({
  badge,
  badgeIndex,
  open,
  onClose,
}: {
  badge: (typeof achievementBadges)[0];
  badgeIndex: number;
  open: boolean;
  onClose: () => void;
}) {
  const details = badgeDetails[badgeIndex];
  const lockedProgress = getLockedProgress(badgeIndex);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-ocid="milestones.badge_detail.dialog"
        className="max-w-[360px] mx-auto rounded-[24px] border-0 p-0 overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, oklch(var(--card)) 0%, oklch(var(--background)) 100%)",
          border: "1.5px solid oklch(var(--border) / 0.8)",
          boxShadow:
            "0 24px 64px rgba(0,0,0,0.2), 0 0 0 1px oklch(var(--border) / 0.3)",
        }}
      >
        {/* Hero */}
        <div
          className="px-6 pt-6 pb-5 flex flex-col items-center gap-3"
          style={{
            background: badge.unlocked
              ? `${badge.gradient}`
              : "oklch(var(--muted) / 0.5)",
            borderBottom: "1px solid oklch(var(--border) / 0.4)",
            filter: badge.unlocked ? "none" : "grayscale(1)",
          }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{
              background: badge.unlocked
                ? "rgba(255,255,255,0.15)"
                : "oklch(var(--muted))",
              boxShadow: badge.unlocked
                ? "0 0 20px rgba(255,255,255,0.25)"
                : "none",
              border: badge.unlocked
                ? "2px solid rgba(255,255,255,0.2)"
                : "2px solid oklch(var(--border))",
            }}
          >
            {badge.icon}
          </div>
          <DialogHeader>
            <DialogTitle
              className="text-base font-bold text-center"
              style={{
                color: badge.unlocked
                  ? "rgba(255,255,255,0.95)"
                  : "oklch(var(--foreground))",
              }}
            >
              {badge.label}
            </DialogTitle>
          </DialogHeader>
          <span
            className="text-[9px] font-bold px-2.5 py-0.5 rounded-full"
            style={{
              background: badge.unlocked
                ? "rgba(255,255,255,0.15)"
                : "oklch(var(--border))",
              color: badge.unlocked
                ? "rgba(255,255,255,0.8)"
                : "oklch(var(--muted-foreground))",
            }}
          >
            {badge.sublabel} {badge.unlocked ? "· Unlocked" : "· Locked"}
          </span>
        </div>

        <div className="px-6 py-5 flex flex-col gap-4">
          {badge.unlocked ? (
            // ── Unlocked content
            <>
              <div className="flex flex-col gap-3">
                {/* WHAT */}
                <div
                  className="flex flex-col gap-1 px-3.5 py-3 rounded-2xl"
                  style={{
                    background: "oklch(var(--accent) / 0.08)",
                    border: "1px solid oklch(var(--accent) / 0.2)",
                  }}
                >
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                    What
                  </span>
                  <p className="text-[11px] text-foreground font-medium leading-relaxed">
                    {details?.what}
                  </p>
                </div>
                {/* WHEN */}
                <div
                  className="flex items-center gap-3 px-3.5 py-3 rounded-2xl"
                  style={{
                    background: "oklch(var(--primary) / 0.08)",
                    border: "1px solid oklch(var(--primary) / 0.2)",
                  }}
                >
                  <Trophy
                    size={14}
                    style={{ color: "oklch(var(--primary))", flexShrink: 0 }}
                  />
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
                      When
                    </span>
                    <p className="text-[11px] text-foreground font-bold">
                      {details?.when}
                    </p>
                  </div>
                </div>
                {/* HOW */}
                <div
                  className="flex flex-col gap-1 px-3.5 py-3 rounded-2xl"
                  style={{
                    background: "oklch(var(--muted) / 0.7)",
                    border: "1px solid oklch(var(--border) / 0.5)",
                  }}
                >
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                    How
                  </span>
                  <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                    {details?.how}
                  </p>
                </div>
              </div>
            </>
          ) : (
            // ── Locked content
            <>
              {/* Unlock requirement */}
              <div
                className="flex flex-col gap-1.5 px-3.5 py-3 rounded-2xl"
                style={{
                  background: "oklch(var(--muted) / 0.7)",
                  border: "1px solid oklch(var(--border) / 0.5)",
                }}
              >
                <div className="flex items-center gap-2">
                  <Lock
                    size={12}
                    className="text-muted-foreground flex-shrink-0"
                  />
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                    Unlock Requirement
                  </span>
                </div>
                <p className="text-[11px] text-foreground font-medium leading-relaxed">
                  {details?.unlockRequirement}
                </p>
              </div>

              {/* Distance to goal progress */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Progress to Unlock
                  </span>
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: "oklch(var(--primary))" }}
                  >
                    {lockedProgress}%
                  </span>
                </div>
                <div
                  className="h-2.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: "oklch(var(--muted))" }}
                >
                  <div
                    className="h-full rounded-full transition-smooth"
                    style={{
                      width: `${lockedProgress}%`,
                      background:
                        "linear-gradient(90deg, #1A2B4C 0%, #3a6bc9 100%)",
                      boxShadow: "0 0 8px oklch(var(--primary) / 0.4)",
                    }}
                  />
                </div>
                <p
                  className="text-[10px] font-semibold text-center"
                  style={{ color: "oklch(var(--primary))" }}
                >
                  {100 - lockedProgress}% more to unlock this badge
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Burn Rate Section ──────────────────────────────────────────────────────

function BurnRateGauge({
  months,
  isAlert,
}: { months: number; isAlert: boolean }) {
  // 0 months = empty, 6+ months = full (capped at 6 for display)
  const clampedMonths = Math.min(months, 6);
  const percent = (clampedMonths / 6) * 100;
  const accentColor = isAlert
    ? "oklch(var(--destructive))"
    : months >= 3
      ? "oklch(var(--accent))"
      : "oklch(var(--primary))";
  const trackGradient = isAlert
    ? "linear-gradient(90deg, #C0392B 0%, #F95738 100%)"
    : months >= 3
      ? "linear-gradient(90deg, #2D6A4F 0%, #52c788 100%)"
      : "linear-gradient(90deg, #1A2B4C 0%, #3a6bc9 100%)";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
          Runway health
        </span>
        <span
          className="text-[10px] font-semibold"
          style={{ color: accentColor }}
        >
          {percent >= 80
            ? "Excellent"
            : percent >= 50
              ? "Good"
              : percent >= 30
                ? "Fair"
                : "Critical"}
        </span>
      </div>
      {/* Track */}
      <div
        className="h-3 rounded-full overflow-hidden"
        style={{ backgroundColor: "oklch(var(--muted))" }}
      >
        <div
          className="h-full rounded-full transition-smooth"
          style={{
            width: `${percent}%`,
            background: trackGradient,
            boxShadow: `0 0 10px ${accentColor} / 0.5`,
          }}
        />
      </div>
      {/* Month markers */}
      <div className="flex justify-between">
        {[0, 1, 2, 3, 4, 5, "6+"].map((m) => (
          <span key={m} className="text-[8px] text-muted-foreground">
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

function BurnRateSection() {
  const { totalSavings, avgMonthlyExpenses, burnRate, cashflowInflows } =
    mockData;
  const [expanded, setExpanded] = useState(false);
  const [incomeSource, setIncomeSource] = useState<"total" | string>("total");
  const isAlert = getBurnRateStatus(burnRate) === "alert";

  // Compute income bases
  const totalIncome = cashflowInflows.reduce((s, e) => s + e.amount, 0);
  const selectedIncome =
    incomeSource === "total"
      ? totalIncome
      : (cashflowInflows.find((e) => e.name === incomeSource)?.amount ??
        totalIncome);

  // Expense-to-income ratio against chosen base
  const expenseRatio =
    selectedIncome > 0 ? (avgMonthlyExpenses / selectedIncome) * 100 : 0;

  const accentColor = isAlert
    ? "oklch(var(--destructive))"
    : "oklch(var(--accent))";
  const cardBorderColor = isAlert
    ? "oklch(var(--destructive) / 0.45)"
    : "oklch(var(--accent) / 0.35)";
  const cardBg = isAlert
    ? "linear-gradient(145deg, oklch(var(--destructive) / 0.12) 0%, oklch(var(--card)) 100%)"
    : "linear-gradient(145deg, oklch(var(--primary) / 0.12) 0%, oklch(var(--accent) / 0.06) 100%)";
  const glowColor = isAlert
    ? "0 0 28px oklch(var(--destructive) / 0.2), 0 8px 24px oklch(var(--destructive) / 0.1)"
    : "0 0 28px oklch(var(--accent) / 0.2), 0 8px 24px oklch(var(--primary) / 0.1)";

  return (
    <section data-ocid="milestones.burn_rate.section">
      <div
        className="glow-inner rounded-[24px] overflow-hidden"
        style={{
          background: cardBg,
          border: `1.5px solid ${cardBorderColor}`,
          boxShadow: `${glowColor}, inset 0 1px 2px rgba(255,255,255,0.08)`,
        }}
      >
        {/* ── Header row (always visible, clickable) ── */}
        <button
          type="button"
          data-ocid="milestones.burn_rate.toggle"
          onClick={() => setExpanded((prev) => !prev)}
          className="w-full flex items-center gap-3 px-5 py-4 transition-smooth focus-visible:outline-none focus-visible:ring-2"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          {/* Icon */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: isAlert
                ? "oklch(var(--destructive) / 0.15)"
                : "oklch(var(--accent) / 0.15)",
              border: `1.5px solid ${isAlert ? "oklch(var(--destructive) / 0.3)" : "oklch(var(--accent) / 0.3)"}`,
              boxShadow: `0 0 12px ${isAlert ? "oklch(var(--destructive) / 0.25)" : "oklch(var(--accent) / 0.25)"}`,
            }}
          >
            <Flame size={16} style={{ color: accentColor }} />
          </div>

          {/* Title + pill */}
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-foreground">
                Burn Rate Analysis
              </span>
              <span
                className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                style={{
                  background: isAlert
                    ? "oklch(var(--destructive) / 0.15)"
                    : "oklch(var(--accent) / 0.12)",
                  color: accentColor,
                  border: `1px solid ${isAlert ? "oklch(var(--destructive) / 0.3)" : "oklch(var(--accent) / 0.25)"}`,
                }}
              >
                {burnRate.toFixed(1)} months runway
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {expanded ? "Tap to collapse" : "Tap for full analysis"}
            </p>
          </div>

          {/* Chevron */}
          <ChevronDown
            size={18}
            className="flex-shrink-0 text-muted-foreground transition-transform duration-300"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>

        {/* ── Expanded detail ── */}
        {expanded && (
          <div className="px-5 pb-5 flex flex-col gap-5">
            {/* Divider */}
            <div
              className="h-px w-full"
              style={{ backgroundColor: `${cardBorderColor}` }}
            />

            {/* Survival time hero */}
            <div className="flex items-center gap-4">
              <div
                className="flex flex-col items-center justify-center rounded-[20px] px-4 py-3 flex-shrink-0"
                style={{
                  background: isAlert
                    ? "oklch(var(--destructive) / 0.12)"
                    : "oklch(var(--accent) / 0.1)",
                  border: `1.5px solid ${cardBorderColor}`,
                  minWidth: "92px",
                }}
              >
                <span
                  className="text-2xl font-black leading-none tabular-nums"
                  style={{ color: accentColor }}
                >
                  {burnRate.toFixed(2)}
                </span>
                <span className="text-[10px] font-bold text-muted-foreground mt-1">
                  months
                </span>
                <span className="text-[8px] text-muted-foreground mt-0.5">
                  survival
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-foreground leading-snug">
                  {isAlert
                    ? "⚠️ Critical — less than 1 month of reserves"
                    : burnRate < 3
                      ? "Your runway is building. Keep saving."
                      : "Strong financial runway secured."}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">
                  At your current spend rate, your savings cover{" "}
                  <span
                    className="font-semibold"
                    style={{ color: accentColor }}
                  >
                    {burnRate.toFixed(1)} months
                  </span>{" "}
                  of expenses without any income.
                </p>
              </div>
            </div>

            {/* Runway gauge */}
            <BurnRateGauge months={burnRate} isAlert={isAlert} />

            {/* Income source selector */}
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Calculate % against
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  data-ocid="milestones.burn_rate.income_source.total"
                  onClick={() => setIncomeSource("total")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold transition-smooth"
                  style={{
                    background:
                      incomeSource === "total"
                        ? "oklch(var(--primary) / 0.18)"
                        : "oklch(var(--muted) / 0.6)",
                    color:
                      incomeSource === "total"
                        ? "oklch(var(--primary))"
                        : "oklch(var(--muted-foreground))",
                    border: `1.5px solid ${
                      incomeSource === "total"
                        ? "oklch(var(--primary) / 0.4)"
                        : "oklch(var(--border) / 0.5)"
                    }`,
                  }}
                >
                  <TrendingUp size={10} /> All Income
                </button>
                {cashflowInflows.map((inflow) => (
                  <button
                    type="button"
                    key={inflow.name}
                    data-ocid={`milestones.burn_rate.income_source.${inflow.name.toLowerCase().replace(/\s+/g, "_")}`}
                    onClick={() => setIncomeSource(inflow.name)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold transition-smooth"
                    style={{
                      background:
                        incomeSource === inflow.name
                          ? "oklch(var(--primary) / 0.18)"
                          : "oklch(var(--muted) / 0.6)",
                      color:
                        incomeSource === inflow.name
                          ? "oklch(var(--primary))"
                          : "oklch(var(--muted-foreground))",
                      border: `1.5px solid ${
                        incomeSource === inflow.name
                          ? "oklch(var(--primary) / 0.4)"
                          : "oklch(var(--border) / 0.5)"
                      }`,
                    }}
                  >
                    <span>{inflow.icon}</span>
                    {inflow.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3">
              {/* Total savings */}
              <div
                className="flex flex-col gap-1 px-3.5 py-3 rounded-2xl"
                style={{
                  background: "oklch(var(--accent) / 0.07)",
                  border: "1px solid oklch(var(--accent) / 0.2)",
                }}
              >
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                  Total Reserves
                </span>
                <span className="text-sm font-black text-foreground tabular-nums">
                  {formatNaira(totalSavings)}
                </span>
                <span className="text-[9px] text-muted-foreground">
                  Savings & cash
                </span>
              </div>
              {/* Avg expenses */}
              <div
                className="flex flex-col gap-1 px-3.5 py-3 rounded-2xl"
                style={{
                  background: isAlert
                    ? "oklch(var(--destructive) / 0.07)"
                    : "oklch(var(--primary) / 0.07)",
                  border: `1px solid ${isAlert ? "oklch(var(--destructive) / 0.2)" : "oklch(var(--primary) / 0.2)"}`,
                }}
              >
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                  Avg Monthly
                </span>
                <span className="text-sm font-black text-foreground tabular-nums">
                  {formatNaira(avgMonthlyExpenses)}
                </span>
                <span className="text-[9px] text-muted-foreground">
                  Expenses
                </span>
              </div>
            </div>

            {/* Expense vs income bar */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Expense vs {incomeSource === "total" ? "Total" : incomeSource}{" "}
                  Income
                </span>
                <span
                  className="text-[10px] font-bold tabular-nums"
                  style={{
                    color:
                      expenseRatio > 80
                        ? "oklch(var(--destructive))"
                        : expenseRatio > 60
                          ? "#F97316"
                          : "oklch(var(--accent))",
                  }}
                >
                  {expenseRatio.toFixed(0)}%
                </span>
              </div>
              <div
                className="h-3 rounded-full overflow-hidden"
                style={{ backgroundColor: "oklch(var(--muted))" }}
              >
                <div
                  className="h-full rounded-full transition-smooth"
                  style={{
                    width: `${Math.min(expenseRatio, 100)}%`,
                    background:
                      expenseRatio > 80
                        ? "linear-gradient(90deg, #C0392B 0%, #F95738 100%)"
                        : expenseRatio > 60
                          ? "linear-gradient(90deg, #d97706 0%, #f97316 100%)"
                          : "linear-gradient(90deg, #2D6A4F 0%, #52c788 100%)",
                    boxShadow: "0 0 8px oklch(var(--primary) / 0.3)",
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-[9px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <TrendingDown size={9} /> {formatNaira(avgMonthlyExpenses)}{" "}
                  spent
                </span>
                <span className="flex items-center gap-1">
                  {formatNaira(selectedIncome)} income <TrendingUp size={9} />
                </span>
              </div>
            </div>

            {/* Formula card */}
            <div
              className="flex flex-col gap-2 px-4 py-3.5 rounded-2xl"
              style={{
                background: "oklch(var(--muted) / 0.5)",
                border: "1px solid oklch(var(--border) / 0.5)",
              }}
            >
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                How it's calculated
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-[11px] font-bold px-2.5 py-1 rounded-xl"
                  style={{
                    background: "oklch(var(--accent) / 0.1)",
                    color: "oklch(var(--accent))",
                    border: "1px solid oklch(var(--accent) / 0.2)",
                  }}
                >
                  Total Savings
                </span>
                <span className="text-[11px] font-bold text-muted-foreground">
                  ÷
                </span>
                <span
                  className="text-[11px] font-bold px-2.5 py-1 rounded-xl"
                  style={{
                    background: "oklch(var(--primary) / 0.1)",
                    color: "oklch(var(--primary))",
                    border: "1px solid oklch(var(--primary) / 0.2)",
                  }}
                >
                  Avg Monthly Expenses
                </span>
                <span className="text-[11px] font-bold text-muted-foreground">
                  =
                </span>
                <span
                  className="text-[11px] font-black px-2.5 py-1 rounded-xl"
                  style={{
                    background: isAlert
                      ? "oklch(var(--destructive) / 0.12)"
                      : "oklch(var(--accent) / 0.1)",
                    color: accentColor,
                    border: `1px solid ${isAlert ? "oklch(var(--destructive) / 0.25)" : "oklch(var(--accent) / 0.2)"}`,
                  }}
                >
                  {burnRate.toFixed(2)} months
                </span>
              </div>
              <p className="text-[9px] text-muted-foreground leading-relaxed">
                {formatNaira(totalSavings)} ÷ {formatNaira(avgMonthlyExpenses)}{" "}
                ={" "}
                <span className="font-semibold" style={{ color: accentColor }}>
                  {burnRate.toFixed(2)} months
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function MilestonesPage() {
  const { profiles, goals } = mockData;
  const [activeProfileId, setActiveProfileId] = useState(
    mockData.selectedProfileId,
  );
  const [selectedBadgeIndex, setSelectedBadgeIndex] = useState<number | null>(
    null,
  );
  const activeProfile =
    profiles.find((p) => p.id === activeProfileId) ?? profiles[0];
  const doneCount = roadmapNodes.filter((n) => n.status === "done").length;

  return (
    <div className="flex flex-col gap-5" data-ocid="milestones.page">
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="px-1">
        <h1 className="text-xl font-bold text-foreground">
          Identity &amp; Milestones
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Your financial journey
        </p>
      </div>

      {/* ── Profile hero card ────────────────────────────────────────────── */}
      <div
        data-ocid="milestones.profile_hero.card"
        className="glow-inner rounded-[24px] overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, oklch(var(--primary) / 0.18) 0%, oklch(var(--accent) / 0.08) 100%)",
          border: "1.5px solid oklch(var(--accent) / 0.35)",
          boxShadow:
            "0 0 32px oklch(var(--accent) / 0.2), 0 8px 24px oklch(var(--primary) / 0.15), inset 0 1px 2px rgba(255,255,255,0.12)",
        }}
      >
        <div className="p-5 flex flex-col gap-5">
          {/* Identity top row */}
          <div className="flex items-center gap-4">
            {/* Badge image / icon */}
            <div
              className="relative flex-shrink-0"
              style={{ width: "72px", height: "72px" }}
            >
              {activeProfile.id === "profile-1" ? (
                <img
                  src="/assets/generated/architect-badge.dim_400x400.png"
                  alt="The Architect profile badge"
                  className="w-full h-full rounded-2xl object-cover"
                  style={{
                    boxShadow:
                      "0 0 20px oklch(var(--accent) / 0.5), 0 0 40px oklch(var(--accent) / 0.2)",
                    border: "2px solid oklch(var(--accent) / 0.5)",
                  }}
                />
              ) : (
                <div
                  className="w-full h-full rounded-2xl flex items-center justify-center text-4xl"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(var(--primary) / 0.25) 0%, oklch(var(--accent) / 0.15) 100%)",
                    border: "2px solid oklch(var(--accent) / 0.4)",
                    boxShadow: "0 0 20px oklch(var(--accent) / 0.35)",
                  }}
                >
                  {activeProfile.icon}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold leading-tight text-foreground">
                  {activeProfile.name}
                </h2>
                <span
                  className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{
                    background: "oklch(var(--accent) / 0.15)",
                    color: "oklch(var(--accent))",
                    border: "1px solid oklch(var(--accent) / 0.3)",
                    boxShadow: "0 0 8px oklch(var(--accent) / 0.2)",
                  }}
                >
                  ● Active
                </span>
              </div>
              <p className="text-xs font-medium text-muted-foreground mt-1 leading-snug">
                {activeProfile.tagline}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                {activeProfile.description}
              </p>
            </div>
          </div>

          {/* Profile selector chips */}
          <div data-ocid="milestones.profile_selector">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5">
              Choose your identity
            </p>
            <div
              className="flex gap-2 overflow-x-auto pb-1"
              style={{ scrollbarWidth: "none" }}
            >
              {profiles.map((profile, i) => (
                <ProfileChip
                  key={profile.id}
                  profile={profile}
                  isActive={profile.id === activeProfileId}
                  onClick={() => setActiveProfileId(profile.id)}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Journey roadmap ──────────────────────────────────────────────── */}
      <section data-ocid="milestones.roadmap_section">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-bold text-foreground">Your Journey</h3>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{
              color: "oklch(var(--accent))",
              backgroundColor: "oklch(var(--accent) / 0.1)",
              border: "1px solid oklch(var(--accent) / 0.25)",
            }}
          >
            {doneCount}/{roadmapNodes.length} completed
          </span>
        </div>
        <div className="glass-card glow-inner p-5">
          {roadmapNodes.map((node, i) => (
            <RoadmapNode
              key={node.label}
              node={node}
              index={i}
              isLast={i === roadmapNodes.length - 1}
            />
          ))}
        </div>
      </section>

      {/* ── Long-term goals ──────────────────────────────────────────────── */}
      <section data-ocid="milestones.goals_section">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-bold text-foreground">Long-term Goals</h3>
          <span className="text-xs text-muted-foreground">
            {goals.length} active
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {goals.map((goal, i) => (
            <GoalCard key={goal.id} goal={goal} index={i} />
          ))}
        </div>
      </section>

      {/* ── Achievement badges ───────────────────────────────────────────── */}
      <section data-ocid="milestones.badges_section">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-bold text-foreground">Achievements</h3>
          <span
            className="text-xs font-semibold"
            style={{ color: "oklch(var(--accent))" }}
          >
            {achievementBadges.filter((b) => b.unlocked).length}/
            {achievementBadges.length} unlocked
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {/* Badge dialog */}
          {selectedBadgeIndex !== null && (
            <BadgeDialog
              badge={achievementBadges[selectedBadgeIndex]}
              badgeIndex={selectedBadgeIndex}
              open={selectedBadgeIndex !== null}
              onClose={() => setSelectedBadgeIndex(null)}
            />
          )}
          {achievementBadges.map((badge, i) => (
            <button
              type="button"
              key={badge.label}
              data-ocid={`milestones.badge.item.${i + 1}`}
              onClick={() => setSelectedBadgeIndex(i)}
              className="relative flex flex-col items-center gap-2 p-4 rounded-[20px] text-center overflow-hidden transition-smooth hover:scale-[1.04] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2"
              style={{
                WebkitTapHighlightColor: "transparent",
                background: badge.unlocked
                  ? badge.gradient
                  : "oklch(var(--muted) / 0.5)",
                border: badge.unlocked
                  ? "1.5px solid rgba(255,255,255,0.15)"
                  : "1.5px solid oklch(var(--border) / 0.5)",
                boxShadow: badge.unlocked
                  ? "0 4px 16px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.2)"
                  : "none",
                opacity: badge.unlocked ? 1 : 0.55,
                filter: badge.unlocked ? "none" : "grayscale(1)",
              }}
            >
              {/* Icon circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{
                  background: badge.unlocked
                    ? "rgba(255,255,255,0.15)"
                    : "oklch(var(--muted))",
                  boxShadow: badge.unlocked
                    ? "0 0 12px rgba(255,255,255,0.2)"
                    : "none",
                }}
              >
                {badge.icon}
              </div>
              <div className="min-w-0 w-full">
                <p
                  className="text-[10px] font-bold leading-tight"
                  style={{
                    color: badge.unlocked
                      ? "rgba(255,255,255,0.95)"
                      : "oklch(var(--muted-foreground))",
                  }}
                >
                  {badge.label}
                </p>
                <p
                  className="text-[9px] mt-0.5"
                  style={{
                    color: badge.unlocked
                      ? "rgba(255,255,255,0.6)"
                      : "oklch(var(--muted-foreground))",
                  }}
                >
                  {badge.sublabel}
                </p>
              </div>
              {/* Lock overlay for locked badges */}
              {!badge.unlocked && (
                <div
                  className="absolute inset-0 flex items-start justify-end p-2 rounded-[20px]"
                  style={{ pointerEvents: "none" }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: "oklch(var(--border))",
                      border: "1px solid oklch(var(--muted-foreground) / 0.4)",
                    }}
                  >
                    <Lock
                      size={10}
                      style={{ color: "oklch(var(--muted-foreground))" }}
                    />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ── Burn Rate Analysis ────────────────────────────────────────── */}
      <BurnRateSection />

      {/* Bottom spacer */}
      <div className="h-4" />
    </div>
  );
}
