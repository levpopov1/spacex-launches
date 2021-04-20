function ListControls() {
  return (
    <div className="row mb-3">
      <div className="col-sm-12 d-flex justify-content-end">
        <button className="btn btn-primary ms-2">Filter By Year</button>
        <button className="btn btn-primary ms-2">Sort Descending</button>
      </div>
    </div>
  );
}

export default ListControls;
