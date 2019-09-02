import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { IPerson } from "../../models/Person";

axios.defaults.baseURL = `${process.env.REACT_APP_BACKEND_URL}/api`;

axios.interceptors.response.use(undefined, error => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - make sure API is running!");
  }

  if (error.response) {
    const { status, data, config } = error.response;

    if (
      status === 404 ||
      (status === 400 &&
        config.method === "get" &&
        data.errors.hasOwnProperty("id"))
    ) {
      history.push("/notfound");
    } else if (status === 500) {
      toast.error("Server error - check the terminal for more info!");
    }
  }
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) =>
    axios
      .get(url)
      .then(sleep(1000))
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(sleep(1000))
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then(sleep(1000))
      .then(responseBody),
  del: (url: string) =>
    axios
      .delete(url)
      .then(sleep(1000))
      .then(responseBody)
};

const Persons = {
  list: (): Promise<IPerson[]> => requests.get("/persons"),
  details: (id: string) => requests.get(`persons/${id}`),
  create: (person: IPerson) => requests.post("/persons", person),
  update: (person: IPerson) => requests.put(`persons/${person.id}`, person),
  delete: (id: string) => requests.del(`persons/${id}`)
};

export default {
  Persons
};
