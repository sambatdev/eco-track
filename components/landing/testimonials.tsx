"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "EcoTrack Pro helped us reduce our data center energy consumption by 35% in just six months. The ROI has been incredible.",
    author: "Sarah Chen",
    role: "CTO, TechCorp Global",
    avatar: "/professional-asian-woman.png",
  },
  {
    quote:
      "The carbon tracking features made it easy for our family to understand and reduce our environmental impact. We've cut our footprint by half!",
    author: "Marcus Johnson",
    role: "Environmental Advocate",
    avatar: "/professional-african-american-man.png",
  },
  {
    quote:
      "The disaster resilience alerts saved our community during last year's flooding. We had time to prepare and protect our homes.",
    author: "Elena Rodriguez",
    role: "Community Leader",
    avatar: "/latina-professional-woman.png",
  },
  {
    quote:
      "As a sustainability manager, this platform gives me all the data I need to make informed decisions and report to stakeholders.",
    author: "James Mitchell",
    role: "Sustainability Director, GreenEnergy Inc",
    avatar: "/professional-man-business.png",
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((current + 1) % testimonials.length)

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Trusted by Climate Champions</h2>
          <p className="text-lg text-muted-foreground">See how organizations and individuals are making a difference</p>
        </div>

        {/* Testimonial carousel */}
        <div className="relative">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="pt-10 pb-8 px-8 sm:px-12">
              <Quote className="w-12 h-12 text-primary/30 mb-6" />
              <blockquote className="text-xl sm:text-2xl font-medium text-foreground mb-8 text-pretty leading-relaxed">
                "{testimonials[current].quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={testimonials[current].avatar || "/placeholder.svg"}
                    alt={testimonials[current].author}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {testimonials[current].author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground">{testimonials[current].author}</div>
                  <div className="text-sm text-muted-foreground">{testimonials[current].role}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button variant="outline" size="icon" onClick={prev} aria-label="Previous testimonial">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === current ? "bg-primary w-6" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={next} aria-label="Next testimonial">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
