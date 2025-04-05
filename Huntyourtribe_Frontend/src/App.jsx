import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Notification from './components/Notification'
import Pages from './components/Pages'

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Pages />}/>
        <Route path='/notifications' element={<Notification />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
