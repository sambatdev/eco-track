import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { EmissionsChart } from "@/components/dashboard/emissions-chart"
import { SourcesChart } from "@/components/dashboard/sources-chart"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  // Mock user data - in production, this would come from auth
  const user = {
    name: "Alex",
    accountType: "personal", // or "corporate"
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back, {user.name}</h1>
          <p className="text-muted-foreground mt-1">
            Here's an overview of your environmental impact and opportunities.
          </p>
        </div>

        {/* Stats */}
        <StatsCards />

        {/* Charts and Actions */}
        <div className="grid gap-6 lg:grid-cols-3">
          <EmissionsChart />
          <div className="space-y-6">
            <SourcesChart />
            <QuickActions />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
