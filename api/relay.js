import axios from "axios";

// Source Webhook (Server A)
const SOURCE_WEBHOOK = "https://discord.com/api/webhooks/1416367356686372926/ecbVbo_53QfBzEQjQI4Z2aTGaH6W2n96IIZfT5A964xgOgg3kBAxcok5fGBtXWthCsLB";

// Target Webhook (Server B)
const TARGET_WEBHOOK = "https://discord.com/api/webhooks/1379455663419297983/ZKGg5LGBOcBLCp78Z0AKYPRRe714opXQUpsOWXbBEZmMr1bRvkVSjnQlBuHIeRFmdE6e";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = req.body;

    if (!data) {
      return res.status(400).json({ error: "No data received" });
    }

    // Forward to Webhook B
    await axios.post(TARGET_WEBHOOK, {
      content: data.content || "",
      username: data.username || "Relay Bot",
      avatar_url: data.avatar_url || null,
      embeds: data.embeds || []
    });

    res.status(200).json({ status: "Message relayed successfully" });
  } catch (err) {
    console.error("Relay error:", err.message);
    res.status(500).json({ error: "Relay failed" });
  }
}
