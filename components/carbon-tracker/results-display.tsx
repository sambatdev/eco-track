"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Leaf, TrendingDown, Target } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResultsDisplayProps {
  co2: number
}

export function ResultsDisplay({ co2 }: ResultsDisplayProps) {
  const averageUS = 16 // Average US carbon footprint in tons
  const target = 2 // Paris Agreement target
  const percentOfAverage = (co2 / averageUS) * 100
  const percentOfTarget = Math.min((co2 / target) * 100, 100)

  const getScoreColor = () => {
    if (co2 <= 4) return "text-primary"
    if (co2 <= 8) return "text-chart-2"
    if (co2 <= 12) return "text-chart-4"
    return "text-destructive"
  }

  const getScoreLabel = () => {
    if (co2 <= 4) return "Excellent"
    if (co2 <= 8) return "Good"
    if (co2 <= 12) return "Average"
    return "High Impact"
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-primary" />
          Your Carbon Footprint
        </CardTitle>
        <CardDescription>Annual CO₂ emissions estimate</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main result */}
        <div className="text-center py-6">
          <div className={cn("text-6xl font-bold", getScoreColor())}>{co2.toFixed(1)}</div>
          <div className="text-xl text-muted-foreground mt-1">tons CO₂/year</div>
          <div
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full mt-4 text-sm font-medium",
              co2 <= 8 ? "bg-primary/10 text-primary" : "bg-chart-4/10 text-chart-4",
            )}
          >
            {co2 <= 8 && <TrendingDown className="h-4 w-4" />}
            {getScoreLabel()}
          </div>
        </div>

        {/* Comparisons */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">vs. US Average ({averageUS} tons)</span>
              <span className="font-medium">{percentOfAverage.toFixed(0)}%</span>
            </div>
            <Progress value={Math.min(percentOfAverage, 100)} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground flex items-center gap-1">
                <Target className="h-3 w-3" />
                vs. Climate Target ({target} tons)
              </span>
              <span className="font-medium">{(co2 / target).toFixed(1)}x</span>
            </div>
            <Progress value={100 - Math.min(percentOfTarget, 100)} className="h-2" />
          </div>
        </div>

        {/* Message */}
        <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">
          {co2 <= 4 ? (
            <p>Outstanding! You're living sustainably. Keep inspiring others!</p>
          ) : co2 <= 8 ? (
            <p>Great job! You're below average. Small changes can get you to the target.</p>
          ) : (
            <p>There's room for improvement. Check the tips below to reduce your footprint.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
