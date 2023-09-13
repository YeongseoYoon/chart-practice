import { HttpClient } from "../apis";
import { ChartData } from "../types/chart.type";

export class ChartService {
  constructor(private httpClient: HttpClient) {}

  getChartData = async () => {
    const response = await this.httpClient.get("data");

    const { response: data } = await response.json();

    return data as ChartData;
  };
}
