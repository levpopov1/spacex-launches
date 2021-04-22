import { useState, useEffect, useReducer } from 'react';
import Launches from './components/Launches';
import ListControls from "./components/ListControls";
import Navbar from "./components/Navbar";
import sortLaunches from './lib/DoSort';
import makeAPIRequest from './lib/MakeAPIRequest';

function App() {

  function init(initialState) {
    return initialState;
  }
  
  function reducer(state, action) {
    switch (action.type) {
      case 'filter':
        return launches.filter(launch => new Date(launch.date_utc).getFullYear() === action.payload);
      case 'sort':
        return sortLaunches([...state], action.payload.order, action.payload.target);
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

      let response = await makeAPIRequest("/launches/query");

      if(response.error){
        return setFetchingError({isError: true, message: response.message});
      }
      
      setLaunches(response.data);
      setFilteredLaunches({type: 'reset', payload: response.data});
    }
    
    getLaunches();
  }, []);

  return (
    <div className="App">
      <Navbar setFetchingError={setFetchingError} setLaunches={setLaunches} setFilteredLaunches={setFilteredLaunches}/>
      <div className="container">
        <ListControls launches={launches} setFilteredLaunches={setFilteredLaunches}/>
        <div className="row">
          <div className="col-sm-5">
            <img src="img/launch-home.png" className="launch-img" alt="Rocket Launch"/>
          </div>
          <div className="col-sm-7">
            {
              fetchingError.isError
              ? <div>An error occured: <pre>fetchingError.message</pre></div>
              : <Launches launches={filteredLaunches}/>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
