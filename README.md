# ForecastingApp
# 📦 Demand Forecasting Tool

A full-stack demand planning and forecasting platform designed for both executive-level overview and plant-level SKU insights. Built with modern web and data engineering tools, this project serves as both a job-search portfolio piece and a prototype for real-world application with client data.

## 🔍 Purpose

Inventory, pricing, promotions, and external factors like weather or economic shifts all impact demand. This tool is designed to:
- Help executive teams make smarter ordering and production decisions.
- Equip plant and store managers with SKU-level forecasting insights.
- Support flexible forecasting that incorporates internal and external data.
- Serve as a proof-of-concept for real-world demand planning use cases.

## 🧱 Tech Stack

### Frontend
- **Next.js** (React framework)
- **Tailwind CSS** (UI styling)
- **TypeScript** (typed JS)
- Hosted on **Vercel**

### Backend
- **Supabase** (PostgreSQL DB, Auth, File Storage)
- **Python** for ETL and forecasting models (coming soon)
- Optional API layer with **FastAPI** or Supabase Functions

### Forecasting
- Planned support for:
  - Time series models (Prophet, ARIMA)
  - Machine learning (XGBoost)
  - External regressors (weather, promotions, economic data)

---

## 📊 Features

- 📁 **Client & User Management**: Link users to specific clients with region and channel context.
- 📦 **SKU-Level Forecasting**: View by product, location, and date range.
- 📈 **Executive Dashboards**: Aggregate-level demand views and KPIs.
- 🌤 **External Data Integration**: Weather, economic indicators, Google Trends (planned).
- 🔄 **CSV Upload Support**: Admin portal to upload raw data files.
- ⚙️ **Daily Forecast Jobs**: (Planned) Nightly batch jobs to refresh forecasts.
