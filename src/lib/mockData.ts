export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface Marker {
  time: number;
  position: 'aboveBar' | 'belowBar';
  color: string;
  shape: 'arrowDown' | 'arrowUp';
  text: string;
}

export function generateMockCandles(count: number, startPrice: number, volatility: number = 0.002): Candle[] {
  const candles: Candle[] = [];
  let currentPrice = startPrice;
  let currentTime = Math.floor(Date.now() / 1000) - count * 60; // 1 minute intervals

  for (let i = 0; i < count; i++) {
    const open = currentPrice;
    const change = currentPrice * volatility * (Math.random() - 0.5);
    const close = open + change;
    const high = Math.max(open, close) + Math.abs(change) * Math.random();
    const low = Math.min(open, close) - Math.abs(change) * Math.random();

    candles.push({
      time: currentTime,
      open,
      high,
      low,
      close,
    });

    currentPrice = close;
    currentTime += 60;
  }

  return candles;
}

export function generateMockMarkers(candles: Candle[]): Marker[] {
  const markers: Marker[] = [];
  candles.forEach((candle, index) => {
    if (index % 30 === 0 && index > 0) {
      const isBuy = Math.random() > 0.5;
      markers.push({
        time: candle.time,
        position: isBuy ? 'belowBar' : 'aboveBar',
        color: isBuy ? '#0ECB81' : '#F6465D',
        shape: isBuy ? 'arrowUp' : 'arrowDown',
        text: isBuy ? 'AI BUY' : 'AI SELL',
      });
    }
  });
  return markers;
}

export const mockWatchlist = [
  { symbol: 'NVDA', price: 850.50, change: 2.4, confidence: 85, aiSignal: 'BUY' },
  { symbol: 'TSLA', price: 175.20, change: -1.2, confidence: 62, aiSignal: 'HOLD' },
  { symbol: 'SPY', price: 510.80, change: 0.6, confidence: 92, aiSignal: 'BUY' },
  { symbol: 'QQQ', price: 440.10, change: 0.8, confidence: 45, aiSignal: 'SELL' },
  { symbol: 'AAPL', price: 170.58, change: -0.4, confidence: 50, aiSignal: 'HOLD' },
  { symbol: 'MSFT', price: 420.45, change: 1.1, confidence: 78, aiSignal: 'BUY' },
  { symbol: 'AMD', price: 180.20, change: -2.5, confidence: 30, aiSignal: 'SELL' },
  { symbol: 'META', price: 500.90, change: 4.2, confidence: 88, aiSignal: 'BUY' },
];

export const mockPortfolio = [
  { name: 'NVDA', value: 45000, color: '#76B900' },
  { name: 'TSLA', value: 25000, color: '#E82127' },
  { name: 'SPY', value: 15000, color: '#0051BA' },
  { name: 'USD', value: 15000, color: '#85bb65' },
];

export const mockLogs = [
  { id: 1, time: '09:30:22', type: 'INFO', message: 'AI Engine initialized. Model: Quant-v4.2 (Alpaca)' },
  { id: 2, time: '09:30:25', type: 'TRADE', message: 'Executed BUY NVDA @ 850.00' },
  { id: 3, time: '09:35:10', type: 'WARN', message: 'High volatility detected on TSLA' },
  { id: 4, time: '09:40:05', type: 'TRADE', message: 'Executed SELL SPY @ 510.50' },
  { id: 5, time: '09:45:30', type: 'INFO', message: 'Rebalancing portfolio weights' },
];

export const mockOpenPositions = [
  { id: 'pos_1', symbol: 'NVDA', type: 'LONG', entry: 850.00, size: 50, pnl: 25.00, pnlPercent: 0.05 },
  { id: 'pos_2', symbol: 'TSLA', type: 'LONG', entry: 175.50, size: 100, pnl: -30.00, pnlPercent: -0.17 },
];
