import { Request, Response } from "express";
import backtestService from "../services/backtestService";

const backtest = async (req: Request, res: Response) => {
  const strategy = req.query.strategy?.toString();
  const ticker = req.query.ticker?.toString();
  return strategy && ticker
    ? res.status(200).send(await backtestService.backtest(strategy, ticker))
    : res.sendStatus(400);
};

export default { backtest };
