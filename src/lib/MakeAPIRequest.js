export default async function makeAPIRequest(endpoint, requestOptions={}){

  const API_URL = "https://api.spacexdata.com/v4";
    
  if(Object.keys(requestOptions).length === 0){
    requestOptions = {
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
          "pagination": true,
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
  }

  try {
    let response = await fetch(API_URL + endpoint, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    return {error: null, data: data.docs}
  } 
  catch (error) {
    return {error: true, message: error.message, data: null}
  }

}