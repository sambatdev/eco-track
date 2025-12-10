"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Map, Layers, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"

const riskZones = [
  { id: 1, name: "San Francisco", risk: "high", type: "earthquake", lat: 37.77, lng: -122.42 },
  { id: 2, name: "Miami", risk: "critical", type: "hurricane", lat: 25.76, lng: -80.19 },
  { id: 3, name: "Los Angeles", risk: "high", type: "wildfire", lat: 34.05, lng: -118.24 },
  { id: 4, name: "New Orleans", risk: "high", type: "flood", lat: 29.95, lng: -90.07 },
  { id: 5, name: "Phoenix", risk: "medium", type: "heat", lat: 33.45, lng: -112.07 },
  { id: 6, name: "Seattle", risk: "low", type: "earthquake", lat: 47.61, lng: -122.33 },
]

const riskColors = {
  low: "bg-chart-2",
  medium: "bg-chart-4",
  high: "bg-chart-5",
  critical: "bg-destructive",
}

export function RiskMap() {
  const [selectedLayer, setSelectedLayer] = useState("all")
  const [zoom, setZoom] = useState(1)

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5 text-accent" />
              Global Risk Map
            </CardTitle>
            <CardDescription>Interactive map showing climate risk zones</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedLayer} onValueChange={setSelectedLayer}>
              <SelectTrigger className="w-40">
                <Layers className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Hazards</SelectItem>
                <SelectItem value="flood">Floods</SelectItem>
                <SelectItem value="wildfire">Wildfires</SelectItem>
                <SelectItem value="hurricane">Hurricanes</SelectItem>
                <SelectItem value="earthquake">Earthquakes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Simulated map area */}
        <div
          className="relative w-full h-[400px] rounded-xl bg-gradient-to-br from-accent/5 to-chart-2/5 border overflow-hidden"
          style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}
        >
          {/* World map placeholder with CSS */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <path
                d="M150,120 Q200,100 250,120 T350,110 T450,130 T550,115 T650,125 L650,200 Q600,210 550,200 T450,210 T350,195 T250,205 T150,190 Z"
                fill="currentColor"
                className="text-muted-foreground"
              />
              <path
                d="M100,230 Q150,220 200,235 T300,225 T400,240 T500,230 L500,280 Q450,290 400,280 T300,290 T200,275 T100,285 Z"
                fill="currentColor"
                className="text-muted-foreground"
              />
              <path
                d="M520,220 Q560,210 600,225 T680,215 L680,260 Q640,270 600,260 T520,265 Z"
                fill="currentColor"
                className="text-muted-foreground"
              />
            </svg>
          </div>

          {/* Risk zone markers */}
          {riskZones
            .filter((zone) => selectedLayer === "all" || zone.type === selectedLayer)
            .map((zone) => (
              <div
                key={zone.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${((zone.lng + 180) / 360) * 100}%`,
                  top: `${((90 - zone.lat) / 180) * 100}%`,
                }}
              >
                <div
                  className={`w-4 h-4 rounded-full ${riskColors[zone.risk as keyof typeof riskColors]} animate-pulse`}
                />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-popover border rounded-lg shadow-lg p-2 whitespace-nowrap">
                    <p className="font-medium text-sm text-popover-foreground">{zone.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {zone.type} - {zone.risk} risk
                    </p>
                  </div>
                </div>
              </div>
            ))}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border shadow-lg">
            <p className="text-xs font-medium mb-2 text-card-foreground">Risk Level</p>
            <div className="flex flex-col gap-1">
              {Object.entries(riskColors).map(([level, color]) => (
                <div key={level} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${color}`} />
                  <span className="text-xs capitalize text-card-foreground">{level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Zoom controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-1">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8"
              onClick={() => setZoom((z) => Math.min(z + 0.2, 2))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8"
              onClick={() => setZoom((z) => Math.max(z - 0.2, 0.6))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Active zones list */}
        <div className="mt-4 flex flex-wrap gap-2">
          {riskZones
            .filter((zone) => selectedLayer === "all" || zone.type === selectedLayer)
            .map((zone) => (
              <Badge
                key={zone.id}
                variant="outline"
                className={`${
                  zone.risk === "critical"
                    ? "border-destructive text-destructive"
                    : zone.risk === "high"
                      ? "border-chart-5 text-chart-5"
                      : zone.risk === "medium"
                        ? "border-chart-4 text-chart-4"
                        : "border-chart-2 text-chart-2"
                }`}
              >
                {zone.name}
              </Badge>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
