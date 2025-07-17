import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Switch } from '../components/ui/switch'
import { Slider } from '../components/ui/slider'
import { TradingChart, generateSampleData } from '../components/ui/trading-chart'
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  TrendingUp, 
  TrendingDown,
  Volume2,
  Activity,
  Target,
  Zap,
  Eye,
  Bell,
  Settings,
  BarChart3,
  Calculator,
  AlertTriangle,
  Loader2
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { useOptionsChain, useRealTimePrice } from '../hooks/useLiveData'

interface OptionData {
  strike: number
  call: {
    oi: number
    volume: number
    iv: number
    ltp: number
    change: number
    bid: number
    ask: number
    delta: number
    gamma: number
    theta: number
    vega: number
    intrinsic: number
    timeValue: number
  }
  put: {
    oi: number
    volume: number
    iv: number
    ltp: number
    change: number
    bid: number
    ask: number
    delta: number
    gamma: number
    theta: number
    vega: number
    intrinsic: number
    timeValue: number
  }
}

export function OptionsChain() {
  const [selectedSymbol, setSelectedSymbol] = useState('NIFTY')
  const [selectedExpiry, setSelectedExpiry] = useState('28-Dec-2023')
  const [searchTerm, setSearchTerm] = useState('')
  const [showGreeks, setShowGreeks] = useState(false)
  const [highlightITM, setHighlightITM] = useState(true)
  const [minVolume, setMinVolume] = useState([0])
  const [maxIV, setMaxIV] = useState([50])
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState(5)

  // Use live data hooks
  const { 
    data: optionsData, 
    loading: optionsLoading, 
    error: optionsError, 
    refresh: refreshOptions,
    isMarketOpen 
  } = useOptionsChain(selectedSymbol, selectedExpiry, autoRefresh ? refreshInterval * 1000 : 0)

  const { 
    price: spotPrice, 
    change: spotChange, 
    changePercent: spotChangePercent 
  } = useRealTimePrice(selectedSymbol)

  // Use default spot price if live data not available yet
  const currentSpotPrice = spotPrice || (selectedSymbol === 'NIFTY' ? 19674.25 : 44892.80)

  const getStrikeRowClass = (strike: number) => {
    const diff = Math.abs(strike - currentSpotPrice)
    if (diff <= 25) return 'bg-yellow-50 border-yellow-200 font-medium'
    if (diff <= 50) return 'bg-blue-50 border-blue-200'
    return ''
  }

  const getITMClass = (strike: number, type: 'call' | 'put') => {
    if (!highlightITM) return ''
    if (type === 'call' && strike < currentSpotPrice) return 'bg-green-50'
    if (type === 'put' && strike > currentSpotPrice) return 'bg-green-50'
    return ''
  }

  const filteredData = optionsData.filter(row => {
    if (searchTerm && !row.strike.toString().includes(searchTerm)) return false
    if (row.call.volume < minVolume[0] * 1000 && row.put.volume < minVolume[0] * 1000) return false
    if (row.call.iv > maxIV[0] && row.put.iv > maxIV[0]) return false
    return true
  })

  // Calculate analytics
  const totalCallOI = optionsData.reduce((sum, row) => sum + row.call.oi, 0)
  const totalPutOI = optionsData.reduce((sum, row) => sum + row.put.oi, 0)
  const pcrOI = totalPutOI / totalCallOI
  const totalCallVolume = optionsData.reduce((sum, row) => sum + row.call.volume, 0)
  const totalPutVolume = optionsData.reduce((sum, row) => sum + row.put.volume, 0)
  const pcrVolume = totalPutVolume / totalCallVolume

  // Max Pain calculation (simplified)
  const maxPainStrike = optionsData.reduce((maxPain, row) => {
    const callPain = optionsData
      .filter(r => r.strike < row.strike)
      .reduce((sum, r) => sum + r.call.oi * (row.strike - r.strike), 0)
    const putPain = optionsData
      .filter(r => r.strike > row.strike)
      .reduce((sum, r) => sum + r.put.oi * (r.strike - row.strike), 0)
    const totalPain = callPain + putPain
    return totalPain < maxPain.pain ? { strike: row.strike, pain: totalPain } : maxPain
  }, { strike: 19700, pain: Infinity }).strike

  // OI Change data for chart
  const oiChangeData = optionsData.map(row => ({
    strike: row.strike,
    callOI: row.call.oi / 100000,
    putOI: -row.put.oi / 100000,
    callVolume: row.call.volume / 1000,
    putVolume: -row.put.volume / 1000
  }))

  useEffect(() => {
    if (!autoRefresh) return
    const interval = setInterval(() => {
      // Simulate data refresh
      console.log('Refreshing options data...')
    }, refreshInterval * 1000)
    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-foreground">Options Chain</h1>
            {optionsLoading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
            <Badge variant={isMarketOpen ? "default" : "secondary"} className={isMarketOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
              {isMarketOpen ? "Live Data" : "Market Closed"}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Real-time options data with live pricing and Greeks
            {optionsError && <span className="text-red-600 ml-2">• Error loading data</span>}
          </p>
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
          <Button 
            size="sm" 
            onClick={refreshOptions}
            disabled={optionsLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${optionsLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Symbol:</label>
              <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NIFTY">NIFTY</SelectItem>
                  <SelectItem value="BANKNIFTY">BANKNIFTY</SelectItem>
                  <SelectItem value="RELIANCE">RELIANCE</SelectItem>
                  <SelectItem value="TCS">TCS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Expiry:</label>
              <Select value={selectedExpiry} onValueChange={setSelectedExpiry}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="28-Dec-2023">28 Dec 2023</SelectItem>
                  <SelectItem value="04-Jan-2024">04 Jan 2024</SelectItem>
                  <SelectItem value="11-Jan-2024">11 Jan 2024</SelectItem>
                  <SelectItem value="25-Jan-2024">25 Jan 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search strikes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Spot Price</div>
                {spotPrice ? (
                  <>
                    <div className="font-bold text-lg">₹{currentSpotPrice.toLocaleString()}</div>
                    <div className={`text-sm flex items-center justify-center ${(spotChange || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {(spotChange || 0) >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {(spotChange || 0) >= 0 ? '+' : ''}{spotChange || 0} ({(spotChangePercent || 0) >= 0 ? '+' : ''}{spotChangePercent || 0}%)
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Advanced Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
            <div className="flex items-center space-x-2">
              <Switch checked={showGreeks} onCheckedChange={setShowGreeks} />
              <label className="text-sm">Show Greeks</label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch checked={highlightITM} onCheckedChange={setHighlightITM} />
              <label className="text-sm">Highlight ITM</label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
              <label className="text-sm">Auto Refresh ({refreshInterval}s)</label>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 w-fit">
              Live Data
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
          </div>
        </CardContent>
      </Card>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{(totalCallOI / 1000000).toFixed(1)}M</div>
              <div className="text-sm text-muted-foreground">Total Call OI</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{(totalPutOI / 1000000).toFixed(1)}M</div>
              <div className="text-sm text-muted-foreground">Total Put OI</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{pcrOI.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">PCR (OI)</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{maxPainStrike}</div>
              <div className="text-sm text-muted-foreground">Max Pain</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{pcrVolume.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">PCR (Volume)</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* TradingView Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{selectedSymbol} Price Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <TradingChart
              data={generateSampleData('candlestick', 50)}
              type="candlestick"
              height={300}
              symbol={selectedSymbol}
              className="w-full"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>IV Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <TradingChart
              data={generateSampleData('line', 50)}
              type="line"
              height={300}
              symbol={`${selectedSymbol} IV`}
              className="w-full"
            />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="chain" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chain">Options Chain</TabsTrigger>
          <TabsTrigger value="analytics">OI Analytics</TabsTrigger>
          <TabsTrigger value="volume">Volume Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="chain">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Options Chain - {selectedSymbol} ({selectedExpiry})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">OI</TableHead>
                      <TableHead className="text-center">Volume</TableHead>
                      <TableHead className="text-center">IV</TableHead>
                      <TableHead className="text-center">LTP</TableHead>
                      <TableHead className="text-center">Change</TableHead>
                      <TableHead className="text-center">Bid</TableHead>
                      <TableHead className="text-center">Ask</TableHead>
                      {showGreeks && (
                        <>
                          <TableHead className="text-center">Delta</TableHead>
                          <TableHead className="text-center">Gamma</TableHead>
                          <TableHead className="text-center">Theta</TableHead>
                        </>
                      )}
                      <TableHead className="text-center font-bold bg-primary/10">STRIKE</TableHead>
                      {showGreeks && (
                        <>
                          <TableHead className="text-center">Theta</TableHead>
                          <TableHead className="text-center">Gamma</TableHead>
                          <TableHead className="text-center">Delta</TableHead>
                        </>
                      )}
                      <TableHead className="text-center">Bid</TableHead>
                      <TableHead className="text-center">Ask</TableHead>
                      <TableHead className="text-center">Change</TableHead>
                      <TableHead className="text-center">LTP</TableHead>
                      <TableHead className="text-center">IV</TableHead>
                      <TableHead className="text-center">Volume</TableHead>
                      <TableHead className="text-center">OI</TableHead>
                    </TableRow>
                    <TableRow className="text-xs text-muted-foreground">
                      <TableHead className="text-center" colSpan={showGreeks ? 10 : 7}>CALLS</TableHead>
                      <TableHead className="text-center"></TableHead>
                      <TableHead className="text-center" colSpan={showGreeks ? 10 : 7}>PUTS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((row, index) => (
                      <TableRow key={index} className={getStrikeRowClass(row.strike)}>
                        {/* Call Options */}
                        <TableCell className={`text-center text-sm ${getITMClass(row.strike, 'call')}`}>
                          <div className="flex items-center justify-center space-x-1">
                            <Volume2 className="h-3 w-3 text-muted-foreground" />
                            <span>{(row.call.oi / 100000).toFixed(1)}L</span>
                          </div>
                        </TableCell>
                        <TableCell className={`text-center text-sm ${getITMClass(row.strike, 'call')}`}>
                          {(row.call.volume / 1000).toFixed(0)}K
                        </TableCell>
                        <TableCell className={`text-center text-sm ${getITMClass(row.strike, 'call')}`}>
                          {row.call.iv}%
                        </TableCell>
                        <TableCell className={`text-center font-medium ${getITMClass(row.strike, 'call')}`}>
                          ₹{row.call.ltp}
                        </TableCell>
                        <TableCell className={`text-center text-sm ${row.call.change >= 0 ? 'text-green-600' : 'text-red-600'} ${getITMClass(row.strike, 'call')}`}>
                          {row.call.change >= 0 ? '+' : ''}₹{Math.abs(row.call.change)}
                        </TableCell>
                        <TableCell className={`text-center text-sm text-blue-600 ${getITMClass(row.strike, 'call')}`}>
                          ₹{row.call.bid}
                        </TableCell>
                        <TableCell className={`text-center text-sm text-red-600 ${getITMClass(row.strike, 'call')}`}>
                          ₹{row.call.ask}
                        </TableCell>
                        
                        {showGreeks && (
                          <>
                            <TableCell className={`text-center text-xs ${getITMClass(row.strike, 'call')}`}>
                              {row.call.delta.toFixed(3)}
                            </TableCell>
                            <TableCell className={`text-center text-xs ${getITMClass(row.strike, 'call')}`}>
                              {row.call.gamma.toFixed(3)}
                            </TableCell>
                            <TableCell className={`text-center text-xs text-red-600 ${getITMClass(row.strike, 'call')}`}>
                              {row.call.theta.toFixed(1)}
                            </TableCell>
                          </>
                        )}
                        
                        {/* Strike Price */}
                        <TableCell className="text-center font-bold text-lg bg-primary/10">
                          <div className="flex flex-col items-center">
                            <span>{row.strike}</span>
                            {row.strike === maxPainStrike && (
                              <Badge variant="secondary" className="text-xs mt-1">Max Pain</Badge>
                            )}
                          </div>
                        </TableCell>
                        
                        {showGreeks && (
                          <>
                            <TableCell className={`text-center text-xs text-red-600 ${getITMClass(row.strike, 'put')}`}>
                              {row.put.theta.toFixed(1)}
                            </TableCell>
                            <TableCell className={`text-center text-xs ${getITMClass(row.strike, 'put')}`}>
                              {row.put.gamma.toFixed(3)}
                            </TableCell>
                            <TableCell className={`text-center text-xs ${getITMClass(row.strike, 'put')}`}>
                              {row.put.delta.toFixed(3)}
                            </TableCell>
                          </>
                        )}
                        
                        {/* Put Options */}
                        <TableCell className={`text-center text-sm text-blue-600 ${getITMClass(row.strike, 'put')}`}>
                          ₹{row.put.bid}
                        </TableCell>
                        <TableCell className={`text-center text-sm text-red-600 ${getITMClass(row.strike, 'put')}`}>
                          ₹{row.put.ask}
                        </TableCell>
                        <TableCell className={`text-center text-sm ${row.put.change >= 0 ? 'text-green-600' : 'text-red-600'} ${getITMClass(row.strike, 'put')}`}>
                          {row.put.change >= 0 ? '+' : ''}₹{Math.abs(row.put.change)}
                        </TableCell>
                        <TableCell className={`text-center font-medium ${getITMClass(row.strike, 'put')}`}>
                          ₹{row.put.ltp}
                        </TableCell>
                        <TableCell className={`text-center text-sm ${getITMClass(row.strike, 'put')}`}>
                          {row.put.iv}%
                        </TableCell>
                        <TableCell className={`text-center text-sm ${getITMClass(row.strike, 'put')}`}>
                          {(row.put.volume / 1000).toFixed(0)}K
                        </TableCell>
                        <TableCell className={`text-center text-sm ${getITMClass(row.strike, 'put')}`}>
                          <div className="flex items-center justify-center space-x-1">
                            <Volume2 className="h-3 w-3 text-muted-foreground" />
                            <span>{(row.put.oi / 100000).toFixed(1)}L</span>
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

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Open Interest Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={oiChangeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="strike" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `${Math.abs(value)}L`} />
                    <Tooltip 
                      formatter={(value: any, name: string) => [
                        `${Math.abs(value).toFixed(1)}L`, 
                        name === 'callOI' ? 'Call OI' : 'Put OI'
                      ]}
                      labelFormatter={(label) => `Strike: ${label}`}
                    />
                    <Bar dataKey="callOI" fill="#00d4aa" name="callOI" />
                    <Bar dataKey="putOI" fill="#ef4444" name="putOI" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="volume">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Volume2 className="h-5 w-5" />
                <span>Volume Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={oiChangeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="strike" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `${Math.abs(value)}K`} />
                    <Tooltip 
                      formatter={(value: any, name: string) => [
                        `${Math.abs(value).toFixed(0)}K`, 
                        name === 'callVolume' ? 'Call Volume' : 'Put Volume'
                      ]}
                      labelFormatter={(label) => `Strike: ${label}`}
                    />
                    <Bar dataKey="callVolume" fill="#3b82f6" name="callVolume" />
                    <Bar dataKey="putVolume" fill="#f59e0b" name="putVolume" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}