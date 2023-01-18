import React, { useState, ChangeEvent } from "react";
import AthleteDataService from "../services/AthleteService";
import IAthleteData from '../types/Athlete';

const AddAthlete: React.FC = () => {
  const initialAthleteState = {
    id: null,
    name: "",
    dob: ""
  };
  const [athlete, setAthlete] = useState<IAthleteData>(initialAthleteState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAthlete({ ...athlete, [name]: value });
  };

  const saveAthlete = () => {
    var data = {
      name: athlete.name,
      dob: athlete.dob
    };

    AthleteDataService.create(data)
      .then((response: any) => {
        setAthlete({
          id: response.data.id,
          name: response.data.name,
          dob: response.data.dob,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newAthlete = () => {
    setAthlete(initialAthleteState);
    setSubmitted(false);
  };

  return ( 
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="id"
              required
              value={athlete.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="text"
              className="form-control"
              id="id"
              required
              value={athlete.dob}
              onChange={handleInputChange}
              name="dob"
            />
          </div>

          <button onClick={saveAthlete} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
   );
};

export default AddAthlete;