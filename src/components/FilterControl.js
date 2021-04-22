import { useState, useEffect } from 'react';

function FilterControl({launches, setFilteredLaunches}) {

  const [years, setYears] = useState([]);
  
  useEffect(() => {
    let yearFilters = getFilters(launches);
    setYears(yearFilters);
    return () => {
      setYears([]);
    }
  }, [launches]);

  const getFilters = (collection) => {
    return [...new Set(collection.map(item => new Date(item.date_utc).getFullYear()))];
  }

  return (
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
  );
}

export default FilterControl;
