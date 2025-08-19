import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Voting App</h1>
      <div className="links">
        <Link to="/">Voting</Link>
        <Link to="/results">Results</Link>
      </div>
    </nav>
  );
}
