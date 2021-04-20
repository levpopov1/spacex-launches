function Launch({launch, index}) {
  return (
    <div className="launch card">
      <div className="card-body">
        <h1 className="card-title">
          #{index+1}
        </h1>
        <h1 className="card-title">
          {launch.name}
        </h1>
      </div>
    </div>
  );
}

export default Launch;