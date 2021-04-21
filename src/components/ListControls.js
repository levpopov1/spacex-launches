import { useState, useEffect } from 'react';
import SortControl from './SortControl';

function ListControls({launches, setLaunches, filteredLaunches, setFilteredLaunches}) {

  const [years, setYears] = useState([]);
  
  useEffect(() => {
    let yearFilters = getFilters(launches);
    console.log(yearFilters);
    setYears(yearFilters);
    return () => {
      setYears([]);
    }
  }, [launches]);

  const getFilters = (collection) => {
    return [...new Set(collection.map(item => new Date(item.date_utc).getFullYear()))];
  }

  return (
    <div className="row mb-3">
      <div className="col-sm-12 d-flex justify-content-end">
        <div className="dropdown">
          <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownFilterByYear" data-bs-toggle="dropdown" aria-expanded="false">
            Filter By Year
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownFilterByYear">
            <li><button className="dropdown-item" onClick={() => setFilteredLaunches({type: 'reset', payload: launches})}>All Years</button></li>
            {
              years.map(year => <li key={year}><button className="dropdown-item" onClick={() => setFilteredLaunches({type: 'filter', payload: year})}>{year}</button></li>)
            }
          </ul>
        </div>
        <SortControl filteredLaunches={filteredLaunches} setFilteredLaunches={setFilteredLaunches}/>
      </div>
    </div>
  );
}

export default ListControls;
