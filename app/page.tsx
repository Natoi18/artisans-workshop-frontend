"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Search, PlayCircle, MessageSquare, User, Star, Coins, Video, Clock, MapPin } from "lucide-react"
import { ArtisanProfile } from "@/components/artisan-profile"
import { DiscoverTab } from "@/components/discover-tab"
import { WorkshopsTab } from "@/components/workshops-tab"
import { MessagesTab } from "@/components/messages-tab"
import { ProfileTab } from "@/components/profile-tab"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"home" | "discover" | "workshops" | "messages" | "profile">("home")
  const [selectedArtisan, setSelectedArtisan] = useState<string | null>(null)

  if (selectedArtisan) {
    return <ArtisanProfile artisanId={selectedArtisan} onBack={() => setSelectedArtisan(null)} />
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AW</span>
            </div>
            <h1 className="font-bold text-lg">Artisans Workshop</h1>
          </div>
          <div className="flex items-center gap-2 bg-accent/10 px-3 py-1.5 rounded-full">
            <Coins className="w-4 h-4 text-accent" />
            <span className="font-semibold text-sm">1,245 π</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-4">
        {activeTab === "home" && (
          <div className="space-y-6">
            {/* Hero Section */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 border-0">
              <div className="p-6 space-y-3">
                <h2 className="text-2xl font-bold text-balance">Learn from Master Artisans Worldwide</h2>
                <p className="text-muted-foreground text-sm">Connect with skilled craftspeople and pay with Pi</p>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <Search className="w-4 h-4 mr-2" />
                  Find Your Craft
                </Button>
              </div>
            </Card>

            {/* Featured Livestreams */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Live Now</h3>
                <Button variant="ghost" size="sm" className="text-primary">
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Maria Santos", craft: "Pottery", viewers: 234, price: 25 },
                  { name: "John Doe", craft: "Woodworking", viewers: 156, price: 30 },
                ].map((stream, idx) => (
                  <Card
                    key={idx}
                    className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedArtisan(stream.name)}
                  >
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                        <PlayCircle className="w-16 h-16 text-primary opacity-80" />
                      </div>
                      <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground border-0">
                        LIVE
                      </Badge>
                      <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {stream.viewers}
                      </div>
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{stream.craft} Masterclass</h4>
                          <p className="text-sm text-muted-foreground">{stream.name}</p>
                        </div>
                        <div className="flex items-center gap-1 text-accent shrink-0">
                          <Coins className="w-4 h-4" />
                          <span className="font-semibold text-sm">{stream.price}π</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Top Artisans */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Top Artisans</h3>
                <Button variant="ghost" size="sm" className="text-primary">
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Sarah Chen", craft: "Jewelry Making", rating: 4.9, students: 1200, location: "Taiwan" },
                  { name: "Ahmed Hassan", craft: "Calligraphy", rating: 4.8, students: 890, location: "Egypt" },
                  { name: "Elena Rodriguez", craft: "Textile Weaving", rating: 5.0, students: 650, location: "Peru" },
                ].map((artisan, idx) => (
                  <Card
                    key={idx}
                    className="p-3 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedArtisan(artisan.name)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-14 h-14 border-2 border-primary/20">
                        <AvatarImage src={`/placeholder-user.jpg`} alt={artisan.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {artisan.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">{artisan.name}</h4>
                        <p className="text-sm text-muted-foreground truncate">{artisan.craft}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-accent text-accent" />
                            <span className="text-xs font-medium">{artisan.rating}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <User className="w-3 h-3" />
                            <span className="text-xs">{artisan.students}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span className="text-xs">{artisan.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Recent Videos */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Recently Added</h3>
                <Button variant="ghost" size="sm" className="text-primary">
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { title: "Introduction to Pottery", duration: "15:30", price: 10 },
                  { title: "Wood Carving Basics", duration: "22:45", price: 15 },
                  { title: "Leather Crafting", duration: "18:20", price: 12 },
                  { title: "Glass Blowing 101", duration: "25:10", price: 20 },
                ].map((video, idx) => (
                  <Card key={idx} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                        <Video className="w-8 h-8 text-primary opacity-80" />
                      </div>
                      <Badge className="absolute bottom-2 right-2 bg-background/90 backdrop-blur-sm text-foreground border-0 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {video.duration}
                      </Badge>
                    </div>
                    <div className="p-2 space-y-1">
                      <h4 className="font-semibold text-sm leading-tight line-clamp-2">{video.title}</h4>
                      <div className="flex items-center gap-1 text-accent">
                        <Coins className="w-3 h-3" />
                        <span className="font-semibold text-xs">{video.price}π</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "discover" && <DiscoverTab onSelectArtisan={setSelectedArtisan} />}
        {activeTab === "workshops" && <WorkshopsTab />}
        {activeTab === "messages" && <MessagesTab />}
        {activeTab === "profile" && <ProfileTab />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex items-center justify-around py-2">
          {[
            { id: "home" as const, icon: Home, label: "Home" },
            { id: "discover" as const, icon: Search, label: "Discover" },
            { id: "workshops" as const, icon: PlayCircle, label: "Workshops" },
            { id: "messages" as const, icon: MessageSquare, label: "Messages" },
            { id: "profile" as const, icon: User, label: "Profile" },
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
