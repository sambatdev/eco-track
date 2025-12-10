import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { WeatherAlerts } from "@/components/disaster-resilience/weather-alerts"
import { RiskMap } from "@/components/disaster-resilience/risk-map"
import { PreparationChecklist } from "@/components/disaster-resilience/preparation-checklist"
import { ScenarioSimulator } from "@/components/disaster-resilience/scenario-simulator"
import { CommunityForum } from "@/components/disaster-resilience/community-forum"

export default function DisasterResiliencePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Disaster Resilience</h1>
          <p className="text-muted-foreground mt-1">
            Stay prepared for extreme weather events with real-time alerts and planning tools.
          </p>
        </div>

        {/* Weather Alerts - Full width banner */}
        <WeatherAlerts />

        {/* Map and Checklist */}
        <div className="grid gap-8 lg:grid-cols-2">
          <RiskMap />
          <PreparationChecklist />
        </div>

        {/* Scenario Simulator and Community */}
        <div className="grid gap-8 lg:grid-cols-2">
          <ScenarioSimulator />
          <CommunityForum />
        </div>
      </div>
    </DashboardLayout>
  )
}
