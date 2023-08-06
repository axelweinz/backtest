import { Request, Response } from "express";
import backtestService from "../services/backtestService";

const exponentialMovingAverage = async (req: Request, res: Response) => {
  const ticker = req.query.ticker?.toString();
  const startDate = req.query.start?.toString();
  const endDate = req.query.end?.toString();
  const window = req.query.window
    ? parseInt(req.query.window.toString())
    : undefined;

  return ticker && startDate && endDate && window
    ? res
        .status(200)
        .send(
          await backtestService.exponentialMovingAverage(
            ticker,
            startDate,
            endDate,
            window
          )
        )
    : res.sendStatus(400);
};

const movingAverageCrossover = async (req: Request, res: Response) => {
  const ticker = req.query.ticker?.toString();
  const startDate = req.query.start?.toString();
  const endDate = req.query.end?.toString();
  const shortWindow = req.query.shortWindow
    ? parseInt(req.query.shortWindow.toString())
    : undefined;
  const longWindow = req.query.longWindow
    ? parseInt(req.query.longWindow.toString())
    : undefined;

  return ticker && startDate && endDate && shortWindow && longWindow
    ? res
        .status(200)
        .send(
          await backtestService.movingAverageCrossover(
            ticker,
            startDate,
            endDate,
            shortWindow,
            longWindow
          )
        )
    : res.sendStatus(400);
};

export default { exponentialMovingAverage, movingAverageCrossover };
