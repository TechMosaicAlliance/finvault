# 🏦 FinVault

FinVault is a **Modern, Secure, and Minimalist Personal Finance Dashboard** designed to empower users with real-time insights into their financial health. It balances high-end aesthetics with powerful analytical tools, providing a glassmorphic, intuitive experience for tracking income, expenses, and assets.

---

## ✨ Key Features

### 📊 Comprehensive Dashboard
- **Safe to Spend**: A centralized visual ring indicating available liquidity.
- **Underlay Analytics**: Sleek, non-intrusive graphs providing "Starting Balance" vs "Current Reality" at a glance.
- **Dynamic Time Filtering**: Toggle views between Daily, Weekly, Monthly, and Annually across the entire app.

### 📈 Advanced Transactions & Analytics
- **Analytical Drill-down**: Interactive Pie Charts for category-based expenditure tracking.
- **Income/Expense Toggle**: Effortlessly flip between cash inflows and outflows with ranked lists (Highest to Lowest).
- **Custom Search**: Global search functionality to find any transaction instantly.

### 💳 Detailed Account Management
- **Branded Account Cards**: Beautifully styled cards representing your banks (GTBank, etc.) and assets.
- **Categorized Portfolio**: Grouped views for Bank Accounts, Savings, Investments, and Loans.
- **Cashflow Map**: A unique visual flow diagram showing exactly how money moves from income sources to expenditure channels.
- **Cash at Hand**: Dedicated tracking for physical currency and ATM activity.

### ⚙️ Personalized Experience
- **Extensive Settings**: Configure everything from budget targets and currencies to security passcodes and style preferences.
- **Persistent Global Navigation**: A fixed bottom navigation and a smart header with identity and health status.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend (Integration Ready)
- **Language**: [Motoko](https://internetcomputer.org/docs/current/motoko/main/motoko)
- **Platform**: [Internet Computer (ICP)](https://internetcomputer.org/)
- **Package Manager**: [MOPS](https://mops.one/)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Finvault
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   cd src/frontend
   pnpm dev
   ```

4. **Open the app**:
   Navigate to `http://localhost:5173` in your browser.

---

## 📂 Project Structure

```text
Finvault/
├── src/
│   ├── frontend/        # React + Vite application
│   │   ├── src/
│   │   │   ├── components/  # Reusable UI components
│   │   │   ├── pages/       # Page-level components (Overview, Transactions, etc.)
│   │   │   ├── data/        # Mock data and interfaces
│   │   │   └── App.tsx      # Main application entry and routing
│   └── backend/         # Motoko backend logic
├── package.json         # Workspace configuration
└── README.md            # You are here!
```

---

## 📝 Recent Updates
- ✅ Refactored **Overview Page** with underlay graphs and persistent FAB.
- ✅ Overhauled **Transactions Page** with Pie Charts and Time Dropdowns.
- ✅ Rebuilt **Accounts Page** with categorization and cashflow map fixes.
- ✅ Implemented **Global Identity & Search** navigation.
- ✅ Added comprehensive **Settings Page** layout.

---

## 🛡️ Security & Privacy
FinVault is built with a "Privacy First" mindset. All data is processed locally or via secure Internet Computer canisters, ensuring your financial information remains yours.

---

*Designed with ❤️ by the FinVault Team.*
