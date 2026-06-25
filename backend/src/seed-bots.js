const prisma = require("./config/prisma");

async function main() {
  const bots = [
    {
      name: "SethBot-MD",
      description: "WhatsApp Multi Device Bot",
      longDescription:
        "A powerful WhatsApp Multi-Device bot with automation, moderation, AI integration, downloads, and business tools.",
      icon: "hardware-chip-outline",
      category: "WhatsApp",
      version: "v3.0.0",
      rating: 4.9,
      featured: true,
      minimumCreditsRequired: 100,
      runCreditsPerHour: 5,
      status: "active",
      totalDeployments: 1240,
      lastUpdated: "2026-06-20",
      features: [
        "Auto Reply",
        "Group Management",
        "AI Integration",
        "Media Downloader",
        "Anti-Link Protection",
      ],
      requirements: [
        "WhatsApp Number",
        "Internet Connection",
        "Host Bot Credits",
      ],
    },
    {
      name: "Black-MD",
      description: "WhatsApp Single Device Bot",
      longDescription:
        "Lightweight WhatsApp bot designed for personal automation and small communities.",
      icon: "chatbubble-ellipses-outline",
      category: "WhatsApp",
      version: "v2.4.1",
      rating: 4.7,
      featured: false,
      minimumCreditsRequired: 50,
      runCreditsPerHour: 3,
      status: "active",
      totalDeployments: 860,
      lastUpdated: "2026-06-18",
      features: ["Auto Reply", "Commands", "Sticker Tools", "Media Downloads"],
      requirements: ["WhatsApp Number", "Internet Connection"],
    },
    {
      name: "SniperBot-MD",
      description: "WhatsApp Business Bot",
      longDescription:
        "Business-focused WhatsApp bot with customer support and marketing tools.",
      icon: "logo-whatsapp",
      category: "Business",
      version: "v1.8.0",
      rating: 4.8,
      featured: true,
      minimumCreditsRequired: 150,
      runCreditsPerHour: 8,
      status: "active",
      totalDeployments: 520,
      lastUpdated: "2026-06-15",
      features: [
        "Customer Support",
        "Bulk Messaging",
        "Lead Collection",
        "Analytics",
      ],
      requirements: ["WhatsApp Business Number", "Internet Connection"],
    },
    {
      name: "Shop Bot",
      description: "E-commerce Assistant",
      longDescription:
        "Automate product sales, customer support, and order management.",
      icon: "cart-outline",
      category: "E-commerce",
      version: "v1.2.0",
      rating: 4.6,
      featured: false,
      minimumCreditsRequired: 200,
      runCreditsPerHour: 10,
      status: "maintenance",
      totalDeployments: 310,
      lastUpdated: "2026-06-10",
      features: [
        "Product Catalog",
        "Order Tracking",
        "Customer Support",
        "Payment Integration",
      ],
      requirements: ["Store Setup", "Internet Connection"],
    },
  ];

  for (const bot of bots) {
    const exists = await prisma.bot.findFirst({
      where: {
        name: bot.name,
      },
    });

    if (!exists) {
      await prisma.bot.create({
        data: bot,
      });

      console.log(`Created: ${bot.name}`);
    } else {
      console.log(`Exists: ${bot.name}`);
    }
  }

  const allBots = await prisma.bot.findMany();

  console.log("Total bots:", allBots.length);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
