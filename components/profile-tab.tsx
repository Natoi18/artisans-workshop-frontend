"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Coins, TrendingUp, Award, Settings, Bell, HelpCircle, LogOut, ChevronRight, Star, Video } from "lucide-react"

export function ProfileTab() {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="p-6 space-y-4">
        <div className="flex items-start gap-4">
          <Avatar className="w-20 h-20 border-2 border-primary">
            <AvatarImage src="/placeholder-user.jpg" alt="Your Profile" />
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">YO</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="font-bold text-xl">Your Name</h2>
            <p className="text-muted-foreground text-sm">Learner</p>
            <Badge className="mt-2 bg-secondary/10 text-secondary border-0">Member since Dec 2024</Badge>
          </div>
        </div>
        <Button variant="outline" className="w-full bg-transparent">
          Edit Profile
        </Button>
      </Card>

      {/* Pi Wallet */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-0 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Pi Balance</p>
            <div className="flex items-center gap-2">
              <Coins className="w-6 h-6 text-accent" />
              <span className="font-bold text-3xl">1,245</span>
              <span className="text-lg text-muted-foreground">π</span>
            </div>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Add Pi</Button>
        </div>
        <div className="flex items-center gap-2 text-sm text-green-600">
          <TrendingUp className="w-4 h-4" />
          <span className="font-medium">+125π this month</span>
        </div>
      </Card>

      {/* Earnings Dashboard (for artisans) */}
      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Earnings Overview</h3>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total", value: "2,450π", icon: Coins },
            { label: "This Month", value: "385π", icon: TrendingUp },
            { label: "Platform Fee", value: "122.5π", icon: Award },
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="text-center space-y-1">
                <Icon className="w-5 h-5 mx-auto text-primary" />
                <div className="font-bold text-lg">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>
        <p className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
          5% platform fee supports app maintenance and community growth
        </p>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Enrolled", value: "8", icon: Video },
          { label: "Completed", value: "5", icon: Award },
          { label: "Reviews", value: "12", icon: Star },
        ].map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="p-4 text-center space-y-2">
              <Icon className="w-6 h-6 mx-auto text-primary" />
              <div className="font-bold text-2xl">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </Card>
          )
        })}
      </div>

      {/* Menu Items */}
      <Card className="divide-y divide-border">
        {[
          { icon: Settings, label: "Settings", href: "#" },
          { icon: Bell, label: "Notifications", href: "#", badge: "3" },
          { icon: Award, label: "Become an Artisan", href: "#" },
          { icon: HelpCircle, label: "Help & Support", href: "#" },
        ].map((item, idx) => {
          const Icon = item.icon
          return (
            <button
              key={idx}
              className="w-full flex items-center justify-between p-4 hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && <Badge className="bg-primary text-primary-foreground border-0">{item.badge}</Badge>}
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </button>
          )
        })}
        <button className="w-full flex items-center gap-3 p-4 hover:bg-destructive/5 transition-colors text-destructive">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log Out</span>
        </button>
      </Card>
    </div>
  )
}
