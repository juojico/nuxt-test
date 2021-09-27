import { Message } from "element-ui";
import { logout } from "@/utils";
import download from "downloadjs";
import axios from 'axios';
export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://3.113.253.152:6688"
    : "/apis";

const OPTIONS = {
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json"
  }
};

const instance = axios.create(OPTIONS);

// Request interceptors
instance.interceptors.request.use(
  function(config) {
    let token = store.getters["userModules/token"];
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  function(error) {
    console.log("interceptors.request error", error);
    return Promise.reject(error);
  }
);

// Response interceptors
instance.interceptors.response.use(
  function(response) {
    if (response.headers["content-type"] === "application/pdf") {
      let match = response.headers["content-disposition"].match(
        /filename=(.*)/
      );
      download(response.data, decodeURIComponent(match[1]));
    }
    if (response.status != 200) {
      Message.error(response.data.msg);
      return Promise.reject(response.data.msg);
    }
    if (response.data.code == 202) {
      logout();
      return Promise.reject("登入帳號過期，請重新登入");
    }
    return response.data;
  },
  function(error) {
    const statusCode = error.response ? error.response.status : null;
    if (statusCode == 401) {
      logout();
    } else {
      Message.error(error.response.data.msg || error.response.statusText);
    }
    return Promise.reject(error.response);
  }
);

export const fetch = (method = "POST", url, payload, pager) => {
  method = method.toUpperCase();
  if (pager) {
    payload = Object.assign({}, payload, {
      pageNo: pager.page,
      pageSize: pager.pageSize
    });
  }

  switch (method) {
    case "POST":
      return instance.post(url, payload);
    case "GET":
      return instance.get(url, { params: payload });
    case "PUT":
      return instance.put(url, payload);
    case "PATCH":
      return instance.patch(url, payload);
    case "DELETE":
      return instance.delete(url, { params: payload });
    case "FILE":
      return instance.get(url, { params: payload, responseType: "blob" });
    default:
      return instance.post(url, payload);
  }
};
