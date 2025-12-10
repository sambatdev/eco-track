"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Car, Utensils, Zap, Trash2, HelpCircle, Calculator } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface CalculatorData {
  travel: {
    carMiles: number
    carType: string
    flightsPerYear: number
    publicTransport: number
  }
  diet: {
    meatMeals: number
    dairyServings: number
    localFood: number
  }
  energy: {
    electricityKwh: number
    gasUsage: number
    renewablePercent: number
  }
  waste: {
    recyclingPercent: number
    compostPercent: number
  }
}

const initialData: CalculatorData = {
  travel: {
    carMiles: 200,
    carType: "gasoline",
    flightsPerYear: 2,
    publicTransport: 10,
  },
  diet: {
    meatMeals: 7,
    dairyServings: 14,
    localFood: 30,
  },
  energy: {
    electricityKwh: 900,
    gasUsage: 50,
    renewablePercent: 10,
  },
  waste: {
    recyclingPercent: 40,
    compostPercent: 10,
  },
}

// Simple CO2 calculation formulas (approximate)
function calculateCO2(data: CalculatorData): number {
  const travel =
    data.travel.carMiles *
      52 *
      (data.travel.carType === "electric" ? 0.0001 : data.travel.carType === "hybrid" ? 0.0002 : 0.0004) +
    data.travel.flightsPerYear * 0.9 +
    data.travel.publicTransport * 52 * 0.00005

  const diet =
    (data.diet.meatMeals * 52 * 0.027 + data.diet.dairyServings * 52 * 0.003) * (1 - data.diet.localFood / 200)

  const energy =
    (data.energy.electricityKwh * 12 * 0.0004 + data.energy.gasUsage * 12 * 0.005) *
    (1 - data.energy.renewablePercent / 100)

  const waste = 2.0 * (1 - data.waste.recyclingPercent / 100) * (1 - data.waste.compostPercent / 200)

  return travel + diet + energy + waste
}

interface CalculatorFormProps {
  onCalculate: (co2: number, data: CalculatorData) => void
}

