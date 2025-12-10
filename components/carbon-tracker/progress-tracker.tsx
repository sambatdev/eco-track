"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Flame, CheckCircle2, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

// Generate mock streak data for the last 30 days
const generateStreakData = () => {
  const data = []
  const today = new Date()
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split("T")[0],
      logged: Math.random() > 0.3, // 70% chance of being logged
    })
  }
  return data
}

export function ProgressTracker() {
  const [streakData] = useState(generateStreakData)
  const [todayLogged, setTodayLogged] = useState(false)

  // Calculate current streak
  const calculateStreak = () => {
    let streak = todayLogged ? 1 : 0
    for (let i = streakData.length - 1; i >= 0; i--) {
      if (streakData[i].logged) {
        streak++
      } else {
        break
      }
    }
    return streak
  }

  const currentStreak = calculateStreak()
  const totalLogged = streakData.filter((d) => d.logged).length + (todayLogged ? 1 : 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Progress Tracker
        </CardTitle>
        <CardDescription>Track your daily eco-friendly activities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Streak stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-chart-2/10 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Flame className="h-5 w-5 text-chart-5" />
              <span className="text-3xl font-bold text-foreground">{currentStreak}</span>
            </div>
            <span className="text-sm text-muted-foreground">Day Streak</span>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="text-3xl font-bold text-foreground">{totalLogged}</span>
            </div>
            <span className="text-sm text-muted-foreground">Days Logged</span>
          </div>
        </div>

        {/* Calendar grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Last 30 Days</span>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-3 h-3 rounded-sm bg-muted" />
              <span>Missed</span>
              <div className="w-3 h-3 rounded-sm bg-primary" />
              <span>Logged</span>
            </div>
          </div>
          <div className="grid grid-cols-10 gap-1">
            {streakData.map((day, i) => (
              <div
                key={i}
                className={cn(
                  "w-full aspect-square rounded-sm transition-colors",
                  day.logged ? "bg-primary hover:bg-primary/80" : "bg-muted hover:bg-muted/80",
                )}
                title={`${day.date}: ${day.logged ? "Logged" : "Not logged"}`}
              />
            ))}
          </div>
        </div>

        {/* Log today button */}
        <div className="pt-2">
          {todayLogged ? (
            <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-primary/10 text-primary">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">Today's activity logged!</span>
            </div>
          ) : (
            <Button onClick={() => setTodayLogged(true)} className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Log Today's Activity
            </Button>
          )}
        </div>

        {/* Achievement badges */}
        <div className="flex flex-wrap gap-2">
          {currentStreak >= 7 && (
            <Badge variant="secondary" className="bg-chart-4/10 text-chart-4">
              7-Day Streak
            </Badge>
          )}
          {totalLogged >= 20 && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Eco Warrior
            </Badge>
          )}
          {totalLogged >= 10 && (
            <Badge variant="secondary" className="bg-chart-2/10 text-chart-2">
              Getting Started
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
