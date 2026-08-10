import { useEffect } from "react";

const EMBED_HELPER_ID = "ghl-form-embed-helper";
const BOOKING_URL = "https://api.aibrandinglabinc.com/widget/bookings/weekend-warrior-demo";

export default function BookingEmbed() {
  useEffect(() => {
    if (!document.getElementById(EMBED_HELPER_ID)) {
      const s = document.createElement("script");
      s.id = EMBED_HELPER_ID;
      s.src = "https://link.msgsndr.com/js/form_embed.js";
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div className="booking-card">
      <iframe
        src={BOOKING_URL}
        title="Book a 15 minute Weekend Warrior demo"
        id="weekend-warrior-demo-booking"
        style={{ width: "100%", border: "none", overflow: "hidden", minHeight: 680 }}
        scrolling="no"
      />
    </div>
  );
}
