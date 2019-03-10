import http from "http";
import https from "https";

export const config = {
  baseURL: "http://localhost:3000/",
  headers: {
    "Access-Control-Allow-Origin": "*"
  },
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true })
};
