import { useState, useEffect } from 'react';
import ListControls from "./components/ListControls";
import Navbar from "./components/Navbar";

const API_URL = "https://api.spacexdata.com/v4/";

function App() {

  const [launches, setLaunches] = useState({});
  const [fetchError, setFetchError] = useState({isError: false, message: ""});

  useEffect(() => {
    const getLaunches = async () => {
      setFetchError({isError: false});
      try {
        let response = await fetch(API_URL + "launches");
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
    getLaunches();
  }, []);

  return (
    <div className="App">
      <Navbar/>
      <div className="container">
        <ListControls/>
        <div className="row">
          <div className="col-sm-3">
            <img src="/img/launch-home.png" className="launch" alt="Rocket Launch"/>
          </div>
          <div className="col-sm-9">

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
