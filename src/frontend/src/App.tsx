import { Layout } from "@/components/Layout";
import { mockData } from "@/data/mockData";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const OverviewPage = lazy(() => import("@/pages/OverviewPage"));
const AnalyticsPage = lazy(() => import("@/pages/AnalyticsPage"));
const AccountsPage = lazy(() => import("@/pages/AccountsPage"));
const MilestonesPage = lazy(() => import("@/pages/MilestonesPage"));

function AppShell() {
  const isAlert = mockData.burnRate < 1;
  return (
    <div className={isAlert ? "theme-alert" : "theme-calm"}>
      <Layout>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-40">
              <div
                className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: "oklch(var(--accent))" }}
              />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </Layout>
    </div>
  );
}

const rootRoute = createRootRoute({ component: AppShell });

const overviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: OverviewPage,
});

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analytics",
  component: AnalyticsPage,
});

const accountsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/accounts",
  component: AccountsPage,
});

const milestonesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/milestones",
  component: MilestonesPage,
});

const routeTree = rootRoute.addChildren([
  overviewRoute,
  analyticsRoute,
  accountsRoute,
  milestonesRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
