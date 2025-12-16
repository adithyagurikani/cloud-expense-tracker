import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { getExpenses, createExpense, deleteExpense } from './api'
import { Sidebar } from './components/Sidebar'
import { ThemeToggle } from './components/ThemeToggle'
import { Dashboard } from './pages/Dashboard'
import { Analytics } from './pages/Analytics'
import { Budget } from './pages/Budget'
import { Goals } from './pages/Goals'
import { Reports } from './pages/Reports'
import { Settings } from './pages/Settings'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadExpenses()
  }, [])

  const loadExpenses = async () => {
    setLoading(true)
    try {
      const data = await getExpenses()
      setExpenses(data)
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Could not load expenses. Make sure backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddExpense = async (expense) => {
    try {
      const newExpense = await createExpense(expense)
      setExpenses((prev) => [...prev, newExpense])
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Failed to add expense')
    }
  }

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id)
      setExpenses((prev) => prev.filter((e) => e.id !== id))
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Failed to delete expense')
    }
  }

  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
          success: {
            iconTheme: {
              primary: '#38f9d7',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff6b6b',
              secondary: '#fff',
            },
          },
        }}
      />
      <div className="app-layout">
        <Sidebar />
        <ThemeToggle />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  expenses={expenses}
                  loading={loading}
                  error={error}
                  onAddExpense={handleAddExpense}
                  onDeleteExpense={handleDeleteExpense}
                />
              }
            />
            <Route path="/analytics" element={<Analytics expenses={expenses} />} />
            <Route path="/budget" element={<Budget expenses={expenses} />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/reports" element={<Reports expenses={expenses} />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
