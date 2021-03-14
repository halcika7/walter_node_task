import { Component } from 'react';

interface CustomError {
  message: string;
  stack: string;
  name: string;
}

interface Info {
  componentStack: string;
}

interface State {
  hasError: boolean;
  error: CustomError;
  info: Info;
}

class ErrorBoundary extends Component {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      hasError: false,
      error: { message: '', stack: '', name: '' },
      info: { componentStack: '' },
    };
  }

  componentDidCatch(error: CustomError, info: Info) {
    this.setState(() => ({ error, info, hasError: true }));
  }

  render() {
    const { hasError, error, info } = this.state as State;
    const { children } = this.props;

    const display = hasError ? (
      <>
        <h1>{error.toString()}</h1>
        <h1>{info.componentStack.toString()}</h1>
      </>
    ) : (
      <>{children}</>
    );

    return display;
  }
}

export default ErrorBoundary;
