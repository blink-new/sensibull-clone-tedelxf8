import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Separator } from '../components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Switch } from '../components/ui/switch'
import { Slider } from '../components/ui/slider'
import { 
  Layers, 
  Plus, 
  Save, 
  Play, 
  Trash2, 
  TrendingUp, 
  TrendingDown,
  Calculator,
  Target,
  AlertTriangle,
  BarChart3,
  Copy,
  Share,
  Download,
  Zap,
  DollarSign,
  Activity,
  Clock,
  Settings
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ReferenceLine } from 'recharts'

interface StrategyLeg {
  id: string
  type: 'call' | 'put'
  action: 'buy' | 'sell'
  strike: number
  premium: number
  quantity: number
  expiry: string
  iv: number
  delta: number
  gamma: number
  theta: number
  vega: number
}

interface PayoffPoint {
  spotPrice: number
  profit: number
  profitPercent: number
  delta: number
  gamma: number
  theta: number
  vega: number
}

interface StrategyAnalysis {
  maxProfit: number | string
  maxLoss: number | string
  breakevens: number[]
  netPremium: number
  netDelta: number
  netGamma: number
  netTheta: number
  netVega: number
  probabilityOfProfit: number
  riskRewardRatio: number
  marginRequired: number
}

export function StrategyBuilder() {
  const [legs, setLegs] = useState<StrategyLeg[]>([])
  const [selectedStrategy, setSelectedStrategy] = useState('')
  const [spotPrice] = useState(19674.25)
  const [volatility, setVolatility] = useState([18])
  const [daysToExpiry, setDaysToExpiry] = useState([7])
  const [showGreeks, setShowGreeks] = useState(false)
  const [showProbability, setShowProbability] = useState(false)
  const [priceRange, setPriceRange] = useState([15])
  const [savedStrategies, setSavedStrategies] = useState<any[]>([])

  const predefinedStrategies = [
    { value: 'long-call', label: 'Long Call', description: 'Bullish strategy with unlimited upside' },
    { value: 'long-put', label: 'Long Put', description: 'Bearish strategy with high downside potential' },
    { value: 'covered-call', label: 'Covered Call', description: 'Income generation on existing stock position' },
    { value: 'protective-put', label: 'Protective Put', description: 'Downside protection for stock holdings' },
    { value: 'bull-call-spread', label: 'Bull Call Spread', description: 'Limited risk bullish strategy' },
    { value: 'bear-put-spread', label: 'Bear Put Spread', description: 'Limited risk bearish strategy' },
    { value: 'iron-condor', label: 'Iron Condor', description: 'Neutral strategy for range-bound markets' },
    { value: 'butterfly', label: 'Butterfly', description: 'Low volatility strategy with limited risk' },
    { value: 'straddle', label: 'Long Straddle', description: 'High volatility strategy' },
    { value: 'strangle', label: 'Long Strangle', description: 'Volatility play with wider profit range' },
    { value: 'collar', label: 'Collar', description: 'Protective strategy with capped upside' },
    { value: 'iron-butterfly', label: 'Iron Butterfly', description: 'Neutral strategy with tight profit range' }
  ]

  const addLeg = () => {
    const newLeg: StrategyLeg = {
      id: Date.now().toString(),
      type: 'call',
      action: 'buy',
      strike: Math.round(spotPrice / 50) * 50,
      premium: 50,
      quantity: 1,
      expiry: '28-Dec-2023',
      iv: 18,
      delta: 0.5,
      gamma: 0.02,
      theta: -2.5,
      vega: 15
    }
    setLegs([...legs, newLeg])
  }

  const removeLeg = (id: string) => {
    setLegs(legs.filter(leg => leg.id !== id))
  }

  const updateLeg = (id: string, field: keyof StrategyLeg, value: any) => {
    setLegs(legs.map(leg => 
      leg.id === id ? { ...leg, [field]: value } : leg
    ))
  }

  const duplicateLeg = (id: string) => {
    const legToDuplicate = legs.find(leg => leg.id === id)
    if (legToDuplicate) {
      const newLeg = { ...legToDuplicate, id: Date.now().toString() }
      setLegs([...legs, newLeg])
    }
  }

  const loadPredefinedStrategy = (strategyType: string) => {
    let newLegs: StrategyLeg[] = []
    const baseStrike = Math.round(spotPrice / 50) * 50

    switch (strategyType) {
      case 'long-call':
        newLegs = [{
          id: '1', type: 'call', action: 'buy', strike: baseStrike, premium: 75, quantity: 1,
          expiry: '28-Dec-2023', iv: 18, delta: 0.5, gamma: 0.02, theta: -2.5, vega: 15
        }]
        break
      case 'long-put':
        newLegs = [{
          id: '1', type: 'put', action: 'buy', strike: baseStrike, premium: 85, quantity: 1,
          expiry: '28-Dec-2023', iv: 19, delta: -0.5, gamma: 0.02, theta: -2.8, vega: 16
        }]
        break
      case 'bull-call-spread':
        newLegs = [
          {
            id: '1', type: 'call', action: 'buy', strike: baseStrike, premium: 75, quantity: 1,
            expiry: '28-Dec-2023', iv: 18, delta: 0.5, gamma: 0.02, theta: -2.5, vega: 15
          },
          {
            id: '2', type: 'call', action: 'sell', strike: baseStrike + 100, premium: 45, quantity: 1,
            expiry: '28-Dec-2023', iv: 16, delta: 0.3, gamma: 0.015, theta: -1.8, vega: 12
          }
        ]
        break
      case 'iron-condor':
        newLegs = [
          {
            id: '1', type: 'put', action: 'buy', strike: baseStrike - 200, premium: 25, quantity: 1,
            expiry: '28-Dec-2023', iv: 20, delta: -0.2, gamma: 0.01, theta: -1.5, vega: 8
          },
          {
            id: '2', type: 'put', action: 'sell', strike: baseStrike - 100, premium: 45, quantity: 1,
            expiry: '28-Dec-2023', iv: 19, delta: -0.35, gamma: 0.018, theta: -2.2, vega: 12
          },
          {
            id: '3', type: 'call', action: 'sell', strike: baseStrike + 100, premium: 50, quantity: 1,
            expiry: '28-Dec-2023', iv: 16, delta: 0.35, gamma: 0.018, theta: -2.0, vega: 11
          },
          {
            id: '4', type: 'call', action: 'buy', strike: baseStrike + 200, premium: 30, quantity: 1,
            expiry: '28-Dec-2023', iv: 15, delta: 0.2, gamma: 0.01, theta: -1.2, vega: 7
          }
        ]
        break
      case 'straddle':
        newLegs = [
          {
            id: '1', type: 'call', action: 'buy', strike: baseStrike, premium: 75, quantity: 1,
            expiry: '28-Dec-2023', iv: 18, delta: 0.5, gamma: 0.02, theta: -2.5, vega: 15
          },
          {
            id: '2', type: 'put', action: 'buy', strike: baseStrike, premium: 85, quantity: 1,
            expiry: '28-Dec-2023', iv: 19, delta: -0.5, gamma: 0.02, theta: -2.8, vega: 16
          }
        ]
        break
      case 'strangle':
        newLegs = [
          {
            id: '1', type: 'call', action: 'buy', strike: baseStrike + 50, premium: 55, quantity: 1,
            expiry: '28-Dec-2023', iv: 17, delta: 0.35, gamma: 0.018, theta: -2.2, vega: 13
          },
          {
            id: '2', type: 'put', action: 'buy', strike: baseStrike - 50, premium: 65, quantity: 1,
            expiry: '28-Dec-2023', iv: 18, delta: -0.35, gamma: 0.018, theta: -2.4, vega: 14
          }
        ]
        break
      case 'collar':
        newLegs = [
          {
            id: '1', type: 'put', action: 'buy', strike: baseStrike - 100, premium: 45, quantity: 1,
            expiry: '28-Dec-2023', iv: 19, delta: -0.35, gamma: 0.018, theta: -2.2, vega: 12
          },
          {
            id: '2', type: 'call', action: 'sell', strike: baseStrike + 100, premium: 50, quantity: 1,
            expiry: '28-Dec-2023', iv: 16, delta: 0.35, gamma: 0.018, theta: -2.0, vega: 11
          }
        ]
        break
    }
    setLegs(newLegs)
  }

  const calculatePayoff = (): PayoffPoint[] => {
    if (legs.length === 0) return []

    const points: PayoffPoint[] = []
    const minStrike = Math.min(...legs.map(leg => leg.strike))
    const maxStrike = Math.max(...legs.map(leg => leg.strike))
    const range = Math.max(500, (maxStrike - minStrike) * (priceRange[0] / 10))
    const startPrice = Math.max(0, spotPrice - range)
    const endPrice = spotPrice + range
    const step = (endPrice - startPrice) / 100

    for (let price = startPrice; price <= endPrice; price += step) {
      let totalProfit = 0
      let totalDelta = 0
      let totalGamma = 0
      let totalTheta = 0
      let totalVega = 0

      legs.forEach(leg => {
        let legProfit = 0
        const multiplier = leg.action === 'buy' ? 1 : -1
        const premiumCost = leg.premium * multiplier * -1

        if (leg.type === 'call') {
          const intrinsicValue = Math.max(0, price - leg.strike)
          legProfit = (intrinsicValue * multiplier + premiumCost) * leg.quantity
        } else {
          const intrinsicValue = Math.max(0, leg.strike - price)
          legProfit = (intrinsicValue * multiplier + premiumCost) * leg.quantity
        }

        totalProfit += legProfit
        totalDelta += leg.delta * multiplier * leg.quantity
        totalGamma += leg.gamma * multiplier * leg.quantity
        totalTheta += leg.theta * multiplier * leg.quantity
        totalVega += leg.vega * multiplier * leg.quantity
      })

      const profitPercent = totalProfit / Math.abs(getStrategyAnalysis().netPremium || 1) * 100

      points.push({ 
        spotPrice: price, 
        profit: totalProfit,
        profitPercent,
        delta: totalDelta,
        gamma: totalGamma,
        theta: totalTheta,
        vega: totalVega
      })
    }

    return points
  }

  const getStrategyAnalysis = (): StrategyAnalysis => {
    const payoffPoints = calculatePayoff()
    if (payoffPoints.length === 0) {
      return {
        maxProfit: 0, maxLoss: 0, breakevens: [], netPremium: 0,
        netDelta: 0, netGamma: 0, netTheta: 0, netVega: 0,
        probabilityOfProfit: 0, riskRewardRatio: 0, marginRequired: 0
      }
    }

    const profits = payoffPoints.map(p => p.profit)
    const maxProfit = Math.max(...profits)
    const maxLoss = Math.min(...profits)
    
    // Calculate net Greeks
    const netDelta = legs.reduce((total, leg) => {
      const multiplier = leg.action === 'buy' ? 1 : -1
      return total + (leg.delta * multiplier * leg.quantity)
    }, 0)

    const netGamma = legs.reduce((total, leg) => {
      const multiplier = leg.action === 'buy' ? 1 : -1
      return total + (leg.gamma * multiplier * leg.quantity)
    }, 0)

    const netTheta = legs.reduce((total, leg) => {
      const multiplier = leg.action === 'buy' ? 1 : -1
      return total + (leg.theta * multiplier * leg.quantity)
    }, 0)

    const netVega = legs.reduce((total, leg) => {
      const multiplier = leg.action === 'buy' ? 1 : -1
      return total + (leg.vega * multiplier * leg.quantity)
    }, 0)

    // Calculate net premium
    const netPremium = legs.reduce((total, leg) => {
      const multiplier = leg.action === 'buy' ? -1 : 1
      return total + (leg.premium * multiplier * leg.quantity)
    }, 0)

    // Find breakeven points
    const breakevens: number[] = []
    for (let i = 1; i < payoffPoints.length; i++) {
      const prev = payoffPoints[i - 1]
      const curr = payoffPoints[i]
      if ((prev.profit <= 0 && curr.profit > 0) || (prev.profit > 0 && curr.profit <= 0)) {
        const ratio = Math.abs(prev.profit) / (Math.abs(prev.profit) + Math.abs(curr.profit))
        const breakeven = prev.spotPrice + (curr.spotPrice - prev.spotPrice) * ratio
        breakevens.push(Math.round(breakeven))
      }
    }

    // Calculate probability of profit (simplified)
    const profitablePoints = payoffPoints.filter(p => p.profit > 0).length
    const probabilityOfProfit = (profitablePoints / payoffPoints.length) * 100

    // Risk-reward ratio
    const riskRewardRatio = maxProfit > 0 && maxLoss < 0 ? maxProfit / Math.abs(maxLoss) : 0

    // Margin calculation (simplified)
    const marginRequired = legs.reduce((total, leg) => {
      if (leg.action === 'sell') {
        return total + (leg.strike * leg.quantity * 0.1) // 10% margin requirement
      }
      return total
    }, 0)

    return {
      maxProfit: maxProfit === Infinity ? 'Unlimited' : maxProfit,
      maxLoss: maxLoss === -Infinity ? 'Unlimited' : Math.abs(maxLoss),
      breakevens,
      netPremium,
      netDelta,
      netGamma,
      netTheta,
      netVega,
      probabilityOfProfit,
      riskRewardRatio,
      marginRequired
    }
  }

  const saveStrategy = () => {
    const strategy = {
      id: Date.now().toString(),
      name: `Strategy ${savedStrategies.length + 1}`,
      legs: [...legs],
      createdAt: new Date().toISOString(),
      analysis: getStrategyAnalysis()
    }
    setSavedStrategies([...savedStrategies, strategy])
  }

  const payoffData = calculatePayoff()
  const analysis = getStrategyAnalysis()

  const getRiskLevel = () => {
    if (typeof analysis.maxLoss === 'string') return { level: 'High', color: 'text-red-600' }
    if (analysis.maxLoss > 10000) return { level: 'High', color: 'text-red-600' }
    if (analysis.maxLoss > 5000) return { level: 'Medium', color: 'text-yellow-600' }
    return { level: 'Low', color: 'text-green-600' }
  }

  const riskLevel = getRiskLevel()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Strategy Builder</h1>
          <p className="text-muted-foreground">Create and analyze complex options strategies with real-time payoff visualization</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={saveStrategy} disabled={legs.length === 0}>
            <Save className="h-4 w-4 mr-2" />
            Save Strategy
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button size="sm" onClick={addLeg}>
            <Plus className="h-4 w-4 mr-2" />
            Add Leg
          </Button>
        </div>
      </div>

      {/* Quick Strategy Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Quick Strategies</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {predefinedStrategies.map(strategy => (
              <Card key={strategy.value} className="cursor-pointer hover:bg-muted/50 transition-colors" 
                    onClick={() => {
                      setSelectedStrategy(strategy.value)
                      loadPredefinedStrategy(strategy.value)
                    }}>
                <CardContent className="p-4">
                  <div className="font-medium text-sm">{strategy.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{strategy.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setLegs([])}>
                Clear All
              </Button>
              <div className="text-sm text-muted-foreground">
                Current Spot: <span className="font-medium">₹{spotPrice.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch checked={showGreeks} onCheckedChange={setShowGreeks} />
                <label className="text-sm">Show Greeks</label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked={showProbability} onCheckedChange={setShowProbability} />
                <label className="text-sm">Show Probability</label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Parameters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Market Parameters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Volatility: {volatility[0]}%
              </label>
              <Slider
                value={volatility}
                onValueChange={setVolatility}
                min={5}
                max={50}
                step={1}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Days to Expiry: {daysToExpiry[0]}
              </label>
              <Slider
                value={daysToExpiry}
                onValueChange={setDaysToExpiry}
                min={1}
                max={30}
                step={1}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Price Range: ±{priceRange[0]}%
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={5}
                max={30}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Strategy Legs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Layers className="h-5 w-5" />
              <span>Strategy Legs</span>
              {legs.length > 0 && (
                <Badge variant="secondary">{legs.length} leg{legs.length > 1 ? 's' : ''}</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {legs.length === 0 ? (
              <div className="h-48 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                <div className="text-center">
                  <Layers className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Build Your Strategy</h3>
                  <p className="text-muted-foreground mb-4">Add options legs or select a predefined strategy</p>
                  <Button onClick={addLeg}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Leg
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Strike</TableHead>
                      <TableHead>Premium</TableHead>
                      <TableHead>Qty</TableHead>
                      {showGreeks && (
                        <>
                          <TableHead>Delta</TableHead>
                          <TableHead>Theta</TableHead>
                        </>
                      )}
                      <TableHead>Expiry</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {legs.map((leg) => (
                      <TableRow key={leg.id}>
                        <TableCell>
                          <Select 
                            value={leg.action} 
                            onValueChange={(value) => updateLeg(leg.id, 'action', value)}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="buy">Buy</SelectItem>
                              <SelectItem value="sell">Sell</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select 
                            value={leg.type} 
                            onValueChange={(value) => updateLeg(leg.id, 'type', value)}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="call">Call</SelectItem>
                              <SelectItem value="put">Put</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={leg.strike}
                            onChange={(e) => updateLeg(leg.id, 'strike', Number(e.target.value))}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={leg.premium}
                            onChange={(e) => updateLeg(leg.id, 'premium', Number(e.target.value))}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={leg.quantity}
                            onChange={(e) => updateLeg(leg.id, 'quantity', Number(e.target.value))}
                            className="w-16"
                          />
                        </TableCell>
                        {showGreeks && (
                          <>
                            <TableCell className="text-sm">
                              {leg.delta.toFixed(3)}
                            </TableCell>
                            <TableCell className="text-sm text-red-600">
                              {leg.theta.toFixed(1)}
                            </TableCell>
                          </>
                        )}
                        <TableCell>
                          <Select 
                            value={leg.expiry} 
                            onValueChange={(value) => updateLeg(leg.id, 'expiry', value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="28-Dec-2023">28 Dec 2023</SelectItem>
                              <SelectItem value="04-Jan-2024">04 Jan 2024</SelectItem>
                              <SelectItem value="11-Jan-2024">11 Jan 2024</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => duplicateLeg(leg.id)}
                              className="p-1"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeLeg(leg.id)}
                              className="text-red-600 hover:text-red-700 p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Strategy Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-5 w-5" />
              <span>Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="greeks">Greeks</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Max Profit:</span>
                  <span className={`font-medium ${typeof analysis.maxProfit === 'string' && analysis.maxProfit.includes('Unlimited') ? 'text-green-600' : ''}`}>
                    {typeof analysis.maxProfit === 'string' ? analysis.maxProfit : `₹${analysis.maxProfit.toFixed(0)}`}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Max Loss:</span>
                  <span className={`font-medium ${typeof analysis.maxLoss === 'string' && analysis.maxLoss.includes('Unlimited') ? 'text-red-600' : ''}`}>
                    {typeof analysis.maxLoss === 'string' ? analysis.maxLoss : `₹${analysis.maxLoss.toFixed(0)}`}
                  </span>
                </div>
                <Separator />
                <div>
                  <div className="text-muted-foreground mb-2">Breakeven Points:</div>
                  {analysis.breakevens.length > 0 ? (
                    <div className="space-y-1">
                      {analysis.breakevens.map((be, index) => (
                        <div key={index} className="font-medium">₹{be.toLocaleString()}</div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-muted-foreground text-sm">No breakeven points</div>
                  )}
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Net Premium:</span>
                  <span className={`font-medium ${analysis.netPremium >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {analysis.netPremium >= 0 ? '+' : ''}₹{analysis.netPremium.toFixed(0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Probability of Profit:</span>
                  <span className="font-medium">{analysis.probabilityOfProfit.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Risk Level:</span>
                  <span className={`font-medium ${riskLevel.color}`}>{riskLevel.level}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Margin Required:</span>
                  <span className="font-medium">₹{analysis.marginRequired.toFixed(0)}</span>
                </div>
              </TabsContent>

              <TabsContent value="greeks" className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Net Delta:</span>
                  <span className={`font-medium ${analysis.netDelta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {analysis.netDelta.toFixed(3)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Net Gamma:</span>
                  <span className="font-medium">{analysis.netGamma.toFixed(3)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Net Theta:</span>
                  <span className="font-medium text-red-600">{analysis.netTheta.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Net Vega:</span>
                  <span className="font-medium">{analysis.netVega.toFixed(1)}</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="text-sm font-medium">Risk Assessment:</div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-muted-foreground">
                      {typeof analysis.maxLoss === 'string' && analysis.maxLoss.includes('Unlimited') 
                        ? 'High Risk - Unlimited Loss' 
                        : 'Limited Risk Strategy'}
                    </span>
                  </div>
                  {analysis.riskRewardRatio > 0 && (
                    <div className="text-sm">
                      Risk-Reward Ratio: <span className="font-medium">{analysis.riskRewardRatio.toFixed(2)}:1</span>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Payoff Chart */}
      {legs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Payoff Chart</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={payoffData}>
                  <defs>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00d4aa" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="spotPrice" 
                    stroke="#64748b"
                    fontSize={12}
                    tickFormatter={(value) => `₹${value.toFixed(0)}`}
                  />
                  <YAxis 
                    stroke="#64748b"
                    fontSize={12}
                    tickFormatter={(value) => `₹${value.toFixed(0)}`}
                  />
                  <Tooltip 
                    formatter={(value: any, name: string) => {
                      if (name === 'profit') return [`₹${value.toFixed(0)}`, 'P&L']
                      if (name === 'profitPercent') return [`${value.toFixed(1)}%`, 'P&L %']
                      return [value, name]
                    }}
                    labelFormatter={(label) => `Spot: ₹${label.toFixed(0)}`}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <ReferenceLine y={0} stroke="#64748b" strokeDasharray="5 5" />
                  <ReferenceLine x={spotPrice} stroke="#00d4aa" strokeDasharray="3 3" />
                  <Area 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#1a365d" 
                    strokeWidth={2}
                    fill="url(#colorProfit)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Saved Strategies */}
      {savedStrategies.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Save className="h-5 w-5" />
              <span>Saved Strategies</span>
              <Badge variant="secondary">{savedStrategies.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedStrategies.map((strategy) => (
                <Card key={strategy.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-sm">{strategy.name}</div>
                      <Badge variant="outline" className="text-xs">{strategy.legs.length} legs</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>Max Profit: {typeof strategy.analysis.maxProfit === 'string' ? strategy.analysis.maxProfit : `₹${strategy.analysis.maxProfit.toFixed(0)}`}</div>
                      <div>Max Loss: {typeof strategy.analysis.maxLoss === 'string' ? strategy.analysis.maxLoss : `₹${strategy.analysis.maxLoss.toFixed(0)}`}</div>
                      <div>Created: {new Date(strategy.createdAt).toLocaleDateString()}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}