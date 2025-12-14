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
          scope: ["payments"],
        });

        // 🔔 Notify app Pi is ready
        window.dispatchEvent(new Event("pi-ready"));

        console.log("✅ Pi SDK ready");
      } else {
        setTimeout(initPi, 300);
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

