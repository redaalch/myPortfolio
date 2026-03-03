import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  /** Optional fallback UI — defaults to a minimal error card. */
  fallback?: ReactNode;
  /** Narrow label shown in the error card (e.g. "Projects", "Experience"). */
  section?: string;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * React Error Boundary — catches render errors in child trees and
 * displays a graceful fallback instead of crashing the whole page.
 *
 * Usage:
 *   <ErrorBoundary section="Projects">
 *     <ProjectsSection />
 *   </ErrorBoundary>
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(
      `[ErrorBoundary${this.props.section ? ` — ${this.props.section}` : ""}]`,
      error,
      info.componentStack,
    );
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          role="alert"
          className="mx-auto my-12 max-w-lg rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center"
        >
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            {this.props.section
              ? `Something went wrong in "${this.props.section}"`
              : "Something went wrong"}
          </h2>
          <p className="mb-6 text-sm text-foreground/60">
            An unexpected error occurred. You can try again or refresh the page.
          </p>
          <button
            type="button"
            onClick={this.handleRetry}
            className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-foreground/5 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/10"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
