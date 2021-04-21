
import { useState } from 'react';

function SortControl({filteredLaunches, setFilteredLaunches}) {

  const [sortOrder, setSortOrder] = useState("descending");

  const handleSort = (order) => {
    // let sorted = doSort([...filteredLaunches], order, "flight_number");
    setFilteredLaunches({type: "sort", payload: {order: order, target: "flight_number"}});
    if(sortOrder === "descending"){
      setSortOrder("ascending");
    }
    else{
      setSortOrder("descending");
    }
  }

  // const doSort = (collection, order, target) => {
  //   return collection.sort((a, b) => order === 'ascending' ? a[target] - b[target] : b[target] - a[target]);
  // }

  return (
    <button className="btn btn-primary ms-2" onClick={() => handleSort(sortOrder)}>Sort {sortOrder}</button>
  );
}

export default SortControl;
