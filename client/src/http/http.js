import axios from "axios";
import { config as baseConfig } from "./config";

export const get = (url, config = {}) =>
  axios.get(url, { ...baseConfig, ...config });

export const put = (url, data = null, config = {}) =>
  axios.put(url, data, { ...baseConfig, ...config });
