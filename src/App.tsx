import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddAthlete from "./components/AddAthlete";
import Athlete from "./components/Athlete";
import AthletesList from "./components/AthletesList";

const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          bezKoder
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Athletes
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<AthletesList/>} />
          <Route path="/tutorials" element={<AthletesList/>} />
          <Route path="/add" element={<AddAthlete/>} />
          <Route path="/tutorials/:id" element={<Athlete/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;