import { Message } from 'element-ui';
import axios from 'axios';
import Vue from 'vue';
import { BASE_URL } from '@/plugins/axios';

export const cleanObj = (obj, empty) => {
  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined || value === isNaN) {
      delete obj[key];
      continue;
    }
    // 清除包含 '' [] {}
    if (empty) {
      if (value === '') {
        delete obj[key];
        continue;
      }
      if (typeof value === 'object' && Object.keys(value).length === 0) {
        delete obj[key];
      }
    }
  }
  return obj;
};

export const dataURLtoFile = function(dataUrl, filename) {
  var arr = dataUrl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

// 图片旋转并压缩
export const resetOrientation = function(srcBase64, callback) {
  var img = new Image();

  img.onload = function() {
    var width = img.width,
      height = img.height,
      maxSize = 200,
      left = 0,
      top = 0,
      canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');

    if (width >= height) {
      width = maxSize * (width / height);
      height = maxSize;
      left = -Math.round((width - maxSize) / 2);
    } else {
      height = maxSize * (height / width);
      width = maxSize;
      top = -Math.round((height - maxSize) / 2);
    }

    canvas.width = maxSize;
    canvas.height = maxSize;

    // draw image
    ctx.drawImage(img, left, top, width, height);

    // export base64
    callback(canvas.toDataURL('image/jpeg', 0.7));
  };

  img.src = srcBase64;
};

export const getTotalYears = function(list) {
  if (!list || list.length < 1) return '';
  const totalMonth = list.reduce((accumulator, currentValue) => {
    return accumulator + parseInt(currentValue.seniority || 0);
  }, 0);
  let seniority = getSeniority(totalMonth);
  return `總年資 ${seniority} 工作經驗`;
};

export const getSeniority = function(month) {
  if (month == '-') return '-';
  let ret = '';
  let year = Math.floor(month / 12);
  month = month % 12;
  if (year) ret = `${year} 年 `;
  if (month) ret += `${month} 個月`;
  return ret;
};

export const getMonthDiff = function(startDate, endDate) {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth() + 1;
  const endYear = endDate.getFullYear();
  const endMonth =
    endDate.getMonth() + 1 - (startDate.getDate() > endDate.getDate());
  let monthDiff = (endYear - startYear) * 12 + (endMonth - startMonth);
  return monthDiff;
};

export const fileUpload = function(url, para, callback) {
  let formData = new FormData();
  formData.append('id', para.id);
  formData.append('file', para.file);
  if (para.type) {
    formData.append('type', para.type);
  }

  let token = store.getters['user/token'];
  axios
    .post(`${BASE_URL}${url}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
    })
    .then(response => {
      let data = response.data;
      if (data.code == 100) {
        if (callback) callback(data);
      } else if (data) {
        console.log(data);
        Message.error(data.msg + ':' + data);
      } else {
        Message.error(data.msg);
      }
    });
};

export const fileDownload = function(url, name) {
  axios({
    url: url,
    method: 'GET',
    responseType: 'blob',
  }).then(response => {
    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
    var fileLink = document.createElement('a');
    fileLink.href = fileURL;
    fileLink.setAttribute('download', name);
    document.body.appendChild(fileLink);

    fileLink.click();
  });
};

export const filtersLabel = function(value, filter) {
  if (!filter) return value;
  return Vue.filter(filter)(value);
};
