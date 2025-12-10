"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CloudRain, Flame, Snowflake, Waves, Bell, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface WeatherAlert {
  id: string
  type: "flood" | "wildfire" | "storm" | "heat" | "cold" | "tsunami"
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  location: string
  validUntil: string
}

const mockAlerts: WeatherAlert[] = [
  {
    id: "1",
    type: "flood",
    severity: "high",
    title: "Flash Flood Warning",
    description: "Heavy rainfall expected. Low-lying areas may experience flooding within 6 hours.",
    location: "San Francisco Bay Area",
    validUntil: "Dec 11, 2025 6:00 PM",
  },
  {
    id: "2",
    type: "storm",
    severity: "medium",
    title: "Severe Thunderstorm Watch",
    description: "Conditions favorable for severe thunderstorms with possible hail and damaging winds.",
    location: "Central California",
    validUntil: "Dec 10, 2025 11:00 PM",
  },
  {
    id: "3",
    type: "wildfire",
    severity: "critical",
    title: "Red Flag Warning",
    description: "Critical fire weather conditions. Any fires that develop will likely spread rapidly.",
    location: "Los Angeles County",
    validUntil: "Dec 12, 2025 8:00 AM",
  },
]

const alertIcons = {
  flood: Waves,
  wildfire: Flame,
  storm: CloudRain,
  heat: Flame,
  cold: Snowflake,
  tsunami: Waves,
}

const severityColors = {
  low: "bg-chart-2/10 text-chart-2 border-chart-2/30",
  medium: "bg-chart-4/10 text-chart-4 border-chart-4/30",
  high: "bg-chart-5/10 text-chart-5 border-chart-5/30",
  critical: "bg-destructive/10 text-destructive border-destructive/30",
}

const severityBadgeColors = {
  low: "bg-chart-2/10 text-chart-2",
  medium: "bg-chart-4/10 text-chart-4",
  high: "bg-chart-5/10 text-chart-5",
  critical: "bg-destructive/10 text-destructive",
}

export function WeatherAlerts() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-chart-5" />
              Active Weather Alerts
            </CardTitle>
            <CardDescription>Real-time alerts for your region</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Bell className="h-4 w-4" />
            Manage Alerts
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockAlerts.map((alert) => {
          const Icon = alertIcons[alert.type]
          return (
            <div key={alert.id} className={cn("p-4 rounded-lg border-2", severityColors[alert.severity])}>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-background">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold">{alert.title}</h3>
                    <Badge className={severityBadgeColors[alert.severity]}>{alert.severity.toUpperCase()}</Badge>
                  </div>
                  <p className="text-sm opacity-80 mb-2">{alert.description}</p>
                  <div className="flex items-center gap-4 text-xs opacity-70">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {alert.location}
                    </span>
                    <span>Valid until: {alert.validUntil}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
