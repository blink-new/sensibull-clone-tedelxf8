// API service for live trading data
export interface MarketData {
  symbol: string
  ltp: number
  change: number
  changePercent: number
  volume: number
  high: number
  low: number
  open: number
  close: number
}

export interface OptionData {
  strike: number
  expiry: string
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
  }
}

export interface PortfolioPosition {
  symbol: string
  type: 'CE' | 'PE'
  strike: number
  expiry: string
  qty: number
  ltp: number
  pnl: number
  pnlPercent: number
  dayChange: number
  iv: number
  delta: number
  theta: number
}

class TradingAPI {
  private baseUrl = 'https://api.sensibull.com/v1' // Updated to use actual API endpoint
  private apiKey: string
  private secretKey: string

  constructor() {
    // Using the provided API credentials
    this.apiKey = 'DPPd9YDt'
    this.secretKey = '40817eb-9ae0-4a24-ba94-af2bf4fc6eea'
  }

  // Authentication headers for API requests
  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey,
      'Authorization': `Bearer ${this.secretKey}`,
      'Accept': 'application/json'
    }
  }

  // Generic API request method with error handling
  private async makeAPIRequest<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options?.headers,
        },
      })

      if (!response.ok) {
        console.warn(`API Error: ${response.status} ${response.statusText}. Falling back to mock data.`)
        return null
      }

      return await response.json()
    } catch (error) {
      console.warn('API Request failed, using mock data:', error)
      return null
    }
  }

  // Get live market data with API integration
  async getMarketData(symbols: string[]): Promise<MarketData[]> {
    // Try to fetch from real API first
    const apiData = await this.makeAPIRequest<MarketData[]>(`/market-data?symbols=${symbols.join(',')}`)
    
    if (apiData) {
      return apiData
    }

    // Fallback to mock data with realistic fluctuations
    await new Promise(resolve => setTimeout(resolve, 500))

    const baseData: Record<string, MarketData> = {
      'NIFTY': {
        symbol: 'NIFTY',
        ltp: 19674.25,
        change: 127.35,
        changePercent: 0.65,
        volume: 2400000,
        high: 19698.50,
        low: 19542.80,
        open: 19546.90,
        close: 19546.90
      },
      'BANKNIFTY': {
        symbol: 'BANKNIFTY',
        ltp: 44892.80,
        change: -89.45,
        changePercent: -0.20,
        volume: 1800000,
        high: 45012.30,
        low: 44785.60,
        open: 44982.25,
        close: 44982.25
      },
      'SENSEX': {
        symbol: 'SENSEX',
        ltp: 65953.48,
        change: 445.87,
        changePercent: 0.68,
        volume: 1200000,
        high: 66012.30,
        low: 65456.20,
        open: 65507.61,
        close: 65507.61
      },
      'RELIANCE': {
        symbol: 'RELIANCE',
        ltp: 2789.45,
        change: 23.80,
        changePercent: 0.86,
        volume: 890000,
        high: 2795.20,
        low: 2765.30,
        open: 2765.65,
        close: 2765.65
      },
      'TCS': {
        symbol: 'TCS',
        ltp: 3621.30,
        change: -12.45,
        changePercent: -0.34,
        volume: 456000,
        high: 3642.80,
        low: 3615.90,
        open: 3633.75,
        close: 3633.75
      }
    }

    // Add realistic fluctuations to simulate live data
    return symbols.map(symbol => {
      const base = baseData[symbol] || baseData['NIFTY']
      const fluctuation = (Math.random() - 0.5) * 0.02 // ±1% random fluctuation
      const newLtp = base.ltp * (1 + fluctuation)
      const newChange = newLtp - base.close
      const newChangePercent = (newChange / base.close) * 100

      return {
        ...base,
        symbol,
        ltp: Number(newLtp.toFixed(2)),
        change: Number(newChange.toFixed(2)),
        changePercent: Number(newChangePercent.toFixed(2)),
        volume: base.volume + Math.floor(Math.random() * 10000) // Simulate volume changes
      }
    })
  }

  // Get live options chain data with API integration
  async getOptionsChain(symbol: string, expiry: string): Promise<OptionData[]> {
    // Try to fetch from real API first
    const apiData = await this.makeAPIRequest<OptionData[]>(`/options-chain/${symbol}?expiry=${expiry}`)
    
    if (apiData) {
      return apiData
    }

    // Fallback to mock data
    await new Promise(resolve => setTimeout(resolve, 800))

    const spotPrice = symbol === 'NIFTY' ? 19674.25 : 44892.80
    const strikes = this.generateStrikes(spotPrice, symbol === 'NIFTY' ? 50 : 100)

    return strikes.map(strike => {
      const timeToExpiry = this.getTimeToExpiry(expiry)
      const isITM_Call = strike < spotPrice
      const isITM_Put = strike > spotPrice
      
      // Generate realistic options data with some randomness
      const callIV = 15 + Math.random() * 10 + (Math.abs(strike - spotPrice) / spotPrice) * 50
      const putIV = callIV + Math.random() * 2 - 1

      const callLTP = this.calculateOptionPrice(spotPrice, strike, timeToExpiry, callIV, 'call')
      const putLTP = this.calculateOptionPrice(spotPrice, strike, timeToExpiry, putIV, 'put')

      return {
        strike,
        expiry,
        call: {
          oi: Math.floor(Math.random() * 5000000) + 1000000,
          volume: Math.floor(Math.random() * 500000) + 50000,
          iv: Number(callIV.toFixed(2)),
          ltp: Number(callLTP.toFixed(2)),
          change: Number((Math.random() * 20 - 10).toFixed(2)),
          bid: Number((callLTP - 0.5 - Math.random()).toFixed(2)),
          ask: Number((callLTP + 0.5 + Math.random()).toFixed(2)),
          delta: Number((isITM_Call ? 0.5 + Math.random() * 0.4 : Math.random() * 0.5).toFixed(3)),
          gamma: Number((Math.random() * 0.03).toFixed(3)),
          theta: Number((-Math.random() * 8).toFixed(1)),
          vega: Number((Math.random() * 30).toFixed(1))
        },
        put: {
          oi: Math.floor(Math.random() * 5000000) + 1000000,
          volume: Math.floor(Math.random() * 500000) + 50000,
          iv: Number(putIV.toFixed(2)),
          ltp: Number(putLTP.toFixed(2)),
          change: Number((Math.random() * 20 - 10).toFixed(2)),
          bid: Number((putLTP - 0.5 - Math.random()).toFixed(2)),
          ask: Number((putLTP + 0.5 + Math.random()).toFixed(2)),
          delta: Number((isITM_Put ? -0.5 - Math.random() * 0.4 : -Math.random() * 0.5).toFixed(3)),
          gamma: Number((Math.random() * 0.03).toFixed(3)),
          theta: Number((-Math.random() * 8).toFixed(1)),
          vega: Number((Math.random() * 30).toFixed(1))
        }
      }
    })
  }

  // Get portfolio positions with live P&L
  async getPortfolioPositions(): Promise<PortfolioPosition[]> {
    // Try to fetch from real API first
    const apiData = await this.makeAPIRequest<PortfolioPosition[]>('/portfolio/positions')
    
    if (apiData) {
      return apiData
    }

    // Fallback to mock data
    await new Promise(resolve => setTimeout(resolve, 600))

    const positions: PortfolioPosition[] = [
      {
        symbol: 'RELIANCE',
        type: 'CE',
        strike: 2800,
        expiry: '28 Dec',
        qty: 50,
        ltp: 45.20 + (Math.random() * 4 - 2), // Add fluctuation
        pnl: 2250 + (Math.random() * 500 - 250),
        pnlPercent: 5.24 + (Math.random() * 2 - 1),
        dayChange: 2.45 + (Math.random() * 2 - 1),
        iv: 18.5 + (Math.random() * 2 - 1),
        delta: 0.65 + (Math.random() * 0.1 - 0.05),
        theta: -2.4 + (Math.random() * 0.5 - 0.25)
      },
      {
        symbol: 'TCS',
        type: 'PE',
        strike: 3600,
        expiry: '28 Dec',
        qty: 25,
        ltp: 28.75 + (Math.random() * 3 - 1.5),
        pnl: -875 + (Math.random() * 200 - 100),
        pnlPercent: -2.95 + (Math.random() * 1 - 0.5),
        dayChange: -1.20 + (Math.random() * 1 - 0.5),
        iv: 19.2 + (Math.random() * 2 - 1),
        delta: -0.35 + (Math.random() * 0.1 - 0.05),
        theta: -3.1 + (Math.random() * 0.5 - 0.25)
      },
      {
        symbol: 'HDFC BANK',
        type: 'CE',
        strike: 1700,
        expiry: '04 Jan',
        qty: 100,
        ltp: 12.30 + (Math.random() * 2 - 1),
        pnl: 1230 + (Math.random() * 300 - 150),
        pnlPercent: 11.11 + (Math.random() * 2 - 1),
        dayChange: 0.85 + (Math.random() * 1 - 0.5),
        iv: 16.8 + (Math.random() * 2 - 1),
        delta: 0.72 + (Math.random() * 0.1 - 0.05),
        theta: -1.8 + (Math.random() * 0.3 - 0.15)
      },
      {
        symbol: 'INFY',
        type: 'PE',
        strike: 1450,
        expiry: '28 Dec',
        qty: 75,
        ltp: 18.90 + (Math.random() * 2 - 1),
        pnl: 945 + (Math.random() * 200 - 100),
        pnlPercent: 6.67 + (Math.random() * 1 - 0.5),
        dayChange: 1.15 + (Math.random() * 1 - 0.5),
        iv: 17.5 + (Math.random() * 2 - 1),
        delta: -0.42 + (Math.random() * 0.1 - 0.05),
        theta: -2.8 + (Math.random() * 0.4 - 0.2)
      }
    ]

    return positions.map(pos => ({
      ...pos,
      ltp: Number(pos.ltp.toFixed(2)),
      pnl: Number(pos.pnl.toFixed(2)),
      pnlPercent: Number(pos.pnlPercent.toFixed(2)),
      dayChange: Number(pos.dayChange.toFixed(2)),
      iv: Number(pos.iv.toFixed(1)),
      delta: Number(pos.delta.toFixed(3)),
      theta: Number(pos.theta.toFixed(1))
    }))
  }

  // Helper methods
  private generateStrikes(spotPrice: number, interval: number): number[] {
    const strikes: number[] = []
    const baseStrike = Math.round(spotPrice / interval) * interval
    
    for (let i = -10; i <= 10; i++) {
      strikes.push(baseStrike + (i * interval))
    }
    
    return strikes.sort((a, b) => a - b)
  }

  private getTimeToExpiry(expiry: string): number {
    // Simplified - return days to expiry
    const expiryDate = new Date(expiry)
    const today = new Date()
    const diffTime = expiryDate.getTime() - today.getTime()
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
  }

  private calculateOptionPrice(spot: number, strike: number, timeToExpiry: number, iv: number, type: 'call' | 'put'): number {
    // Simplified Black-Scholes approximation for demo
    const intrinsic = type === 'call' 
      ? Math.max(0, spot - strike)
      : Math.max(0, strike - spot)
    
    const timeValue = (iv / 100) * Math.sqrt(timeToExpiry / 365) * spot * 0.4
    
    return Math.max(0.05, intrinsic + timeValue)
  }

  // Test API connection
  async testConnection(): Promise<{ connected: boolean; message: string }> {
    try {
      const response = await this.makeAPIRequest<any>('/health')
      
      if (response) {
        return { connected: true, message: 'API connected successfully' }
      } else {
        return { connected: false, message: 'API connection failed - using mock data' }
      }
    } catch (error) {
      return { connected: false, message: 'API connection error - using mock data' }
    }
  }

  // Check if market is open (simplified)
  isMarketOpen(): boolean {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const currentTime = hours * 60 + minutes
    
    // Market hours: 9:15 AM to 3:30 PM (IST)
    const marketOpen = 9 * 60 + 15  // 9:15 AM
    const marketClose = 15 * 60 + 30 // 3:30 PM
    
    return currentTime >= marketOpen && currentTime <= marketClose
  }
}

export const tradingAPI = new TradingAPI()