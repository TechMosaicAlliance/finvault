import { mockData } from "@/data/mockData";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  Receipt,
  Search,
  Settings,
  User,
} from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { to: "/", label: "Overview", icon: LayoutDashboard, ocid: "nav.overview" },
  {
    to: "/transactions",
    label: "Transactions",
    icon: Receipt,
    ocid: "nav.transactions",
  },
  {
    to: "/analytics",
    label: "Analytics",
    icon: BarChart3,
    ocid: "nav.analytics",
  },
  {
    to: "/accounts",
    label: "Accounts",
    icon: CreditCard,
    ocid: "nav.accounts",
  },
  { to: "/milestones", label: "Identity", icon: User, ocid: "nav.identity" },
];

interface LayoutProps {
  children: ReactNode;
}

function getAvatarGlow(burnRate: number): {
  boxShadow: string;
  borderColor: string;
} {
  if (burnRate > 3) {
    return {
      borderColor: "oklch(0.65 0.2 142)",
      boxShadow:
        "0 0 0 2px oklch(0.65 0.2 142), 0 0 10px 3px oklch(0.65 0.2 142 / 0.45), 0 0 20px 6px oklch(0.65 0.2 142 / 0.2)",
    };
  }
  if (burnRate >= 1) {
    return {
      borderColor: "oklch(0.70 0.18 45)",
      boxShadow:
        "0 0 0 2px oklch(0.70 0.18 45), 0 0 10px 3px oklch(0.70 0.18 45 / 0.45), 0 0 20px 6px oklch(0.70 0.18 45 / 0.2)",
    };
  }
  return {
    borderColor: "oklch(0.60 0.25 25)",
    boxShadow:
      "0 0 0 2px oklch(0.60 0.25 25), 0 0 10px 3px oklch(0.60 0.25 25 / 0.5), 0 0 24px 8px oklch(0.60 0.25 25 / 0.25)",
  };
}

export function Layout({ children }: LayoutProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const navigate = useNavigate();
  const isAlert = mockData.burnRate < 1;
  const avatarGlow = getAvatarGlow(mockData.burnRate);

  return (
    <div
      className={`min-h-screen flex justify-center ${isAlert ? "theme-alert" : "theme-calm"}`}
      style={{ backgroundColor: "oklch(var(--background))" }}
    >
      <div className="w-full max-w-[430px] min-h-screen flex flex-col relative">
        {/* Header */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-5 py-3.5 bg-card/80 backdrop-blur-md border-b border-border/50">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-md">
              <span className="text-primary-foreground text-sm font-bold">
                F
              </span>
            </div>
            <span className="text-foreground font-display font-bold text-lg tracking-tight">
              FinVault
            </span>
          </div>

          {/* Right-side actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              type="button"
              data-ocid="header.search_button"
              onClick={() => {}}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-muted/40"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.8} />
            </button>

            {/* Settings */}
            <button
              type="button"
              data-ocid="header.settings_button"
              onClick={() => navigate({ to: "/settings" })}
              className="p-2 rounded-full transition-colors duration-200"
              style={{
                color:
                  currentPath === "/settings"
                    ? "oklch(var(--accent))"
                    : "oklch(var(--muted-foreground))",
                background:
                  currentPath === "/settings"
                    ? "oklch(var(--accent) / 0.12)"
                    : "transparent",
              }}
              aria-label="Settings"
            >
              <Settings
                size={20}
                strokeWidth={1.8}
                style={{
                  filter:
                    currentPath === "/settings"
                      ? "drop-shadow(0 0 5px oklch(var(--accent) / 0.5))"
                      : "none",
                }}
              />
            </button>

            {/* Identity + Health Avatar */}
            <button
              type="button"
              data-ocid="header.identity_button"
              onClick={() => navigate({ to: "/milestones" })}
              className="w-9 h-9 rounded-full flex items-center justify-center ml-1 transition-all duration-300"
              style={{
                background: "oklch(var(--card))",
                border: `2px solid ${avatarGlow.borderColor}`,
                boxShadow: avatarGlow.boxShadow,
              }}
              aria-label="Identity & Health"
            >
              <User
                size={18}
                strokeWidth={2}
                style={{ color: avatarGlow.borderColor }}
              />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50">
          <div
            className="border-t border-border/50 px-2 pb-safe"
            style={{
              background: "oklch(var(--card) / 0.80)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <div className="flex items-end justify-around py-2">
              {navItems.map((item) => {
                const isActive =
                  item.to === "/"
                    ? currentPath === "/"
                    : currentPath.startsWith(item.to);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    data-ocid={item.ocid}
                    className="flex flex-col items-center gap-1 min-w-[48px] py-1 px-2 relative transition-smooth"
                  >
                    {/* Active glow dot */}
                    {isActive && (
                      <span
                        className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor: "oklch(var(--accent))",
                          boxShadow: "0 0 8px 2px oklch(var(--accent) / 0.6)",
                        }}
                      />
                    )}
                    <Icon
                      size={22}
                      strokeWidth={isActive ? 2.5 : 1.8}
                      className="transition-smooth"
                      style={{
                        color: isActive
                          ? "oklch(var(--accent))"
                          : "oklch(var(--muted-foreground))",
                        filter: isActive
                          ? "drop-shadow(0 0 6px oklch(var(--accent) / 0.5))"
                          : "none",
                      }}
                    />
                    <span
                      className="text-[11px] font-bold transition-smooth"
                      style={{
                        color: isActive
                          ? "oklch(var(--accent))"
                          : "oklch(var(--foreground) / 0.65)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
