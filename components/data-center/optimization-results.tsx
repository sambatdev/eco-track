"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { TrendingDown, Download, Leaf, DollarSign, Zap, Server } from "lucide-react"
import type { DataCenterConfig } from "./optimizer-form"

interface OptimizationResult {
  current: {
    energyKwh: number
    costPerYear: number
    co2Tons: number
    pue: number
  }
  optimized: {
    energyKwh: number
    costPerYear: number
    co2Tons: number
    pue: number
  }
  recommendations: string[]
}

interface OptimizationResultsProps {
  config: DataCenterConfig
  results: OptimizationResult
}

export function OptimizationResults({ config, results }: OptimizationResultsProps) {
  const savings = {
    energy: results.current.energyKwh - results.optimized.energyKwh,
    cost: results.current.costPerYear - results.optimized.costPerYear,
    co2: results.current.co2Tons - results.optimized.co2Tons,
  }

  const percentSavings = {
    energy: ((savings.energy / results.current.energyKwh) * 100).toFixed(1),
    cost: ((savings.cost / results.current.costPerYear) * 100).toFixed(1),
    co2: ((savings.co2 / results.current.co2Tons) * 100).toFixed(1),
  }

  const chartData = [
    {
      name: "Energy (MWh)",
      Current: results.current.energyKwh / 1000,
      Optimized: results.optimized.energyKwh / 1000,
    },
    {
      name: "Cost ($K)",
      Current: results.current.costPerYear / 1000,
      Optimized: results.optimized.costPerYear / 1000,
    },
    {
      name: "CO₂ (tons)",
      Current: results.current.co2Tons,
      Optimized: results.optimized.co2Tons,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">-{percentSavings.energy}%</Badge>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Energy Savings</p>
              <p className="text-2xl font-bold text-foreground">{(savings.energy / 1000).toFixed(0)} MWh/year</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-chart-2/20 bg-gradient-to-br from-chart-2/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-chart-2/10">
                <DollarSign className="h-5 w-5 text-chart-2" />
              </div>
              <Badge className="bg-chart-2/10 text-chart-2 hover:bg-chart-2/20">-{percentSavings.cost}%</Badge>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Cost Savings</p>
              <p className="text-2xl font-bold text-foreground">${savings.cost.toLocaleString()}/year</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-accent/10">
                <Leaf className="h-5 w-5 text-accent" />
              </div>
              <Badge className="bg-accent/10 text-accent hover:bg-accent/20">-{percentSavings.co2}%</Badge>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">CO₂ Reduction</p>
              <p className="text-2xl font-bold text-foreground">{savings.co2.toFixed(0)} tons/year</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-primary" />
            Before vs After Comparison
          </CardTitle>
          <CardDescription>Visual comparison of current vs optimized metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <XAxis type="number" className="text-xs fill-muted-foreground" />
                <YAxis dataKey="name" type="category" className="text-xs fill-muted-foreground" width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Bar dataKey="Current" fill="hsl(var(--chart-5))" radius={4} />
                <Bar dataKey="Optimized" fill="hsl(var(--chart-1))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5 text-chart-2" />
            Detailed Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead className="text-right">Current</TableHead>
                <TableHead className="text-right">Optimized</TableHead>
                <TableHead className="text-right">Improvement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Annual Energy (kWh)</TableCell>
                <TableCell className="text-right">{results.current.energyKwh.toLocaleString()}</TableCell>
                <TableCell className="text-right">{results.optimized.energyKwh.toLocaleString()}</TableCell>
                <TableCell className="text-right text-primary">-{savings.energy.toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Annual Cost ($)</TableCell>
                <TableCell className="text-right">${results.current.costPerYear.toLocaleString()}</TableCell>
                <TableCell className="text-right">${results.optimized.costPerYear.toLocaleString()}</TableCell>
                <TableCell className="text-right text-primary">-${savings.cost.toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">CO₂ Emissions (tons)</TableCell>
                <TableCell className="text-right">{results.current.co2Tons.toFixed(1)}</TableCell>
                <TableCell className="text-right">{results.optimized.co2Tons.toFixed(1)}</TableCell>
                <TableCell className="text-right text-primary">-{savings.co2.toFixed(1)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">PUE</TableCell>
                <TableCell className="text-right">{results.current.pue.toFixed(2)}</TableCell>
                <TableCell className="text-right">{results.optimized.pue.toFixed(2)}</TableCell>
                <TableCell className="text-right text-primary">
                  -{(results.current.pue - results.optimized.pue).toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Optimization Recommendations</CardTitle>
            <CardDescription>AI-generated suggestions based on your configuration</CardDescription>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {results.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">{index + 1}</span>
                </div>
                <span className="text-sm text-foreground">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
