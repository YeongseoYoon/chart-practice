import { useEffect, useState } from "react";
import { ChartData } from "../types/chart.type";
import { ChartService } from "../services";

const useGetChartData = (service: ChartService) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ChartData>();

  useEffect(() => {
    (async () => {
      const response = await service.getChartData();
      setData(response);
      setIsLoading(false);
    })();
  }, []);

  return { isLoading, data };
};
export default useGetChartData;
