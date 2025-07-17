import { useState, useEffect, useCallback, useRef } from 'react'
import { tradingAPI, MarketData, OptionData, PortfolioPosition } from '../services/api'

// Hook for live market data
export function useMarketData(symbols: string[], refreshInterval = 5000) {
  const [data, setData] = useState<MarketData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setError(null)
      const marketData = await tradingAPI.getMarketData(symbols)
      setData(marketData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch market data')
      console.error('Market data fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [symbols])

  useEffect(() => {
    fetchData()

    // Set up auto-refresh only if market is open
    if (tradingAPI.isMarketOpen()) {
      intervalRef.current = setInterval(fetchData, refreshInterval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [fetchData, refreshInterval])

  const refresh = useCallback(() => {
    setLoading(true)
    fetchData()
  }, [fetchData])

  return { data, loading, error, refresh, isMarketOpen: tradingAPI.isMarketOpen() }
}

// Hook for options chain data
export function useOptionsChain(symbol: string, expiry: string, refreshInterval = 10000) {
  const [data, setData] = useState<OptionData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const fetchData = useCallback(async () => {
    if (!symbol || !expiry) return

    try {
      setError(null)
      const optionsData = await tradingAPI.getOptionsChain(symbol, expiry)
      setData(optionsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch options data')
      console.error('Options chain fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [symbol, expiry])

  useEffect(() => {
    fetchData()

    // Set up auto-refresh only if market is open
    if (tradingAPI.isMarketOpen()) {
      intervalRef.current = setInterval(fetchData, refreshInterval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [fetchData, refreshInterval])

  const refresh = useCallback(() => {
    setLoading(true)
    fetchData()
  }, [fetchData])

  return { data, loading, error, refresh, isMarketOpen: tradingAPI.isMarketOpen() }
}

// Hook for portfolio data
export function usePortfolio(refreshInterval = 15000) {
  const [positions, setPositions] = useState<PortfolioPosition[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setError(null)
      const portfolioData = await tradingAPI.getPortfolioPositions()
      setPositions(portfolioData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch portfolio data')
      console.error('Portfolio fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()

    // Set up auto-refresh
    intervalRef.current = setInterval(fetchData, refreshInterval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [fetchData, refreshInterval])

  const refresh = useCallback(() => {
    setLoading(true)
    fetchData()
  }, [fetchData])

  // Calculate portfolio stats
  const portfolioStats = {
    totalValue: positions.reduce((sum, pos) => sum + (pos.ltp * pos.qty), 0),
    totalPnL: positions.reduce((sum, pos) => sum + pos.pnl, 0),
    totalPnLPercent: positions.length > 0 
      ? (positions.reduce((sum, pos) => sum + pos.pnl, 0) / positions.reduce((sum, pos) => sum + (pos.ltp * pos.qty), 0)) * 100
      : 0,
    dayChange: positions.reduce((sum, pos) => sum + (pos.dayChange * pos.qty), 0),
    dayChangePercent: positions.length > 0
      ? (positions.reduce((sum, pos) => sum + (pos.dayChange * pos.qty), 0) / positions.reduce((sum, pos) => sum + (pos.ltp * pos.qty), 0)) * 100
      : 0,
    activePositions: positions.length,
    profitablePositions: positions.filter(pos => pos.pnl > 0).length,
    losingPositions: positions.filter(pos => pos.pnl < 0).length
  }

  return { 
    positions, 
    portfolioStats, 
    loading, 
    error, 
    refresh, 
    isMarketOpen: tradingAPI.isMarketOpen() 
  }
}

// Hook for real-time price updates with WebSocket simulation
export function useRealTimePrice(symbol: string) {
  const [price, setPrice] = useState<number | null>(null)
  const [change, setChange] = useState<number>(0)
  const [changePercent, setChangePercent] = useState<number>(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Simulate real-time price updates
    const updatePrice = async () => {
      try {
        const [marketData] = await tradingAPI.getMarketData([symbol])
        if (marketData) {
          setPrice(marketData.ltp)
          setChange(marketData.change)
          setChangePercent(marketData.changePercent)
        }
      } catch (error) {
        console.error('Real-time price update error:', error)
      }
    }

    updatePrice()

    // Update every 2 seconds if market is open
    if (tradingAPI.isMarketOpen()) {
      intervalRef.current = setInterval(updatePrice, 2000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [symbol])

  return { price, change, changePercent, isMarketOpen: tradingAPI.isMarketOpen() }
}