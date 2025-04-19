import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh'}}>
    <StrictMode>
      <App />
    </StrictMode>
  </div>,
)
