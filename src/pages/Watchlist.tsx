import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { OptionsScreener } from '../components/features/OptionsScreener'
import { 
  Star, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  Plus, 
  Bell,
  MoreHorizontal,
  Eye,
  Volume2,
  Activity,
  Target,
  AlertTriangle,
  Zap
} from 'lucide-react'

interface WatchlistItem {
  id: string
  symbol: string
  ltp: number
  change: number
  changePercent: number
  volume: number
  oi: number
  iv: number
  high: number
  low: number
  prevClose: number
  alerts: number
  isFavorite: boolean
}

interface OptionsData {
  symbol: string
  expiry: string
  strike: number
  type: 'CE' | 'PE'
  ltp: number
  change: number
  changePercent: number
  volume: number
  oi: number
  iv: number
  bid: number
  ask: number
  delta: number
  theta: number
  gamma: number
  vega: number
}

export function Watchlist() {
  const [activeTab, setActiveTab] = useState('stocks')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('change')
  const [filterType, setFilterType] = useState('all')

  const stockWatchlist: WatchlistItem[] = [
    {
      id: '1',
      symbol: 'RELIANCE',
      ltp: 2789.45,
      change: 23.80,
      changePercent: 0.86,
      volume: 890000,
      oi: 0,
      iv: 0,
      high: 2795.30,
      low: 2765.20,
      prevClose: 2765.65,
      alerts: 2,
      isFavorite: true
    },
    {
      id: '2',
      symbol: 'TCS',
      ltp: 3621.30,
      change: -12.45,
      changePercent: -0.34,
      volume: 456000,
      oi: 0,
      iv: 0,
      high: 3645.80,
      low: 3615.50,
      prevClose: 3633.75,
      alerts: 1,
      isFavorite: true
    },
    {
      id: '3',
      symbol: 'HDFC BANK',
      ltp: 1689.75,
      change: 15.25,
      changePercent: 0.91,
      volume: 1200000,
      oi: 0,
      iv: 0,
      high: 1695.40,
      low: 1678.90,
      prevClose: 1674.50,
      alerts: 0,
      isFavorite: false
    },
    {
      id: '4',
      symbol: 'INFY',
      ltp: 1456.80,
      change: 8.90,
      changePercent: 0.61,
      volume: 678000,
      oi: 0,
      iv: 0,
      high: 1462.30,
      low: 1448.75,
      prevClose: 1447.90,
      alerts: 3,
      isFavorite: true
    },
    {
      id: '5',
      symbol: 'ICICI BANK',
      ltp: 978.45,
      change: -5.65,
      changePercent: -0.57,
      volume: 890000,
      oi: 0,
      iv: 0,
      high: 985.20,
      low: 975.30,
      prevClose: 984.10,
      alerts: 1,
      isFavorite: false
    }
  ]

  const indexWatchlist: WatchlistItem[] = [
    {
      id: '1',
      symbol: 'NIFTY',
      ltp: 19674.25,
      change: 127.35,
      changePercent: 0.65,
      volume: 2400000,
      oi: 0,
      iv: 0,
      high: 19698.50,
      low: 19545.80,
      prevClose: 19546.90,
      alerts: 5,
      isFavorite: true
    },
    {
      id: '2',
      symbol: 'BANKNIFTY',
      ltp: 44892.80,
      change: -89.45,
      changePercent: -0.20,
      volume: 1800000,
      oi: 0,
      iv: 0,
      high: 45125.30,
      low: 44785.60,
      prevClose: 44982.25,
      alerts: 2,
      isFavorite: true
    },
    {
      id: '3',
      symbol: 'FINNIFTY',
      ltp: 20145.75,
      change: 45.80,
      changePercent: 0.23,
      volume: 890000,
      oi: 0,
      iv: 0,
      high: 20178.90,
      low: 20089.45,
      prevClose: 20099.95,
      alerts: 1,
      isFavorite: false
    }
  ]

  const optionsWatchlist: OptionsData[] = [
    {
      symbol: 'NIFTY',
      expiry: '28-Dec-2023',
      strike: 19700,
      type: 'CE',
      ltp: 84.70,
      change: 25.45,
      changePercent: 42.95,
      volume: 345000,
      oi: 5890000,
      iv: 16.55,
      bid: 84.25,
      ask: 85.15,
      delta: 0.58,
      theta: -4.50,
      gamma: 0.018,
      vega: 18.7
    },
    {
      symbol: 'NIFTY',
      expiry: '28-Dec-2023',
      strike: 19700,
      type: 'PE',
      ltp: 168.35,
      change: 0.85,
      changePercent: 0.51,
      volume: 267000,
      oi: 4500000,
      iv: 18.20,
      bid: 167.85,
      ask: 168.85,
      delta: -0.42,
      theta: -3.80,
      gamma: 0.018,
      vega: 18.7
    },
    {
      symbol: 'BANKNIFTY',
      expiry: '28-Dec-2023',
      strike: 45000,
      type: 'CE',
      ltp: 245.60,
      change: -15.30,
      changePercent: -5.86,
      volume: 189000,
      oi: 2890000,
      iv: 17.85,
      bid: 244.90,
      ask: 246.30,
      delta: 0.52,
      theta: -6.20,
      gamma: 0.012,
      vega: 25.4
    },
    {
      symbol: 'RELIANCE',
      expiry: '28-Dec-2023',
      strike: 2800,
      type: 'CE',
      ltp: 45.20,
      change: 12.45,
      changePercent: 38.02,
      volume: 125000,
      oi: 2450000,
      iv: 18.45,
      bid: 44.50,
      ask: 46.10,
      delta: 0.65,
      theta: -2.45,
      gamma: 0.012,
      vega: 12.5
    }
  ]

  const toggleFavorite = (id: string, list: 'stocks' | 'indices') => {
    // Implementation for toggling favorite status
    console.log(`Toggle favorite for ${id} in ${list}`)
  }

  const addAlert = (symbol: string) => {
    // Implementation for adding alerts
    console.log(`Add alert for ${symbol}`)
  }

  const getCurrentWatchlist = () => {
    switch (activeTab) {
      case 'stocks':
        return stockWatchlist
      case 'indices':
        return indexWatchlist
      default:
        return []
    }
  }

  const filteredWatchlist = getCurrentWatchlist().filter(item => {
    const matchesSearch = item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || 
      (filterType === 'gainers' && item.change > 0) ||
      (filterType === 'losers' && item.change < 0) ||
      (filterType === 'favorites' && item.isFavorite)
    return matchesSearch && matchesFilter
  })

  const sortedWatchlist = [...filteredWatchlist].sort((a, b) => {
    switch (sortBy) {
      case 'change':
        return b.changePercent - a.changePercent
      case 'volume':
        return b.volume - a.volume
      case 'symbol':
        return a.symbol.localeCompare(b.symbol)
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Watchlist</h1>
          <p className="text-muted-foreground">Monitor your favorite stocks, indices, and options with real-time data</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Symbol
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-muted-foreground">Gainers</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">8</div>
              <div className="text-sm text-muted-foreground">Losers</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">7</div>
              <div className="text-sm text-muted-foreground">Active Alerts</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">25</div>
              <div className="text-sm text-muted-foreground">Total Symbols</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="indices">Indices</TabsTrigger>
          <TabsTrigger value="options">Options</TabsTrigger>
          <TabsTrigger value="screener">Screener</TabsTrigger>
        </TabsList>

        <TabsContent value="stocks" className="space-y-4">
          {/* Controls */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search stocks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="change">Sort by Change</SelectItem>
                    <SelectItem value="volume">Sort by Volume</SelectItem>
                    <SelectItem value="symbol">Sort by Symbol</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="gainers">Gainers</SelectItem>
                    <SelectItem value="losers">Losers</SelectItem>
                    <SelectItem value="favorites">Favorites</SelectItem>
                  </SelectContent>
                </Select>
                <Badge variant="secondary" className="ml-auto">
                  Live Data
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Stocks Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Stock Watchlist</span>
                <Badge variant="secondary">{sortedWatchlist.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead></TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>LTP</TableHead>
                      <TableHead>Change</TableHead>
                      <TableHead>% Change</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>High</TableHead>
                      <TableHead>Low</TableHead>
                      <TableHead>Alerts</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedWatchlist.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(item.id, 'stocks')}
                            className="p-1"
                          >
                            <Star className={`h-4 w-4 ${item.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium">{item.symbol}</TableCell>
                        <TableCell className="font-bold">₹{item.ltp.toLocaleString()}</TableCell>
                        <TableCell className={`${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          <div className="flex items-center space-x-1">
                            {item.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            <span>{item.change >= 0 ? '+' : ''}₹{Math.abs(item.change)}</span>
                          </div>
                        </TableCell>
                        <TableCell className={`font-medium ${item.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.changePercent >= 0 ? '+' : ''}{item.changePercent}%
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Volume2 className="h-3 w-3 text-muted-foreground" />
                            <span>{(item.volume / 1000).toFixed(0)}K</span>
                          </div>
                        </TableCell>
                        <TableCell>₹{item.high.toLocaleString()}</TableCell>
                        <TableCell>₹{item.low.toLocaleString()}</TableCell>
                        <TableCell>
                          {item.alerts > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {item.alerts}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => addAlert(item.symbol)}
                              className="p-1"
                            >
                              <Bell className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-1">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="indices" className="space-y-4">
          {/* Controls */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search indices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
                <Badge variant="secondary" className="ml-auto">
                  Live Data
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Indices Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Index Watchlist</span>
                <Badge variant="secondary">{indexWatchlist.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead></TableHead>
                      <TableHead>Index</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Change</TableHead>
                      <TableHead>% Change</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>High</TableHead>
                      <TableHead>Low</TableHead>
                      <TableHead>Alerts</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {indexWatchlist.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(item.id, 'indices')}
                            className="p-1"
                          >
                            <Star className={`h-4 w-4 ${item.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium">{item.symbol}</TableCell>
                        <TableCell className="font-bold">{item.ltp.toLocaleString()}</TableCell>
                        <TableCell className={`${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          <div className="flex items-center space-x-1">
                            {item.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            <span>{item.change >= 0 ? '+' : ''}{Math.abs(item.change)}</span>
                          </div>
                        </TableCell>
                        <TableCell className={`font-medium ${item.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.changePercent >= 0 ? '+' : ''}{item.changePercent}%
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Volume2 className="h-3 w-3 text-muted-foreground" />
                            <span>{(item.volume / 1000000).toFixed(1)}M</span>
                          </div>
                        </TableCell>
                        <TableCell>{item.high.toLocaleString()}</TableCell>
                        <TableCell>{item.low.toLocaleString()}</TableCell>
                        <TableCell>
                          {item.alerts > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {item.alerts}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => addAlert(item.symbol)}
                              className="p-1"
                            >
                              <Bell className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-1">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="options" className="space-y-4">
          {/* Options Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Options Watchlist</span>
                <Badge variant="secondary">{optionsWatchlist.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Strike</TableHead>
                      <TableHead>Expiry</TableHead>
                      <TableHead>LTP</TableHead>
                      <TableHead>Change</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>OI</TableHead>
                      <TableHead>IV</TableHead>
                      <TableHead>Delta</TableHead>
                      <TableHead>Theta</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {optionsWatchlist.map((option, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{option.symbol}</TableCell>
                        <TableCell>
                          <Badge variant={option.type === 'CE' ? 'default' : 'secondary'}>
                            {option.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{option.strike}</TableCell>
                        <TableCell className="text-sm">{option.expiry}</TableCell>
                        <TableCell className="font-bold">₹{option.ltp}</TableCell>
                        <TableCell className={`${option.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          <div>
                            <div className="font-medium">
                              {option.change >= 0 ? '+' : ''}₹{Math.abs(option.change)}
                            </div>
                            <div className="text-xs">
                              {option.changePercent >= 0 ? '+' : ''}{option.changePercent}%
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Volume2 className="h-3 w-3 text-muted-foreground" />
                            <span>{(option.volume / 1000).toFixed(0)}K</span>
                          </div>
                        </TableCell>
                        <TableCell>{(option.oi / 100000).toFixed(1)}L</TableCell>
                        <TableCell>{option.iv}%</TableCell>
                        <TableCell className={option.delta >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {option.delta.toFixed(3)}
                        </TableCell>
                        <TableCell className="text-red-600">
                          {option.theta.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm" className="p-1">
                              <Bell className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-1">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Options Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <Zap className="h-8 w-8 text-yellow-600" />
                  <div>
                    <div className="font-medium">High IV Options</div>
                    <div className="text-sm text-muted-foreground">15 options above 25% IV</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                  <div>
                    <div className="font-medium">Expiring Soon</div>
                    <div className="text-sm text-muted-foreground">8 options expire this week</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <Volume2 className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="font-medium">High Volume</div>
                    <div className="text-sm text-muted-foreground">12 options with unusual volume</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="screener" className="space-y-4">
          <OptionsScreener />
        </TabsContent>
      </Tabs>
    </div>
  )
}