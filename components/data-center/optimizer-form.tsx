"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Server, HelpCircle, Play, Loader2 } from "lucide-react"

export interface DataCenterConfig {
  serverCount: number
  coolingType: string
  pue: number
  renewablePercent: number
  workloadSchedule: string
  avgUtilization: number
  electricityCost: number
}

interface OptimizerFormProps {
  onOptimize: (config: DataCenterConfig) => Promise<void>
  isOptimizing: boolean
}

export function OptimizerForm({ onOptimize, isOptimizing }: OptimizerFormProps) {
  const [config, setConfig] = useState<DataCenterConfig>({
    serverCount: 100,
    coolingType: "traditional",
    pue: 1.8,
    renewablePercent: 20,
    workloadSchedule: "always-on",
    avgUtilization: 40,
    electricityCost: 0.12,
  })

  const handleSubmit = async () => {
    await onOptimize(config)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5 text-chart-2" />
          Data Center Configuration
        </CardTitle>
        <CardDescription>Enter your data center specifications for optimization analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <TooltipProvider>
          {/* Server Count */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Number of Servers</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Total physical servers in your data center</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                type="number"
                value={config.serverCount}
                onChange={(e) => setConfig({ ...config, serverCount: Number(e.target.value) })}
                min={1}
                max={10000}
              />
            </div>

            {/* Cooling Type */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Cooling System</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Type of cooling infrastructure used</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select value={config.coolingType} onValueChange={(v) => setConfig({ ...config, coolingType: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="traditional">Traditional HVAC</SelectItem>
                  <SelectItem value="free-cooling">Free Cooling</SelectItem>
                  <SelectItem value="liquid">Liquid Cooling</SelectItem>
                  <SelectItem value="immersion">Immersion Cooling</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* PUE */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Current PUE (Power Usage Effectiveness)</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ratio of total facility power to IT equipment power. Lower is better (ideal: 1.0)</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-4">
              <Slider
                value={[config.pue]}
                onValueChange={([v]) => setConfig({ ...config, pue: v })}
                min={1.0}
                max={3.0}
                step={0.1}
                className="flex-1"
              />
              <span className="w-12 text-right font-medium">{config.pue.toFixed(1)}</span>
            </div>
          </div>

          {/* Renewable Energy */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Renewable Energy (%)</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Percentage of power from renewable sources</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-4">
              <Slider
                value={[config.renewablePercent]}
                onValueChange={([v]) => setConfig({ ...config, renewablePercent: v })}
                min={0}
                max={100}
                step={5}
                className="flex-1"
              />
              <span className="w-12 text-right font-medium">{config.renewablePercent}%</span>
            </div>
          </div>

          {/* Workload Schedule */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Workload Schedule</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>How workloads are distributed over time</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select
                value={config.workloadSchedule}
                onValueChange={(v) => setConfig({ ...config, workloadSchedule: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="always-on">Always On (24/7)</SelectItem>
                  <SelectItem value="business-hours">Business Hours Only</SelectItem>
                  <SelectItem value="variable">Variable/Burst</SelectItem>
                  <SelectItem value="scheduled">Scheduled Batches</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Average Utilization */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Avg Server Utilization (%)</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Average CPU/memory utilization across servers</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center gap-4">
                <Slider
                  value={[config.avgUtilization]}
                  onValueChange={([v]) => setConfig({ ...config, avgUtilization: v })}
                  min={5}
                  max={100}
                  step={5}
                  className="flex-1"
                />
                <span className="w-12 text-right font-medium">{config.avgUtilization}%</span>
              </div>
            </div>
          </div>

          {/* Electricity Cost */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Electricity Cost ($/kWh)</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your average electricity rate</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              type="number"
              value={config.electricityCost}
              onChange={(e) => setConfig({ ...config, electricityCost: Number(e.target.value) })}
              min={0.01}
              max={1}
              step={0.01}
            />
          </div>
        </TooltipProvider>

        {/* Submit button */}
        <Button onClick={handleSubmit} disabled={isOptimizing} className="w-full gap-2" size="lg">
          {isOptimizing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Running Optimization...
            </>
          ) : (
            <>
              <Play className="h-5 w-5" />
              Run Simulation
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
