import Launch from "./Launch";

function Launches({launches}) {
  return (
    <div className="launches">
      { launches.map((launch) => <Launch launch={launch} key={launch.id}/>) }
    </div>
  );
}

export default Launches;
