import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Slider } from '../ui/slider'
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Volume2,
  Zap,
  Target,
  AlertTriangle,
  Eye,
  Bell
} from 'lucide-react'

interface ScreenerOption {
  id: string
  symbol: string
  expiry: string
  strike: number
  type: 'CE' | 'PE'
  ltp: number
  change: number
  changePercent: number
  volume: number
  oi: number
  oiChange: number
  iv: number
  delta: number
  gamma: number
  theta: number
  vega: number
  bid: number
  ask: number
  spread: number
  spreadPercent: number
  timeToExpiry: number
  moneyness: string
  liquidity: 'High' | 'Medium' | 'Low'
  unusualActivity: boolean
}

export function OptionsScreener() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSymbol, setSelectedSymbol] = useState('all')
  const [selectedExpiry, setSelectedExpiry] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [minVolume, setMinVolume] = useState([0])
  const [maxIV, setMaxIV] = useState([100])
  const [moneyness, setMoneyness] = useState('all')
  const [sortBy, setSortBy] = useState('volume')
  const [sortOrder, setSortOrder] = useState('desc')

  const screenerData: ScreenerOption[] = [
    {
      id: '1',
      symbol: 'NIFTY',
      expiry: '28-Dec-2023',
      strike: 19700,
      type: 'CE',
      ltp: 84.70,
      change: 25.45,
      changePercent: 42.95,
      volume: 345000,
      oi: 5890000,
      oiChange: 125000,
      iv: 16.55,
      delta: 0.58,
      gamma: 0.018,
      theta: -4.50,
      vega: 18.7,
      bid: 84.25,
      ask: 85.15,
      spread: 0.90,
      spreadPercent: 1.06,
      timeToExpiry: 6,
      moneyness: 'ATM',
      liquidity: 'High',
      unusualActivity: true
    },
    {
      id: '2',
      symbol: 'BANKNIFTY',
      expiry: '28-Dec-2023',
      strike: 45000,
      type: 'PE',
      ltp: 245.60,
      change: -15.30,
      changePercent: -5.86,
      volume: 189000,
      oi: 2890000,
      oiChange: -45000,
      iv: 17.85,
      delta: -0.48,
      gamma: 0.012,
      theta: -6.20,
      vega: 25.4,
      bid: 244.90,
      ask: 246.30,
      spread: 1.40,
      spreadPercent: 0.57,
      timeToExpiry: 6,
      moneyness: 'ATM',
      liquidity: 'High',
      unusualActivity: false
    },
    {
      id: '3',
      symbol: 'RELIANCE',
      expiry: '28-Dec-2023',
      strike: 2800,
      type: 'CE',
      ltp: 45.20,
      change: 12.45,
      changePercent: 38.02,
      volume: 125000,
      oi: 2450000,
      oiChange: 89000,
      iv: 18.45,
      delta: 0.65,
      gamma: 0.012,
      theta: -2.45,
      vega: 12.5,
      bid: 44.50,
      ask: 46.10,
      spread: 1.60,
      spreadPercent: 3.54,
      timeToExpiry: 6,
      moneyness: 'ITM',
      liquidity: 'Medium',
      unusualActivity: true
    },
    {
      id: '4',
      symbol: 'TCS',
      expiry: '04-Jan-2024',
      strike: 3600,
      type: 'PE',
      ltp: 28.75,
      change: -8.20,
      changePercent: -22.20,
      volume: 89000,
      oi: 1890000,
      oiChange: -25000,
      iv: 19.20,
      delta: -0.35,
      gamma: 0.008,
      theta: -3.20,
      vega: 15.2,
      bid: 28.25,
      ask: 29.25,
      spread: 1.00,
      spreadPercent: 3.48,
      timeToExpiry: 13,
      moneyness: 'OTM',
      liquidity: 'Medium',
      unusualActivity: false
    },
    {
      id: '5',
      symbol: 'HDFC BANK',
      expiry: '04-Jan-2024',
      strike: 1700,
      type: 'CE',
      ltp: 12.30,
      change: 1.85,
      changePercent: 17.70,
      volume: 156000,
      oi: 3100000,
      oiChange: 67000,
      iv: 16.80,
      delta: 0.72,
      gamma: 0.015,
      theta: -1.85,
      vega: 8.9,
      bid: 12.05,
      ask: 12.55,
      spread: 0.50,
      spreadPercent: 4.07,
      timeToExpiry: 13,
      moneyness: 'ITM',
      liquidity: 'High',
      unusualActivity: false
    },
    {
      id: '6',
      symbol: 'NIFTY',
      expiry: '28-Dec-2023',
      strike: 19800,
      type: 'CE',
      ltp: 34.25,
      change: 12.80,
      changePercent: 59.72,
      volume: 267000,
      oi: 2650000,
      oiChange: 156000,
      iv: 15.85,
      delta: 0.35,
      gamma: 0.020,
      theta: -5.20,
      vega: 16.8,
      bid: 33.90,
      ask: 34.60,
      spread: 0.70,
      spreadPercent: 2.04,
      timeToExpiry: 6,
      moneyness: 'OTM',
      liquidity: 'High',
      unusualActivity: true
    }
  ]

  const filteredData = screenerData.filter(option => {
    const matchesSearch = option.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSymbol = selectedSymbol === 'all' || option.symbol === selectedSymbol
    const matchesExpiry = selectedExpiry === 'all' || option.expiry === selectedExpiry
    const matchesType = selectedType === 'all' || option.type === selectedType
    const matchesVolume = option.volume >= minVolume[0] * 1000
    const matchesIV = option.iv <= maxIV[0]
    const matchesMoneyness = moneyness === 'all' || option.moneyness === moneyness
    
    return matchesSearch && matchesSymbol && matchesExpiry && matchesType && 
           matchesVolume && matchesIV && matchesMoneyness
  })

  const sortedData = [...filteredData].sort((a, b) => {
    let aValue: any = a[sortBy as keyof ScreenerOption]
    let bValue: any = b[sortBy as keyof ScreenerOption]
    
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

  const getMoneynessBadge = (moneyness: string) => {
    switch (moneyness) {
      case 'ITM':
        return <Badge variant="default" className="bg-green-100 text-green-800">ITM</Badge>
      case 'ATM':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">ATM</Badge>
      case 'OTM':
        return <Badge variant="outline" className="bg-red-100 text-red-800">OTM</Badge>
      default:
        return <Badge variant="outline">{moneyness}</Badge>
    }
  }

  const getLiquidityBadge = (liquidity: string) => {
    switch (liquidity) {
      case 'High':
        return <Badge variant="default" className="bg-green-100 text-green-800">High</Badge>
      case 'Medium':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case 'Low':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Low</Badge>
      default:
        return <Badge variant="outline">{liquidity}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Options Screener</h2>
          <p className="text-muted-foreground">Advanced filtering and analysis of options contracts</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Search Symbol</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search symbols..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Symbol</label>
              <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Symbols</SelectItem>
                  <SelectItem value="NIFTY">NIFTY</SelectItem>
                  <SelectItem value="BANKNIFTY">BANKNIFTY</SelectItem>
                  <SelectItem value="RELIANCE">RELIANCE</SelectItem>
                  <SelectItem value="TCS">TCS</SelectItem>
                  <SelectItem value="HDFC BANK">HDFC BANK</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Expiry</label>
              <Select value={selectedExpiry} onValueChange={setSelectedExpiry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Expiries</SelectItem>
                  <SelectItem value="28-Dec-2023">28 Dec 2023</SelectItem>
                  <SelectItem value="04-Jan-2024">04 Jan 2024</SelectItem>
                  <SelectItem value="11-Jan-2024">11 Jan 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="CE">Calls (CE)</SelectItem>
                  <SelectItem value="PE">Puts (PE)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Min Volume: {minVolume[0]}K+
              </label>
              <Slider
                value={minVolume}
                onValueChange={setMinVolume}
                max={500}
                step={10}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Max IV: {maxIV[0]}%
              </label>
              <Slider
                value={maxIV}
                onValueChange={setMaxIV}
                max={50}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Moneyness</label>
              <Select value={moneyness} onValueChange={setMoneyness}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="ITM">In The Money</SelectItem>
                  <SelectItem value="ATM">At The Money</SelectItem>
                  <SelectItem value="OTM">Out The Money</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Screener Results</span>
              <Badge variant="secondary">{sortedData.length} options</Badge>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="volume">Volume</SelectItem>
                  <SelectItem value="changePercent">% Change</SelectItem>
                  <SelectItem value="iv">IV</SelectItem>
                  <SelectItem value="oi">Open Interest</SelectItem>
                  <SelectItem value="ltp">LTP</SelectItem>
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
                  <TableHead>Strike</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>LTP</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>OI</TableHead>
                  <TableHead>IV</TableHead>
                  <TableHead>Delta</TableHead>
                  <TableHead>Theta</TableHead>
                  <TableHead>Moneyness</TableHead>
                  <TableHead>Liquidity</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((option) => (
                  <TableRow key={option.id} className={option.unusualActivity ? 'bg-yellow-50' : ''}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <span>{option.symbol}</span>
                        {option.unusualActivity && (
                          <Zap className="h-4 w-4 text-yellow-600" title="Unusual Activity" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{option.strike}</TableCell>
                    <TableCell>
                      <Badge variant={option.type === 'CE' ? 'default' : 'secondary'}>
                        {option.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{option.expiry}</TableCell>
                    <TableCell className="font-medium">₹{option.ltp}</TableCell>
                    <TableCell>
                      <div className={`${option.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
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
                    <TableCell>
                      <div>
                        <div>{(option.oi / 100000).toFixed(1)}L</div>
                        <div className={`text-xs ${option.oiChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {option.oiChange >= 0 ? '+' : ''}{(option.oiChange / 1000).toFixed(0)}K
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{option.iv}%</TableCell>
                    <TableCell className={option.delta >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {option.delta.toFixed(3)}
                    </TableCell>
                    <TableCell className="text-red-600">
                      {option.theta.toFixed(2)}
                    </TableCell>
                    <TableCell>{getMoneynessBadge(option.moneyness)}</TableCell>
                    <TableCell>{getLiquidityBadge(option.liquidity)}</TableCell>
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {sortedData.filter(o => o.unusualActivity).length}
              </div>
              <div className="text-sm text-muted-foreground">Unusual Activity</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {sortedData.filter(o => o.liquidity === 'High').length}
              </div>
              <div className="text-sm text-muted-foreground">High Liquidity</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {(sortedData.reduce((sum, o) => sum + o.volume, 0) / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-muted-foreground">Total Volume</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {(sortedData.reduce((sum, o) => sum + o.oi, 0) / 10000000).toFixed(1)}Cr
              </div>
              <div className="text-sm text-muted-foreground">Total OI</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}