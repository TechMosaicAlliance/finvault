import { mockData } from "@/data/mockData";
import { Link, useRouterState } from "@tanstack/react-router";
import { BarChart3, CreditCard, LayoutDashboard, User } from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { to: "/", label: "Overview", icon: LayoutDashboard, ocid: "nav.overview" },
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

export function Layout({ children }: LayoutProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const isAlert = mockData.burnRate < 1;

  return (
    <div
      className={`min-h-screen flex justify-center ${isAlert ? "theme-alert" : "theme-calm"}`}
      style={{ backgroundColor: "oklch(var(--background))" }}
    >
      <div className="w-full max-w-[430px] min-h-screen flex flex-col relative">
        {/* Header */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-5 py-4 bg-card/80 backdrop-blur-md border-b border-border/50">
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
          {isAlert && (
            <span className="text-xs font-semibold text-destructive bg-destructive/10 border border-destructive/30 px-2.5 py-1 rounded-full animate-pulse">
              ⚠️ Low Reserves
            </span>
          )}
          {!isAlert && (
            <span className="text-xs font-medium text-accent bg-accent/10 border border-accent/30 px-2.5 py-1 rounded-full">
              ✓ Healthy
            </span>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50">
          <div className="bg-card/90 backdrop-blur-xl border-t border-border/50 px-2 pb-safe">
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
                    className="flex flex-col items-center gap-1 min-w-[60px] py-1 px-2 relative transition-smooth"
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
                      className="text-[10px] font-semibold transition-smooth"
                      style={{
                        color: isActive
                          ? "oklch(var(--accent))"
                          : "oklch(var(--muted-foreground))",
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
