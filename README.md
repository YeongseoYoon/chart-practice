# Search-Clinicaltrial

## 프로젝트 소개

- 지역별 데이터를 Chart로 보여주는 프로젝트입니다.

## 데모 영상

[배포 링크](chart-practice-inky.vercel.app, "배포 링크")

## 개발 환경

### Developement

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/>

### Styling

<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>

## 디렉토리 구조

```
📦src
 ┣ 📂apis
 ┃ ┣ 📜config.ts
 ┃ ┣ 📜httpClient.ts
 ┃ ┗ 📜index.ts
 ┣ 📂components
 ┃ ┣ 📂Chart
 ┃ ┃ ┣ 📜Container.tsx
 ┃ ┃ ┣ 📜Fetcher.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📜Error.tsx
 ┃ ┣ 📜ErrorBoundary.tsx
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜Loading.tsx
 ┣ 📂constants
 ┃ ┗ 📜index.ts
 ┣ 📂hooks
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜useBlockScroll.ts
 ┃ ┗ 📜useGetChartData.ts
 ┣ 📂services
 ┃ ┣ 📜chart.service.ts
 ┃ ┗ 📜index.ts
 ┣ 📂types
 ┃ ┗ 📜chart.type.ts
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┗ 📜main.tsx
```

## Assignment별 구현 방식

### Assignment 1. 시계열 차트 만들기

    - 주어진 JSON 데이터의 `key`값(시간)을 기반으로 시계열 차트를 만들어주세요
    - 하나의 차트안에 Area 형태의 그래프와 Bar 형태의 그래프가 모두 존재하는 복합 그래프로 만들어주세요
    - Area 그래프의 기준값은 `value_area` 값을 이용해주세요
    - Bar 그래프의 기준값은 `value_bar` 값을 이용해주세요
    - 차트의 Y축에 대략적인 수치를 표현해주세요(예시 이미지 참고)

**예시 이미지**
<img alt="예시 이미지" src="https://github.com/YeongseoYoon/chart-practice/assets/86523545/419b5de6-9362-4e46-85fd-cf9cbd6b6428"/>

- apex-charts 라이브러리를 이용해 차트를 구현했습니다.

<img src="https://github.com/YeongseoYoon/search-clinicaltrial/assets/86523545/a430f231-f4d4-4b9f-8b97-574e738dfbe9"/>

- chartData라는 객체를 만들어, 내부에 id, xaxis, area, bar 프로퍼티를 만들고, 배열값을 저장해 쓰도록 했습니다.

```js
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

```

### Assignment 2. 호버 기능 구현

    - 특정 데이터 구역에 마우스 호버시 `id, value_area, value_bar` 데이터를 툴팁 형태로 제공해주세요

> 🧐 **고민했던 점** <br>
> 제공받은 데이터는 다음과 같았습니다.
>
> ```
> response": {
>    "2023-02-01 14:32:00": {
>      "id": "성북구",
>      "value_area": 46,
>      "value_bar": 13111
>    },
>    "2023-02-01 14:32:05": {
>      "id": "강남구",
>      "value_area": 9,
>      "value_bar": 19143
>    },
>    "2023-02-01 14:32:10": {
>      "id": "노원구",
>      "value_area": 79,
>      "value_bar": 14798
>    },
>    "2023-02-01 14:32:15": {
>      "id": "중랑구",
>      "value_area": 4,
>      "value_bar": 14456
>    },
>   //후략
> ```
>
> 현재 apex charts에서 default로 제공하는 tooltip의 경우, yaxis의 데이터(series)를 tooltip으로 보여주고, y축에서 보여주지 않는 id값에 대해서는 보여주지 않는데, id값까지 tooltip에 노출시킬 필요가 있었습니다.

- apex charts에서 제공하는 tooltip option을 이용했습니다.

```js
 tooltip: {
   shared: true,
   intersect: false,
   custom: ({ dataPointIndex }: { dataPointIndex: number }) => {
   return tooltipTemplate(dataPointIndex);
   },
},
```

<img src="https://github.com/YeongseoYoon/search-clinicaltrial/assets/86523545/1ed123f6-f614-4fe8-bf8b-800b7651d865"/>

### Assignment 3. 필터링 기능 구현

    - 필터링 기능을 구현해주세요, 필터링은 특정 데이터 구역을 하이라이트 하는 방식으로 구현해주세요
    - 필터링 기능은 버튼 형태로 ID값(지역이름)을 이용해주세요
    - 필터링 시 버튼에서 선택한 ID값과 동일한 ID값을 가진 데이터 구역만 하이라이트 처리를 해주세요
    - 특정 데이터 구역을 클릭 시에도 필터링 기능과 동일한 형태로 동일한 ID값을 가진 데이터 구역을 하이라이트해주세요

- 필터링 기능을 위해 apex charts의 events와 colors option을 사용했습니다.
- 상단의 지역별 버튼을 클릭하거나, 차트의 bar를 클릭하면 id값이 filteredId에 들어가고, filteredId와 bar 차트의 내용이 같다면 colors option을 이용해 하이라이트하도록 했습니다.

```js
  const [filteredId, setFilteredId] = useState("");
  const handleFilter = (id: string) => {
    setFilteredId(id);
  };
   //버튼들
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

//차트
   <Chart
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
         //후략
```

<img src="https://github.com/YeongseoYoon/search-clinicaltrial/assets/86523545/9d9a94fd-db1c-450b-9a58-cdd1f75fbfca"/>

### Assignment 4. 기타사항

- vercel을 이용해 주어진 정적 데이터를 배포해 서버를 구현했습니다. (mock data)
  [vercel로 배포한 서버 레포지토리](https://github.com/YeongseoYoon/chart-practice-server)

- 횡단 관심사의 분리를 위해 httpClient와 ChartService 단을 분리하고, ChartService에 httpClient 인스턴스를 주입해주는 방식을 선택했습니다.

```js
//chart.service.ts
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
```

```js
//httpClient.ts
export class HttpClient {
  constructor(private baseURL: string) {}

  public get = async (endPoint: string, options?: RequestOptions) => {
    const response = await fetch(this.baseURL + endPoint, {
      method: "get",
      ...options,
    });

    if (response.ok) {
      return response;
    } else {
      throw response;
    }
  };
}

```
