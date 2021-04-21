import { useState, useEffect, useReducer } from 'react';

// function init(initialState) {
//   return initialState;
// }

// function reducer(state, action) {
//   switch (action.type) {
//     case 'filter':
//       return state.filter(launch => new Date(launch.date_utc).getFullYear() === action.payload);
//     case 'reset':
//       return init(action.payload);
//     default:
//       throw new Error();
//   }
// }

function ListControls({launches, setLaunches, setFilteredLaunches}) {

  const [sortOrder, setSortOrder] = useState("descending");
  const [years, setYears] = useState([]);
  // const [filteredLaunches, setFilteredLaunches] = useReducer(reducer, launches, init);
  // const [allLaunches, setAllLaunches] = useReducer(reducer, launches, init)
  
  const handleSort = (order) => {
    let sorted = doSort([...launches], order);
    setLaunches(sorted);
    if(sortOrder === "descending"){
      setSortOrder("ascending");
    }
    else{
      setSortOrder("descending");
    }
  }

  const doSort = (collection, order) => {
    return collection.sort((a, b) => order === 'ascending' ? a.flight_number - b.flight_number : b.flight_number - a.flight_number);
  }

  useEffect(() => {
    let yearFilters = getFilters(launches);
    console.log(yearFilters);
    setYears(yearFilters);
    return () => {
      setYears([]);
    }
  }, [launches]);

  // useEffect(() => {
  //   setFilteredLaunches({type: 'reset', payload: launches})
  // }, [launches]);

  // useEffect(() => {
  //   setAllLaunches([...launches]);
  //   return () => {
  //     setAllLaunches([]);
  //   }
  // },[]);

  const getFilters = (collection) => {
    return [...new Set(collection.map(item => new Date(item.date_utc).getFullYear()))];
  }

  // const setFilterBy = (year) => {
  //   if(year === -1){
  //     console.log("remove filter");
  //     // setLaunches(allLaunches);
  //     return null;
  //   }
  //   let fl = launches.filter(launch => new Date(launch.date_utc).getFullYear() === year);
  //   console.log(fl);
  //   // setFilteredLaunches(fl);
  //   setLaunches(fl);
  // }

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
        <button className="btn btn-primary ms-2" onClick={() => handleSort(sortOrder)}>Sort {sortOrder}</button>
      </div>
    </div>
  );
}

export default ListControls;
