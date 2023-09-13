import { BiErrorCircle as ErrorIcon } from "react-icons/bi";

interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-8 p-4 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg">
        <ErrorIcon className="text-red-500" size={16} />
        <div className="text-xl font-bold">{message}</div>
      </div>
    </>
  );
};

export default Error;
