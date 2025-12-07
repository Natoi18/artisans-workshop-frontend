"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function MessagesTab() {
  const conversations = [
    {
      name: "Maria Santos",
      lastMessage: "Thank you for joining the workshop!",
      time: "2m ago",
      unread: 2,
      online: true,
    },
    { name: "Sarah Chen", lastMessage: "The materials list has been sent", time: "1h ago", unread: 0, online: true },
    {
      name: "John Doe",
      lastMessage: "Looking forward to our session tomorrow",
      time: "3h ago",
      unread: 1,
      online: false,
    },
    { name: "Ahmed Hassan", lastMessage: "Here are the practice exercises", time: "1d ago", unread: 0, online: false },
    {
      name: "Elena Rodriguez",
      lastMessage: "Great progress on your weaving!",
      time: "2d ago",
      unread: 0,
      online: false,
    },
  ]

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search messages..." className="pl-10" />
      </div>

      {/* Conversations */}
      <div className="space-y-2">
        {conversations.map((conversation, idx) => (
          <Card key={idx} className="p-3 cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="/placeholder-user.jpg" alt={conversation.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {conversation.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {conversation.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-semibold truncate">{conversation.name}</h4>
                  <span className="text-xs text-muted-foreground shrink-0">{conversation.time}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                  {conversation.unread > 0 && (
                    <Badge className="bg-primary text-primary-foreground border-0 rounded-full h-5 min-w-5 px-1.5 text-xs shrink-0">
                      {conversation.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
