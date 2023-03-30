import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} minutes, ${remainingSeconds} seconds`;
}

function StationsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 200;

  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;

  const [stationNameFilter, setStationNameFilter] = useState('');

  const [addressFilter, setAddressFilter] = useState('');

  const [language, setLanguage] = React.useState('finnish');

  const [stations, setStations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8080/stations");
      setStations(result.data); // assuming there is only one journey
    };
    fetchData();
  }, []);

  const handleStationNameChange = (stationNameFilter) => {
    setStationNameFilter(stationNameFilter);
  };

  const handleAddressChange = (addressFilter) => {
    setAddressFilter(addressFilter);
  };

  const handleClickPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClickNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClickPage = (page) => {
    setCurrentPage(page);
  };

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  const totalPages = Math.ceil(stations.length / perPage);

  const filteredResults = stations.filter(result => {

    const stationNimi = result.nimi;
    const stationNamn = result.namn;
    const stationName = result.name;

    const stationOsoite = result.osoite;
    const stationAddress = result.address;

    return (
      (!stationNameFilter || (stationNimi && stationNimi.includes(stationNameFilter))
      || (stationNamn && stationNamn.includes(stationNameFilter))
      || (stationName && stationName.includes(stationNameFilter))) &&
      (!addressFilter || (stationOsoite && stationOsoite.includes(addressFilter))
      || (stationOsoite && stationOsoite.includes(addressFilter))
      || (stationAddress && stationAddress.includes(addressFilter)))
      );
    });

    const currentResults = filteredResults.slice(firstIndex, lastIndex);

  return (
    <div>

<div>

<label>

<select value={language} onChange={handleChange}>
  <option value="finnish">Finnish</option>
  <option value="english">English</option>
  <option value="swedish">Swedish</option>
</select>

</label>

<div>
  <label>
    Station name filter: 
    <input type="text" value={stationNameFilter} onChange={(event) => handleStationNameChange(event.target.value)} />
  </label>
</div>

<div>
  <label>
    Address filter: 
    <input type="text" value={addressFilter} onChange={(event) => handleAddressChange(event.target.value)} />
  </label>
</div>

</div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Operator</th>
            <th>Capacity</th>
            <th>X</th>
            <th>Y</th>
          </tr>
        </thead>
        <tbody>
          {currentResults.map((result, index) => (
            <tr key={index}>
              <td><Link to={`/station/${result.id}`}>{result.id}</Link></td>

              {(() => {
                      switch (language) {
                        case 'finnish':
                          return <td>{result.nimi}</td>
                        case 'english':
                          return <td>{result.name}</td>
                        case 'swedish':
                          return <td>{result.namn}</td>
                        default:
                          return <td>{result.name}</td>
                      }
                    })()}

              {(() => {
                      switch (language) {
                        case 'finnish':
                          return <td>{result.osoite}</td>
                        case 'english':
                          return <td>{result.address}</td>
                        case 'swedish':
                          return <td>{result.address}</td>
                        default:
                          return <td>{result.address}</td>
                      }
                    })()}

              {(() => {
                      switch (language) {
                        case 'finnish':
                          return <td>{result.kaupunki}</td>
                        case 'english':
                          return <td>{result.kaupunki}</td>
                        case 'swedish':
                          return <td>{result.stad}</td>
                        default:
                          return <td>{result.kaupunki}</td>
                      }
                    })()}

              <td>{result.operaattori}</td>
              <td>{result.kapasiteetti}</td>
              <td>{result.x}</td>
              <td>{result.y}</td>

            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handleClickPrevious} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handleClickPage(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}
        <button onClick={handleClickNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default StationsTable;