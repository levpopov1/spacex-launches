import { useState, useEffect, useReducer } from 'react';
import Launches from './components/Launches';
import ListControls from "./components/ListControls";
import Navbar from "./components/Navbar";
import localData from './test-dataset-small.json';

const API_URL = "https://api.spacexdata.com/v4";

function App() {

  function init(initialState) {
    return initialState;
  }
  
  function reducer(state, action) {
    switch (action.type) {
      case 'filter':
        return launches.filter(launch => new Date(launch.date_utc).getFullYear() === action.payload);
      case 'reset':
        return init(action.payload);
      default:
        throw new Error();
    }
  }

  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useReducer(reducer, launches, init);
  const [fetchingError, setFetchingError] = useState({isError: false, message: ""});

  useEffect(() => {
    const getLaunches = async () => {

      setFetchingError({isError: false});

      let requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "query":{},
          "options": {
            "select": {
              "name": 1,
              "rocket": 1,
              "date_utc": 1,
              "flight_number": 1
            },
            "populate": [
              {
                "path": "rocket",
                "select": {
                  "name": 1,
                }
              }
            ]
          }
        })
      }

      try {
        let response = await fetch(API_URL + "/launches/query", requestOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        console.log(data);
        setLaunches(data.docs);
        setFilteredLaunches({type: 'reset', payload: data.docs})
      } catch (error) {
        setFetchingError({isError: true, message: error.message});
      }
    }

    // const getLaunchesLocal = () => {
    //   console.log("fetching from local");
    //   setLaunches(localData);
    // }

    getLaunches();
  }, []);

  return (
    <div className="App">
      <Navbar/>
      <div className="container">
        <ListControls launches={launches} setLaunches={setLaunches} setFilteredLaunches={setFilteredLaunches}/>
        <div className="row">
          <div className="col-sm-5">
            <img src="/img/launch-home.png" className="launch-img" alt="Rocket Launch"/>
          </div>
          <div className="col-sm-7">
            {
              fetchingError.isError
              ? <div>An error occured: <pre>fetchingError.message</pre></div>
              : <Launches launches={filteredLaunches} API_URL={API_URL}/>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
