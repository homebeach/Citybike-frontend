import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Button} from 'react-bootstrap';

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} minutes, ${remainingSeconds} seconds`;
}

function JourneysTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 100;

  const [departureStartDate, setDepartureStartDate] = useState('');
  const [departureEndDate, setDepartureEndDate] = useState('');

  const [returnStartDate, setReturnStartDate] = useState('');
  const [returnEndDate, setReturnEndDate] = useState('');

  const [data, setData] = useState([]);

  const [journeys, setJourneys] = useState([]);

  const [journeysCount, setJourneysCount] = useState(0);

  const [language, setLanguage] = React.useState('finnish');

  const [departureStationNameFilter, setDepartureStationNameFilter] = useState('');

  const [returnStationNameFilter, setReturnStationNameFilter] = useState('');

  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8080/journeyscount");
      setJourneysCount(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8080/journeys?page=" + (currentPage - 1) + "&size=" + perPage);
      setJourneys(result.data);
      setData(result.data);
    };
    fetchData();
  }, [currentPage]);

  const handleDepartureStationNameChange = (event) => {
    setDepartureStationNameFilter((event.target.value));
  };

  const handleReturnStationNameChange = (event) => {
    setReturnStationNameFilter((event.target.value));
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

  const handleSortClick = (field) => {
    const newData = [...data];

    if (sortOrder === 'asc') {
      newData.sort((a, b) => (a[field] > b[field] ? 1 : -1));
      setSortOrder('desc');
    } else {
      newData.sort((a, b) => (a[field] < b[field] ? 1 : -1));
      setSortOrder('asc');
    }

    setData(newData);
  };

  const handleDepartureStartDateChange = (event) => {
    const date = new Date(event.target.value);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    setDepartureStartDate(`${year}-${month}-${day}T${hours}:${minutes}`);
  };
  
  const handleDepartureEndDateChange = (event) => {
    const date = new Date(event.target.value);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    setDepartureEndDate(`${year}-${month}-${day}T${hours}:${minutes}`);
  };

  const handleReturnStartDateChange = (event) => {
    const date = new Date(event.target.value);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    setReturnStartDate(`${year}-${month}-${day}T${hours}:${minutes}`);
  };

  const handleReturnEndDateChange = (event) => {
    const date = new Date(event.target.value);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    setReturnEndDate(`${year}-${month}-${day}T${hours}:${minutes}`);
  };

  useEffect(()=>{

    const filteredResults = journeys.filter(result => {
      const departureTime = new Date(result.departure_time).getTime();
      const formattedDepartureStartDate = departureStartDate ? new Date(departureStartDate).getTime() : null;
      const formattedDepartureEndDate = departureEndDate ? new Date(departureEndDate).getTime() : null;
    
      const returnTime = new Date(result.return_time).getTime();
      const formattedReturnStartDate = returnStartDate ? new Date(returnStartDate).getTime() : null;
      const formattedReturnEndDate = returnEndDate ? new Date(returnEndDate).getTime() : null;
      const departureStationName = result.departure_station_name;
      const departureStationNamn = result.departure_station_namn;
      const departureStationNimi = result.departure_station_nimi;

      const returnStationName = result.return_station_name;
      const returnStationNamn = result.return_station_namn;
      const returnStationNimi = result.return_station_nimi;

      return (
        (!formattedDepartureStartDate || departureTime >= formattedDepartureStartDate) &&
        (!formattedDepartureEndDate || departureTime <= formattedDepartureEndDate) &&
        (!formattedReturnStartDate || departureTime >= formattedReturnStartDate) &&
        (!formattedReturnEndDate || departureTime <= formattedReturnEndDate) &&
        (!departureStationNameFilter || (departureStationName && departureStationName.includes(departureStationNameFilter))
        || (departureStationNamn && departureStationNamn.includes(departureStationNameFilter))
        || (departureStationNimi && departureStationNimi.includes(departureStationNameFilter))) &&
        (!returnStationNameFilter || (returnStationName && returnStationName.includes(returnStationNameFilter))
        || (returnStationNamn && returnStationNamn.includes(returnStationNameFilter))
        || (returnStationNimi && returnStationNimi.includes(returnStationNameFilter)))
        );
    });

    setData(filteredResults);
  }, [departureStartDate, departureEndDate, returnStartDate, returnEndDate, departureStationNameFilter, returnStationNameFilter]);

  const totalPages = Math.ceil(journeysCount / perPage);
 
  return (
    <div>

<div>

<div>

<label>Language: </label>

<select value={language} onChange={handleChange}>
  <option value="finnish">Finnish</option>
  <option value="english">English</option>
  <option value="swedish">Swedish</option>
</select>

</div>

</div>

<button onClick={() => {setDepartureStartDate(''); setDepartureEndDate(''); setReturnStartDate(''); setReturnEndDate('');}}>Clear Dates</button>


<div>
  <label>Departure Start Date:</label>
  <input type="datetime-local" value={departureStartDate} onChange={handleDepartureStartDateChange} />
</div>
<div>
  <label>Departure End Date:</label>
  <input type="datetime-local" value={departureEndDate} onChange={handleDepartureEndDateChange} />
</div>

<div>
  <label>Return Start Date:</label>
  <input type="datetime-local" value={returnStartDate} onChange={handleReturnStartDateChange} />
</div>
<div>
  <label>Return End Date:</label>
  <input type="datetime-local" value={returnEndDate} onChange={handleReturnEndDateChange} />
</div>
<div>
  <label>
    Departure station name filter: 
    <input type="text" value={departureStationNameFilter} onChange={handleDepartureStationNameChange} />
  </label>
</div>
<div>
  <label>
    Return station name filter: 
    <input type="text" value={returnStationNameFilter} onChange={handleReturnStationNameChange} />
  </label>
</div>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSortClick('duration')}><Button>Duration</Button></th>
            <th onClick={() => handleSortClick('departure_time')}><Button>Departure time</Button></th>
            <th onClick={() => handleSortClick('return_time')}><Button>Return time</Button></th>
            <th onClick={() => handleSortClick('covered_distance')}><Button>Covered distance (km)</Button></th>
            <th onClick={() => handleSortClick('departure_station')}><Button>Departure station</Button></th>
            <th onClick={() => handleSortClick('return_station')}><Button>Return station</Button></th>
          </tr>
        </thead>
        <tbody>
          {data.map((result, index) => (
            <tr key={index}>
              <td>{formatDuration(result.duration)}</td>
              <td>{new Date(result.departure_time).toLocaleString()}</td>
              <td>{new Date(result.return_time).toLocaleString()}</td>
              <td>{result.covered_distance / 1000}</td>

              {(() => {
                      switch (language) {
                        case 'finnish':
                          return <td>{result.departure_station_nimi}</td>
                        case 'english':
                          return <td>{result.departure_station_name}</td>
                        case 'swedish':
                          return <td>{result.departure_station_namn}</td>
                        default:
                          return <td>{result.departure_station_nimi}</td>
                      }
                    })()}

              {(() => {
                      switch (language) {
                        case 'finnish':
                          return <td>{result.return_station_nimi}</td>
                        case 'english':
                          return <td>{result.return_station_name}</td>
                        case 'swedish':
                          return <td>{result.return_station_namn}</td>
                        default:
                          return <td>{result.return_station_nimi}</td>
                      }
                    })()}
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

export default JourneysTable;