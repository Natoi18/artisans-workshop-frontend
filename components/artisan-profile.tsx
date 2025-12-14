"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Star, MapPin, Users, Video, MessageSquare, Coins, PlayCircle, Clock, Award } from "lucide-react";


interface ArtisanProfileProps {
  artisanId: string;
  onBack: () => void;
}

export function ArtisanProfile({ artisanId, onBack }: ArtisanProfileProps) {
  const [piReady, setPiReady] = useState(false);

  // Pi payment handler
  const handlePiPayment = useCallback(
    async (amount: number, memo: string) => {
      if (!piReady || !window.Pi) {
        alert("Pi SDK not ready yet. Please wait a moment or open in Pi Browser.");
        return;
      }

      try {
        const payment = await window.Pi.createPayment(
          {
            amount,
            memo,
            metadata: { artisanId },
          },
          {
            sandbox: true,
            onReadyForServerApproval: async (paymentId: string) => {
              await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pi/approve`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paymentId }),
              });
            },
            onReadyForServerCompletion: async (paymentId: string, txid: string) => {
              await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pi/complete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paymentId, txid }),
              });
            },
            onCancel: () => console.log("Payment cancelled"),
            onError: (error: any) => console.error("Payment error", error),
          }
        );

        console.log("Payment created:", payment);
      } catch (err) {
        console.error(err);
      }
    },
    [piReady, artisanId]
  );

  // Sample data
  const videos = [
    { title: "Pottery Wheel Basics", duration: "18:45", price: 15, views: 2400 },
    { title: "Hand Building Techniques", duration: "22:30", price: 20, views: 1850 },
    { title: "Glazing & Firing Process", duration: "25:15", price: 25, views: 1620 },
  ];

  const workshops = [
    { title: "Complete Pottery Masterclass", students: 156, price: 50, date: "Dec 20, 2024" },
    { title: "Advanced Wheel Throwing", students: 89, price: 65, date: "Dec 22, 2024" },
  ];

  const reviews = [
    { name: "John Smith", rating: 5, comment: "Excellent teacher! Very patient and detailed explanations.", date: "2 days ago" },
    { name: "Lisa Wang", rating: 5, comment: "Best pottery course I've taken. Maria is incredibly skilled.", date: "5 days ago" },
    { name: "Mike Johnson", rating: 4, comment: "Great content, learned a lot about traditional techniques.", date: "1 week ago" },
  ];

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Load Pi SDK */}
  

      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-bold text-lg">Artisan Profile</h1>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Profile Header */}
        <Card className="p-6 space-y-4">
          <div className="flex items-start gap-4">
            <Avatar className="w-20 h-20 border-2 border-primary">
              <AvatarImage src="/placeholder-user.jpg" alt={artisanId} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                {artisanId.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="font-bold text-xl">{artisanId}</h2>
                  <p className="text-muted-foreground text-sm">Master Potter</p>
                </div>
                <Badge className="bg-secondary text-secondary-foreground border-0">
                  <Award className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-semibold">4.9</span>
                  <span className="text-muted-foreground">(348)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>1,234 students</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4" />
                <span>Barcelona, Spain</span>
              </div>
            </div>
          </div>

          <p className="text-sm leading-relaxed">
            Passionate about traditional pottery techniques with over 15 years of experience. I specialize in wheel
            throwing and hand-building methods passed down through generations.
          </p>

          <div className="flex gap-2">
            <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </Button>
            <Button
              className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
              onClick={() => handlePiPayment(10, "Book artisan lesson")}
            >
              <Coins className="w-4 h-4 mr-2" />
              Book Lesson
            </Button>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Videos", value: videos.length, icon: Video },
            { label: "Workshops", value: workshops.length, icon: PlayCircle },
            { label: "Rating", value: 4.9, icon: Star },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="p-4 text-center space-y-2">
                <Icon className="w-6 h-6 mx-auto text-primary" />
                <div className="font-bold text-2xl">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="workshops">Workshops</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-3 mt-4">
            {videos.map((video, idx) => (
              <Card key={idx} className="p-3">
                <div className="flex gap-3">
                  <div className="relative w-32 shrink-0">
                    <div className="aspect-video bg-gradient-to-br from-muted to-muted-foreground/20 rounded-lg flex items-center justify-center">
                      <Video className="w-8 h-8 text-primary opacity-80" />
                    </div>
                    <Badge className="absolute bottom-1 right-1 bg-background/90 backdrop-blur-sm text-foreground border-0 text-xs py-0">
                      <Clock className="w-3 h-3 mr-0.5" />
                      {video.duration}
                    </Badge>
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-semibold text-sm leading-tight line-clamp-2">{video.title}</h4>
                    <p className="text-xs text-muted-foreground">{video.views.toLocaleString()} views</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 text-accent">
                        <Coins className="w-4 h-4" />
                        <span className="font-semibold text-sm">{video.price}π</span>
                      </div>
                      <Button
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() =>
                          handlePiPayment(video.price, `Purchase video: ${video.title}`)
                        }
                      >
                        Watch Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Workshops Tab */}
          <TabsContent value="workshops" className="space-y-3 mt-4">
            {workshops.map((workshop, idx) => (
              <Card key={idx} className="p-4 space-y-3">
                <div className="space-y-2">
                  <h4 className="font-semibold">{workshop.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{workshop.students} enrolled</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{workshop.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-accent">
                    <Coins className="w-5 h-5" />
                    <span className="font-bold text-lg">{workshop.price}π</span>
                  </div>
                  <Button
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    onClick={() =>
                      handlePiPayment(workshop.price, `Enroll in workshop: ${workshop.title}`)
                    }
                  >
                    Enroll Now
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-3 mt-4">
            {reviews.map((review, idx) => (
              <Card key={idx} className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-muted text-foreground text-sm">
                      {review.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-semibold text-sm">{review.name}</h5>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < review.rating ? "fill-accent text-accent" : "text-muted"}`}
                        />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed mt-2">{review.comment}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
