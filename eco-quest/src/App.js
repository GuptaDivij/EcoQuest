import * as React from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './pages/home.tsx'
import { CarbonFootprintCalculator } from './pages/carbon-footprint-calculator.tsx'
import { Leaderboard } from './pages/leaderboard.tsx'
import { Profile } from './pages/profile.tsx'
import { Layout } from './Layout.tsx'


function App({ Component }) {

  return (
    <>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />}/>
              <Route path="/carbon-footprint-calculator" element={<CarbonFootprintCalculator />}/>
              <Route path="/leaderboard" element={<Leaderboard />}/>
              <Route path="/profile" element={<Profile />}/> 
            </Route>
          </Routes>
        </Router>
    </>
  )
}

export default App;