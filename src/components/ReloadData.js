function ReloadData({makeAPIRequest, setFetchingError, setLaunches, setFilteredLaunches, setShowReloadMessage}) {

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
    <button className="btn btn-primary" onClick={reload}>Reload</button>
  );
}

export default ReloadData;
