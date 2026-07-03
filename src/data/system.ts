import { COLORS } from "@/constants";

const system = {
  activity: [
    {
      id: 1,
      title: "SethBot-MD Connected",
      description: "WhatsApp connection established successfully.",
      time: "2 minutes ago",
      type: "success",
      category: "Bots",
      link: undefined,
    },

    {
      id: 2,
      title: "Credits Recharged",
      description: "100 credits added to your account.",
      time: "15 minutes ago",
      type: "success",
      category: "Billing",
    },

    {
      id: 3,
      title: "Bot Deployment Completed",
      description: "Deployment finished successfully.",
      time: "1 hour ago",
      type: "info",
      category: "Deployment",
    },

    {
      id: 4,
      title: "Login From New Device",
      description: "Chrome on Windows logged into your account.",
      time: "Yesterday",
      type: "info",
      category: "Security",
    },

    {
      id: 5,
      title: "Server Restarted",
      description: "Automatic maintenance restart completed.",
      time: "Yesterday",
      type: "warning",
      category: "Hosting",
    },
  ],
  notifications: [
    {
      id: "1",
      type: "warning",
      title: "Low Credits",
      message: "Your balance is below 100 credits",
      content:
        "Your balance has fallen below the recommended level. Recharge your credits to avoid interruption of your hosted bots.",
      date: "18 June 2026",
      read: false,
    },

    {
      id: "2",
      type: "success",
      title: "Bot Connected",
      message: "SethBot-MD connected successfully",
      content:
        "Your bot SethBot-MD was connected successfully and is now online.",
      date: "18 June 2026",
      read: true,
    },

    {
      id: "3",
      type: "info",
      title: "System Update",
      message: "New hosting features available",
      content:
        "Host Bot now supports automatic bot restarts and improved monitoring.",
      date: "17 June 2026",
      read: false,
    },
  ],
  serverStatus: [
    {
      id: "1",
      name: "WhatsApp Node 1",
      uptime: "99.9%",
      status: "online",
      location: "Frankfurt",
      cpu: "28%",
      ram: "42%",
    },

    {
      id: "2",
      name: "WhatsApp Node 2",
      uptime: "98.7%",
      status: "online",
      location: "London",
      cpu: "35%",
      ram: "51%",
    },

    {
      id: "3",
      name: "API Server",
      uptime: "92.4%",
      status: "warning",
      location: "Singapore",
      cpu: "78%",
      ram: "81%",
    },
  ],
  usage: [
    {
      id: 1,
      title: "Running Bots",
      value: "2",
      icon: "play-circle-outline",
      color: COLORS.primary,
    },

    {
      id: 2,
      title: "Offline Bots",
      value: "1",
      icon: "pause-circle-outline",
      color: COLORS.danger,
    },

    {
      id: 3,
      title: "Messages Today",
      value: "1.2K",
      icon: "chatbubble-outline",
      color: COLORS.info,
    },

    {
      id: 4,
      title: "Credits Used",
      value: "320",
      icon: "wallet-outline",
      color: COLORS.warning,
    },
  ],
  promos: [
    {
      id: 1,
      title: "50% Credit Bonus",
      description: "Recharge today and get bonus credits",
      image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
      action: "Recharge Now",
      link: "/billing",
    },

    {
      id: 2,
      title: "New SethBot-MD",
      description: "Deploy the latest multi-device bot",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      action: "Learn More",
      link: "/bots",
    },

    {
      id: 3,
      title: "Upgrade to Pro",
      description: "Unlock premium hosting resources",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      action: "Upgrade",
      link: "/billing",
    },
  ],
};

export default system;
