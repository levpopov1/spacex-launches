import { useState } from 'react';

function ListControls({launches, setLaunches}) {

  const [sortOrder, setSortOrder] = useState("descending");
  
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

  return (
    <div className="row mb-3">
      <div className="col-sm-12 d-flex justify-content-end">
        <button className="btn btn-primary ms-2">Filter By Year</button>
        <button className="btn btn-primary ms-2" onClick={() => handleSort(sortOrder)}>Sort {sortOrder}</button>
      </div>
    </div>
  );
}

export default ListControls;
