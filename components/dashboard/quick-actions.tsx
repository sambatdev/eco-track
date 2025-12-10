"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footprints, Server, CloudRain, FileDown, ArrowRight } from "lucide-react"

const actions = [
  {
    title: "Track Carbon",
    description: "Log today's activities",
    icon: Footprints,
    href: "/carbon-tracker",
    color: "text-primary",
  },
  {
    title: "Optimize Energy",
    description: "Run optimization",
    icon: Server,
    href: "/data-center-optimizer",
    color: "text-chart-2",
  },
  {
    title: "Check Alerts",
    description: "View weather warnings",
    icon: CloudRain,
    href: "/disaster-resilience",
    color: "text-accent",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Frequently used features</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {actions.map((action, index) => (
          <Link key={index} href={action.href}>
            <Button
              variant="outline"
              className="w-full justify-between h-auto py-3 px-4 hover:bg-muted group bg-transparent"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted group-hover:bg-background transition-colors">
                  <action.icon className={`h-4 w-4 ${action.color}`} />
                </div>
                <div className="text-left">
                  <div className="font-medium text-foreground">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Button>
          </Link>
        ))}
        <Button variant="secondary" className="w-full mt-2">
          <FileDown className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </CardContent>
    </Card>
  )
}
