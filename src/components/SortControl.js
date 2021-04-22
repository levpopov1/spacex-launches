
import { useState } from 'react';

function SortControl({setFilteredLaunches}) {

  const [sortOrder, setSortOrder] = useState("descending");

  const handleSort = (order) => {
    setFilteredLaunches({type: "sort", payload: {order: order, target: "date_unix"}});
    if(sortOrder === "descending"){
      setSortOrder("ascending");
    }
    else{
      setSortOrder("descending");
    }
  }
  
  return (
    <button className="btn btn-primary ms-2" onClick={() => handleSort(sortOrder)}>
      Sort {sortOrder}
      <img src="icon/sort.png" alt="Sort icon" className="btn-icon"/>
    </button>
  );
}

export default SortControl;
