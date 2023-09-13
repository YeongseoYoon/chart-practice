import { ChartFetcher, ErrorBoundary } from "./components";

function App() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-5">
      <ErrorBoundary>
        <ChartFetcher />
      </ErrorBoundary>
    </div>
  );
}

export default App;
