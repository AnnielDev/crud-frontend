import axios from "axios";

const http = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:3006/api/"
      : "",
});

export default http;
