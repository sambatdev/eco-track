"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Zap, AlertTriangle, TrendingDown, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  description: string
  icon: React.ElementType
  trend?: {
    value: number
    isPositive: boolean
  }
  iconColor?: string
  iconBg?: string
}

function StatCard({ title, value, description, icon: Icon, trend, iconColor, iconBg }: StatCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={cn("p-2 rounded-lg", iconBg || "bg-primary/10")}>
          <Icon className={cn("h-5 w-5", iconColor || "text-primary")} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        <div className="flex items-center gap-2 mt-1">
          {trend && (
            <span
              className={cn(
                "flex items-center text-xs font-medium",
                trend.isPositive ? "text-primary" : "text-destructive",
              )}
            >
              {trend.isPositive ? <TrendingDown className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1" />}
              {Math.abs(trend.value)}%
            </span>
          )}
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsCards() {
  const stats: StatCardProps[] = [
    {
      title: "Current Carbon Footprint",
      value: "8.2 tons",
      description: "CO₂ this year",
      icon: Leaf,
      trend: { value: 12, isPositive: true },
      iconColor: "text-primary",
      iconBg: "bg-primary/10",
    },
    {
      title: "Energy Savings Potential",
      value: "34%",
      description: "Optimization available",
      icon: Zap,
      trend: { value: 8, isPositive: true },
      iconColor: "text-chart-2",
      iconBg: "bg-chart-2/10",
    },
    {
      title: "Active Weather Alerts",
      value: "3",
      description: "In your region",
      icon: AlertTriangle,
      iconColor: "text-chart-5",
      iconBg: "bg-chart-5/10",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
