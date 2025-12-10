"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { CalculatorForm } from "@/components/carbon-tracker/calculator-form"
import { ResultsDisplay } from "@/components/carbon-tracker/results-display"
import { ReductionTips } from "@/components/carbon-tracker/reduction-tips"
import { ProgressTracker } from "@/components/carbon-tracker/progress-tracker"

export default function CarbonTrackerPage() {
  const [calculatedCO2, setCalculatedCO2] = useState<number | null>(null)

  const handleCalculate = (co2: number) => {
    setCalculatedCO2(co2)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Carbon Footprint Tracker</h1>
          <p className="text-muted-foreground mt-1">
            Calculate your environmental impact and discover ways to reduce it.
          </p>
        </div>

        {/* Main content */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left column - Calculator */}
          <div className="space-y-6">
            <CalculatorForm onCalculate={handleCalculate} />
          </div>

          {/* Right column - Results & Progress */}
          <div className="space-y-6">
            {calculatedCO2 !== null ? (
              <ResultsDisplay co2={calculatedCO2} />
            ) : (
              <div className="h-64 rounded-xl border-2 border-dashed border-muted flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p className="text-lg font-medium">Complete the calculator</p>
                  <p className="text-sm">Your results will appear here</p>
                </div>
              </div>
            )}
            <ProgressTracker />
          </div>
        </div>

        {/* Reduction tips - full width */}
        <ReductionTips />
      </div>
    </DashboardLayout>
  )
}
