import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Overall from './Overall'

import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Overall />
    </Router>
  </StrictMode>,
)