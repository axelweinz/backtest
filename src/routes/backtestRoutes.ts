import { Router } from "express";
import backtestController from "../controllers/backtestController";

const router = Router();

router.get("/backtest/ema", backtestController.exponentialMovingAverage);
router.get("/backtest/crossover", backtestController.movingAverageCrossover);

module.exports = router;
