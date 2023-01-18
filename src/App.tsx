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
          Athletes-app
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/athletes"} className="nav-link">
              Athletes
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add-athlete"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<AthletesList/>} />
          <Route path="/athletes" element={<AthletesList/>} />
          <Route path="/add-athlete" element={<AddAthlete/>} />
          <Route path="/delete-all-athletes" element={<AthletesList/>} />
          <Route path="/tutorials/:id" element={<Athlete/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;