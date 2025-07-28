# 📈 Insider Trading Visualizer

An interactive app to explore insider trading and price activity for public companies using data from **SEC Form 4** and historical market data.

Built with **Vite + React + TypeScript + TailwindCSS**.

---

## 🚀 Getting Started

### Requirements

- Node.js v18+

### Install dependencies

```bash
npm install
```

### Start the dev server

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 🧱 Tech Stack

- **Vite** – Fast and minimal build system
- **React 19** – UI library
- **TypeScript** – Type safety
- **Tailwind CSS v4** – Utility-first styling (dark theme)
- **ESLint** – Code linting and quality

---

## 🧠 Business Logic & Metrics

All metrics are computed dynamically from each company’s `eod` (end-of-day) price history.

### 📊 Key Calculations

- **Total Growth (%):**
  ```ts
  ((last - first) / first) * 100
  ```

- **Average Volume:**
  ```ts
  average of all eod.volume
  ```

- **Volatility:**
  ```ts
  max(high) - min(low)
  ```

- **5-Day Trend:**
  ```ts
  ((close[-1] - close[-5]) / close[-5]) * 100
  ```


### 🏷️ Penny Stock Badge

Companies are flagged as **Penny Stocks** if:
```ts
latest adjusted_close < 5
```
A yellow badge appears in both summary and detail views.
---

## ✅ Features by Component

### 🧱 App Layout
- Tab-based interface for switching between **Insiders** and **Companies**
- Responsive layout with independent scrollable panels
- Shared selection state management for coordinated UI updates

---

### 🏢 CompanyListPanel
- Displays a scrollable list of all companies with company data
- Toggleable sorting by:
  - Name
  - Growth %
  - Average volume
  - 5-day trend %
  - Volatility score

---

### 📋 CompanyDetailPanel
- Detailed breakdown of the selected company:
  - Last closing price and trading volume
  - Volume average and trend over the last 5 days
  - Full growth percentage since first available record
  - Volatility indicator and color-coded score
- Historical summary table with:
  - Open, close, and volume for the last 10 sessions

---

### 🔍 CompanySearch
- Real-time search input to filter companies by name or ticker
- Case-insensitive matching

---

### 📊 Metrics & Calculations
- All values (growth, volatility, trend, etc.) are calculated in real time from raw EOD data
- Growth percentages and trends are color-coded (green/red/white) for quick visual parsing
- Separate utility functions for volume and volatility highlighting
- Penny stock classification based on adjusted close price (< $5)

---

### 💄 UI / UX
- Clean, minimalist dark theme using Tailwind CSS
- Responsive and scrollable layout for both panels
- Color-coded indicators for key financial health markers

---

## 🛠 Linting

```bash
npm run lint
```

---

## 📄 License

MIT © 2025
