"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Star,
  MapPin,
  Users,
  Video,
  MessageSquare,
  Coins,
  PlayCircle,
  Clock,
  Award,
} from "lucide-react";

declare global {
  interface Window {
    Pi: any;
  }
}

interface ArtisanProfileProps {
  artisanId: string;
  onBack: () => void;
}

export function ArtisanProfile({ artisanId, onBack }: ArtisanProfileProps) {
  const [piReady, setPiReady] = useState(false);

  /* ---------------- PI SDK LOADER ---------------- */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const initPi = () => {
      if (window.Pi) {
        try {
          window.Pi.init({
            version: "2.0",
            sandbox: true, // 🔴 set to false in production
          });
          setPiReady(true);
          console.log("✅ Pi SDK initialized");
        } catch (err) {
          console.error("Pi init error:", err);
        }
      }
    };

    // Load SDK if not already loaded
    if (!document.querySelector('script[src="https://sdk.minepi.com/pi-sdk.js"]')) {
      const script = document.createElement("script");
      script.src = "https://sdk.minepi.com/pi-sdk.js";
      script.async = true;
      script.onload = initPi;
      document.body.appendChild(script);
    } else {
      initPi();
    }
  }, []);

  /* ---------------- PI PAYMENT HANDLER ---------------- */
  const handlePiPayment = useCallback(
    async (amount: number, memo: string) => {
      if (!window.Pi || !piReady) {
        alert("Please open this app inside Pi Browser.");
        return;
      }

      try {
        await window.Pi.createPayment(
          {
            amount,
            memo,
            metadata: { artisanId },
          },
          {
            sandbox: true,
            onReadyForServerApproval: async (paymentId: string) => {
              await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pi/approve`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ paymentId }),
                }
              );
            },
            onReadyForServerCompletion: async (
              paymentId: string,
              txid: string
            ) => {
              await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pi/complete`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ paymentId, txid }),
                }
              );
            },
            onCancel: () => console.log("Payment cancelled"),
            onError: (err: any) => console.error("Payment error", err),
          }
        );
      } catch (err) {
        console.error(err);
      }
    },
    [piReady, artisanId]
  );

  /* ---------------- SAMPLE DATA ---------------- */
  const videos = [
    { title: "Pottery Wheel Basics", duration: "18:45", price: 15, views: 2400 },
    { title: "Hand Building Techniques", duration: "22:30", price: 20, views: 1850 },
    { title: "Glazing & Firing Process", duration: "25:15", price: 25, views: 1620 },
  ];

  const workshops = [
    { title: "Complete Pottery Masterclass", students: 156, price: 50, date: "Dec 20, 2024" },
    { title: "Advanced Wheel Throwing", students: 89, price: 65, date: "Dec 22, 2024" },
  ];

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-background pb-6">
      <header className="sticky top-0 z-50 bg-card border-b">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-bold text-lg">Artisan Profile</h1>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-start gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>
                {artisanId[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h2 className="font-bold text-xl">{artisanId}</h2>
              <Badge className="mt-1">
                <Award className="w-3 h-3 mr-1" /> Verified
              </Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </Button>

            <Button
              className="flex-1"
              onClick={() => handlePiPayment(10, "Book artisan lesson")}
            >
              <Coins className="w-4 h-4 mr-2" />
              Book Lesson
            </Button>
          </div>
        </Card>

        <Tabs defaultValue="videos">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="workshops">Workshops</TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-3 mt-4">
            {videos.map((v, i) => (
              <Card key={i} className="p-4 flex justify-between">
                <div>
                  <h4 className="font-semibold">{v.title}</h4>
                  <p className="text-sm">{v.duration}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() =>
                    handlePiPayment(v.price, `Purchase video: ${v.title}`)
                  }
                >
                  Watch Now
                </Button>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="workshops" className="space-y-3 mt-4">
            {workshops.map((w, i) => (
              <Card key={i} className="p-4 flex justify-between">
                <div>
                  <h4 className="font-semibold">{w.title}</h4>
                  <p className="text-sm">{w.date}</p>
                </div>
                <Button
                  onClick={() =>
                    handlePiPayment(w.price, `Enroll in ${w.title}`)
                  }
                >
                  Enroll
                </Button>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
