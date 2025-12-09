"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Pi: any;
  }
}

export default function PiLoader() {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://sdk.minepi.com/pi-sdk.js"]'
    );

    const initPi = () => {
      if (window.Pi) {
        window.Pi.init({
          version: "2.0",
          sandbox: true, // ✅ SANDBOX ENABLED
        });
        console.log("✅ Pi SDK initialized in SANDBOX mode");
      } else {
        console.log("❌ Pi SDK not ready yet");
      }
    };

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://sdk.minepi.com/pi-sdk.js";
      script.async = true;
      script.onload = initPi;
      document.body.appendChild(script);
    } else {
      initPi();
    }
  }, []);

  return null;
}
