// FinVault Mock Data — Nigerian Naira (₦) amounts

export interface BankAccount {
  id: string;
  bankName: string;
  lastFour: string;
  balance: number;
  color: string;
  inflows: number;
  outflows: number;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  isAutoParsed: boolean;
  transactionType: "credit" | "debit";
  icon: string;
}

export interface ExpenseCategory {
  name: string;
  amount: number;
  color: string;
  budgeted: number;
  isOverBudget: boolean;
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  progressPercent: number;
  icon: string;
  targetDate: string;
}

export interface FinancialProfile {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  description: string;
}

export interface CashflowEntry {
  name: string;
  amount: number;
  icon: string;
}

export interface MockDataShape {
  accounts: BankAccount[];
  transactions: Transaction[];
  expenseCategories: ExpenseCategory[];
  goals: FinancialGoal[];
  profiles: FinancialProfile[];
  selectedProfileId: string;
  cashflowInflows: CashflowEntry[];
  cashflowOutflows: CashflowEntry[];
  totalSavings: number;
  avgMonthlyExpenses: number;
  burnRate: number;
  safeToSpend: number;
  startingBalance: number;
  currentBalance: number;
  safeToSpendPercent: number;
}

export const mockData: MockDataShape = {
  accounts: [
    {
      id: "acct-1",
      bankName: "GTBank",
      lastFour: "4821",
      balance: 142500,
      color: "#F95738",
      inflows: 125000,
      outflows: 82000,
    },
    {
      id: "acct-2",
      bankName: "Access Bank",
      lastFour: "7734",
      balance: 87200,
      color: "#E63946",
      inflows: 35000,
      outflows: 48000,
    },
    {
      id: "acct-3",
      bankName: "Zenith Bank",
      lastFour: "2209",
      balance: 234800,
      color: "#7B2D8B",
      inflows: 0,
      outflows: 25000,
    },
  ],

  transactions: [
    {
      id: "tx-1",
      description: "Salary Deposit — Andela NG",
      amount: 125000,
      category: "Income",
      date: "2026-05-01",
      isAutoParsed: true,
      transactionType: "credit",
      icon: "💰",
    },
    {
      id: "tx-2",
      description: "Rent Payment — Lekki Phase 1",
      amount: 45000,
      category: "Housing",
      date: "2026-05-02",
      isAutoParsed: false,
      transactionType: "debit",
      icon: "🏠",
    },
    {
      id: "tx-3",
      description: "Shoprite — Groceries",
      amount: 12400,
      category: "Feeding",
      date: "2026-05-03",
      isAutoParsed: true,
      transactionType: "debit",
      icon: "🛒",
    },
    {
      id: "tx-4",
      description: "Uber Rides — Weekly",
      amount: 8500,
      category: "Transportation",
      date: "2026-05-04",
      isAutoParsed: true,
      transactionType: "debit",
      icon: "🚗",
    },
    {
      id: "tx-5",
      description: "Side Hustle — Freelance Design",
      amount: 35000,
      category: "Income",
      date: "2026-05-05",
      isAutoParsed: false,
      transactionType: "credit",
      icon: "💼",
    },
    {
      id: "tx-6",
      description: "Barbing & Grooming — Cuts HQ",
      amount: 5000,
      category: "Grooming",
      date: "2026-05-06",
      isAutoParsed: true,
      transactionType: "debit",
      icon: "✂️",
    },
    {
      id: "tx-7",
      description: "KFC Victoria Island",
      amount: 7800,
      category: "Feeding",
      date: "2026-05-07",
      isAutoParsed: true,
      transactionType: "debit",
      icon: "🍗",
    },
    {
      id: "tx-8",
      description: "Birthday Gift — Chioma",
      amount: 12000,
      category: "Gifts",
      date: "2026-05-08",
      isAutoParsed: false,
      transactionType: "debit",
      icon: "🎁",
    },
    {
      id: "tx-9",
      description: "BRT Card Top-Up",
      amount: 5000,
      category: "Transportation",
      date: "2026-05-09",
      isAutoParsed: true,
      transactionType: "debit",
      icon: "🚌",
    },
    {
      id: "tx-10",
      description: "Savings Transfer — Piggyvest",
      amount: 50000,
      category: "Savings",
      date: "2026-05-10",
      isAutoParsed: false,
      transactionType: "debit",
      icon: "🐷",
    },
    {
      id: "tx-11",
      description: "MTN Airtime — SMS Alert",
      amount: 2000,
      category: "Utilities",
      date: "2026-05-11",
      isAutoParsed: true,
      transactionType: "debit",
      icon: "📱",
    },
    {
      id: "tx-12",
      description: "Investment — ARM Savings",
      amount: 25000,
      category: "Investment",
      date: "2026-05-12",
      isAutoParsed: false,
      transactionType: "debit",
      icon: "📈",
    },
  ],

  expenseCategories: [
    {
      name: "Grooming",
      amount: 15000,
      color: "#7B2D8B",
      budgeted: 10000,
      isOverBudget: true,
    },
    {
      name: "Feeding",
      amount: 45000,
      color: "#2D6A4F",
      budgeted: 40000,
      isOverBudget: true,
    },
    {
      name: "Transportation",
      amount: 28000,
      color: "#1A2B4C",
      budgeted: 30000,
      isOverBudget: false,
    },
    {
      name: "Gifts",
      amount: 12000,
      color: "#F95738",
      budgeted: 8000,
      isOverBudget: true,
    },
  ],

  goals: [
    {
      id: "goal-1",
      name: "Land Purchase",
      targetAmount: 5000000,
      currentAmount: 3350000,
      progressPercent: 67,
      icon: "🏡",
      targetDate: "Dec 2027",
    },
    {
      id: "goal-2",
      name: "Master's Degree Fund",
      targetAmount: 2500000,
      currentAmount: 850000,
      progressPercent: 34,
      icon: "🎓",
      targetDate: "Sep 2026",
    },
  ],

  profiles: [
    {
      id: "profile-1",
      name: "The Architect",
      tagline: "Building wealth, one plan at a time",
      icon: "🏛️",
      description:
        "Strategic, long-term thinker. Prioritizes structured goals and disciplined saving.",
    },
    {
      id: "profile-2",
      name: "The Builder",
      tagline: "Growing steadily, brick by brick",
      icon: "🔨",
      description:
        "Consistent, reliable. Focuses on steady income growth and asset accumulation.",
    },
    {
      id: "profile-3",
      name: "The Investor",
      tagline: "Money working harder than you",
      icon: "📊",
      description:
        "Risk-aware, growth-oriented. Maximizes returns through diversified investments.",
    },
    {
      id: "profile-4",
      name: "The Explorer",
      tagline: "Adventures funded by freedom",
      icon: "🌍",
      description:
        "Flexible, experience-driven. Balances lifestyle spending with financial health.",
    },
    {
      id: "profile-5",
      name: "The Guardian",
      tagline: "Protecting what matters most",
      icon: "🛡️",
      description:
        "Security-focused. Prioritizes emergency funds, insurance, and family protection.",
    },
  ],

  selectedProfileId: "profile-1",

  cashflowInflows: [
    { name: "Salary", amount: 125000, icon: "💼" },
    { name: "Side Hustle", amount: 35000, icon: "🎯" },
  ],

  cashflowOutflows: [
    { name: "Rent", amount: 45000, icon: "🏠" },
    { name: "Savings", amount: 50000, icon: "🐷" },
    { name: "Food", amount: 45000, icon: "🍽️" },
    { name: "Transport", amount: 28000, icon: "🚗" },
  ],

  totalSavings: 464500,
  avgMonthlyExpenses: 100000,
  burnRate: 4.64,
  safeToSpend: 12400,
  startingBalance: 685400,
  currentBalance: 464500,
  safeToSpendPercent: 70,
};

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function getBurnRateStatus(burnRate: number): "alert" | "calm" {
  return burnRate < 1 ? "alert" : "calm";
}
