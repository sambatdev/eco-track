"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClipboardList, Plus, Check } from "lucide-react"

interface ChecklistItem {
  id: string
  label: string
  category: string
  checked: boolean
}

const initialChecklist: ChecklistItem[] = [
  { id: "1", label: "Stock 3-day supply of water (1 gallon per person per day)", category: "supplies", checked: false },
  { id: "2", label: "Prepare non-perishable food supply", category: "supplies", checked: true },
  { id: "3", label: "Assemble first aid kit", category: "medical", checked: true },
  { id: "4", label: "Gather prescription medications", category: "medical", checked: false },
  { id: "5", label: "Prepare flashlights and extra batteries", category: "supplies", checked: true },
  { id: "6", label: "Charge all portable devices", category: "communication", checked: false },
  { id: "7", label: "Create family communication plan", category: "communication", checked: false },
  { id: "8", label: "Identify evacuation routes", category: "planning", checked: true },
  { id: "9", label: "Secure important documents in waterproof container", category: "documents", checked: false },
  { id: "10", label: "Review insurance coverage", category: "documents", checked: false },
  { id: "11", label: "Secure outdoor furniture and loose items", category: "home", checked: false },
  { id: "12", label: "Know how to shut off utilities", category: "home", checked: true },
]

const categories = [
  { value: "all", label: "All Categories" },
  { value: "supplies", label: "Supplies" },
  { value: "medical", label: "Medical" },
  { value: "communication", label: "Communication" },
  { value: "planning", label: "Planning" },
  { value: "documents", label: "Documents" },
  { value: "home", label: "Home Safety" },
]

export function PreparationChecklist() {
  const [checklist, setChecklist] = useState(initialChecklist)
  const [filter, setFilter] = useState("all")

  const toggleItem = (id: string) => {
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  const filteredChecklist = filter === "all" ? checklist : checklist.filter((item) => item.category === filter)

  const completedCount = checklist.filter((item) => item.checked).length
  const progress = (completedCount / checklist.length) * 100

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              Emergency Preparation Checklist
            </CardTitle>
            <CardDescription>Track your disaster readiness preparations</CardDescription>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Preparation Progress</span>
            <span className="font-medium">
              {completedCount}/{checklist.length} completed
            </span>
          </div>
          <Progress value={progress} className="h-3" />
          {progress === 100 && (
            <div className="flex items-center gap-2 text-sm text-primary">
              <Check className="h-4 w-4" />
              <span>Fully prepared! Great job!</span>
            </div>
          )}
        </div>

        {/* Checklist items */}
        <div className="space-y-2">
          {filteredChecklist.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
            >
              <Checkbox id={item.id} checked={item.checked} onCheckedChange={() => toggleItem(item.id)} />
              <label
                htmlFor={item.id}
                className={`flex-1 text-sm cursor-pointer ${item.checked ? "text-muted-foreground line-through" : "text-foreground"}`}
              >
                {item.label}
              </label>
              <span className="text-xs text-muted-foreground capitalize px-2 py-1 rounded bg-muted">
                {item.category}
              </span>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full gap-2 bg-transparent">
          <Plus className="h-4 w-4" />
          Add Custom Item
        </Button>
      </CardContent>
    </Card>
  )
}
