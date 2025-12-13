"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Pi: any;
  }
}

export default function PiLoader() {
  useEffect(() => {
    const initPi = () => {
      if (window.Pi) {
        window.Pi.init({
          version: "2.0",
          sandbox: true,
        });
        console.log("✅ Pi SDK initialized (SANDBOX)");
      } else {
        console.log("⏳ Waiting for Pi SDK...");
        setTimeout(initPi, 500);
      }
    };

    if (!document.querySelector('script[src="https://sdk.minepi.com/pi-sdk.js"]')) {
      const script = document.createElement("script");
      script.src = "https://sdk.minepi.com/pi-sdk.js";
      script.async = true;
      document.body.appendChild(script);
    }

    initPi();
  }, []);

  return null;
}
