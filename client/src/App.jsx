import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './global.css'
import Home from './pages/home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
