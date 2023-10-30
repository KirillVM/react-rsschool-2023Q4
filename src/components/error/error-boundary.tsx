import React, { Component, ErrorInfo, ReactNode } from 'react';
import './error-boundary.css';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1 className={'error-message'}>
          Sorry.. there was an error.Please restart the app
        </h1>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
