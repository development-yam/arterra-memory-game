import { Routes, Route } from 'react-router-dom'
import './styles/app.scss'

import MasterLayout from './layout/Master'

import Home from './pages/Home'
import Difficulty from './pages/Difficulty'
import Game from './pages/Game'
import DataEntry from './pages/DataEntry'
import Instructions from './pages/Instruction'
import Leaderboard from './pages/Leaderboard'
import KioskId from './components/KioskId'

function App() {
  return (
    <MasterLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/difficulty" element={<Difficulty />} />
        <Route path="/game" element={<Game />} />
        <Route path="/data-entry" element={<DataEntry />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/k/:kioskId" element={<KioskId />} />
      </Routes>
    </MasterLayout>
  )
}

export default App
