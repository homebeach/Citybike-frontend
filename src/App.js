import './App.css';
import React from 'react';
import JourneysTable from './JourneysTable';
import StationsTable from './StationsTable';
import Station from './Station';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  
  const backend_url = "https://citybike-backend-citybike-backend.azuremicroservices.io";


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
          <Route path="/journeys" element={<JourneysTable backend_url={backend_url} />} />
        </Routes>
        <Routes>
          <Route path="/stations" element={<StationsTable backend_url={backend_url} />} />
        </Routes>
        <Routes>
          <Route path="/station/:stationId" element={<Station backend_url={backend_url} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
