import { useState } from 'react';
import ReloadData from "./ReloadData";

function Navbar({makeAPIRequest, setFetchingError, setLaunches, setFilteredLaunches}) {

  const [showReloadMessage, setShowReloadMessage] = useState(false);

  return (
    <nav className="navbar navbar-light mb-3">
      <div className="container">
        <a className="navbar-brand d-flex" href="/">
          <img src="spacex-logo.png" alt="SpaceX Logo"/>
          LAUNCHES
        </a>
        <div className="controls d-flex flex-row align-items-center">
          {showReloadMessage && <p className="text text-success fw-bold mb-0 me-3">Data Reloaded!</p>}
          <ReloadData 
            makeAPIRequest={makeAPIRequest} 
            setFetchingError={setFetchingError} 
            setLaunches={setLaunches} 
            setFilteredLaunches={setFilteredLaunches} 
            setShowReloadMessage={setShowReloadMessage}
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
