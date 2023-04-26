import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function Station({backend_url}) {
  const { stationId } = useParams(); // get stationId from URL params
  const [station, setStation] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(backend_url + `/station?stationId=${stationId}`);
      setStation(result.data);
    };
    fetchData();
  }, [stationId]);

  const [returnStations, setReturnStations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(backend_url + `/top5returnstations?stationId=${stationId}`);
      setReturnStations(result.data); 
    };
    fetchData();
  }, [stationId]);

  const [departureStations, setDepartureStations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(backend_url + `/top5departurestations?stationId=${stationId}`);
      setDepartureStations(result.data); 
    };
    fetchData();
  }, [stationId]);

  const [language, setLanguage] = React.useState('finnish');

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

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
            <th>Departures count</th>
            <th>Departures avg distance</th>
            <th>Returns count</th>
            <th>Returns avg distance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{station.id}</td>
            {(() => {
              switch (language) {
                case 'finnish':
                  return <td>{station.nimi}</td>;
                case 'english':
                  return <td>{station.name}</td>;
                case 'swedish':
                  return <td>{station.namn}</td>;
                default:
                  return <td>{station.name}</td>;
              }
            })()}
            {(() => {
              switch (language) {
                case 'finnish':
                  return <td>{station.osoite}</td>;
                case 'english':
                  return <td>{station.address}</td>;
                case 'swedish':
                  return <td>{station.address}</td>;
                default:
                  return <td>{station.address}</td>;
              }
            })()}
            {(() => {
              switch (language) {
                case 'finnish':
                  return <td>{station.kaupunki}</td>;
                case 'english':
                  return <td>{station.kaupunki}</td>;
                case 'swedish':
                  return <td>{station.stad}</td>;
                default:
                  return <td>{station.kaupunki}</td>;
              }
            })()}
            <td>{station.operaattori}</td>
            <td>{station.kapasiteetti}</td>
            <td>{station.x}</td>
            <td>{station.y}</td>
            <td>{station.countOfJourneysFrom}</td>
            <td>{station.averageJourneysFromDistance}</td>
            <td>{station.countOfJourneysTo}</td>
            <td>{station.averageJourneysToDistance}</td>
          </tr>
        </tbody>
      </table>
  
     <h1>Top 5 Return stations of journeys from this station</h1>
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
          {returnStations.map((result, index) => (
            <tr key={index}>
              <td>{result.id}</td>
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


      <h1>Top 5 Departure stations of journeys to this station</h1>
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
          {departureStations.map((result, index) => (
            <tr key={index}>
              <td>{result.id}</td>
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
    </div>
  </div>
  );
}

export default Station;