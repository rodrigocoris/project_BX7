import { Component, type ErrorInfo, type ReactNode } from 'react'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('BX7 ERP render error:', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error-fallback">
          <h1>No se pudo cargar BX7 ERP</h1>
          <p>Hubo un error al mostrar la aplicación. Recarga la página o contacta soporte.</p>
          <pre>{this.state.error.message}</pre>
          <button type="button" className="primary-button" onClick={() => window.location.reload()}>
            Recargar
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
