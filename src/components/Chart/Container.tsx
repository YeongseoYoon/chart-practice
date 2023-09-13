import { useState } from "react";

import Chart from "react-apexcharts";
import { CHART_COLOR } from "../../constants";
import { Loading } from "../index";
import { ChartData } from "../../types/chart.type";

interface ChartContainerProps {
  isLoading: boolean;
  data: ChartData;
}

const ChartContainer = ({ isLoading, data }: ChartContainerProps) => {
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

  const tooltipTemplate = (dataPointIndex: number) => {
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
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
                    //매개변수에 event와 chartContext를 받아오지 않을시 config의 dataPointInde를 못받아 오는 문제 발생으로
                    //부득이하게 쓰지 않는것으로 보이는 매개변수를 지우지 않았습니다.
                    console.log(event, chartContext + "배포용 로그 출력");
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
                  return tooltipTemplate(dataPointIndex);
                },
              },
            }}
          />
        </>
      )}
    </>
  );
};

export default ChartContainer;
