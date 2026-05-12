import { c as createLucideIcon, r as reactExports, m as mockData, j as jsxRuntimeExports, f as formatNaira } from "./index-DPcbY0g3.js";
import { Z as Zap } from "./zap-EahPen9b.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
const roadmapNodes = [
  { label: "Where You Started", sublabel: "Jan 2023", status: "done" },
  {
    label: "Emergency Fund Built",
    sublabel: "₦500K saved",
    status: "done"
  },
  {
    label: "Investment Portfolio",
    sublabel: "3 active funds",
    status: "done"
  },
  {
    label: "Current Position",
    sublabel: "You are here",
    status: "current"
  },
  {
    label: "Dream Destination",
    sublabel: "Financial Freedom",
    status: "future"
  }
];
const achievementBadges = [
  {
    icon: "💰",
    label: "First ₦1M Saved",
    sublabel: "Milestone",
    unlocked: true,
    gradient: "linear-gradient(135deg, #2D6A4F 0%, #1A2B4C 100%)"
  },
  {
    icon: "🔥",
    label: "3-Month Streak",
    sublabel: "Discipline",
    unlocked: true,
    gradient: "linear-gradient(135deg, #F95738 0%, #C0392B 100%)"
  },
  {
    icon: "📊",
    label: "Budget Master",
    sublabel: "Control",
    unlocked: true,
    gradient: "linear-gradient(135deg, #1A2B4C 0%, #2D6A4F 100%)"
  },
  {
    icon: "🏡",
    label: "Property Owner",
    sublabel: "Wealth",
    unlocked: false,
    gradient: ""
  },
  {
    icon: "💳",
    label: "Debt Free",
    sublabel: "Freedom",
    unlocked: false,
    gradient: ""
  },
  {
    icon: "💎",
    label: "₦10M Club",
    sublabel: "Elite",
    unlocked: false,
    gradient: ""
  }
];
function ProfileChip({
  profile,
  isActive,
  onClick,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": `milestones.profile.item.${index + 1}`,
      onClick,
      className: "flex flex-col items-center gap-1 px-3 py-2.5 rounded-2xl flex-shrink-0 transition-smooth",
      style: {
        minWidth: "62px",
        background: isActive ? "linear-gradient(135deg, oklch(var(--primary) / 0.25), oklch(var(--accent) / 0.15))" : "oklch(var(--card) / 0.5)",
        border: `1.5px solid ${isActive ? "oklch(var(--accent))" : "oklch(var(--border) / 0.6)"}`,
        boxShadow: isActive ? "0 0 14px oklch(var(--accent) / 0.35), inset 0 1px 3px rgba(255,255,255,0.1)" : "none"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl leading-none", children: profile.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-[9px] font-bold leading-tight text-center",
            style: {
              color: isActive ? "oklch(var(--accent))" : "oklch(var(--muted-foreground))"
            },
            children: profile.name.replace("The ", "")
          }
        )
      ]
    }
  );
}
function GoalCard({ goal, index }) {
  const remaining = goal.targetAmount - goal.currentAmount;
  const isHighProgress = goal.progressPercent >= 60;
  const gradientFill = isHighProgress ? "linear-gradient(90deg, #2D6A4F 0%, #52c788 100%)" : "linear-gradient(90deg, #1A2B4C 0%, #3a6bc9 100%)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `milestones.goal.item.${index + 1}`,
      className: "glass-card glow-inner p-5 flex flex-col gap-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-11 h-11 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0",
                style: {
                  background: isHighProgress ? "linear-gradient(135deg, oklch(var(--accent) / 0.2), oklch(var(--accent) / 0.05))" : "linear-gradient(135deg, oklch(var(--primary) / 0.2), oklch(var(--primary) / 0.05))",
                  border: `1.5px solid ${isHighProgress ? "oklch(var(--accent) / 0.4)" : "oklch(var(--primary) / 0.3)"}`
                },
                children: goal.icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground leading-tight", children: goal.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
                "Target: ",
                goal.targetDate
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full",
              style: {
                background: isHighProgress ? "oklch(var(--accent) / 0.12)" : "oklch(var(--primary) / 0.12)",
                border: `1px solid ${isHighProgress ? "oklch(var(--accent) / 0.3)" : "oklch(var(--primary) / 0.3)"}`
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    size: 10,
                    style: {
                      color: isHighProgress ? "oklch(var(--accent))" : "oklch(var(--primary))"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-xs font-bold",
                    style: {
                      color: isHighProgress ? "oklch(var(--accent))" : "oklch(var(--primary))"
                    },
                    children: [
                      goal.progressPercent,
                      "%"
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-3 rounded-full overflow-hidden",
              style: { backgroundColor: "oklch(var(--muted))" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full rounded-full transition-smooth",
                  style: {
                    width: `${goal.progressPercent}%`,
                    background: gradientFill,
                    boxShadow: isHighProgress ? "0 0 10px oklch(var(--accent) / 0.5)" : "0 0 10px oklch(var(--primary) / 0.4)"
                  }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-[11px] font-semibold",
                style: {
                  color: isHighProgress ? "oklch(var(--accent))" : "oklch(var(--primary))"
                },
                children: [
                  formatNaira(goal.currentAmount),
                  " saved"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
              formatNaira(goal.targetAmount),
              " goal"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl",
              style: { backgroundColor: "oklch(var(--muted) / 0.7)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 10, className: "text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground font-medium", children: [
                  formatNaira(remaining),
                  " to go · Keep the momentum"
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function RoadmapNode({
  node,
  index: _index,
  isLast
}) {
  const isDone = node.status === "done";
  const isCurrent = node.status === "current";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-stretch gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center",
        style: { width: "32px", flexShrink: 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
              style: {
                background: isDone ? "linear-gradient(135deg, #2D6A4F, #52c788)" : isCurrent ? "linear-gradient(135deg, #1A2B4C, #3a6bc9)" : "oklch(var(--muted))",
                border: isCurrent ? "2px solid oklch(var(--primary))" : "2px solid transparent",
                boxShadow: isCurrent ? "0 0 16px oklch(var(--primary) / 0.6), 0 0 32px oklch(var(--primary) / 0.25)" : "none"
              },
              children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 14, color: "white" }) : isCurrent ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-2.5 h-2.5 rounded-full",
                  style: {
                    backgroundColor: "white",
                    boxShadow: "0 0 6px rgba(255,255,255,0.8)",
                    animation: "pulse 2s infinite"
                  }
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                Lock,
                {
                  size: 11,
                  style: { color: "oklch(var(--muted-foreground))" }
                }
              )
            }
          ),
          !isLast && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-0.5 flex-1",
              style: {
                minHeight: "20px",
                background: isDone ? "linear-gradient(180deg, oklch(var(--accent)) 0%, oklch(var(--primary) / 0.5) 100%)" : "oklch(var(--border))",
                marginTop: "2px"
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 pb-4 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-sm font-bold leading-tight",
          style: {
            color: isDone ? "oklch(var(--foreground))" : isCurrent ? "oklch(var(--primary))" : "oklch(var(--muted-foreground))"
          },
          children: node.label
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: node.sublabel }),
      isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold",
          style: {
            backgroundColor: "oklch(var(--primary) / 0.15)",
            color: "oklch(var(--primary))",
            border: "1px solid oklch(var(--primary) / 0.25)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-1.5 h-1.5 rounded-full",
                style: {
                  backgroundColor: "oklch(var(--primary))",
                  animation: "pulse 2s infinite"
                }
              }
            ),
            "Active"
          ]
        }
      ),
      node.status === "future" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground italic mt-0.5 block", children: "Unlock by reaching your goals" })
    ] }),
    isDone && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex-shrink-0 self-start mt-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold",
        style: {
          backgroundColor: "oklch(var(--accent) / 0.12)",
          color: "oklch(var(--accent))",
          border: "1px solid oklch(var(--accent) / 0.25)"
        },
        children: "✓ Done"
      }
    )
  ] });
}
function MilestonesPage() {
  const { profiles, goals } = mockData;
  const [activeProfileId, setActiveProfileId] = reactExports.useState(
    mockData.selectedProfileId
  );
  const activeProfile = profiles.find((p) => p.id === activeProfileId) ?? profiles[0];
  const doneCount = roadmapNodes.filter((n) => n.status === "done").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", "data-ocid": "milestones.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Identity & Milestones" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Your financial journey" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "milestones.profile_hero.card",
        className: "glow-inner rounded-[24px] overflow-hidden",
        style: {
          background: "linear-gradient(145deg, oklch(var(--primary) / 0.18) 0%, oklch(var(--accent) / 0.08) 100%)",
          border: "1.5px solid oklch(var(--accent) / 0.35)",
          boxShadow: "0 0 32px oklch(var(--accent) / 0.2), 0 8px 24px oklch(var(--primary) / 0.15), inset 0 1px 2px rgba(255,255,255,0.12)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "relative flex-shrink-0",
                style: { width: "72px", height: "72px" },
                children: activeProfile.id === "profile-1" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "/assets/generated/architect-badge.dim_400x400.png",
                    alt: "The Architect profile badge",
                    className: "w-full h-full rounded-2xl object-cover",
                    style: {
                      boxShadow: "0 0 20px oklch(var(--accent) / 0.5), 0 0 40px oklch(var(--accent) / 0.2)",
                      border: "2px solid oklch(var(--accent) / 0.5)"
                    }
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-full h-full rounded-2xl flex items-center justify-center text-4xl",
                    style: {
                      background: "linear-gradient(135deg, oklch(var(--primary) / 0.25) 0%, oklch(var(--accent) / 0.15) 100%)",
                      border: "2px solid oklch(var(--accent) / 0.4)",
                      boxShadow: "0 0 20px oklch(var(--accent) / 0.35)"
                    },
                    children: activeProfile.icon
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold leading-tight text-foreground", children: activeProfile.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0",
                    style: {
                      background: "oklch(var(--accent) / 0.15)",
                      color: "oklch(var(--accent))",
                      border: "1px solid oklch(var(--accent) / 0.3)",
                      boxShadow: "0 0 8px oklch(var(--accent) / 0.2)"
                    },
                    children: "● Active"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mt-1 leading-snug", children: activeProfile.tagline }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed", children: activeProfile.description })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "milestones.profile_selector", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5", children: "Choose your identity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex gap-2 overflow-x-auto pb-1",
                style: { scrollbarWidth: "none" },
                children: profiles.map((profile, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ProfileChip,
                  {
                    profile,
                    isActive: profile.id === activeProfileId,
                    onClick: () => setActiveProfileId(profile.id),
                    index: i
                  },
                  profile.id
                ))
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "milestones.roadmap_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3 px-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-foreground", children: "Your Journey" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "text-xs font-bold px-2 py-0.5 rounded-full",
            style: {
              color: "oklch(var(--accent))",
              backgroundColor: "oklch(var(--accent) / 0.1)",
              border: "1px solid oklch(var(--accent) / 0.25)"
            },
            children: [
              doneCount,
              "/",
              roadmapNodes.length,
              " completed"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card glow-inner p-5", children: roadmapNodes.map((node, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        RoadmapNode,
        {
          node,
          index: i,
          isLast: i === roadmapNodes.length - 1
        },
        node.label
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "milestones.goals_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3 px-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-foreground", children: "Long-term Goals" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          goals.length,
          " active"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: goals.map((goal, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(GoalCard, { goal, index: i }, goal.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "milestones.badges_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3 px-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-foreground", children: "Achievements" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "text-xs font-semibold",
            style: { color: "oklch(var(--accent))" },
            children: [
              achievementBadges.filter((b) => b.unlocked).length,
              "/",
              achievementBadges.length,
              " unlocked"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: achievementBadges.map((badge, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `milestones.badge.item.${i + 1}`,
          className: "relative flex flex-col items-center gap-2 p-4 rounded-[20px] text-center overflow-hidden",
          style: {
            background: badge.unlocked ? badge.gradient : "oklch(var(--muted) / 0.5)",
            border: badge.unlocked ? "1.5px solid rgba(255,255,255,0.15)" : "1.5px solid oklch(var(--border) / 0.5)",
            boxShadow: badge.unlocked ? "0 4px 16px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.2)" : "none",
            opacity: badge.unlocked ? 1 : 0.55,
            filter: badge.unlocked ? "none" : "grayscale(1)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-12 h-12 rounded-full flex items-center justify-center text-2xl",
                style: {
                  background: badge.unlocked ? "rgba(255,255,255,0.15)" : "oklch(var(--muted))",
                  boxShadow: badge.unlocked ? "0 0 12px rgba(255,255,255,0.2)" : "none"
                },
                children: badge.icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[10px] font-bold leading-tight",
                  style: {
                    color: badge.unlocked ? "rgba(255,255,255,0.95)" : "oklch(var(--muted-foreground))"
                  },
                  children: badge.label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[9px] mt-0.5",
                  style: {
                    color: badge.unlocked ? "rgba(255,255,255,0.6)" : "oklch(var(--muted-foreground))"
                  },
                  children: badge.sublabel
                }
              )
            ] }),
            !badge.unlocked && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0 flex items-start justify-end p-2 rounded-[20px]",
                style: { pointerEvents: "none" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-5 h-5 rounded-full flex items-center justify-center",
                    style: {
                      backgroundColor: "oklch(var(--border))",
                      border: "1px solid oklch(var(--muted-foreground) / 0.4)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Lock,
                      {
                        size: 10,
                        style: { color: "oklch(var(--muted-foreground))" }
                      }
                    )
                  }
                )
              }
            )
          ]
        },
        badge.label
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4" })
  ] });
}
export {
  MilestonesPage as default
};
