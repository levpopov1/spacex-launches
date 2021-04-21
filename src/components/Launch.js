import { useState, useEffect } from 'react';
import nth from '../lib/FormatDate';

function Launch({launch}) {

  const [launchDate, setLaunchDate] = useState("");

  useEffect(() => {
    console.log("using effect launchdate");
    let ld = new Date(launch.date_utc);
    let day = ld.getDate();
    let fullDate = day + nth(day) + " " + ld.toLocaleDateString('default', { month: 'short', year: 'numeric' });
    setLaunchDate(fullDate);
  }, [launch]);

  return (
    <div className="launch card mb-3">
      <div className="card-body d-flex flex-row justify-content-between">
        <div className="launch-name d-flex flex-row">
          <h1 className="card-title mb-0">
            #{launch.flight_number}
          </h1>
          <h1 className="card-title ms-5 mb-0">
            {launch.name}
          </h1>
        </div>
        <div className="launch-info text-end">
          <p className="text mb-0">
            {launchDate}
          </p>
          <h4 className="card-title mb-0">
            {launch.rocket.name}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Launch;