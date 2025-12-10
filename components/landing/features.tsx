"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Server, CloudRain, ArrowRight } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Leaf,
    title: "Carbon Footprint Tracking",
    description:
      "Monitor and reduce your carbon emissions with our intelligent tracking system. Get personalized insights and actionable recommendations.",
    href: "/carbon-tracker",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Server,
    title: "Data Center Optimization",
    description:
      "AI-powered algorithms to optimize energy consumption in data centers. Reduce costs while minimizing environmental impact.",
    href: "/data-center-optimizer",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    icon: CloudRain,
    title: "Disaster Resilience",
    description:
      "Real-time weather alerts and resilience planning tools. Stay prepared for extreme weather events with predictive analytics.",
    href: "/disaster-resilience",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Three Pillars of Climate Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Comprehensive tools designed to help you measure, reduce, and prepare for the challenges of a changing
            climate.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link key={index} href={feature.href} className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary/50 bg-card">
                <CardHeader>
                  <div
                    className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-base mb-4">
                    {feature.description}
                  </CardDescription>
                  <div className="flex items-center text-primary font-medium">
                    <span>Learn more</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
