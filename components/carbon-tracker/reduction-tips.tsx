"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Car, Utensils, Zap, Trash2, Leaf } from "lucide-react"

const tips = [
  {
    category: "Transportation",
    icon: Car,
    items: [
      { id: "ev", label: "Switch to an electric vehicle", savings: "2.0 tons/year", impact: "high" },
      { id: "carpool", label: "Carpool or use rideshare", savings: "0.8 tons/year", impact: "medium" },
      { id: "bike", label: "Bike or walk for short trips", savings: "0.5 tons/year", impact: "medium" },
      { id: "flight", label: "Take one less flight per year", savings: "0.9 tons/year", impact: "high" },
    ],
  },
  {
    category: "Diet",
    icon: Utensils,
    items: [
      { id: "meat", label: "Reduce meat consumption by half", savings: "0.7 tons/year", impact: "medium" },
      { id: "local", label: "Buy local and seasonal produce", savings: "0.3 tons/year", impact: "low" },
      { id: "waste", label: "Reduce food waste by 50%", savings: "0.4 tons/year", impact: "medium" },
    ],
  },
  {
    category: "Energy",
    icon: Zap,
    items: [
      { id: "solar", label: "Install solar panels", savings: "1.5 tons/year", impact: "high" },
      { id: "led", label: "Switch to LED lighting", savings: "0.2 tons/year", impact: "low" },
      { id: "thermostat", label: "Use a smart thermostat", savings: "0.4 tons/year", impact: "medium" },
      { id: "green", label: "Switch to green energy provider", savings: "1.0 tons/year", impact: "high" },
    ],
  },
  {
    category: "Waste",
    icon: Trash2,
    items: [
      { id: "recycle", label: "Recycle all recyclables", savings: "0.3 tons/year", impact: "low" },
      { id: "compost", label: "Start composting", savings: "0.2 tons/year", impact: "low" },
      { id: "plastic", label: "Eliminate single-use plastics", savings: "0.1 tons/year", impact: "low" },
    ],
  },
]

export function ReductionTips() {
  const [adopted, setAdopted] = useState<string[]>([])

  const toggleAdopted = (id: string) => {
    setAdopted((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const totalSavings = tips
    .flatMap((t) => t.items)
    .filter((item) => adopted.includes(item.id))
    .reduce((sum, item) => sum + Number.parseFloat(item.savings), 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              Reduction Tips
            </CardTitle>
            <CardDescription>Personalized suggestions to lower your footprint</CardDescription>
          </div>
          {totalSavings > 0 && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              -{totalSavings.toFixed(1)} tons adopted
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {tips.map((category) => (
            <AccordionItem key={category.category} value={category.category}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <category.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span>{category.category}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={item.id}
                          checked={adopted.includes(item.id)}
                          onCheckedChange={() => toggleAdopted(item.id)}
                        />
                        <label htmlFor={item.id} className="text-sm cursor-pointer">
                          {item.label}
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            item.impact === "high"
                              ? "border-primary text-primary"
                              : item.impact === "medium"
                                ? "border-chart-2 text-chart-2"
                                : "border-muted-foreground text-muted-foreground"
                          }
                        >
                          {item.impact}
                        </Badge>
                        <span className="text-sm font-medium text-primary">-{item.savings}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
