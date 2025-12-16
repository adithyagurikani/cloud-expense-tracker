# 💰 Cloud Expense Tracker

A modern, full-stack expense tracking application built with React, Node.js, AWS Lambda, and DynamoDB. Features a beautiful, professional UI with dark/light mode support, AI-powered insights, and comprehensive expense management tools.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933.svg)
![AWS](https://img.shields.io/badge/AWS-Lambda%20%7C%20DynamoDB-FF9900.svg)

## ✨ Features

### 🎨 Modern UI/UX
- **Professional Design** - Clean, minimalist interface with premium aesthetics
- **Dark/Light Mode** - Fully functional theme toggle with smooth transitions
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - Framer Motion powered transitions and effects
- **Glassmorphism** - Modern card designs with backdrop blur effects

### 📊 Expense Management
- **Add Expenses** - Quick and easy expense entry with categories
- **Search & Filter** - Advanced filtering by category, date range, and amount
- **Sort Options** - Sort by date or amount (ascending/descending)
- **Delete Expenses** - Remove unwanted entries
- **Real-time Updates** - Instant feedback with toast notifications

### 🤖 Smart Features
- **AI Insights** - Intelligent spending analysis and recommendations
- **Recurring Expenses** - Auto-add monthly bills and subscriptions
- **Budget Tracking** - Set limits per category with visual progress
- **Savings Goals** - Track progress towards financial goals
- **Spending Overview** - Real-time statistics and category breakdown

### 📈 Analytics & Reports
- **Interactive Charts** - Line, bar, and pie charts for data visualization
- **Weekly Trends** - Track spending patterns over time
- **Category Distribution** - Visual breakdown of expenses by category
- **Monthly Overview** - Compare spending across months
- **Export Reports** - Download data as CSV or PDF

### ⚙️ Settings & Customization
- **Currency Selection** - Support for INR, USD, EUR, GBP
- **Date Format** - Multiple date format options
- **Theme Preferences** - Dark, Light, or Auto (system)
- **Data Management** - Export, import, or clear all data
- **Notification Settings** - Budget alerts and reminders

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with Hooks
- **React Router** - Multi-page navigation
- **Recharts** - Beautiful, responsive charts
- **Framer Motion** - Smooth animations
- **React Hot Toast** - Toast notifications
- **jsPDF** - PDF report generation

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **AWS Lambda** - Serverless functions
- **AWS SAM** - Serverless Application Model
- **DynamoDB** - NoSQL database

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **AWS CLI** - AWS deployment tools

## 📁 Project Structure

```
cloud-expense-tracker/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   ├── InsightsCard.jsx
│   │   │   ├── SearchFilter.jsx
│   │   │   ├── RecurringExpenses.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── Budget.jsx
│   │   │   ├── Goals.jsx
│   │   │   ├── Reports.jsx
│   │   │   └── Settings.jsx
│   │   ├── utils/           # Utility functions
│   │   │   └── pdfGenerator.js
│   │   ├── App.jsx          # Main app component
│   │   ├── App.css          # Global styles
│   │   └── api.js           # API client
│   ├── Dockerfile
│   └── package.json
├── backend/
│   ├── functions/           # Lambda functions
│   │   ├── getExpenses.js
│   │   ├── createExpense.js
│   │   └── deleteExpense.js
│   ├── template.yaml        # SAM template
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18.x or higher
- Docker & Docker Compose
- AWS CLI (for deployment)
- AWS SAM CLI (for local testing)

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/cloud-expense-tracker.git
cd cloud-expense-tracker
```

2. **Start with Docker Compose**
```bash
docker-compose up -d
```

This will start:
- Frontend on `http://localhost`
- DynamoDB Local on `http://localhost:8000`
- Backend API on `http://localhost:3001`

3. **Access the application**
Open your browser and navigate to `http://localhost`

### Manual Setup (Without Docker)

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Backend
```bash
cd backend
npm install

# Set environment variables
export DYNAMODB_ENDPOINT=http://localhost:8000
export TABLE_NAME=Expenses

# Start the server
node server.js
```

#### DynamoDB Local
```bash
# Download and run DynamoDB Local
docker run -p 8000:8000 amazon/dynamodb-local
```

## 🎯 Usage

### Adding Expenses
1. Navigate to the Dashboard
2. Fill in the expense form (description, amount, category, date)
3. Click "Add Expense"

### Viewing Analytics
1. Click "Analytics" in the sidebar
2. View charts for weekly trends, category distribution, and monthly overview
3. Toggle between dark/light mode for better visibility

### Setting Budgets
1. Go to "Budget" page
2. Click "Edit Budgets" to set limits for each category
3. Track your spending against budget limits
4. Visual indicators show safe, warning, and over-budget status

### Creating Goals
1. Navigate to "Goals" page
2. Click "New Goal"
3. Set target amount, deadline, and category
4. Track progress and add contributions

### Generating Reports
1. Go to "Reports" page
2. Select date range
3. View summary statistics and category breakdown
4. Export as CSV or PDF

## 🎨 Customization

### Theme
- Click the sun/moon button (top-right) to toggle theme
- Or set preference in Settings page
- Choose from Dark, Light, or Auto (system)

### Currency
1. Go to Settings
2. Select your preferred currency (INR, USD, EUR, GBP)
3. Save settings

### Date Format
1. Go to Settings
2. Choose date format (DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD)
3. Save settings

## 🚢 Deployment

### Deploy to AWS

1. **Configure AWS credentials**
```bash
aws configure
```

2. **Deploy with SAM**
```bash
cd backend
sam build
sam deploy --guided
```

3. **Update frontend API endpoint**
Update `frontend/src/api.js` with your API Gateway URL

4. **Deploy frontend**
- Build: `npm run build`
- Deploy to S3, Netlify, Vercel, or your preferred hosting

## 🔒 Environment Variables

### Backend
```env
DYNAMODB_ENDPOINT=http://localhost:8000  # For local development
TABLE_NAME=Expenses
AWS_REGION=us-east-1
```

### Frontend
```env
VITE_API_URL=http://localhost:3001  # API endpoint
```

## 📊 Database Schema

### Expenses Table
```javascript
{
  id: String,           // UUID
  description: String,  // Expense description
  amount: Number,       // Amount in currency
  category: String,     // Food, Transport, Utilities, Entertainment, General
  date: String         // ISO date string (YYYY-MM-DD)
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern SaaS applications
- Icons from emoji unicode
- Charts powered by Recharts
- Animations by Framer Motion

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/cloud-expense-tracker](https://github.com/yourusername/cloud-expense-tracker)

## 🎉 Features Roadmap

- [ ] Multi-user support with authentication
- [ ] Receipt image upload and OCR
- [ ] Email notifications for budget alerts
- [ ] Mobile app (React Native)
- [ ] Expense categories customization
- [ ] Multi-currency support with exchange rates
- [ ] Expense splitting for shared costs
- [ ] Integration with banking APIs

---

Made with ❤️ and ☕
