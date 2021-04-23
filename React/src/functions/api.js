import axios from "axios";

const api = axios.create({ baseURL: "http://192.168.0.197:5000" });

export const createPostcard = (data) => {
  return new Promise((resolve, reject) => {
    api
      .post(
        "/postcards",
        { data: data },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

export const getPostcard = (id) => {
  return new Promise((resolve, reject) => {
    api
      .get(`/postcards?id=${id}`)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};
