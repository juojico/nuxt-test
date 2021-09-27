import { Message } from "element-ui";
import { logout } from "@/utils";
import download from "downloadjs";

export default function({ $axios, store, redirect }) {
  // setBaseURL
  const BASE_URL =
    process.env.NODE_ENV === "development"
      ? "http://3.113.253.152:6688"
      : "/apis";

  $axios.setBaseURL(BASE_URL);

  // setHeader
  $axios.setHeader("content-type", "application/json");

  let token = store.getters["userModules/token"];
  if (token) {
    $axios.setHeader("Authorization", "Bearer " + token);
  }

  // onRequest
  $axios.onRequest(config => {
    console.log("Making request to " + config.url);
  });

  // onResponse
  $axios.onResponse(response => {
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
  });

  // onError
  $axios.onError(error => {
    const statusCode = error.response ? parseInt(error.response.status) : null;
    if (statusCode == 401) {
      logout();
    } else {
      Message.error(error.response.data.msg || error.response.statusText);
    }
    return Promise.reject(error.response);
  });
}