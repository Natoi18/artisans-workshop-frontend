"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlayCircle, Clock, Users, Coins, Calendar, Video } from "lucide-react"

export function WorkshopsTab() {
  const upcomingWorkshops = [
    {
      title: "Complete Pottery Masterclass",
      artisan: "Maria Santos",
      date: "Dec 20, 2024",
      time: "10:00 AM",
      students: 156,
      price: 50,
      duration: "3 hours",
    },
    {
      title: "Advanced Woodcarving",
      artisan: "John Doe",
      date: "Dec 22, 2024",
      time: "2:00 PM",
      students: 89,
      price: 65,
      duration: "2.5 hours",
    },
    {
      title: "Jewelry Design Workshop",
      artisan: "Sarah Chen",
      date: "Dec 25, 2024",
      time: "11:00 AM",
      students: 112,
      price: 55,
      duration: "3 hours",
    },
  ]

  const myWorkshops = [
    {
      title: "Introduction to Pottery",
      artisan: "Maria Santos",
      date: "Dec 15, 2024",
      progress: 75,
      nextSession: "Tomorrow, 10:00 AM",
    },
    {
      title: "Leather Basics",
      artisan: "Amara Okafor",
      date: "Dec 18, 2024",
      progress: 40,
      nextSession: "Dec 19, 3:00 PM",
    },
  ]

  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="enrolled">My Workshops</TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming" className="space-y-3 mt-4">
        {upcomingWorkshops.map((workshop, idx) => (
          <Card key={idx} className="p-4 space-y-3">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-lg leading-tight">{workshop.title}</h4>
                <Badge className="bg-destructive/10 text-destructive border-0 shrink-0">
                  <PlayCircle className="w-3 h-3 mr-1" />
                  LIVE
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">by {workshop.artisan}</p>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{workshop.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    {workshop.time} • {workshop.duration}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{workshop.students} enrolled</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center gap-1 text-accent">
                <Coins className="w-5 h-5" />
                <span className="font-bold text-lg">{workshop.price}π</span>
                <span className="text-xs text-muted-foreground ml-1">(+{(workshop.price * 0.05).toFixed(1)}π fee)</span>
              </div>
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">Enroll Now</Button>
            </div>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="enrolled" className="space-y-3 mt-4">
        {myWorkshops.map((workshop, idx) => (
          <Card key={idx} className="p-4 space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-lg leading-tight">{workshop.title}</h4>
              <p className="text-sm text-muted-foreground">by {workshop.artisan}</p>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-primary">{workshop.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${workshop.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm bg-accent/10 text-accent-foreground p-2 rounded-lg">
                <Video className="w-4 h-4 shrink-0" />
                <span className="font-medium">Next session: {workshop.nextSession}</span>
              </div>
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Continue Learning</Button>
          </Card>
        ))}
      </TabsContent>
    </Tabs>
  )
}
