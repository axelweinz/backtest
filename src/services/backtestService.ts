import technicalIndicatorsService, {
  TechnicalIndicator,
} from "./technicalIndicatorsService";
import yahoofinance from "yahoo-finance2";

export type BacktestResult = {
  profit: number;
  numberOfTrades: number;
  buyAndHoldProfit: number;
};

export type Close = {
  price: number;
  date: Date;
};

const getCloses = async (
  ticker: string,
  startDate: string,
  endDate: string
) => {
  const historical = await yahoofinance.historical(ticker, {
    period1: startDate,
    period2: endDate,
  });
  return historical.map((row) => {
    return {
      price: row.close,
      date: row.date,
    } as Close;
  });
};

const exponentialMovingAverage = async (
  ticker: string,
  startDate: string,
  endDate: string,
  window: number
) => {
  const closes = await getCloses(ticker, startDate, endDate);
  const emaData = technicalIndicatorsService.exponentialMovingAverages(
    closes,
    window
  );

  let balance = 0;
  let numberOfTrades = 0;
  let activePosition = false;

  emaData.forEach((ema) => {
    if (ema.value < ema.closingPrice && !activePosition) {
      // Buy signal
      balance -= ema.closingPrice;
      activePosition = true;
      numberOfTrades += 1;
    } else if (ema.value > ema.closingPrice && activePosition) {
      // Sell signal
      balance += ema.closingPrice;
      activePosition = false;
      numberOfTrades += 1;
    }
  });

  return calculateBacktestResult(
    balance,
    numberOfTrades,
    activePosition,
    emaData
  );
};

const movingAverageCrossover = async (
  ticker: string,
  startDate: string,
  endDate: string,
  shortWindow: number,
  longWindow: number
) => {
  const closes = await getCloses(ticker, startDate, endDate);
  const shortMas = technicalIndicatorsService
    .movingAverages(closes, shortWindow)
    .slice(longWindow - shortWindow);
  const longMas = technicalIndicatorsService.movingAverages(closes, longWindow);

  let balance = 0;
  let numberOfTrades = 0;
  let activePosition = false;
  for (let i = 0; i < shortMas.length; i++) {
    if (longMas[i].value < shortMas[i].value && !activePosition) {
      // Buy signal
      balance -= shortMas[i].closingPrice;
      activePosition = true;
      numberOfTrades += 1;
    } else if (longMas[i].value > shortMas[i].value && activePosition) {
      // Sell signal
      balance += shortMas[i].closingPrice;
      activePosition = false;
      numberOfTrades += 1;
    }
  }

  return calculateBacktestResult(
    balance,
    numberOfTrades,
    activePosition,
    shortMas
  );
};

const movingAverageConvergenceDivergence = (closes: Close[]) => {};

const calculateBacktestResult = (
  balance: number,
  numberOfTrades: number,
  activePosition: boolean,
  technicalIndicators: TechnicalIndicator[]
) => {
  return {
    profit: activePosition
      ? (balance +
          technicalIndicators[technicalIndicators.length - 1].closingPrice) /
        technicalIndicators[0].closingPrice
      : balance / technicalIndicators[0].closingPrice,
    numberOfTrades: numberOfTrades,
    buyAndHoldProfit:
      (technicalIndicators[technicalIndicators.length - 1].closingPrice -
        technicalIndicators[0].closingPrice) /
      technicalIndicators[0].closingPrice,
  } as BacktestResult;
};

export default { exponentialMovingAverage, movingAverageCrossover };
