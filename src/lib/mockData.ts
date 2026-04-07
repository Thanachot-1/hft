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
  { symbol: 'BTC/USDT', price: 64230.50, change: 2.4, confidence: 85, aiSignal: 'BUY' },
  { symbol: 'ETH/USDT', price: 3450.20, change: -1.2, confidence: 62, aiSignal: 'HOLD' },
  { symbol: 'SOL/USDT', price: 145.80, change: 5.6, confidence: 92, aiSignal: 'BUY' },
  { symbol: 'BNB/USDT', price: 590.10, change: 0.8, confidence: 45, aiSignal: 'SELL' },
  { symbol: 'XRP/USDT', price: 0.58, change: -0.4, confidence: 50, aiSignal: 'HOLD' },
  { symbol: 'ADA/USDT', price: 0.45, change: 1.1, confidence: 78, aiSignal: 'BUY' },
  { symbol: 'AVAX/USDT', price: 35.20, change: -2.5, confidence: 30, aiSignal: 'SELL' },
  { symbol: 'LINK/USDT', price: 18.90, change: 4.2, confidence: 88, aiSignal: 'BUY' },
];

export const mockPortfolio = [
  { name: 'BTC', value: 45000, color: '#F7931A' },
  { name: 'ETH', value: 25000, color: '#627EEA' },
  { name: 'SOL', value: 15000, color: '#14F195' },
  { name: 'USDT', value: 15000, color: '#26A17B' },
];

export const mockLogs = [
  { id: 1, time: '14:05:22', type: 'INFO', message: 'AI Engine initialized. Model: Quant-v4.2' },
  { id: 2, time: '14:05:25', type: 'TRADE', message: 'Executed BUY BTC/USDT @ 64,200.00' },
  { id: 3, time: '14:08:10', type: 'WARN', message: 'High volatility detected on SOL/USDT' },
  { id: 4, time: '14:10:05', type: 'TRADE', message: 'Executed SELL ETH/USDT @ 3,460.50' },
  { id: 5, time: '14:12:30', type: 'INFO', message: 'Rebalancing portfolio weights' },
];

export const mockOpenPositions = [
  { id: 'pos_1', symbol: 'BTC/USDT', type: 'LONG', entry: 64200.00, size: 0.5, pnl: 15.25, pnlPercent: 0.02 },
  { id: 'pos_2', symbol: 'SOL/USDT', type: 'LONG', entry: 140.50, size: 100, pnl: 530.00, pnlPercent: 3.77 },
];
