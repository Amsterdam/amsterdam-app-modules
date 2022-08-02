import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './amsterdam.sans.typo.css'
import App from './App'
import { AuthProvider } from './context/AuthProvider'
import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
)
