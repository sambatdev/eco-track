"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { OptimizerForm, type DataCenterConfig } from "@/components/data-center/optimizer-form"
import { OptimizationResults } from "@/components/data-center/optimization-results"

// Simulated optimization algorithm
function runOptimization(config: DataCenterConfig) {
  // Base calculations
  const serverPower = 0.5 // kW per server average
  const hoursPerYear = 8760
  const baseEnergy = config.serverCount * serverPower * hoursPerYear * config.pue

  // Cooling efficiency factors
  const coolingFactors: Record<string, number> = {
    traditional: 1.0,
    "free-cooling": 0.75,
    liquid: 0.6,
    immersion: 0.5,
  }

  // Workload factors
  const workloadFactors: Record<string, number> = {
    "always-on": 1.0,
    "business-hours": 0.7,
    variable: 0.6,
    scheduled: 0.55,
  }

  // Current metrics
  const currentEnergy = baseEnergy * coolingFactors[config.coolingType]
  const currentCost = currentEnergy * config.electricityCost
  const currentCO2 = currentEnergy * 0.0004 * (1 - config.renewablePercent / 100)

  // Optimized metrics (simulation)
  const optimalPue = Math.max(1.1, config.pue * 0.7)
  const optimalUtilization = Math.min(80, config.avgUtilization * 1.5)
  const consolidationFactor = config.avgUtilization / optimalUtilization
  const optimalServerCount = Math.ceil(config.serverCount * consolidationFactor)
  const optimalCoolingFactor = Math.min(coolingFactors[config.coolingType], 0.6)
  const optimalWorkloadFactor = Math.min(workloadFactors[config.workloadSchedule], 0.6)

  const optimizedEnergy =
    optimalServerCount * serverPower * hoursPerYear * optimalPue * optimalCoolingFactor * optimalWorkloadFactor
  const optimizedCost = optimizedEnergy * config.electricityCost * 0.9 // Assume bulk rate
  const optimalRenewable = Math.min(100, config.renewablePercent + 30)
  const optimizedCO2 = optimizedEnergy * 0.0004 * (1 - optimalRenewable / 100)

  // Generate recommendations
  const recommendations: string[] = []

  if (config.pue > 1.4) {
    recommendations.push(
      `Upgrade cooling infrastructure to reduce PUE from ${config.pue.toFixed(1)} to ${optimalPue.toFixed(1)}. Consider liquid or immersion cooling for maximum efficiency.`,
    )
  }

  if (config.avgUtilization < 50) {
    recommendations.push(
      `Implement server virtualization and consolidation. Current utilization of ${config.avgUtilization}% can be improved to ${optimalUtilization}%, reducing server count from ${config.serverCount} to ${optimalServerCount}.`,
    )
  }

  if (config.renewablePercent < 50) {
    recommendations.push(
      `Increase renewable energy sourcing from ${config.renewablePercent}% to ${optimalRenewable}%. Consider on-site solar or purchasing renewable energy credits.`,
    )
  }

  if (config.workloadSchedule === "always-on") {
    recommendations.push(
      "Implement intelligent workload scheduling to shift non-critical tasks to off-peak hours, reducing energy costs by up to 20%.",
    )
  }

  if (config.coolingType === "traditional") {
    recommendations.push(
      "Upgrade from traditional HVAC to free cooling or liquid cooling systems. This can reduce cooling energy consumption by 25-50%.",
    )
  }

  recommendations.push(
    "Deploy AI-powered predictive maintenance to reduce downtime and optimize equipment lifespan, potentially saving 10-15% on maintenance costs.",
  )

  return {
    current: {
      energyKwh: Math.round(currentEnergy),
      costPerYear: Math.round(currentCost),
      co2Tons: currentCO2,
      pue: config.pue,
    },
    optimized: {
      energyKwh: Math.round(optimizedEnergy),
      costPerYear: Math.round(optimizedCost),
      co2Tons: optimizedCO2,
      pue: optimalPue,
    },
    recommendations,
  }
}

export default function DataCenterOptimizerPage() {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [config, setConfig] = useState<DataCenterConfig | null>(null)
  const [results, setResults] = useState<ReturnType<typeof runOptimization> | null>(null)

  const handleOptimize = async (newConfig: DataCenterConfig) => {
    setIsOptimizing(true)
    setConfig(newConfig)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const optimizationResults = runOptimization(newConfig)
    setResults(optimizationResults)
    setIsOptimizing(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Data Center Optimizer</h1>
          <p className="text-muted-foreground mt-1">
            Simulate and optimize energy consumption in your data center infrastructure.
          </p>
        </div>

        {/* Main content */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Configuration form */}
          <div>
            <OptimizerForm onOptimize={handleOptimize} isOptimizing={isOptimizing} />
          </div>

          {/* Results placeholder or loading */}
          {!results && !isOptimizing && (
            <div className="h-64 rounded-xl border-2 border-dashed border-muted flex items-center justify-center lg:col-span-1">
              <div className="text-center text-muted-foreground">
                <p className="text-lg font-medium">Run a simulation</p>
                <p className="text-sm">Configure your data center and click "Run Simulation"</p>
              </div>
            </div>
          )}

          {isOptimizing && (
            <div className="h-64 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground">Optimizing...</p>
                <p className="text-sm text-muted-foreground">Running genetic algorithm simulation</p>
              </div>
            </div>
          )}
        </div>

        {/* Results section - full width */}
        {results && config && !isOptimizing && <OptimizationResults config={config} results={results} />}
      </div>
    </DashboardLayout>
  )
}
