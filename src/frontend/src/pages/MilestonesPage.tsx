import { formatNaira, mockData } from "@/data/mockData";
import type { FinancialGoal, FinancialProfile } from "@/data/mockData";
import { CheckCircle2, Lock, Star, Zap } from "lucide-react";
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

function GoalCard({ goal, index }: { goal: FinancialGoal; index: number }) {
  const remaining = goal.targetAmount - goal.currentAmount;
  const isHighProgress = goal.progressPercent >= 60;
  const gradientFill = isHighProgress
    ? "linear-gradient(90deg, #2D6A4F 0%, #52c788 100%)"
    : "linear-gradient(90deg, #1A2B4C 0%, #3a6bc9 100%)";

  return (
    <div
      data-ocid={`milestones.goal.item.${index + 1}`}
      className="glass-card glow-inner p-5 flex flex-col gap-4"
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
            {formatNaira(remaining)} to go · Keep the momentum
          </span>
        </div>
      </div>
    </div>
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

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function MilestonesPage() {
  const { profiles, goals } = mockData;
  const [activeProfileId, setActiveProfileId] = useState(
    mockData.selectedProfileId,
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
          {achievementBadges.map((badge, i) => (
            <div
              key={badge.label}
              data-ocid={`milestones.badge.item.${i + 1}`}
              className="relative flex flex-col items-center gap-2 p-4 rounded-[20px] text-center overflow-hidden"
              style={{
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
            </div>
          ))}
        </div>
      </section>

      {/* Bottom spacer */}
      <div className="h-4" />
    </div>
  );
}
