export type ChartData = Record<Timestamp, Chart>;

type Timestamp = string;

type Chart = {
  id: string;
  value_area: number;
  value_bar: number;
};
