import { ChartService } from "../../services";
import { API_BASE_URL, HttpClient } from "../../apis";
import { useGetChartData } from "../../hooks";
import ChartContainer from "./Container";

const ChartFetcher = () => {
  const chartService = new ChartService(new HttpClient(API_BASE_URL));

  const { data, isLoading } = useGetChartData(chartService);
  return <ChartContainer data={data || {}} isLoading={isLoading} />;
};

export default ChartFetcher;
