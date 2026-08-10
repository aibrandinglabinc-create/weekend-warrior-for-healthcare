import { useEffect } from "react";

const LOADER_ID = "ww-chat-loader";

export default function ChatWidget() {
  useEffect(() => {
    const existing = document.querySelector("chat-widget") as HTMLElement | null;
    if (existing) {
      existing.style.display = "";
    } else if (!document.getElementById(LOADER_ID)) {
      const s = document.createElement("script");
      s.id = LOADER_ID;
      s.src = "https://widgets.leadconnectorhq.com/loader.js";
      s.setAttribute(
        "data-resources-url",
        "https://widgets.leadconnectorhq.com/chat-widget/loader.js",
      );
      s.setAttribute("data-widget-id", "6a7a0a693bbada1743e7c4a6");
      document.body.appendChild(s);
    }
    return () => {
      const w = document.querySelector("chat-widget") as HTMLElement | null;
      if (w) w.style.display = "none";
    };
  }, []);

  return null;
}
