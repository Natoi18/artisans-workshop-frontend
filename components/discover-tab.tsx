"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Star, MapPin, Users } from "lucide-react"

interface DiscoverTabProps {
  onSelectArtisan: (artisanId: string) => void
}

export function DiscoverTab({ onSelectArtisan }: DiscoverTabProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = ["All", "Pottery", "Woodworking", "Jewelry", "Textiles", "Leather", "Glass"]
  const [selectedCategory, setSelectedCategory] = useState("All")

  const artisans = [
    { name: "Sarah Chen", craft: "Jewelry Making", rating: 4.9, students: 1200, location: "Taiwan", hourlyRate: 35 },
    { name: "Ahmed Hassan", craft: "Calligraphy", rating: 4.8, students: 890, location: "Egypt", hourlyRate: 28 },
    { name: "Elena Rodriguez", craft: "Textile Weaving", rating: 5.0, students: 650, location: "Peru", hourlyRate: 40 },
    { name: "Marco Rossi", craft: "Glass Blowing", rating: 4.7, students: 520, location: "Italy", hourlyRate: 45 },
    { name: "Yuki Tanaka", craft: "Pottery", rating: 4.9, students: 980, location: "Japan", hourlyRate: 38 },
    {
      name: "Amara Okafor",
      craft: "Leather Crafting",
      rating: 4.8,
      students: 740,
      location: "Nigeria",
      hourlyRate: 32,
    },
  ]

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search artisans or crafts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={`shrink-0 ${selectedCategory === category ? "bg-primary text-primary-foreground" : ""}`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Artisans Grid */}
      <div className="space-y-3">
        {artisans.map((artisan, idx) => (
          <Card
            key={idx}
            className="p-3 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelectArtisan(artisan.name)}
          >
            <div className="flex items-center gap-3">
              <Avatar className="w-16 h-16 border-2 border-primary/20">
                <AvatarImage src="/placeholder-user.jpg" alt={artisan.name} />
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
                    <Users className="w-3 h-3" />
                    <span className="text-xs">{artisan.students}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs">{artisan.location}</span>
                  </div>
                </div>
                <Badge className="mt-2 bg-accent/10 text-accent border-0 hover:bg-accent/20">
                  {artisan.hourlyRate}π/hour
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
