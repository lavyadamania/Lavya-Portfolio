import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('WebGL / 3D error boundary:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-[200px] items-center justify-center rounded-2xl border border-pink/20 bg-dark-3/80 p-8 font-grotesk text-text2">
            3D preview unavailable in this environment.
          </div>
        )
      )
    }
    return this.props.children
  }
}
