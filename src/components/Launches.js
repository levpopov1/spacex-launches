import { useState, useEffect } from 'react';
import Launch from "./Launch";

function Launches({launches, API_URL}) {

  const [rockets, setRockets] = useState([]);
  const [fetchingError, setFetchingError] = useState({isError: false, message: ""});

  useEffect(() => {

    setFetchingError({isError: false});

    if(!launches || launches.length === 0){
      return null;
    }

    const getUniqueRockets = () => {
      return new Set(launches.map(launch => launch.rocket));
    }

    const queryRockets = async () => {
      let requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "query":{
             "_id": [...getUniqueRockets()]
          },
          "options": {
            "select": "name"
          }
        })
      }

      try {
        let response = await fetch(API_URL + "/rockets/query", requestOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        setRockets(data.docs);
      } 
      catch (error) {
        setFetchingError({isError: true, message: error.message});
      }
    }

    queryRockets();

  }, [launches, API_URL]);

  return (
    <div className="launches">
      {
        fetchingError.isError
        ? <div>An error occured: <pre>fetchingError.message</pre></div>
        : launches.map((launch, index) => <Launch launch={launch} rockets={rockets} index={index} key={launch.id}/>)
      }
    </div>
  );
}

export default Launches;
