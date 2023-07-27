import { Close } from "./backtestService";

export type EmaData = {
  closingPrice: number;
  date: Date;
  value: number;
};

const exponentialMovingAverages = (closes: Close[], window: number) => {
  const sma =
    closes.splice(0, window).reduce((a, b) => {
      return a + b.price;
    }, 0) / window;
  const smoothing = 2 / (window + 1);

  const emas = [] as EmaData[];

  let previousEma = sma;
  closes.forEach((close) => {
    let ema = close.price * smoothing + previousEma * (1 - smoothing);

    emas.push({ closingPrice: close.price, date: close.date, value: ema });
    previousEma = ema;
  });

  return emas;
};

export default { exponentialMovingAverages };
