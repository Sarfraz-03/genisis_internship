import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Promote from './components/Promote.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Promote />
  </StrictMode>,
)
