export const padString = (value, num = 2, pad = '0') => {
  if (value == null) {
    return '';
  }
  return String(value).padStart(num, pad);
};

// { y, m, d, h, mm, s }
export const getFormatDate = date => {
  if (date == null) {
    return '';
  }
  if (typeof date == 'string' || typeof date == 'number') {
    date = new Date(date);
  }
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let mm = date.getMinutes();
  let s = date.getSeconds();
  m = padString(m);
  d = padString(d);
  h = padString(h);
  mm = padString(mm);
  s = padString(s);
  return { y, m, d, h, mm, s };
};

// yyyy-mm-dd
export const formatDate = date => {
  if (date == null) {
    return '';
  }
  const { y, m, d } = getFormatDate(date);
  return y + '-' + m + '-' + d;
};

// hh:mm:ss
export const formatTime = date => {
  if (date == null) {
    return '';
  }
  const { h, mm, s } = getFormatDate(date);
  return h + ':' + mm + ':' + s;
};

// yyyy-mm-dd hh:mm:ss
export const formatDateTime = date => {
  if (date == null) {
    return '';
  }
  const { y, m, d, h, mm, s } = getFormatDate(date);
  return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
};
