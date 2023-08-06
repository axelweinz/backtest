import axios from "axios";
import { TickerResponse } from "./responses/TickerResponse";

const api = axios.create({
  baseURL: "https://dumbstockapi.com",
});

const DumbStockApiClient = {
  getTickers: async function (exchange: string): Promise<TickerResponse[]> {
    const response = await api.request({
      url: `/stock?exchanges=${exchange}`,
      method: "GET",
    });

    return response.data;
  },
};

export default DumbStockApiClient;
