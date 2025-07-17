import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Progress } from '../components/ui/progress'
import { 
  Briefcase, 
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
  Filter,
  Download,
  RefreshCw,
  Search,
  Calendar,
  PieChart,
  BarChart3,
  AlertTriangle,
  Clock,
  Zap,
  Settings
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area, BarChart, Bar } from 'recharts'

interface Position {
  id: string
  symbol: string
  type: 'CE' | 'PE'
  strike: number
  expiry: string
  quantity: number
  avgPrice: number
  ltp: number
  pnl: number
  pnlPercent: number
  dayChange: number
  dayChangePercent: number
  iv: number
  delta: number
  gamma: number
  theta: number
  vega: number
  daysToExpiry: number
  lotSize: number
  marginUsed: number
  status: 'open' | 'closed'
  entryTime: string
  exitTime?: string
}

interface Trade {
  id: string
  symbol: string
  type: 'CE' | 'PE'
  strike: number
  action: 'BUY' | 'SELL'
  quantity: number
  price: number
  amount: number
  time: string
  status: 'completed' | 'pending' | 'cancelled'
  pnl?: number
}

export function Portfolio() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('pnl')
  const [sortOrder, setSortOrder] = useState('desc')

  const portfolioStats = {
    totalValue: 2847650,
    totalInvested: 2662900,
    totalPnL: 184750,
    totalPnLPercent: 6.94,
    dayPnL: 12450,
    dayPnLPercent: 0.44,
    realizedPnL: 45230,
    unrealizedPnL: 139520,
    totalMarginUsed: 125000,
    availableMargin: 450000,
    marginUtilization: 21.7,
    activePositions: 12,
    closedPositions: 28,
    winRate: 67.5,
    avgWin: 8450,
    avgLoss: -4230
  }

  const positions: Position[] = [
    {
      id: '1', symbol: 'NIFTY', type: 'CE', strike: 19700, expiry: '28-Dec-2023',
      quantity: 25, avgPrice: 82.50, ltp: 84.70, pnl: 550, pnlPercent: 2.67,
      dayChange: 2.20, dayChangePercent: 2.67, iv: 16.55, delta: 0.42,
      gamma: 0.025, theta: -5.8, vega: 28.5, daysToExpiry: 6, lotSize: 25,
      marginUsed: 15000, status: 'open', entryTime: '2023-12-22 10:30:00'
    },
    {
      id: '2', symbol: 'BANKNIFTY', type: 'PE', strike: 45000, expiry: '28-Dec-2023',
      quantity: 15, avgPrice: 260.30, ltp: 245.60, pnl: -2205, pnlPercent: -5.65,
      dayChange: -14.70, dayChangePercent: -5.65, iv: 17.85, delta: -0.48,
      gamma: 0.012, theta: -6.2, vega: 25.4, daysToExpiry: 6, lotSize: 15,
      marginUsed: 22000, status: 'open', entryTime: '2023-12-21 14:15:00'
    },
    {
      id: '3', symbol: 'RELIANCE', type: 'CE', strike: 2800, expiry: '28-Dec-2023',
      quantity: 50, avgPrice: 42.75, ltp: 45.20, pnl: 1225, pnlPercent: 5.73,
      dayChange: 2.45, dayChangePercent: 5.73, iv: 18.45, delta: 0.65,
      gamma: 0.012, theta: -2.4, vega: 12.5, daysToExpiry: 6, lotSize: 50,
      marginUsed: 8500, status: 'open', entryTime: '2023-12-20 11:45:00'
    },
    {
      id: '4', symbol: 'TCS', type: 'PE', strike: 3600, expiry: '04-Jan-2024',
      quantity: 25, avgPrice: 31.20, ltp: 28.75, pnl: -612.5, pnlPercent: -7.85,
      dayChange: -2.45, dayChangePercent: -7.85, iv: 19.20, delta: -0.35,
      gamma: 0.008, theta: -3.2, vega: 15.2, daysToExpiry: 13, lotSize: 25,
      marginUsed: 12000, status: 'open', entryTime: '2023-12-19 15:20:00'
    },
    {
      id: '5', symbol: 'HDFC BANK', type: 'CE', strike: 1700, expiry: '04-Jan-2024',
      quantity: 100, avgPrice: 11.45, ltp: 12.30, pnl: 850, pnlPercent: 7.42,
      dayChange: 0.85, dayChangePercent: 7.42, iv: 16.80, delta: 0.72,
      gamma: 0.015, theta: -1.85, vega: 8.9, daysToExpiry: 13, lotSize: 100,
      marginUsed: 18000, status: 'open', entryTime: '2023-12-18 09:30:00'
    }
  ]

  const recentTrades: Trade[] = [
    {
      id: '1', symbol: 'NIFTY', type: 'CE', strike: 19650, action: 'SELL',
      quantity: 25, price: 118.25, amount: 295625, time: '2023-12-22 15:30:00',
      status: 'completed', pnl: 8750
    },
    {
      id: '2', symbol: 'RELIANCE', type: 'PE', strike: 2750, action: 'BUY',
      quantity: 50, price: 35.20, amount: 176000, time: '2023-12-22 14:15:00',
      status: 'completed'
    },
    {
      id: '3', symbol: 'BANKNIFTY', type: 'CE', strike: 45200, action: 'SELL',
      quantity: 15, price: 89.45, amount: 134175, time: '2023-12-22 13:45:00',
      status: 'completed', pnl: 2340
    },
    {
      id: '4', symbol: 'TCS', type: 'PE', strike: 3650, action: 'BUY',
      quantity: 25, price: 18.75, amount: 46875, time: '2023-12-22 12:30:00',
      status: 'pending'
    }
  ]

  const portfolioComposition = [
    { name: 'Index Options', value: 45, amount: 1281442, color: '#00d4aa' },
    { name: 'Stock Options', value: 35, amount: 996677, color: '#1a365d' },
    { name: 'Futures', value: 15, amount: 427147, color: '#4f46e5' },
    { name: 'Cash', value: 5, amount: 142384, color: '#f59e0b' }
  ]

  const performanceData = [
    { date: '20 Dec', value: 2800000, pnl: 0 },
    { date: '21 Dec', value: 2785000, pnl: -15000 },
    { date: '22 Dec', value: 2847650, pnl: 47650 }
  ]

  const sectorExposure = [
    { sector: 'Banking', exposure: 35, pnl: 12450 },
    { sector: 'IT', exposure: 25, pnl: -3200 },
    { sector: 'Energy', exposure: 20, pnl: 8900 },
    { sector: 'Auto', exposure: 15, pnl: 2100 },
    { sector: 'Pharma', exposure: 5, pnl: -1250 }
  ]

  const filteredPositions = positions.filter(position => {
    const matchesSearch = position.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'profitable' && position.pnl > 0) ||
      (selectedFilter === 'losing' && position.pnl < 0) ||
      (selectedFilter === 'calls' && position.type === 'CE') ||
      (selectedFilter === 'puts' && position.type === 'PE')
    return matchesSearch && matchesFilter
  })

  const sortedPositions = [...filteredPositions].sort((a, b) => {
    let aValue: any = a[sortBy as keyof Position]
    let bValue: any = b[sortBy as keyof Position]
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const getExpiryStatus = (daysToExpiry: number) => {
    if (daysToExpiry <= 1) return { status: 'Critical', color: 'text-red-600 bg-red-50' }
    if (daysToExpiry <= 3) return { status: 'Warning', color: 'text-yellow-600 bg-yellow-50' }
    if (daysToExpiry <= 7) return { status: 'Near', color: 'text-blue-600 bg-blue-50' }
    return { status: 'Safe', color: 'text-green-600 bg-green-50' }
  }

  const getRiskLevel = (position: Position) => {
    const riskScore = Math.abs(position.delta) + Math.abs(position.theta / 10) + (position.iv / 100)
    if (riskScore > 1.5) return { level: 'High', color: 'text-red-600' }
    if (riskScore > 1) return { level: 'Medium', color: 'text-yellow-600' }
    return { level: 'Low', color: 'text-green-600' }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portfolio</h1>
          <p className="text-muted-foreground">Track your positions, P&L, and portfolio performance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{portfolioStats.totalValue.toLocaleString()}</div>
            <div className={`flex items-center text-xs ${portfolioStats.dayPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {portfolioStats.dayPnL >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
              {portfolioStats.dayPnL >= 0 ? '+' : ''}₹{Math.abs(portfolioStats.dayPnL).toLocaleString()} ({portfolioStats.dayPnLPercent >= 0 ? '+' : ''}{portfolioStats.dayPnLPercent}%) today
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
            <div className="flex justify-between text-xs mt-1">
              <span className="text-green-600">Realized: ₹{portfolioStats.realizedPnL.toLocaleString()}</span>
              <span className="text-blue-600">Unrealized: ₹{portfolioStats.unrealizedPnL.toLocaleString()}</span>
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
              ₹{portfolioStats.totalMarginUsed.toLocaleString()} / ₹{portfolioStats.availableMargin.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioStats.winRate}%</div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-green-600">Avg Win: ₹{portfolioStats.avgWin.toLocaleString()}</span>
              <span className="text-red-600">Avg Loss: ₹{Math.abs(portfolioStats.avgLoss).toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Portfolio Performance</CardTitle>
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
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00d4aa" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                  <YAxis 
                    stroke="#64748b"
                    fontSize={12}
                    tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                  />
                  <Tooltip 
                    formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Portfolio Value']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#00d4aa" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Composition */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Composition</span>
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
                      <Cell key={`cell-${index}`} fill={entry.color} />
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
                      style={{ backgroundColor: item.color }}
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

      {/* Sector Exposure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Sector Exposure</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorExposure}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="sector" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  formatter={(value: any, name: string) => [
                    name === 'exposure' ? `${value}%` : `₹${value.toLocaleString()}`,
                    name === 'exposure' ? 'Exposure' : 'P&L'
                  ]}
                />
                <Bar dataKey="exposure" fill="#00d4aa" />
                <Bar dataKey="pnl" fill="#1a365d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="positions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="positions">Active Positions</TabsTrigger>
          <TabsTrigger value="trades">Recent Trades</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="positions">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Positions ({sortedPositions.length})</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search positions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-48"
                    />
                  </div>
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="profitable">Profitable</SelectItem>
                      <SelectItem value="losing">Losing</SelectItem>
                      <SelectItem value="calls">Calls</SelectItem>
                      <SelectItem value="puts">Puts</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pnl">P&L</SelectItem>
                      <SelectItem value="pnlPercent">P&L %</SelectItem>
                      <SelectItem value="dayChange">Day Change</SelectItem>
                      <SelectItem value="daysToExpiry">Expiry</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  >
                    {sortOrder === 'asc' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Strike</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Avg Price</TableHead>
                      <TableHead>LTP</TableHead>
                      <TableHead>P&L</TableHead>
                      <TableHead>Day Change</TableHead>
                      <TableHead>Greeks</TableHead>
                      <TableHead>Expiry</TableHead>
                      <TableHead>Risk</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedPositions.map((position) => {
                      const expiryStatus = getExpiryStatus(position.daysToExpiry)
                      const riskLevel = getRiskLevel(position)
                      
                      return (
                        <TableRow key={position.id}>
                          <TableCell className="font-medium">{position.symbol}</TableCell>
                          <TableCell>
                            <Badge variant={position.type === 'CE' ? 'default' : 'secondary'}>
                              {position.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{position.strike}</TableCell>
                          <TableCell>{position.quantity}</TableCell>
                          <TableCell>₹{position.avgPrice}</TableCell>
                          <TableCell className="font-medium">₹{position.ltp}</TableCell>
                          <TableCell>
                            <div className={`${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              <div className="font-medium">
                                {position.pnl >= 0 ? '+' : ''}₹{Math.abs(position.pnl).toFixed(0)}
                              </div>
                              <div className="text-xs">
                                {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className={`${position.dayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              <div className="font-medium">
                                {position.dayChange >= 0 ? '+' : ''}₹{Math.abs(position.dayChange).toFixed(2)}
                              </div>
                              <div className="text-xs">
                                {position.dayChangePercent >= 0 ? '+' : ''}{position.dayChangePercent.toFixed(2)}%
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-xs space-y-1">
                              <div>Δ: {position.delta.toFixed(3)}</div>
                              <div className="text-red-600">Θ: {position.theta.toFixed(1)}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="text-sm">{position.expiry}</div>
                              <Badge variant="outline" className={`text-xs ${expiryStatus.color}`}>
                                {position.daysToExpiry}d
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`text-xs ${riskLevel.color}`}>
                              {riskLevel.level}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Button variant="ghost" size="sm" className="p-1">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="p-1">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
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
                  <div key={trade.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <Badge variant={trade.action === 'BUY' ? 'default' : 'secondary'}>
                        {trade.action}
                      </Badge>
                      <div>
                        <div className="font-medium">{trade.symbol} {trade.strike} {trade.type}</div>
                        <div className="text-sm text-muted-foreground">
                          Qty: {trade.quantity} @ ₹{trade.price} = ₹{trade.amount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">{new Date(trade.time).toLocaleTimeString()}</div>
                      {trade.pnl && (
                        <div className={`text-sm font-medium ${trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {trade.pnl >= 0 ? '+' : ''}₹{Math.abs(trade.pnl)}
                        </div>
                      )}
                      <Badge 
                        variant={trade.status === 'completed' ? 'default' : 
                                trade.status === 'pending' ? 'secondary' : 'destructive'} 
                        className="text-xs"
                      >
                        {trade.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Portfolio Beta:</span>
                    <span className="font-medium">1.24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Max Drawdown:</span>
                    <span className="font-medium text-red-600">-8.45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Sharpe Ratio:</span>
                    <span className="font-medium">1.67</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">VaR (95%):</span>
                    <span className="font-medium">₹45,230</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Net Delta:</span>
                    <span className="font-medium">0.156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Net Theta:</span>
                    <span className="font-medium text-red-600">-125.4</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Return:</span>
                    <span className="font-medium text-green-600">+6.94%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Annualized Return:</span>
                    <span className="font-medium">24.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Win Rate:</span>
                    <span className="font-medium">{portfolioStats.winRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Profit Factor:</span>
                    <span className="font-medium">2.1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Avg Hold Time:</span>
                    <span className="font-medium">3.2 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Best Trade:</span>
                    <span className="font-medium text-green-600">+₹12,450</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}