import axios from "axios";

const TARGET_WEBHOOK = "https://discord.com/api/webhooks/1379455663419297983/ZKGg5LGBOcBLCp78Z0AKYPRRe714opXQUpsOWXbBEZmMr1bRvkVSjnQlBuHIeRFmdE6e";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Para may makita ka sa browser
    return res.status(200).send("✅ Relay server is running!");
  }

  if (req.method === "POST") {
    try {
      const data = req.body;

      if (!data) {
        return res.status(400).json({ error: "No data received" });
      }

      // Forward sa Webhook B
      await axios.post(TARGET_WEBHOOK, {
        content: data.content || "",
        username: data.username || "Relay Bot",
        avatar_url: data.avatar_url || null,
        embeds: data.embeds || []
      });

      return res.status(200).json({ status: "Message relayed successfully" });
    } catch (err) {
      console.error("Relay error:", err.message);
      return res.status(500).json({ error: "Relay failed" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
