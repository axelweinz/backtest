import { Router } from "express";
import backtestController from "../controllers/backtestController";

const router = Router();

router.get("/backtest", backtestController.backtest);

module.exports = router;
