import './App.css';
import React from 'react';
import JourneysTable from './JourneysTable';
import StationsTable from './StationsTable';
import Station from './Station';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/journeys">Journeys</Link>
            </li>
            <li>
              <Link to="/stations">Stations</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/journeys" element={<JourneysTable/>} />
        </Routes>
        <Routes>
          <Route path="/stations" element={<StationsTable/>} />
        </Routes>
        <Routes>
          <Route path="/station/:stationId" element={<Station />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
