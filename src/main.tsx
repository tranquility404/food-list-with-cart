import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './sass/main.css'
import OrderConfirmDialog from './js/components/OrderConfirmDialog.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <OrderConfirmDialog /> */}
  </StrictMode>,
)
