import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Menu, Search, Bell, User, TrendingUp, TrendingDown, Loader2, Wifi, WifiOff } from 'lucide-react'
import { Input } from '../ui/input'
import { useMarketData } from '../../hooks/useLiveData'
import { tradingAPI } from '../../services/api'

interface TopNavigationProps {
  onMenuClick: () => void
  sidebarOpen: boolean
}

export function TopNavigation({ onMenuClick, sidebarOpen }: TopNavigationProps) {
  const { data: marketData, loading, isMarketOpen } = useMarketData(['NIFTY', 'SENSEX'], 5000)
  const [apiStatus, setApiStatus] = useState<{ connected: boolean; message: string } | null>(null)
  
  const niftyData = marketData.find(item => item.symbol === 'NIFTY')
  const sensexData = marketData.find(item => item.symbol === 'SENSEX')

  // Check API connection status on mount
  useEffect(() => {
    const checkConnection = async () => {
      const status = await tradingAPI.testConnection()
      setApiStatus(status)
    }
    
    checkConnection()
    
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="p-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-primary">Sensibull</span>
          </div>
        </div>

        {/* Center section - Market Status */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Badge variant={isMarketOpen ? "default" : "secondary"} className={isMarketOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
              {isMarketOpen ? "Market Open" : "Market Closed"}
            </Badge>
            {loading && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
          </div>
          
          {/* API Connection Status */}
          {apiStatus && (
            <div className="flex items-center space-x-1" title={apiStatus.message}>
              {apiStatus.connected ? (
                <Wifi className="h-4 w-4 text-green-600" />
              ) : (
                <WifiOff className="h-4 w-4 text-orange-600" />
              )}
              <span className={`text-xs ${apiStatus.connected ? 'text-green-600' : 'text-orange-600'}`}>
                {apiStatus.connected ? 'Live Data' : 'Mock Data'}
              </span>
            </div>
          )}
          
          <div className="flex items-center space-x-4">
            {niftyData ? (
              <div className="text-sm">
                <span className="font-medium">NIFTY</span>
                <div className="flex items-center space-x-1">
                  <span className="font-bold">{niftyData.ltp.toLocaleString()}</span>
                  <span className={`text-xs flex items-center ${niftyData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {niftyData.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {niftyData.change > 0 ? '+' : ''}{niftyData.change} ({niftyData.changePercent > 0 ? '+' : ''}{niftyData.changePercent}%)
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-sm">
                <span className="font-medium">NIFTY</span>
                <div className="flex items-center space-x-1">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            
            {sensexData ? (
              <div className="text-sm">
                <span className="font-medium">SENSEX</span>
                <div className="flex items-center space-x-1">
                  <span className="font-bold">{sensexData.ltp.toLocaleString()}</span>
                  <span className={`text-xs flex items-center ${sensexData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {sensexData.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {sensexData.change > 0 ? '+' : ''}{sensexData.change} ({sensexData.changePercent > 0 ? '+' : ''}{sensexData.changePercent}%)
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-sm">
                <span className="font-medium">SENSEX</span>
                <div className="flex items-center space-x-1">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stocks, options..."
              className="pl-10 w-64"
            />
          </div>
          
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent">
              3
            </Badge>
          </Button>
          
          <Button variant="ghost" size="sm">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}