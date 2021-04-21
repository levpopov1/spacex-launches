function Navbar() {
  return (
    <nav className="navbar navbar-light mb-3">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src="spacex-logo.png" alt="SpaceX Logo"/>
          <span className="text-center">LAUNCHES</span>
        </a>
        <button className="btn btn-primary">Reload</button>
      </div>
    </nav>
  );
}

export default Navbar;
