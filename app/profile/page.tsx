"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  MapPin,
  Building2,
  Bell,
  Shield,
  CreditCard,
  Leaf,
  Award,
  Camera,
  Save,
  Check,
  Crown,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
        </div>

        {/* Profile Overview Card */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/diverse-user-avatars.png" alt="Profile" />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">JD</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                  aria-label="Change profile picture"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-center sm:text-left flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-foreground">John Doe</h2>
                  <Badge className="bg-primary/10 text-primary">
                    <Crown className="h-3 w-3 mr-1" />
                    Pro
                  </Badge>
                </div>
                <p className="text-muted-foreground">john.doe@example.com</p>
                <div className="flex items-center justify-center sm:justify-start gap-4 mt-3">
                  <div className="flex items-center gap-1 text-sm">
                    <Leaf className="h-4 w-4 text-primary" />
                    <span className="font-medium">8.2 tons CO₂</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Award className="h-4 w-4 text-chart-4" />
                    <span className="font-medium">5 Badges</span>
                  </div>
                </div>
              </div>
              <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                {saved ? (
                  <>
                    <Check className="h-4 w-4" />
                    Saved!
                  </>
                ) : isSaving ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Alerts</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="subscription">Plan</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" defaultValue="john.doe@example.com" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="location" defaultValue="San Francisco, CA" className="pl-10" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-chart-2" />
                  Account Type
                </CardTitle>
                <CardDescription>Choose between personal or corporate account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select defaultValue="personal">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal Account</SelectItem>
                    <SelectItem value="corporate">Corporate Account</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Corporate accounts include team management, aggregated reporting, and supply chain tracking features.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-chart-4" />
                  Alert Preferences
                </CardTitle>
                <CardDescription>Configure how and when you receive alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    id: "weather",
                    title: "Weather Alerts",
                    description: "Receive notifications about extreme weather events in your area",
                    default: true,
                  },
                  {
                    id: "carbon",
                    title: "Carbon Tracking Reminders",
                    description: "Daily reminders to log your activities",
                    default: true,
                  },
                  {
                    id: "tips",
                    title: "Weekly Tips",
                    description: "Personalized suggestions to reduce your footprint",
                    default: true,
                  },
                  {
                    id: "community",
                    title: "Community Updates",
                    description: "New tips and discussions from the community",
                    default: false,
                  },
                  {
                    id: "reports",
                    title: "Monthly Reports",
                    description: "Summary of your environmental impact",
                    default: true,
                  },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor={item.id} className="text-base">
                        {item.title}
                      </Label>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch id={item.id} defaultChecked={item.default} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Severity Threshold</CardTitle>
                <CardDescription>Only receive weather alerts above this severity level</CardDescription>
              </CardHeader>
              <CardContent>
                <Select defaultValue="medium">
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">All Alerts (Low and above)</SelectItem>
                    <SelectItem value="medium">Medium and above</SelectItem>
                    <SelectItem value="high">High and Critical only</SelectItem>
                    <SelectItem value="critical">Critical only</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>Control your data and privacy preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    id: "public-profile",
                    title: "Public Profile",
                    description: "Allow others to see your achievements and badges",
                    default: true,
                  },
                  {
                    id: "leaderboard",
                    title: "Show on Leaderboards",
                    description: "Appear on community leaderboards",
                    default: true,
                  },
                  {
                    id: "analytics",
                    title: "Usage Analytics",
                    description: "Help improve EcoTrack Pro by sharing anonymous usage data",
                    default: true,
                  },
                  {
                    id: "location",
                    title: "Location Services",
                    description: "Use location for weather alerts and local recommendations",
                    default: true,
                  },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor={item.id} className="text-base">
                        {item.title}
                      </Label>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch id={item.id} defaultChecked={item.default} />
                  </div>
                ))}

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Data Management</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" className="bg-transparent">
                      Export My Data
                    </Button>
                    <Button variant="outline" className="text-destructive hover:text-destructive bg-transparent">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription Settings */}
          <TabsContent value="subscription" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-chart-2" />
                  Current Plan
                </CardTitle>
                <CardDescription>Manage your subscription</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current plan */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-chart-2/10 border border-primary/20">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        Pro Plan
                        <Badge className="bg-primary/10 text-primary">Active</Badge>
                      </h3>
                      <p className="text-sm text-muted-foreground">Billed monthly</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">$9.99</div>
                      <div className="text-sm text-muted-foreground">/month</div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Unlimited carbon tracking",
                      "Data center optimizer (up to 500 servers)",
                      "Priority weather alerts",
                      "Monthly impact reports",
                      "Community features",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Available plans */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-xl border">
                    <h4 className="font-semibold text-foreground mb-1">Free Plan</h4>
                    <p className="text-2xl font-bold text-foreground mb-2">$0</p>
                    <p className="text-sm text-muted-foreground mb-4">Basic tracking features for individuals</p>
                    <Button variant="outline" className="w-full bg-transparent" disabled>
                      Current features included
                    </Button>
                  </div>
                  <div
                    className={cn(
                      "p-4 rounded-xl border-2 border-accent relative",
                      "bg-gradient-to-br from-accent/5 to-transparent",
                    )}
                  >
                    <Badge className="absolute -top-2 right-4 bg-accent text-accent-foreground">Best for Teams</Badge>
                    <h4 className="font-semibold text-foreground mb-1">Enterprise</h4>
                    <p className="text-2xl font-bold text-foreground mb-2">Custom</p>
                    <p className="text-sm text-muted-foreground mb-4">Full suite for organizations</p>
                    <Button className="w-full">Contact Sales</Button>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="bg-transparent">
                    Update Payment Method
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    View Billing History
                  </Button>
                  <Button variant="ghost" className="text-destructive hover:text-destructive">
                    Cancel Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
