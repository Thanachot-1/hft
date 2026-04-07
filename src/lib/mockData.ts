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

export function generateMockCandles(count: number, startPrice: number, volatility: number = 0.0015): Candle[] {
  const candles: Candle[] = [];
  let currentPrice = startPrice;
  let currentTime = Math.floor(Date.now() / 1000) - count * 15; // 15 second intervals

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
    currentTime += 15; // 15 seconds step
  }

  return candles;
}

export function generateMockMarkers(candles: Candle[]): Marker[] {
  const markers: Marker[] = [];
  candles.forEach((candle, index) => {
    // High frequency markers, mostly shorts
    if (index % 12 === 0 && index > 0) {
      const isBuy = Math.random() > 0.85; // 85% chance to be a SHORT (SELL)
      markers.push({
        time: candle.time,
        position: isBuy ? 'belowBar' : 'aboveBar',
        color: isBuy ? '#0ECB81' : '#F6465D',
        shape: isBuy ? 'arrowUp' : 'arrowDown',
        text: isBuy ? 'AI BUY' : 'AI SHORT',
      });
    }
  });
  return markers;
}

export const mockWatchlist = [
  { symbol: 'NVDA', price: 850.50, change: -2.4, confidence: 95, aiSignal: 'SHORT' },
  { symbol: 'TSLA', price: 175.20, change: -4.2, confidence: 88, aiSignal: 'SHORT' },
  { symbol: 'SPY', price: 510.80, change: -0.6, confidence: 72, aiSignal: 'SHORT' },
  { symbol: 'QQQ', price: 440.10, change: -1.8, confidence: 85, aiSignal: 'SHORT' },
  { symbol: 'AAPL', price: 170.58, change: -0.4, confidence: 50, aiSignal: 'HOLD' },
  { symbol: 'MSFT', price: 420.45, change: 1.1, confidence: 40, aiSignal: 'HOLD' },
  { symbol: 'AMD', price: 180.20, change: -3.5, confidence: 91, aiSignal: 'SHORT' },
  { symbol: 'META', price: 500.90, change: -1.2, confidence: 68, aiSignal: 'SHORT' },
];

export const mockPortfolio = [
  { name: 'NVDA', value: 45000, color: '#76B900' },
  { name: 'TSLA', value: 25000, color: '#E82127' },
  { name: 'SPY', value: 15000, color: '#0051BA' },
  { name: 'USD', value: 15000, color: '#85bb65' },
];

export const mockLogs = [
  { id: 1, time: '09:30:00', type: 'INFO', message: 'HFT Engine initialized. Mode: 15s SHORT-BIAS' },
  { id: 2, time: '09:30:15', type: 'TRADE', message: 'Executed SHORT NVDA @ 850.50 (Size: 100)' },
  { id: 3, time: '09:30:30', type: 'TRADE', message: 'Executed SHORT TSLA @ 175.20 (Size: 500)' },
  { id: 4, time: '09:30:45', type: 'INFO', message: 'Taking partial profits on NVDA (+0.15%)' },
  { id: 5, time: '09:31:00', type: 'TRADE', message: 'Executed SHORT AMD @ 180.20 (Size: 300)' },
];

export const mockOpenPositions = [
  { id: 'pos_1', symbol: 'NVDA', type: 'SHORT', entry: 850.50, size: 100, pnl: 125.50, pnlPercent: 0.15 },
  { id: 'pos_2', symbol: 'TSLA', type: 'SHORT', entry: 175.20, size: 500, pnl: 450.00, pnlPercent: 0.51 },
  { id: 'pos_3', symbol: 'AMD', type: 'SHORT', entry: 180.20, size: 300, pnl: -45.00, pnlPercent: -0.08 },
];
