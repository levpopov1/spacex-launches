import { useState, useEffect } from 'react';
import Launch from "./Launch";

function Launches({launches, API_URL}) {

  const [rockets, setRockets] = useState([]);
  const [fetchError, setFetchError] = useState({isError: false, message: ""});

  useEffect(() => {
    if(!launches || launches.length === 0){
      return null;
    }
    console.log("useing fetch rockets effect");

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
      console.log(requestOptions);
      
      setFetchError({isError: false});
      try {
        let response = await fetch(API_URL + "/rockets/query", requestOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        console.log(data);
        setRockets(data.docs);
      } catch (error) {
        setFetchError({isError: true, message: error.message});
      }
    }
    queryRockets();
  }, [launches]);

  return (
    <div className="launches">
      {launches.map((launch, index) => <Launch launch={launch} rockets={rockets} index={index} key={launch.id}/>)}
    </div>
  );
}

export default Launches;
