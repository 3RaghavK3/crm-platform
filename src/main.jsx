import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CustomerProvider } from './context/CustomerContext'
import { OrderProvider } from './context/OrderContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CustomerProvider>
      <OrderProvider>
        <App />
      </OrderProvider>
    </CustomerProvider>
  </StrictMode>,
)
