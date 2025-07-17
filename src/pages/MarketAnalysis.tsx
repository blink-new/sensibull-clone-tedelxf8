import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Progress } from '../components/ui/progress'
import { TradingChart, generateSampleData } from '../components/ui/trading-chart'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Target,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  AlertTriangle,
  Zap,
  Volume2,
  Clock,
  Calendar,
  Settings,
  DollarSign,
  Users,
  Globe,
  Layers,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Loader2
} from 'lucide-react'
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area, ComposedChart } from 'recharts'
import { useMarketData } from '../hooks/useLiveData'

interface MarketSentiment {
  indicator: string
  value: number
  status: 'bullish' | 'bearish' | 'neutral'
  change: number
  description: string
}

interface SupportResistance {
  level: number
  type: 'support' | 'resistance'
  strength: 'strong' | 'medium' | 'weak'
  touches: number
  lastTested: string
}

interface FIIData {
  date: string
  equity: number
  debt: number
  hybrid: number
  total: number
}

interface SectorPerformance {
  sector: string
  change: number
  volume: number
  marketCap: number
  pe: number
  leaders: string[]
  laggards: string[]
}

export function MarketAnalysis() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [selectedIndex, setSelectedIndex] = useState('NIFTY')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAnalysis, setSelectedAnalysis] = useState('overview')

  // Use live market data
  const { data: marketData, loading, refresh, isMarketOpen } = useMarketData(['NIFTY', 'BANKNIFTY', 'SENSEX'], 10000)

  const marketSentiment: MarketSentiment[] = [
    {
      indicator: 'Fear & Greed Index',
      value: 72,
      status: 'bullish',
      change: 5,
      description: 'Market showing greed signals'
    },
    {
      indicator: 'VIX',
      value: 14.25,
      status: 'neutral',
      change: -1.2,
      description: 'Low volatility environment'
    },
    {
      indicator: 'Put-Call Ratio',
      value: 0.85,
      status: 'bullish',
      change: -0.05,
      description: 'More calls than puts'
    },
    {
      indicator: 'Advance-Decline',
      value: 1.8,
      status: 'bullish',
      change: 0.3,
      description: 'More advances than declines'
    },
    {
      indicator: 'High-Low Index',
      value: 68,
      status: 'bullish',
      change: 8,
      description: 'Strong momentum'
    }
  ]

  const supportResistanceLevels: SupportResistance[] = [
    { level: 19800, type: 'resistance', strength: 'strong', touches: 5, lastTested: '2023-12-20' },
    { level: 19700, type: 'resistance', strength: 'medium', touches: 3, lastTested: '2023-12-22' },
    { level: 19600, type: 'support', strength: 'strong', touches: 4, lastTested: '2023-12-21' },
    { level: 19500, type: 'support', strength: 'medium', touches: 2, lastTested: '2023-12-19' },
    { level: 19400, type: 'support', strength: 'strong', touches: 6, lastTested: '2023-12-18' }
  ]

  const fiiData: FIIData[] = [
    { date: '18 Dec', equity: -1250, debt: 450, hybrid: -120, total: -920 },
    { date: '19 Dec', equity: 2340, debt: -230, hybrid: 180, total: 2290 },
    { date: '20 Dec', equity: -890, debt: 670, hybrid: -45, total: -265 },
    { date: '21 Dec', equity: 1560, debt: -340, hybrid: 220, total: 1440 },
    { date: '22 Dec', equity: -2100, debt: 890, hybrid: -150, total: -1360 }
  ]

  const sectorPerformance: SectorPerformance[] = [
    {
      sector: 'Banking',
      change: 1.25,
      volume: 2400000,
      marketCap: 1250000,
      pe: 12.5,
      leaders: ['HDFC Bank', 'ICICI Bank'],
      laggards: ['PNB', 'Bank of Baroda']
    },
    {
      sector: 'IT',
      change: -0.85,
      volume: 1800000,
      marketCap: 980000,
      pe: 22.8,
      leaders: ['TCS', 'Infosys'],
      laggards: ['Wipro', 'HCL Tech']
    },
    {
      sector: 'Auto',
      change: 2.15,
      volume: 1200000,
      marketCap: 450000,
      pe: 18.2,
      leaders: ['Maruti', 'Tata Motors'],
      laggards: ['Bajaj Auto', 'Hero MotoCorp']
    },
    {
      sector: 'Pharma',
      change: 0.45,
      volume: 800000,
      marketCap: 320000,
      pe: 25.6,
      leaders: ['Sun Pharma', 'Dr Reddy'],
      laggards: ['Cipla', 'Aurobindo']
    },
    {
      sector: 'Energy',
      change: 1.80,
      volume: 1500000,
      marketCap: 680000,
      pe: 15.4,
      leaders: ['Reliance', 'ONGC'],
      laggards: ['BPCL', 'IOC']
    }
  ]

  const volumeAnalysis = [
    { time: '09:30', volume: 45000, price: 19650 },
    { time: '10:00', volume: 78000, price: 19665 },
    { time: '10:30', volume: 92000, price: 19680 },
    { time: '11:00', volume: 65000, price: 19675 },
    { time: '11:30', volume: 88000, price: 19690 },
    { time: '12:00', volume: 52000, price: 19685 },
    { time: '12:30', volume: 41000, price: 19680 },
    { time: '13:00', volume: 67000, price: 19695 },
    { time: '13:30', volume: 89000, price: 19705 },
    { time: '14:00', volume: 95000, price: 19710 },
    { time: '14:30', volume: 112000, price: 19720 },
    { time: '15:00', volume: 134000, price: 19715 }
  ]

  const optionsFlow = [
    { strike: 19600, callOI: 2.5, putOI: 1.8, callVolume: 45000, putVolume: 32000 },
    { strike: 19650, callOI: 3.2, putOI: 2.1, callVolume: 67000, putVolume: 41000 },
    { strike: 19700, callOI: 4.8, putOI: 3.5, callVolume: 89000, putVolume: 78000 },
    { strike: 19750, callOI: 3.1, putOI: 2.8, callVolume: 56000, putVolume: 52000 },
    { strike: 19800, callOI: 2.2, putOI: 4.2, callVolume: 34000, putVolume: 89000 }
  ]

  const marketBreadth = {
    advancing: 1245,
    declining: 892,
    unchanged: 163,
    advanceDeclineRatio: 1.40,
    newHighs: 89,
    newLows: 23,
    highLowRatio: 3.87
  }

  const getSentimentColor = (status: string) => {
    switch (status) {
      case 'bullish': return 'text-green-600 bg-green-50'
      case 'bearish': return 'text-red-600 bg-red-50'
      case 'neutral': return 'text-blue-600 bg-blue-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'strong': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'weak': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const COLORS = ['#00d4aa', '#1a365d', '#4f46e5', '#f59e0b', '#ef4444']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-foreground">Market Analysis</h1>
            {loading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
            <Badge variant={isMarketOpen ? "default" : "secondary"} className={isMarketOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
              {isMarketOpen ? "Live Data" : "Market Closed"}
            </Badge>
          </div>
          <p className="text-muted-foreground">Comprehensive market insights and analytics</p>
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
          <Button size="sm" onClick={refresh} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-transparent rounded-bl-full"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Breadth</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{marketBreadth.advanceDeclineRatio.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">
              {marketBreadth.advancing} advances, {marketBreadth.declining} declines
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Highs/Lows</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marketBreadth.highLowRatio.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">
              {marketBreadth.newHighs} highs, {marketBreadth.newLows} lows
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FII Flow (₹Cr)</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${fiiData[fiiData.length - 1].total >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {fiiData[fiiData.length - 1].total >= 0 ? '+' : ''}₹{Math.abs(fiiData[fiiData.length - 1].total)}
            </div>
            <div className="text-xs text-muted-foreground">
              Today's net flow
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-transparent rounded-bl-full"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Sentiment</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{marketSentiment[0].value}</div>
            <div className="text-xs text-muted-foreground">
              Fear & Greed Index
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          <TabsTrigger value="levels">Levels</TabsTrigger>
          <TabsTrigger value="sectors">Sectors</TabsTrigger>
          <TabsTrigger value="options">Options Flow</TabsTrigger>
          <TabsTrigger value="institutional">FII/DII</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Volume Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Volume2 className="h-5 w-5" />
                  <span>Intraday Volume Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={volumeAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
                      <YAxis yAxisId="left" stroke="#64748b" fontSize={12} />
                      <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} />
                      <Tooltip 
                        formatter={(value: any, name: string) => [
                          name === 'volume' ? `${value.toLocaleString()}` : `₹${value}`,
                          name === 'volume' ? 'Volume' : 'Price'
                        ]}
                      />
                      <Bar yAxisId="left" dataKey="volume" fill="#00d4aa" opacity={0.6} />
                      <Line yAxisId="right" type="monotone" dataKey="price" stroke="#1a365d" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Market Breadth */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Market Breadth</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Advance/Decline Ratio</span>
                      <span className="text-lg font-bold text-green-600">{marketBreadth.advanceDeclineRatio.toFixed(2)}</span>
                    </div>
                    <Progress value={(marketBreadth.advanceDeclineRatio / 3) * 100} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Advancing: {marketBreadth.advancing}</span>
                      <span>Declining: {marketBreadth.declining}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">High/Low Ratio</span>
                      <span className="text-lg font-bold text-green-600">{marketBreadth.highLowRatio.toFixed(2)}</span>
                    </div>
                    <Progress value={(marketBreadth.highLowRatio / 5) * 100} className="h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>New Highs: {marketBreadth.newHighs}</span>
                      <span>New Lows: {marketBreadth.newLows}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{marketBreadth.advancing}</div>
                      <div className="text-sm text-muted-foreground">Advancing</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{marketBreadth.declining}</div>
                      <div className="text-sm text-muted-foreground">Declining</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sentiment">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Market Sentiment Indicators</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketSentiment.map((indicator, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{indicator.indicator}</div>
                        <div className="text-xs text-muted-foreground mt-1">{indicator.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{indicator.value}</div>
                        <div className={`text-xs flex items-center justify-end ${indicator.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {indicator.change >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                          {indicator.change >= 0 ? '+' : ''}{indicator.change}
                        </div>
                        <Badge variant="outline" className={`text-xs mt-1 ${getSentimentColor(indicator.status)}`}>
                          {indicator.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sentiment Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={[
                          { name: 'Bullish', value: 65, color: '#00d4aa' },
                          { name: 'Neutral', value: 25, color: '#64748b' },
                          { name: 'Bearish', value: 10, color: '#ef4444' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {[
                          { name: 'Bullish', value: 65, color: '#00d4aa' },
                          { name: 'Neutral', value: 25, color: '#64748b' },
                          { name: 'Bearish', value: 10, color: '#ef4444' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => [`${value}%`, 'Sentiment']} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Bullish (65%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                    <span className="text-sm">Neutral (25%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">Bearish (10%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="levels">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Support & Resistance Levels - {selectedIndex}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Select value={selectedIndex} onValueChange={setSelectedIndex}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NIFTY">NIFTY 50</SelectItem>
                    <SelectItem value="BANKNIFTY">BANK NIFTY</SelectItem>
                    <SelectItem value="SENSEX">SENSEX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Level</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Strength</TableHead>
                      <TableHead>Touches</TableHead>
                      <TableHead>Last Tested</TableHead>
                      <TableHead>Distance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supportResistanceLevels.map((level, index) => {
                      const currentPrice = 19674.25 // Current NIFTY price
                      const distance = ((level.level - currentPrice) / currentPrice * 100).toFixed(2)
                      
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{level.level}</TableCell>
                          <TableCell>
                            <Badge variant={level.type === 'resistance' ? 'destructive' : 'default'}>
                              {level.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className={`font-medium ${getStrengthColor(level.strength)}`}>
                              {level.strength}
                            </span>
                          </TableCell>
                          <TableCell>{level.touches}</TableCell>
                          <TableCell>{level.lastTested}</TableCell>
                          <TableCell className={`${parseFloat(distance) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {distance}%
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

        <TabsContent value="sectors">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5" />
                <span>Sector Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sector</TableHead>
                      <TableHead>Change (%)</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Market Cap (₹Cr)</TableHead>
                      <TableHead>P/E Ratio</TableHead>
                      <TableHead>Top Performers</TableHead>
                      <TableHead>Laggards</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sectorPerformance.map((sector, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{sector.sector}</TableCell>
                        <TableCell>
                          <div className={`flex items-center ${sector.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {sector.change >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                            {sector.change >= 0 ? '+' : ''}{sector.change}%
                          </div>
                        </TableCell>
                        <TableCell>{(sector.volume / 1000000).toFixed(1)}M</TableCell>
                        <TableCell>₹{(sector.marketCap / 1000).toFixed(0)}K Cr</TableCell>
                        <TableCell>{sector.pe}</TableCell>
                        <TableCell>
                          <div className="text-xs space-y-1">
                            {sector.leaders.map((leader, idx) => (
                              <Badge key={idx} variant="outline" className="text-green-600 mr-1">
                                {leader}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs space-y-1">
                            {sector.laggards.map((laggard, idx) => (
                              <Badge key={idx} variant="outline" className="text-red-600 mr-1">
                                {laggard}
                              </Badge>
                            ))}
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

        <TabsContent value="options">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Options Flow Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={optionsFlow}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="strike" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip 
                      formatter={(value: any, name: string) => [
                        `${value}${name.includes('OI') ? 'L' : 'K'}`,
                        name.includes('call') ? 'Call' : 'Put'
                      ]}
                    />
                    <Bar dataKey="callOI" fill="#00d4aa" name="callOI" />
                    <Bar dataKey="putOI" fill="#ef4444" name="putOI" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Strike</TableHead>
                      <TableHead>Call OI (L)</TableHead>
                      <TableHead>Put OI (L)</TableHead>
                      <TableHead>Call Volume (K)</TableHead>
                      <TableHead>Put Volume (K)</TableHead>
                      <TableHead>PCR (OI)</TableHead>
                      <TableHead>PCR (Vol)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {optionsFlow.map((flow, index) => {
                      const pcrOI = (flow.putOI / flow.callOI).toFixed(2)
                      const pcrVol = (flow.putVolume / flow.callVolume).toFixed(2)
                      
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{flow.strike}</TableCell>
                          <TableCell>{flow.callOI.toFixed(1)}</TableCell>
                          <TableCell>{flow.putOI.toFixed(1)}</TableCell>
                          <TableCell>{(flow.callVolume / 1000).toFixed(0)}</TableCell>
                          <TableCell>{(flow.putVolume / 1000).toFixed(0)}</TableCell>
                          <TableCell className={`font-medium ${parseFloat(pcrOI) > 1 ? 'text-red-600' : 'text-green-600'}`}>
                            {pcrOI}
                          </TableCell>
                          <TableCell className={`font-medium ${parseFloat(pcrVol) > 1 ? 'text-red-600' : 'text-green-600'}`}>
                            {pcrVol}
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

        <TabsContent value="institutional">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>FII Flow Trend</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={fiiData}>
                      <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#00d4aa" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `₹${value}`} />
                      <Tooltip 
                        formatter={(value: any) => [`₹${value} Cr`, 'Flow']}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="total" 
                        stroke="#00d4aa" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorTotal)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FII Flow Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fiiData.slice(-1).map((data, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-medium">Latest Flow ({data.date})</span>
                        <span className={`text-lg font-bold ${data.total >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {data.total >= 0 ? '+' : ''}₹{Math.abs(data.total)} Cr
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Equity</span>
                          <span className={`font-medium ${data.equity >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {data.equity >= 0 ? '+' : ''}₹{Math.abs(data.equity)} Cr
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Debt</span>
                          <span className={`font-medium ${data.debt >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {data.debt >= 0 ? '+' : ''}₹{Math.abs(data.debt)} Cr
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Hybrid</span>
                          <span className={`font-medium ${data.hybrid >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {data.hybrid >= 0 ? '+' : ''}₹{Math.abs(data.hybrid)} Cr
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">5-Day Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Inflow:</span>
                        <span className="text-green-600 font-medium">₹{fiiData.filter(d => d.total > 0).reduce((sum, d) => sum + d.total, 0)} Cr</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Outflow:</span>
                        <span className="text-red-600 font-medium">₹{Math.abs(fiiData.filter(d => d.total < 0).reduce((sum, d) => sum + d.total, 0))} Cr</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium">
                        <span>Net Flow:</span>
                        <span className={`${fiiData.reduce((sum, d) => sum + d.total, 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {fiiData.reduce((sum, d) => sum + d.total, 0) >= 0 ? '+' : ''}₹{fiiData.reduce((sum, d) => sum + d.total, 0)} Cr
                        </span>
                      </div>
                    </div>
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