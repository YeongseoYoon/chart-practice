import { useState } from "react";
import Chart from "react-apexcharts";
import { ChartService } from "./services";
import { API_BASE_URL, HttpClient } from "./apis";
import { useGetChartData } from "./hooks";
import { CHART_COLOR } from "./constants";

function App() {
  const { data } = useGetChartData(
    new ChartService(new HttpClient(API_BASE_URL))
  );

  const [filteredId, setFilteredId] = useState("");
  const handleFilter = (id: string) => {
    setFilteredId(id);
  };

  const chartData = {
    area: [] as number[],
    bar: [] as number[],
    xaxis: [] as string[],
    id: [] as string[],
  };

  Object.entries(data || {}).forEach(([timestamp, item]) => {
    chartData.xaxis.push(timestamp);
    chartData.area.push(item.value_area);
    chartData.bar.push(item.value_bar);
    chartData.id.push(item.id);
  });

  const series = [
    {
      name: "Area",
      type: "area",
      data: chartData.area,
    },
    {
      name: "Bar",
      type: "bar",
      data: chartData.bar,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-5">
      <div className="flex flex-row gap-2">
        <button
          className={`p-1 text-blue-300 border border-blue-300 rounded-2xl ${
            filteredId === "" ? "bg-blue-300 text-white" : ""
          }`}
          onClick={() => {
            setFilteredId("");
          }}
        >
          해제
        </button>
        {[...new Set(chartData.id)].map((id, index) => (
          <button
            key={index}
            className={`p-1 text-blue-300 border border-blue-300 rounded-2xl ${
              filteredId === id ? "bg-blue-300 text-white" : ""
            }`}
            onClick={() => handleFilter(id)}
          >
            {id}
          </button>
        ))}
      </div>
      <Chart
        className="w-5/6 h-4/6"
        series={series}
        options={{
          chart: {
            events: {
              dataPointSelection: (event, chartContext, config) => {
                handleFilter(chartData.id[config.dataPointIndex]);
              },
            },
          },
          colors: [
            CHART_COLOR.AREA,
            ({ dataPointIndex }: { dataPointIndex: number }) => {
              if (chartData.id[dataPointIndex] === filteredId) {
                return CHART_COLOR.FILTERED_BAR;
              } else {
                return CHART_COLOR.BAR;
              }
            },
          ],
          stroke: {
            width: [0, 2, 5],
            curve: "smooth",
          },
          plotOptions: {
            bar: {
              columnWidth: "100%",
            },
          },
          markers: {
            size: 0,
          },
          xaxis: {
            type: "category",
            categories: chartData.xaxis,
          },
          yaxis: [
            {
              title: {
                text: "Area",
              },
            },
            {
              opposite: true,
              title: {
                text: "Bar",
              },
            },
          ],
          tooltip: {
            shared: true,
            intersect: false,
            custom: ({ dataPointIndex }: { dataPointIndex: number }) => {
              return (
                "<span class='font-bold'>" +
                "ID : " +
                chartData.id[dataPointIndex] +
                "</span>" +
                "<span class='font-bold'>" +
                "Area : " +
                chartData.area[dataPointIndex] +
                "</span>" +
                "<span class='font-bold'>" +
                "Bar : " +
                chartData.bar[dataPointIndex] +
                "</span>"
              );
            },
          },
        }}
      />
    </div>
  );
}

export default App;
