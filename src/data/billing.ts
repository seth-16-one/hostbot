const billing = {
  credits: 450,

  creditPackages: [
    {
      id: "1",
      credits: 100,
      price: "$2",
    },
    {
      id: "2",
      credits: 500,
      price: "$8",
    },
    {
      id: "3",
      credits: 1000,
      price: "$15",
    },
    {
      id: "4",
      credits: 5000,
      price: "$60",
    },
  ],

  transactions: [
    {
      id: "1",
      title: "Credit Recharge",
      amount: "+100 Credits",
      date: "18 Jun 2026",
    },
    {
      id: "2",
      title: "Credit Purchase",
      amount: "-$15",
      date: "15 Jun 2026",
    },
  ],
};

export default billing;
