import { useBlockScroll } from "../hooks";

const Loading = () => {
  useBlockScroll();
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-70">
      <div className="text-white">차트를 불러오고 있습니다...</div>
    </div>
  );
};
export default Loading;
