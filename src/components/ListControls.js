import FilterControl from './FilterControl';
import SortControl from './SortControl';

function ListControls({launches, setFilteredLaunches}) {
  return (
    <div className="row mb-3">
      <div className="col-sm-12 d-flex justify-content-end">
        <FilterControl launches={launches} setFilteredLaunches={setFilteredLaunches}/>
        <SortControl setFilteredLaunches={setFilteredLaunches}/>
      </div>
    </div>
  );
}

export default ListControls;
