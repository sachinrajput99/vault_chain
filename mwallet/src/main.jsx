import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { MemoryRouter } from "react-router-dom"
import './index.css'
import WalletProvider from './providers/WalletProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MemoryRouter>
      <WalletProvider>
      <App />
      </WalletProvider>
    </MemoryRouter>
  </StrictMode>,
)
