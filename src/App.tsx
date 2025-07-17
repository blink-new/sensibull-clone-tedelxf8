import React, { useState } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { TopNavigation } from './components/layout/TopNavigation'
import { Dashboard } from './pages/Dashboard'
import { OptionsChain } from './pages/OptionsChain'
import { StrategyBuilder } from './pages/StrategyBuilder'
import { Portfolio } from './pages/Portfolio'
import { Watchlist } from './pages/Watchlist'
import { MarketAnalysis } from './pages/MarketAnalysis'
import { VirtualTrading } from './pages/VirtualTrading'
import { Education } from './pages/Education'
import { Settings } from './pages/Settings'
import './App.css'

type Page = 'dashboard' | 'options-chain' | 'strategy-builder' | 'portfolio' | 'watchlist' | 'market-analysis' | 'virtual-trading' | 'education' | 'settings'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'options-chain':
        return <OptionsChain />
      case 'strategy-builder':
        return <StrategyBuilder />
      case 'portfolio':
        return <Portfolio />
      case 'watchlist':
        return <Watchlist />
      case 'market-analysis':
        return <MarketAnalysis />
      case 'virtual-trading':
        return <VirtualTrading />
      case 'education':
        return <Education />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      
      <div className="flex">
        <Sidebar 
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isOpen={sidebarOpen}
        />
        
        <main className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-16'
        }`}>
          <div className="p-6 pt-20">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App