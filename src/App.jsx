import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import EventDetail from './pages/EventDetail'
import Home from './pages/Home'
import MySeats from './pages/MySeats'
import NotFound from './pages/NotFound'
import Credits from './pages/Credits'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/event/:slug" element={<EventDetail />} />
          <Route path="/seats" element={<MySeats />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
