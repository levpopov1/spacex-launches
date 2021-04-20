import Launch from "./Launch";

function Launches({launches}) {
  return (
    <div className="launches">
      {launches.map((launch, index) => <Launch launch={launch} index={index} key={launch.id}/>)}
    </div>
  );
}

export default Launches;
