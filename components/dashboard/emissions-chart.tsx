"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", emissions: 1.2 },
  { month: "Feb", emissions: 1.1 },
  { month: "Mar", emissions: 1.0 },
  { month: "Apr", emissions: 0.95 },
  { month: "May", emissions: 0.85 },
  { month: "Jun", emissions: 0.8 },
  { month: "Jul", emissions: 0.75 },
  { month: "Aug", emissions: 0.7 },
  { month: "Sep", emissions: 0.68 },
  { month: "Oct", emissions: 0.65 },
  { month: "Nov", emissions: 0.62 },
  { month: "Dec", emissions: 0.6 },
]

export function EmissionsChart() {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>Emission Trends</CardTitle>
        <CardDescription>Monthly CO₂ emissions over the past year (tons)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="emissionsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs fill-muted-foreground" tickLine={false} axisLine={false} />
              <YAxis className="text-xs fill-muted-foreground" tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Area
                type="monotone"
                dataKey="emissions"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                fill="url(#emissionsGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
