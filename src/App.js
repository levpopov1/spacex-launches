import { useState, useEffect } from 'react';
import Launches from './components/Launches';
import ListControls from "./components/ListControls";
import Navbar from "./components/Navbar";
import localData from './test-dataset-small.json';

const API_URL = "https://api.spacexdata.com/v4";

function App() {

  const [launches, setLaunches] = useState([]);
  const [fetchError, setFetchError] = useState({isError: false, message: ""});

  useEffect(() => {
    const getLaunches = async () => {
      setFetchError({isError: false});
      try {
        let response = await fetch(API_URL + "/launches");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        console.log(data);
        setLaunches(data);
      } catch (error) {
        setFetchError({isError: true, message: error.message});
      }
    }
    const getLaunchesLocal = () => {
      console.log("fetching from local");
      setLaunches(localData);
    }
    getLaunchesLocal();
  }, []);

  return (
    <div className="App">
      <Navbar/>
      <div className="container">
        <ListControls/>
        <div className="row">
          <div className="col-sm-5">
            <img src="/img/launch-home.png" className="launch-img" alt="Rocket Launch"/>
          </div>
          <div className="col-sm-7">
            <Launches launches={launches} API_URL={API_URL}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
