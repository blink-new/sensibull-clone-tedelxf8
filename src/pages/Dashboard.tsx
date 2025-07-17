import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Progress } from '../components/ui/progress'
import { TradingChart, generateSampleData } from '../components/ui/trading-chart'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity, 
  Target,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Eye,
  Plus,
  AlertTriangle,
  Clock,
  Zap,
  BarChart3,
  PieChart,
  Calendar,
  Bell,
  Loader2,
  RefreshCw
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import { usePortfolio, useMarketData } from '../hooks/useLiveData'

export function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [portfolioData, setPortfolioData] = useState<any[]>([])

  // Use live data hooks
  const { 
    positions, 
    portfolioStats: livePortfolioStats, 
    loading: portfolioLoading, 
    error: portfolioError, 
    refresh: refreshPortfolio,
    isMarketOpen 
  } = usePortfolio()

  const { 
    data: marketMoversData, 
    loading: marketLoading, 
    refresh: refreshMarket 
  } = useMarketData(['NIFTY', 'BANKNIFTY', 'RELIANCE', 'TCS'], 10000)

  // Enhanced portfolio stats with margin simulation
  const portfolioStats = {
    ...livePortfolioStats,
    totalValue: livePortfolioStats.totalValue || 2847650,
    availableMargin: 450000,
    usedMargin: 125000,
    marginUtilization: 21.7
  }

  // Use live positions data
  const topPositions = positions.slice(0, 4) // Show top 4 positions

  // Transform market data for display
  const marketMovers = marketMoversData.map(item => ({
    symbol: item.symbol,
    ltp: item.ltp,
    change: item.change,
    changePercent: item.changePercent,
    volume: `${(item.volume / 1000000).toFixed(1)}M`,
    high: item.high,
    low: item.low
  }))

  const alerts = [
    { message: 'RELIANCE 2800 CE crossed ₹45', time: '2 min ago', type: 'price', severity: 'high' },
    { message: 'High OI build-up in NIFTY 19700 CE', time: '5 min ago', type: 'oi', severity: 'medium' },
    { message: 'Unusual volume in BANKNIFTY 45000 PE', time: '8 min ago', type: 'volume', severity: 'high' },
    { message: 'IV spike detected in TCS options', time: '12 min ago', type: 'iv', severity: 'medium' },
    { message: 'Max pain shifted to 19650 for NIFTY', time: '15 min ago', type: 'analysis', severity: 'low' }
  ]

  const portfolioComposition = [
    { name: 'Index Options', value: 45, amount: 1281442 },
    { name: 'Stock Options', value: 35, amount: 996677 },
    { name: 'Futures', value: 15, amount: 427147 },
    { name: 'Cash', value: 5, amount: 142384 }
  ]

  const recentTrades = [
    { id: 1, symbol: 'NIFTY', action: 'BUY', type: 'CE', strike: 19700, qty: 25, price: 82.50, time: '10:45 AM', pnl: 562.5, status: 'completed' },
    { id: 2, symbol: 'RELIANCE', action: 'SELL', type: 'PE', strike: 2750, qty: 50, price: 35.20, time: '11:20 AM', pnl: -125.0, status: 'completed' },
    { id: 3, symbol: 'BANKNIFTY', action: 'BUY', type: 'PE', strike: 45000, qty: 15, price: 245.60, time: '12:15 PM', pnl: 0, status: 'pending' },
    { id: 4, symbol: 'TCS', action: 'SELL', type: 'CE', strike: 3650, qty: 30, price: 18.75, time: '01:30 PM', pnl: 337.5, status: 'completed' }
  ]

  const COLORS = ['#00d4aa', '#1a365d', '#4f46e5', '#f59e0b']

  // Generate sample portfolio performance data
  useEffect(() => {
    const generateData = () => {
      const data = []
      const baseValue = 2800000
      for (let i = 30; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        const variation = (Math.random() - 0.5) * 50000
        data.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: baseValue + variation + (i * 1500),
          pnl: variation
        })
      }
      return data
    }
    setPortfolioData(generateData())
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-blue-600 bg-blue-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'price': return <TrendingUp className="h-4 w-4" />
      case 'volume': return <BarChart3 className="h-4 w-4" />
      case 'oi': return <Target className="h-4 w-4" />
      case 'iv': return <Zap className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            {(portfolioLoading || marketLoading) && (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            )}
            <Badge variant={isMarketOpen ? "default" : "secondary"} className={isMarketOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
              {isMarketOpen ? "Live Data" : "Market Closed"}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Welcome back! Here's your trading overview.
            {portfolioError && <span className="text-red-600 ml-2">• Error loading data</span>}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              refreshPortfolio()
              refreshMarket()
            }}
            disabled={portfolioLoading || marketLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${(portfolioLoading || marketLoading) ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Today
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View All
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Position
          </Button>
        </div>
      </div>

      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{portfolioStats.totalValue.toLocaleString()}</div>
            <div className={`flex items-center text-xs ${portfolioStats.dayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {portfolioStats.dayChange >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
              {portfolioStats.dayChange >= 0 ? '+' : ''}₹{Math.abs(portfolioStats.dayChange).toLocaleString()} ({portfolioStats.dayChangePercent >= 0 ? '+' : ''}{portfolioStats.dayChangePercent}%) today
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${portfolioStats.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {portfolioStats.totalPnL >= 0 ? '+' : ''}₹{Math.abs(portfolioStats.totalPnL).toLocaleString()}
            </div>
            <div className={`flex items-center text-xs ${portfolioStats.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {portfolioStats.totalPnL >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {portfolioStats.totalPnLPercent >= 0 ? '+' : ''}{portfolioStats.totalPnLPercent}% overall
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Margin Utilization</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioStats.marginUtilization}%</div>
            <div className="mt-2">
              <Progress value={portfolioStats.marginUtilization} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              ₹{portfolioStats.usedMargin.toLocaleString()} / ₹{portfolioStats.availableMargin.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioStats.activePositions}</div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
              <span className="text-green-600">{portfolioStats.profitablePositions} profitable</span>
              <span className="text-red-600">{portfolioStats.losingPositions} in loss</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* TradingView Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>NIFTY Live Chart</CardTitle>
              <div className="flex space-x-1">
                {['1D', '1W', '1M', '3M', '1Y'].map((period) => (
                  <Button
                    key={period}
                    variant={selectedTimeframe === period ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedTimeframe(period)}
                    className="h-8 px-3"
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <TradingChart
              data={generateSampleData('candlestick', 100)}
              type="candlestick"
              height={350}
              symbol="NIFTY 50"
              className="w-full"
            />
          </CardContent>
        </Card>

        {/* Portfolio Composition */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Portfolio Composition</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={portfolioComposition}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {portfolioComposition.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`${value}%`, 'Allocation']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {portfolioComposition.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index] }}
                    ></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{item.value}%</div>
                    <div className="text-xs text-muted-foreground">₹{(item.amount / 100000).toFixed(1)}L</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="positions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="positions">Top Positions</TabsTrigger>
          <TabsTrigger value="trades">Recent Trades</TabsTrigger>
          <TabsTrigger value="movers">Market Movers</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="positions">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Top Positions</CardTitle>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPositions.map((position, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="font-medium">{position.symbol}</div>
                        <div className="text-sm text-muted-foreground">
                          {position.strike} {position.type} • {position.expiry}
                        </div>
                      </div>
                      <div className="text-sm space-y-1">
                        <div>IV: {position.iv}%</div>
                        <div>Δ: {position.delta}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹{position.ltp}</div>
                      <div className="text-sm text-muted-foreground">Qty: {position.qty}</div>
                      <div className={`text-xs ${position.dayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {position.dayChange >= 0 ? '+' : ''}₹{Math.abs(position.dayChange)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {position.pnl >= 0 ? '+' : ''}₹{Math.abs(position.pnl)}
                      </div>
                      <div className={`text-sm ${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trades">
          <Card>
            <CardHeader>
              <CardTitle>Recent Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTrades.map((trade) => (
                  <div key={trade.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <Badge variant={trade.action === 'BUY' ? 'default' : 'secondary'}>
                        {trade.action}
                      </Badge>
                      <div>
                        <div className="font-medium">{trade.symbol} {trade.strike} {trade.type}</div>
                        <div className="text-sm text-muted-foreground">Qty: {trade.qty} @ ₹{trade.price}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">{trade.time}</div>
                      <div className={`text-sm font-medium ${trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {trade.pnl !== 0 && (trade.pnl >= 0 ? '+' : '')}₹{Math.abs(trade.pnl)}
                      </div>
                      <Badge variant={trade.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                        {trade.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movers">
          <Card>
            <CardHeader>
              <CardTitle>Market Movers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {marketMovers.map((mover, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="font-medium text-sm">{mover.symbol}</div>
                      <div className="text-xs text-muted-foreground">
                        H: ₹{mover.high} L: ₹{mover.low}
                      </div>
                      <div className="text-xs text-muted-foreground">Vol: {mover.volume}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm">₹{mover.ltp}</div>
                      <div className={`text-xs flex items-center justify-end ${mover.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {mover.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                        {mover.change >= 0 ? '+' : ''}₹{Math.abs(mover.change)} ({mover.changePercent >= 0 ? '+' : ''}{mover.changePercent}%)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border">
                    <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)}`}>
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {alert.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="p-1">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}