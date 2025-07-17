import React, { useEffect, useRef, useState } from 'react';
import { createChart, IChartApi, ISeriesApi, CandlestickData, LineData, ColorType } from 'lightweight-charts';

interface TradingChartProps {
  data: CandlestickData[] | LineData[];
  type?: 'candlestick' | 'line' | 'area';
  height?: number;
  width?: number;
  symbol?: string;
  className?: string;
}

export const TradingChart: React.FC<TradingChartProps> = ({
  data,
  type = 'candlestick',
  height = 400,
  width,
  symbol = 'NIFTY',
  className = ''
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      width: width || chartContainerRef.current.clientWidth,
      height,
      layout: {
        background: { type: ColorType.Solid, color: '#ffffff' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: '#e0e0e0',
      },
      timeScale: {
        borderColor: '#e0e0e0',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    // Create series based on type
    let series;
    if (type === 'candlestick') {
      series = chart.addCandlestickSeries({
        upColor: '#00d4aa',
        downColor: '#ff4757',
        borderDownColor: '#ff4757',
        borderUpColor: '#00d4aa',
        wickDownColor: '#ff4757',
        wickUpColor: '#00d4aa',
      });
    } else if (type === 'line') {
      series = chart.addLineSeries({
        color: '#1a365d',
        lineWidth: 2,
      });
    } else if (type === 'area') {
      series = chart.addAreaSeries({
        lineColor: '#1a365d',
        topColor: 'rgba(26, 54, 93, 0.4)',
        bottomColor: 'rgba(26, 54, 93, 0.0)',
        lineWidth: 2,
      });
    }

    seriesRef.current = series;

    // Set data
    if (data && data.length > 0) {
      series?.setData(data);
      setIsLoading(false);
    }

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chart) {
        chart.applyOptions({
          width: width || chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, type, height, width]);

  // Update data when it changes
  useEffect(() => {
    if (seriesRef.current && data && data.length > 0) {
      seriesRef.current.setData(data);
      setIsLoading(false);
    }
  }, [data]);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-600">Loading chart...</span>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700">{symbol}</h3>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span className="capitalize">{type}</span>
          <span>•</span>
          <span>Real-time</span>
        </div>
      </div>
      <div 
        ref={chartContainerRef} 
        className="border border-gray-200 rounded-lg"
        style={{ height: `${height}px` }}
      />
    </div>
  );
};

// Helper function to generate sample data
export const generateSampleData = (type: 'candlestick' | 'line' | 'area' = 'candlestick', days: number = 30) => {
  const data: any[] = [];
  const basePrice = 18000;
  let currentPrice = basePrice;
  
  for (let i = 0; i < days; i++) {
    const time = Math.floor(Date.now() / 1000) - (days - i) * 24 * 60 * 60;
    
    if (type === 'candlestick') {
      const open = currentPrice;
      const volatility = 0.02;
      const change = (Math.random() - 0.5) * 2 * volatility * open;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 0.01 * open;
      const low = Math.min(open, close) - Math.random() * 0.01 * open;
      
      data.push({
        time,
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
      });
      
      currentPrice = close;
    } else {
      const volatility = 0.02;
      const change = (Math.random() - 0.5) * 2 * volatility * currentPrice;
      currentPrice += change;
      
      data.push({
        time,
        value: parseFloat(currentPrice.toFixed(2)),
      });
    }
  }
  
  return data;
};