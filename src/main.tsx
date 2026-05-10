import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import Layout from './components/Layout'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import DeleteAccount from './pages/DeleteAccount'
import CommunityGuidelines from './pages/CommunityGuidelines'
import ScrollToTop from './components/ScrollToTop'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="community-guidelines" element={<CommunityGuidelines />} />
          <Route path="delete-account" element={<DeleteAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
