import makeAPIRequest from '../lib/MakeAPIRequest';

function ReloadData({setFetchingError, setLaunches, setFilteredLaunches, setShowReloadMessage}) {

  const reload = async () => {
    setFetchingError({isError: false});

    let response = await makeAPIRequest("/launches/query");

    if(response.error){
      return setFetchingError({isError: true, message: response.message});
    }
    
    setLaunches(response.data);
    setFilteredLaunches({type: 'reset', payload: response.data});

    setShowReloadMessage(true);

    setTimeout(() => {
      setShowReloadMessage(false);
    }, 2000);
  }

  return (
    <button className="btn btn-primary" onClick={reload}>
      Reload
      <img src="icon/refresh.png" alt="Sort icon" className="btn-icon"/>
    </button>
  );
}

export default ReloadData;
