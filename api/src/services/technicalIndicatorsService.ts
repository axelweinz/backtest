import { Close } from "./backtestService";

export type TechnicalIndicator = {
  closingPrice: number;
  date: Date;
  value: number;
};

const movingAverages = (closes: Close[], window: number) => {
  const mas = [] as TechnicalIndicator[];

  for (let i = window; i <= closes.length; i++) {
    const ma =
      closes.slice(i - window, i).reduce((a, b) => {
        return a + b.price;
      }, 0) / window;

    mas.push({
      closingPrice: closes[i - 1].price,
      date: closes[i - 1].date,
      value: ma,
    });
  }

  return mas;
};

const exponentialMovingAverages = (closes: Close[], window: number) => {
  const smoothing = 2 / (window + 1);

  const emas = [] as TechnicalIndicator[];

  let previousEma = movingAverages(closes.splice(0, window), window)[0].value;
  closes.forEach((close) => {
    let ema = close.price * smoothing + previousEma * (1 - smoothing);

    emas.push({ closingPrice: close.price, date: close.date, value: ema });
    previousEma = ema;
  });

  return emas;
};

export default { movingAverages, exponentialMovingAverages };
