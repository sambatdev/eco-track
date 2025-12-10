"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Waves, Thermometer, Wind, Building2 } from "lucide-react"

export function ScenarioSimulator() {
  const [seaLevel, setSeaLevel] = useState(0.5)
  const [tempIncrease, setTempIncrease] = useState(1.5)
  const [stormIntensity, setStormIntensity] = useState(20)

  // Calculate impacts based on scenario
  const populationAffected = Math.round(seaLevel * 200 + tempIncrease * 50 + stormIntensity * 2)
  const economicImpact = Math.round(seaLevel * 500 + tempIncrease * 200 + stormIntensity * 10)
  const infrastructureRisk = Math.min(100, Math.round(seaLevel * 30 + tempIncrease * 20 + stormIntensity * 0.5))

  const getRiskLevel = (value: number) => {
    if (value < 30) return { label: "Low", color: "bg-chart-2/10 text-chart-2" }
    if (value < 60) return { label: "Medium", color: "bg-chart-4/10 text-chart-4" }
    if (value < 80) return { label: "High", color: "bg-chart-5/10 text-chart-5" }
    return { label: "Critical", color: "bg-destructive/10 text-destructive" }
  }

  const risk = getRiskLevel(infrastructureRisk)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-chart-2" />
          Climate Scenario Simulator
        </CardTitle>
        <CardDescription>Model potential climate impacts on your region</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Sliders */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="flex items-center gap-2">
                <Waves className="h-4 w-4 text-accent" />
                Sea Level Rise (meters)
              </Label>
              <span className="font-medium">{seaLevel.toFixed(1)}m</span>
            </div>
            <Slider value={[seaLevel]} onValueChange={([v]) => setSeaLevel(v)} min={0} max={3} step={0.1} />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Current</span>
              <span>+3m (Worst case 2100)</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-chart-5" />
                Temperature Increase (°C)
              </Label>
              <span className="font-medium">+{tempIncrease.toFixed(1)}°C</span>
            </div>
            <Slider value={[tempIncrease]} onValueChange={([v]) => setTempIncrease(v)} min={0.5} max={4} step={0.1} />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Paris Target (1.5°C)</span>
              <span>+4°C (High emissions)</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-chart-4" />
                Storm Intensity Increase (%)
              </Label>
              <span className="font-medium">+{stormIntensity}%</span>
            </div>
            <Slider value={[stormIntensity]} onValueChange={([v]) => setStormIntensity(v)} min={0} max={50} step={5} />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Baseline</span>
              <span>+50% intensity</span>
            </div>
          </div>
        </div>

        {/* Impact Results */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Projected Impacts</h4>
            <Badge className={risk.color}>{risk.label} Risk</Badge>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-3 rounded-lg bg-background">
              <p className="text-xs text-muted-foreground mb-1">Population Affected</p>
              <p className="text-xl font-bold text-foreground">{populationAffected}M</p>
            </div>
            <div className="p-3 rounded-lg bg-background">
              <p className="text-xs text-muted-foreground mb-1">Economic Impact</p>
              <p className="text-xl font-bold text-foreground">${economicImpact}B</p>
            </div>
            <div className="p-3 rounded-lg bg-background">
              <p className="text-xs text-muted-foreground mb-1">Infrastructure Risk</p>
              <p className="text-xl font-bold text-foreground">{infrastructureRisk}%</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            * Projections based on simplified models. Consult official climate reports for detailed analysis.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
