const mockData = {
  accounts: [
    {
      id: "acct-1",
      bankName: "GTBank",
      lastFour: "4821",
      balance: 142500,
      color: "#F95738",
      inflows: 125e3,
      outflows: 82e3
    },
    {
      id: "acct-2",
      bankName: "Access Bank",
      lastFour: "7734",
      balance: 87200,
      color: "#E63946",
      inflows: 35e3,
      outflows: 48e3
    },
    {
      id: "acct-3",
      bankName: "Zenith Bank",
      lastFour: "2209",
      balance: 234800,
      color: "#7B2D8B",
      inflows: 0,
      outflows: 25e3
    }
  ],
  transactions: [
    {
      id: "tx-1",
      description: "Salary Deposit — Andela NG",
      amount: 125e3,
      category: "Income",
      date: "2026-05-01",
      isAutoParsed: true,
      transactionType: "credit",
      icon: "💰"
    },
    {
      id: "tx-2",
      description: "Rent Payment — Lekki Phase 1",
      amount: 45e3,
      category: "Housing",
      date: "2026-05-02",
      isAutoParsed: false,
      transactionType: "debit",
      icon: "🏠"
    },
    {
      id: "tx-3",
      description: "Shoprite — Groceries",
      amount: 12400,
      category: "Feeding",
      date: "2026-05-03",
      isAutoParsed: true,
      transactionType: "debit",
      icon: "🛒"
    },
    {
      id: "tx-4",
      description: "Uber Rides — Weekly",
      amount: 8500,
      category: "Transportation",
      date: "2026-05-04",
      isAutoParsed: true,
      transactionType: "debit",
      icon: "🚗"
    },
    {
      id: "tx-5",
      description: "Side Hustle — Freelance Design",
      amount: 35e3,
      category: "Income",
      date: "2026-05-05",
      isAutoParsed: false,
      transactionType: "credit",
      icon: "💼"
    },
    {
      id: "tx-6",
      description: "Barbing & Grooming — Cuts HQ",
      amount: 5e3,
      category: "Grooming",
      date: "2026-05-06",
      isAutoParsed: true,
      transactionType: "debit",
      icon: "✂️"
    },
    {
      id: "tx-7",
      description: "KFC Victoria Island",
      amount: 7800,
      category: "Feeding",
      date: "2026-05-07",
      isAutoParsed: true,
      transactionType: "debit",
      icon: "🍗"
    },
    {
      id: "tx-8",
      description: "Birthday Gift — Chioma",
      amount: 12e3,
      category: "Gifts",
      date: "2026-05-08",
      isAutoParsed: false,
      transactionType: "debit",
      icon: "🎁"
    },
    {
      id: "tx-9",
      description: "BRT Card Top-Up",
      amount: 5e3,
      category: "Transportation",
      date: "2026-05-09",
      isAutoParsed: true,
      transactionType: "debit",
      icon: "🚌"
    },
    {
      id: "tx-10",
      description: "Savings Transfer — Piggyvest",
      amount: 5e4,
      category: "Savings",
      date: "2026-05-10",
      isAutoParsed: false,
      transactionType: "debit",
      icon: "🐷"
    },
    {
      id: "tx-11",
      description: "MTN Airtime — SMS Alert",
      amount: 2e3,
      category: "Utilities",
      date: "2026-05-11",
      isAutoParsed: true,
      transactionType: "debit",
      icon: "📱"
    },
    {
      id: "tx-12",
      description: "Investment — ARM Savings",
      amount: 25e3,
      category: "Investment",
      date: "2026-05-12",
      isAutoParsed: false,
      transactionType: "debit",
      icon: "📈"
    }
  ],
  expenseCategories: [
    {
      name: "Grooming",
      amount: 15e3,
      color: "#7B2D8B",
      budgeted: 1e4,
      isOverBudget: true
    },
    {
      name: "Feeding",
      amount: 45e3,
      color: "#2D6A4F",
      budgeted: 4e4,
      isOverBudget: true
    },
    {
      name: "Transportation",
      amount: 28e3,
      color: "#1A2B4C",
      budgeted: 3e4,
      isOverBudget: false
    },
    {
      name: "Gifts",
      amount: 12e3,
      color: "#F95738",
      budgeted: 8e3,
      isOverBudget: true
    }
  ],
  goals: [
    {
      id: "goal-1",
      name: "Land Purchase",
      targetAmount: 5e6,
      currentAmount: 335e4,
      progressPercent: 67,
      icon: "🏡",
      targetDate: "Dec 2027"
    },
    {
      id: "goal-2",
      name: "Master's Degree Fund",
      targetAmount: 25e5,
      currentAmount: 85e4,
      progressPercent: 34,
      icon: "🎓",
      targetDate: "Sep 2026"
    }
  ],
  profiles: [
    {
      id: "profile-1",
      name: "The Architect",
      tagline: "Building wealth, one plan at a time",
      icon: "🏛️",
      description: "Strategic, long-term thinker. Prioritizes structured goals and disciplined saving."
    },
    {
      id: "profile-2",
      name: "The Builder",
      tagline: "Growing steadily, brick by brick",
      icon: "🔨",
      description: "Consistent, reliable. Focuses on steady income growth and asset accumulation."
    },
    {
      id: "profile-3",
      name: "The Investor",
      tagline: "Money working harder than you",
      icon: "📊",
      description: "Risk-aware, growth-oriented. Maximizes returns through diversified investments."
    },
    {
      id: "profile-4",
      name: "The Explorer",
      tagline: "Adventures funded by freedom",
      icon: "🌍",
      description: "Flexible, experience-driven. Balances lifestyle spending with financial health."
    },
    {
      id: "profile-5",
      name: "The Guardian",
      tagline: "Protecting what matters most",
      icon: "🛡️",
      description: "Security-focused. Prioritizes emergency funds, insurance, and family protection."
    }
  ],
  selectedProfileId: "profile-1",
  cashflowInflows: [
    { name: "Salary", amount: 125e3, icon: "💼" },
    { name: "Side Hustle", amount: 35e3, icon: "🎯" }
  ],
  cashflowOutflows: [
    { name: "Rent", amount: 45e3, icon: "🏠" },
    { name: "Savings", amount: 5e4, icon: "🐷" },
    { name: "Food", amount: 45e3, icon: "🍽️" },
    { name: "Transport", amount: 28e3, icon: "🚗" }
  ],
  totalSavings: 464500,
  avgMonthlyExpenses: 1e5,
  burnRate: 4.64,
  safeToSpend: 12400,
  startingBalance: 685400,
  currentBalance: 464500,
  safeToSpendPercent: 70
};
function formatNaira(amount) {
  return `₦${amount.toLocaleString("en-NG")}`;
}
function getBurnRateStatus(burnRate) {
  return "calm";
}
export {
  formatNaira as f,
  getBurnRateStatus as g,
  mockData as m
};
