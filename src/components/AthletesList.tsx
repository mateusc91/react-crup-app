import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import AthleteDataService from "../services/AthleteService";
import IAthleteData from '../types/Athlete';

const TutorialsList: React.FC = () => {
  const [athletes, setAthletes] = useState<Array<IAthleteData>>([]);
  const [currentAthlete, setCurrentAthlete] = useState<IAthleteData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchId, setSearchId] = useState<string>("");

  useEffect(() => {
    retrieveAthletes();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchId = e.target.value;
    setSearchId(searchId);
  };

  const retrieveAthletes = () => {
    AthleteDataService.getAll()
      .then((response: any) => {
        setAthletes(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveAthletes();
    setCurrentAthlete(null);
    setCurrentIndex(-1);
  };

  const setActiveAthlete = (tutorial: IAthleteData, index: number) => {
    setCurrentAthlete(tutorial);
    setCurrentIndex(index);
  };

  const removeAllAthletes = () => {
    AthleteDataService.removeAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const findById = () => {
    AthleteDataService.findById(searchId)
      .then((response: any) => {
        setAthletes(response.data);
        setCurrentAthlete(null);
        setCurrentIndex(-1);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return ( 
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchId}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findById}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Tutorials List</h4>

        <ul className="list-group">
          {athletes &&
            athletes.map((tutorial, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveAthlete(tutorial, index)}
                key={index}
              >
                {tutorial.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllAthletes}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentAthlete ? (
          <div>
            <h4>Name</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentAthlete.name}
            </div>
            <div>
              <label>
                <strong>Date of Birth:</strong>
              </label>{" "}
              {currentAthlete.dob}
            </div>
            <Link
              to={"/athletes/" + currentAthlete.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Athlete...</p>
          </div>
        )}
      </div>
    </div>
   );
};

export default TutorialsList;