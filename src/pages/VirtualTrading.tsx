import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { 
  PlayCircle, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity, 
  Target,
  Plus,
  Minus,
  RotateCcw,
  Trophy,
  Users,
  Calendar,
  BarChart3,
  Zap,
  AlertTriangle,
  Eye,
  RefreshCw
} from 'lucide-react'

interface VirtualPosition {
  id: string
  symbol: string
  type: 'CE' | 'PE' | 'STOCK'
  strike?: number
  expiry?: string
  quantity: number
  entryPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
  entryTime: string
}

interface VirtualOrder {
  id: string
  symbol: string
  type: 'CE' | 'PE' | 'STOCK'
  action: 'BUY' | 'SELL'
  quantity: number
  price: number
  status: 'PENDING' | 'EXECUTED' | 'CANCELLED'
  time: string
}

interface LeaderboardEntry {
  rank: number
  username: string
  pnl: number
  pnlPercent: number
  trades: number
  winRate: number
  avatar: string
}

export function VirtualTrading() {
  const [activeTab, setActiveTab] = useState('trading')
  const [selectedSymbol, setSelectedSymbol] = useState('NIFTY')
  const [orderType, setOrderType] = useState('BUY')
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState(19674)

  const virtualAccount = {
    balance: 1000000,
    usedMargin: 125000,
    availableMargin: 875000,
    totalPnL: 15750,
    totalPnLPercent: 1.58,
    dayPnL: 2450,
    dayPnLPercent: 0.25,
    totalTrades: 47,
    winningTrades: 32,
    winRate: 68.1
  }

  const virtualPositions: VirtualPosition[] = [
    {
      id: '1',
      symbol: 'NIFTY',
      type: 'CE',
      strike: 19700,
      expiry: '28-Dec-2023',
      quantity: 50,
      entryPrice: 82.50,
      currentPrice: 84.70,
      pnl: 1100,
      pnlPercent: 2.67,
      entryTime: '2023-12-22 10:30:00'
    },
    {
      id: '2',
      symbol: 'RELIANCE',
      type: 'STOCK',
      quantity: 10,
      entryPrice: 2765.00,
      currentPrice: 2789.45,
      pnl: 244.50,
      pnlPercent: 0.88,
      entryTime: '2023-12-22 11:15:00'
    },
    {
      id: '3',
      symbol: 'BANKNIFTY',
      type: 'PE',
      strike: 45000,
      expiry: '28-Dec-2023',
      quantity: 15,
      entryPrice: 260.80,
      currentPrice: 245.60,
      pnl: -2280,
      pnlPercent: -5.83,
      entryTime: '2023-12-22 12:45:00'
    },
    {
      id: '4',
      symbol: 'TCS',
      type: 'STOCK',
      quantity: 5,
      entryPrice: 3633.75,
      currentPrice: 3621.30,
      pnl: -62.25,
      pnlPercent: -0.34,
      entryTime: '2023-12-22 14:20:00'
    }
  ]

  const virtualOrders: VirtualOrder[] = [
    {
      id: '1',
      symbol: 'HDFC BANK',
      type: 'STOCK',
      action: 'BUY',
      quantity: 10,
      price: 1690.00,
      status: 'PENDING',
      time: '2023-12-22 15:30:00'
    },
    {
      id: '2',
      symbol: 'NIFTY',
      type: 'PE',
      action: 'SELL',
      quantity: 25,
      price: 170.00,
      status: 'PENDING',
      time: '2023-12-22 15:25:00'
    }
  ]

  const leaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      username: 'TradingMaster',
      pnl: 125000,
      pnlPercent: 12.5,
      trades: 89,
      winRate: 78.7,
      avatar: '🏆'
    },
    {
      rank: 2,
      username: 'OptionsKing',
      pnl: 98750,
      pnlPercent: 9.88,
      trades: 156,
      winRate: 72.4,
      avatar: '👑'
    },
    {
      rank: 3,
      username: 'BullRunner',
      pnl: 87500,
      pnlPercent: 8.75,
      trades: 67,
      winRate: 74.6,
      avatar: '🚀'
    },
    {
      rank: 4,
      username: 'QuantTrader',
      pnl: 76250,
      pnlPercent: 7.63,
      trades: 234,
      winRate: 69.2,
      avatar: '🤖'
    },
    {
      rank: 5,
      username: 'MarketWizard',
      pnl: 65000,
      pnlPercent: 6.50,
      trades: 123,
      winRate: 71.5,
      avatar: '🧙‍♂️'
    },
    {
      rank: 15,
      username: 'You',
      pnl: 15750,
      pnlPercent: 1.58,
      trades: 47,
      winRate: 68.1,
      avatar: '👤'
    }
  ]

  const challenges = [
    {
      id: '1',
      title: 'Options Master Challenge',
      description: 'Trade only options for 1 week',
      duration: '7 days',
      participants: 1247,
      prize: '₹50,000',
      status: 'Active',
      timeLeft: '3 days 14h'
    },
    {
      id: '2',
      title: 'Swing Trading Contest',
      description: 'Hold positions for 2-5 days',
      duration: '30 days',
      participants: 892,
      prize: '₹25,000',
      status: 'Active',
      timeLeft: '18 days 6h'
    },
    {
      id: '3',
      title: 'Risk Management Pro',
      description: 'Maximum 2% risk per trade',
      duration: '14 days',
      participants: 567,
      prize: '₹15,000',
      status: 'Starting Soon',
      timeLeft: '2 days'
    }
  ]

  const placeOrder = () => {
    console.log('Placing virtual order:', {
      symbol: selectedSymbol,
      type: orderType,
      quantity,
      price
    })
    // Implementation for placing virtual orders
  }

  const resetAccount = () => {
    console.log('Resetting virtual account')
    // Implementation for resetting virtual account
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Virtual Trading</h1>
          <p className="text-muted-foreground">Practice trading with virtual money - Learn without risk!</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={resetAccount}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Account
          </Button>
          <Button size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Prices
          </Button>
        </div>
      </div>

      {/* Virtual Account Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Virtual Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{virtualAccount.balance.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              Available: ₹{virtualAccount.availableMargin.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${virtualAccount.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {virtualAccount.totalPnL >= 0 ? '+' : ''}₹{Math.abs(virtualAccount.totalPnL).toLocaleString()}
            </div>
            <div className={`text-xs ${virtualAccount.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {virtualAccount.totalPnLPercent >= 0 ? '+' : ''}{virtualAccount.totalPnLPercent}% overall
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Day P&L</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${virtualAccount.dayPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {virtualAccount.dayPnL >= 0 ? '+' : ''}₹{Math.abs(virtualAccount.dayPnL).toLocaleString()}
            </div>
            <div className={`text-xs ${virtualAccount.dayPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {virtualAccount.dayPnLPercent >= 0 ? '+' : ''}{virtualAccount.dayPnLPercent}% today
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{virtualAccount.winRate}%</div>
            <div className="text-xs text-muted-foreground">
              {virtualAccount.winningTrades}/{virtualAccount.totalTrades} trades
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="trading">Trading</TabsTrigger>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="trading" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Placement */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Place Order</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Symbol</label>
                  <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NIFTY">NIFTY</SelectItem>
                      <SelectItem value="BANKNIFTY">BANKNIFTY</SelectItem>
                      <SelectItem value="RELIANCE">RELIANCE</SelectItem>
                      <SelectItem value="TCS">TCS</SelectItem>
                      <SelectItem value="HDFC BANK">HDFC BANK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Order Type</label>
                  <Select value={orderType} onValueChange={setOrderType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BUY">BUY</SelectItem>
                      <SelectItem value="SELL">SELL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Quantity</label>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="text-center"
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Price</label>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>

                <Button onClick={placeOrder} className="w-full">
                  Place {orderType} Order
                </Button>

                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Margin Required: ₹{(quantity * price * 0.1).toLocaleString()}</div>
                  <div>Available Margin: ₹{virtualAccount.availableMargin.toLocaleString()}</div>
                </div>
              </CardContent>
            </Card>

            {/* Market Data */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Live Market Data</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Live</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">NIFTY</div>
                        <div className="text-sm text-muted-foreground">Index</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">19,674.25</div>
                        <div className="text-sm text-green-600">+127.35 (+0.65%)</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">BANKNIFTY</div>
                        <div className="text-sm text-muted-foreground">Index</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">44,892.80</div>
                        <div className="text-sm text-red-600">-89.45 (-0.20%)</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">RELIANCE</div>
                        <div className="text-sm text-muted-foreground">Stock</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">2,789.45</div>
                        <div className="text-sm text-green-600">+23.80 (+0.86%)</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">TCS</div>
                        <div className="text-sm text-muted-foreground">Stock</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">3,621.30</div>
                        <div className="text-sm text-red-600">-12.45 (-0.34%)</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">HDFC BANK</div>
                        <div className="text-sm text-muted-foreground">Stock</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">1,689.75</div>
                        <div className="text-sm text-green-600">+15.25 (+0.91%)</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">INFY</div>
                        <div className="text-sm text-muted-foreground">Stock</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">1,456.80</div>
                        <div className="text-sm text-green-600">+8.90 (+0.61%)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="positions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Virtual Positions</span>
                <Badge variant="secondary">{virtualPositions.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Strike/Price</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Entry Price</TableHead>
                      <TableHead>Current Price</TableHead>
                      <TableHead>P&L</TableHead>
                      <TableHead>Entry Time</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {virtualPositions.map((position) => (
                      <TableRow key={position.id}>
                        <TableCell className="font-medium">{position.symbol}</TableCell>
                        <TableCell>
                          <Badge variant={position.type === 'STOCK' ? 'outline' : position.type === 'CE' ? 'default' : 'secondary'}>
                            {position.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {position.type === 'STOCK' ? '-' : position.strike}
                          {position.expiry && <div className="text-xs text-muted-foreground">{position.expiry}</div>}
                        </TableCell>
                        <TableCell>{position.quantity}</TableCell>
                        <TableCell>₹{position.entryPrice}</TableCell>
                        <TableCell className="font-medium">₹{position.currentPrice}</TableCell>
                        <TableCell>
                          <div className={`${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            <div className="font-medium">
                              {position.pnl >= 0 ? '+' : ''}₹{Math.abs(position.pnl).toLocaleString()}
                            </div>
                            <div className="text-xs">
                              {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent}%
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{position.entryTime}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Close
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Pending Orders</span>
                <Badge variant="secondary">{virtualOrders.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {virtualOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.symbol}</TableCell>
                        <TableCell>
                          <Badge variant={order.type === 'STOCK' ? 'outline' : order.type === 'CE' ? 'default' : 'secondary'}>
                            {order.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={order.action === 'BUY' ? 'default' : 'destructive'}>
                            {order.action}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>₹{order.price}</TableCell>
                        <TableCell>
                          <Badge variant={
                            order.status === 'PENDING' ? 'secondary' :
                            order.status === 'EXECUTED' ? 'default' : 'destructive'
                          }>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{order.time}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Cancel
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Virtual Trading Leaderboard</span>
                <Badge variant="secondary">Monthly</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((entry) => (
                  <div 
                    key={entry.rank} 
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      entry.username === 'You' ? 'bg-primary/5 border-primary' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl font-bold text-muted-foreground">
                        #{entry.rank}
                      </div>
                      <div className="text-2xl">{entry.avatar}</div>
                      <div>
                        <div className="font-medium">{entry.username}</div>
                        <div className="text-sm text-muted-foreground">
                          {entry.trades} trades • {entry.winRate}% win rate
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${entry.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {entry.pnl >= 0 ? '+' : ''}₹{Math.abs(entry.pnl).toLocaleString()}
                      </div>
                      <div className={`text-sm ${entry.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {entry.pnlPercent >= 0 ? '+' : ''}{entry.pnlPercent}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {challenges.map((challenge) => (
              <Card key={challenge.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="h-5 w-5" />
                      <span>{challenge.title}</span>
                    </CardTitle>
                    <Badge variant={challenge.status === 'Active' ? 'default' : 'secondary'}>
                      {challenge.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{challenge.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Duration</div>
                      <div className="font-medium">{challenge.duration}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Prize Pool</div>
                      <div className="font-medium text-green-600">{challenge.prize}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Participants</div>
                      <div className="font-medium flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {challenge.participants.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Time Left</div>
                      <div className="font-medium flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {challenge.timeLeft}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" disabled={challenge.status !== 'Active'}>
                    {challenge.status === 'Active' ? 'Join Challenge' : 'Coming Soon'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Challenge Rules</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• All trades are executed with virtual money</p>
                <p>• Real-time market data and pricing</p>
                <p>• Winners determined by highest percentage returns</p>
                <p>• Minimum 10 trades required to qualify</p>
                <p>• Fair play policy strictly enforced</p>
                <p>• Prizes awarded as trading credits</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}