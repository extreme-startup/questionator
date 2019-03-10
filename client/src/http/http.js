import ax from "axios";
import { config as baseConfig } from "./config";

const axios = ax.create(baseConfig);

export const get = (url, config = {}) => axios.get(url, config);

export const put = (url, data = null, config = {}) =>
  axios.put(url, data, config);