export function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const [data, setData] = useState<CalculatorData>(initialData)
  const [activeTab, setActiveTab] = useState("travel")

  const tabs = [
    { id: "travel", label: "Travel", icon: Car },
    { id: "diet", label: "Diet", icon: Utensils },
    { id: "energy", label: "Energy", icon: Zap },
    { id: "waste", label: "Waste", icon: Trash2 },
  ]

  const currentTabIndex = tabs.findIndex((t) => t.id === activeTab)
  const progress = ((currentTabIndex + 1) / tabs.length) * 100

  const handleCalculate = () => {
    const co2 = calculateCO2(data)
    onCalculate(co2, data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Carbon Footprint Calculator
        </CardTitle>
        <CardDescription>Enter your lifestyle details to estimate your annual CO₂ emissions</CardDescription>
        <Progress value={progress} className="mt-4 h-2" />
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TooltipProvider>
            {/* Travel Tab */}
            <TabsContent value="travel" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Miles driven per week</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Average miles you drive weekly in your personal vehicle</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[data.travel.carMiles]}
                      onValueChange={([v]) => setData({ ...data, travel: { ...data.travel, carMiles: v } })}
                      max={500}
                      step={10}
                      className="flex-1"
                    />
                    <span className="w-16 text-right font-medium">{data.travel.carMiles}</span>
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Vehicle type</Label>
                  <Select
                    value={data.travel.carType}
                    onValueChange={(v) => setData({ ...data, travel: { ...data.travel, carType: v } })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gasoline">Gasoline</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Flights per year</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Round trips by airplane annually</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    type="number"
                    value={data.travel.flightsPerYear}
                    onChange={(e) =>
                      setData({ ...data, travel: { ...data.travel, flightsPerYear: Number(e.target.value) } })
                    }
                    min={0}
                    max={50}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Public transport trips/week</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Bus, train, or subway trips per week</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Slider
                    value={[data.travel.publicTransport]}
                    onValueChange={([v]) => setData({ ...data, travel: { ...data.travel, publicTransport: v } })}
                    max={30}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground mt-1 block">{data.travel.publicTransport} trips</span>
                </div>
              </div>
            </TabsContent>

            {/* Diet Tab */}
            <TabsContent value="diet" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Meat meals per week</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Meals containing beef, pork, chicken, or fish</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Slider
                    value={[data.diet.meatMeals]}
                    onValueChange={([v]) => setData({ ...data, diet: { ...data.diet, meatMeals: v } })}
                    max={21}
                    step={1}
                  />
                  <span className="text-sm text-muted-foreground mt-1 block">{data.diet.meatMeals} meals</span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Dairy servings per week</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Milk, cheese, yogurt, butter servings</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Slider
                    value={[data.diet.dairyServings]}
                    onValueChange={([v]) => setData({ ...data, diet: { ...data.diet, dairyServings: v } })}
                    max={35}
                    step={1}
                  />
                  <span className="text-sm text-muted-foreground mt-1 block">{data.diet.dairyServings} servings</span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Local/seasonal food (%)</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Percentage of food from local sources</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Slider
                    value={[data.diet.localFood]}
                    onValueChange={([v]) => setData({ ...data, diet: { ...data.diet, localFood: v } })}
                    max={100}
                    step={5}
                  />
                  <span className="text-sm text-muted-foreground mt-1 block">{data.diet.localFood}%</span>
                </div>
              </div>
            </TabsContent>

            {/* Energy Tab */}
            <TabsContent value="energy" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Monthly electricity (kWh)</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Check your utility bill for this information</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    type="number"
                    value={data.energy.electricityKwh}
                    onChange={(e) =>
                      setData({ ...data, energy: { ...data.energy, electricityKwh: Number(e.target.value) } })
                    }
                    min={0}
                    max={5000}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Monthly gas usage (therms)</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Natural gas for heating, cooking, etc.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    type="number"
                    value={data.energy.gasUsage}
                    onChange={(e) => setData({ ...data, energy: { ...data.energy, gasUsage: Number(e.target.value) } })}
                    min={0}
                    max={500}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Renewable energy (%)</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Solar, wind, or green energy subscription</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Slider
                    value={[data.energy.renewablePercent]}
                    onValueChange={([v]) => setData({ ...data, energy: { ...data.energy, renewablePercent: v } })}
                    max={100}
                    step={5}
                  />
                  <span className="text-sm text-muted-foreground mt-1 block">{data.energy.renewablePercent}%</span>
                </div>
              </div>
            </TabsContent>

            {/* Waste Tab */}
            <TabsContent value="waste" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Recycling rate (%)</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Percentage of waste you recycle</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Slider
                    value={[data.waste.recyclingPercent]}
                    onValueChange={([v]) => setData({ ...data, waste: { ...data.waste, recyclingPercent: v } })}
                    max={100}
                    step={5}
                  />
                  <span className="text-sm text-muted-foreground mt-1 block">{data.waste.recyclingPercent}%</span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Composting rate (%)</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Food scraps and yard waste composted</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Slider
                    value={[data.waste.compostPercent]}
                    onValueChange={([v]) => setData({ ...data, waste: { ...data.waste, compostPercent: v } })}
                    max={100}
                    step={5}
                  />
                  <span className="text-sm text-muted-foreground mt-1 block">{data.waste.compostPercent}%</span>
                </div>
              </div>
            </TabsContent>
          </TooltipProvider>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => {
                const prevIndex = currentTabIndex - 1
                if (prevIndex >= 0) setActiveTab(tabs[prevIndex].id)
              }}
              disabled={currentTabIndex === 0}
            >
              Previous
            </Button>
            {currentTabIndex < tabs.length - 1 ? (
              <Button onClick={() => setActiveTab(tabs[currentTabIndex + 1].id)}>Next</Button>
            ) : (
              <Button onClick={handleCalculate} className="gap-2">
                <Calculator className="h-4 w-4" />
                Calculate Footprint
              </Button>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
