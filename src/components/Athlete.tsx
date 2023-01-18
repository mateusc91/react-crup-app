import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import AthleteDataService from "../services/AthleteService";
import IAthleteData from "../types/Athlete";

const Athlete: React.FC = () => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialAthleteState = {
    id: null,
    name: "",
    dob: ""
  };
  const [currentAthlete, setCurrentAthlete] = useState<IAthleteData>(initialAthleteState);
  const [message, setMessage] = useState<string>("");

  const getTutorial = (id: string) => {
    AthleteDataService.get(id)
      .then((response: any) => {
        setCurrentAthlete(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getTutorial(id);
  }, [id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
   setCurrentAthlete({ ...currentAthlete, [name]: value });
  };

  const updatePublished = (status: boolean) => {
    var data = {
      id: currentAthlete.id,
      name: currentAthlete.name,
      dob: currentAthlete.dob,
      published: status
    };

    AthleteDataService.update(currentAthlete.id, data)
      .then((response: any) => {
        console.log(response.data);
        setCurrentAthlete({ ...currentAthlete});
        setMessage("The status was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const updateAthlete = () => {
    AthleteDataService.update(currentAthlete.id, currentAthlete)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteAthlete = () => {
    AthleteDataService.remove(currentAthlete.id)
      .then((response: any) => {
        console.log(response.data);
        navigate("/tutorials");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return ( 
    <div>
      {currentAthlete ? (
        <div className="edit-form">
          <h4>Athlete</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Name</label>
              <input
                type="text"
                className="form-control"
                id="id"
                name="name"
                value={currentAthlete.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Date of Birth</label>
              <input
                type="text"
                className="form-control"
                id="id"
                name="dob"
                value={currentAthlete.dob}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteAthlete}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateAthlete}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Athlete...</p>
        </div>
      )}
    </div>
   );
};

export default Athlete;