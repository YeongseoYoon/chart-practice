import { Component, ErrorInfo } from "react";
import { Props, State } from "./ErrorBoundary";

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return <Error message={"뭔가 문제가 생겼어요!"} />;
    }

    return this.props.children;
  }
}
