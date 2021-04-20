import { useState, useEffect } from 'react';

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

    </div>
  );
}

export default App;
