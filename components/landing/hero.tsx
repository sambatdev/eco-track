"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Zap, Shield } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-chart-2/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <Leaf className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Climate Action Platform</span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6">
          <span className="text-foreground">Track, Optimize, and Protect:</span>
          <br />
          <span className="bg-gradient-to-r from-primary via-chart-2 to-accent bg-clip-text text-transparent">
            Your Path to a Greener Future
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 text-pretty">
          Combat climate change through intelligent carbon footprint tracking, AI-powered data center optimization, and
          real-time disaster resilience tools. For individuals and enterprises alike.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button size="lg" className="h-14 px-8 text-lg group" asChild>
            <Link href="/dashboard">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-transparent" asChild>
            <Link href="#features">Learn More</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="flex flex-col items-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
            <Leaf className="w-8 h-8 text-primary mb-3" />
            <span className="text-3xl font-bold text-foreground">2.5M+</span>
            <span className="text-sm text-muted-foreground">Tons CO₂ Tracked</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
            <Zap className="w-8 h-8 text-chart-2 mb-3" />
            <span className="text-3xl font-bold text-foreground">40%</span>
            <span className="text-sm text-muted-foreground">Avg Energy Savings</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
            <Shield className="w-8 h-8 text-accent mb-3" />
            <span className="text-3xl font-bold text-foreground">10K+</span>
            <span className="text-sm text-muted-foreground">Active Alerts</span>
          </div>
        </div>
      </div>
    </section>
  )
}
