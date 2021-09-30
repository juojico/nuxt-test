import { Message } from 'element-ui';
import download from 'downloadjs';

export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://3.113.253.152:6688'
    : '/apis';

export default function({ $axios, store, redirect }) {
  // setBaseURL
  $axios.setBaseURL(BASE_URL);

  // setHeader
  $axios.setHeader('Content-Type', 'application/json');

  if (process.client) {
    let token = window.sessionStorage.getItem('_loginToken');
    if (token) {
      $axios.setHeader('Authorization', 'Bearer ' + token);
    }
  }

  // onRequest
  $axios.onRequest(config => {});

  // onResponse
  $axios.onResponse(response => {
    if (response.headers['content-type'] === 'application/pdf') {
      let match = response.headers['content-disposition'].match(
        /filename=(.*)/,
      );
      download(response.data, decodeURIComponent(match[1]));
    }
    if (response.status != 200 || response.data.code != 100) {
      Message.error(response.data.message);
      return Promise.reject(response.data.message);
    }

    return Promise.resolve(response.data);
  });

  // onError
  $axios.onError(error => {
    return Promise.reject(error);
  });
}
