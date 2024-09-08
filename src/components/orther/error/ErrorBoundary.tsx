import React, { Component } from "react";
import { Button, Hero } from "react-daisyui";
import {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from "../../../types/type/error/error";

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full items-center overflow-x-hidden bg-black text-white">
          <Hero>
            <Hero.Content>
              <div>
                <h1 className="text-5xl font-bold">
                    Đã có bugs 🐞!!!
                </h1>
                <p className="py-6">
                  <p className="text-red-500">
                    {this.state.error && this.state.error.toString()}
                  </p>
                  <br />
                  {this.state.errorInfo?.componentStack}
                </p>
                <Button color="primary" className="text-white">
                  Thua luôn, hết cứu!!!
                </Button>
              </div>
            </Hero.Content>
          </Hero>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
