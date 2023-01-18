import http from "../http-common";
import IAthleteData from "../types/Athlete";

const getAll = () => {
  return http.get<Array<IAthleteData>>("");
};

const get = (id: any) => {
  return http.get<IAthleteData>(`/athletes/athlete/${id}`);
};

const create = (data: IAthleteData) => {
  return http.post<IAthleteData>("/save", data);
};

const update = (id: any, data: IAthleteData) => {
  return http.put<any>(`/athletes/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/athletes/delete/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/delete-athletes`);
};

const findById = (id: string) => {
  return http.get<Array<IAthleteData>>(`/athlete/${id}`);
};

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findById,
};

export default TutorialService;