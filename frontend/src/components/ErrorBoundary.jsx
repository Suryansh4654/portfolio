import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#030712',
          color: '#f3f4f6',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '20px'
        }}>
          <div style={{
            background: '#111827',
            padding: '32px',
            borderRadius: '24px',
            border: '1px solid #1f2937',
            maxWidth: '650px',
            width: '100%',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(239, 68, 68, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '24px', color: '#ef4444' }}>⚠️</span>
            </div>
            
            <h1 style={{ 
              color: '#ffffff', 
              fontSize: '22px', 
              fontWeight: '800',
              marginBottom: '8px',
              letterSpacing: '-0.025em'
            }}>
              React Compilation/Runtime Crash
            </h1>
            
            <p style={{ 
              fontSize: '14px', 
              color: '#9ca3af', 
              marginBottom: '20px',
              lineHeight: '1.5'
            }}>
              React failed to render a component inside the DOM layout. The console traceback was intercepted below:
            </p>
            
            <pre style={{
              background: '#1f2937',
              padding: '16px',
              borderRadius: '12px',
              color: '#f43f5e',
              overflowX: 'auto',
              fontSize: '13px',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              marginBottom: '16px',
              border: '1px solid rgba(244, 63, 94, 0.1)'
            }}>
              {this.state.error?.toString()}
            </pre>
            
            {this.state.errorInfo && (
              <pre style={{
                background: '#0f172a',
                padding: '16px',
                borderRadius: '12px',
                color: '#9ca3af',
                overflowX: 'auto',
                fontSize: '11px',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                maxHeight: '180px',
                overflowY: 'auto',
                border: '1px solid #1e293b'
              }}>
                {this.state.errorInfo.componentStack}
              </pre>
            )}
            
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button 
                onClick={() => window.location.reload()} 
                style={{
                  background: '#6366f1',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'opacity 0.2s'
                }}
              >
                Reload Web App
              </button>
              <button 
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }} 
                style={{
                  background: '#1f2937',
                  color: '#d1d5db',
                  border: '1px solid #374151',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Clear Cache & Retry
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
