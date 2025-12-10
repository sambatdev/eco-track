"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navbar } from "./navbar"
import { Footer } from "./footer"
import { DashboardSidebar } from "./dashboard-sidebar"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const isMobile = useIsMobile()

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true)
    }
  }, [isMobile])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar - hidden on mobile */}
        <div className="hidden md:block">
          <DashboardSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        </div>

        {/* Main content */}
        <main
          className={cn(
            "flex-1 transition-all duration-300 pt-6 pb-12",
            !isMobile && (sidebarCollapsed ? "md:ml-16" : "md:ml-64"),
          )}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
