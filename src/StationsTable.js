import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button} from 'react-bootstrap';

function StationsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 100;

  const [stationNameFilter, setStationNameFilter] = useState('');

  const [addressFilter, setAddressFilter] = useState('');

  const [language, setLanguage] = React.useState('finnish');

  const [stations, setStations] = useState([]);

  const [stationsCount, setStationsCount] = useState(0);

  const [data, setData] = useState([]);

  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8080/stationscount");
      setStationsCount(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8080/stations?page=" + (currentPage - 1) + "&size=" + perPage);
      setStations(result.data);
      setData(result.data);
    };
    fetchData();
  }, [currentPage]);

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

  const totalPages = Math.ceil(stationsCount / perPage);

  useEffect(()=>{

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

    setData(filteredResults);
	}, [stationNameFilter, addressFilter]);

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
            <th onClick={() => handleSortClick('id')}><Button>ID</Button></th>
            <th onClick={() => handleSortClick('name')}><Button>Name</Button></th>
            <th onClick={() => handleSortClick('address')}><Button>Address</Button></th>
            <th onClick={() => handleSortClick('city')}><Button>City</Button></th>
            <th onClick={() => handleSortClick('operator')}><Button>Operator</Button></th>
            <th onClick={() => handleSortClick('capacity')}><Button>Capacity</Button></th>
            <th onClick={() => handleSortClick('x')}><Button>X</Button></th>
            <th onClick={() => handleSortClick('y')}><Button>Y</Button></th>
          </tr>
        </thead>
        <tbody>
          {data.map((result, index) => (
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