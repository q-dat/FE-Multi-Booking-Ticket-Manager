import { ReactNode } from 'react';

export interface ErrorDetail {
  statusCode: number;
  message: string | Record<string, unknown>;
}

export interface ErrorData {
  status: number;
  data: ErrorDetail;
}

export interface IError {
  de: number;
  message: string | object;
  path: string;
  timestamp: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}