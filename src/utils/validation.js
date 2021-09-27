export const isUrl = str => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(String(str));
};

export const hasSpecial = str => {
  return /[`~!#$%^&*()+=<>?:"{}|~！#￥%……&*（）={}|《》？：“”【】、；‘’，。、\s+]/.test(
    String(str),
  );
};

export const isEmail = str => {
  return /^[_a-z0-9-]+([.][_a-z0-9-]+)*@[a-z0-9-]+([.][a-z0-9-]+)*$/.test(String(str));
};

// rules validator

export const validUrl = (rule, value, callback) => {
  if (isUrl(value)) {
    callback();
  } else {
    callback('必須為網址格式');
  }
};

export const validSpecial = (rule, value, callback) => {
  if (hasSpecial(value)) {
    callback('不可含有空白或特殊符號');
  } else {
    callback();
  }
};

export const validHttps = (rule, value, callback) => {
  if (String(value).includes('https://')) {
    callback();
  } else {
    callback('網址必須為https://');
  }
};

export const validEmail = (rule, value, callback) => {
  if (isEmail(value)) {
    callback();
  } else {
    callback('必須為e-mail格式');
  }
};

export const validPhone = (rule, value, callback) => {
  if (value && !value.match(/^09[0-9]{8}$/)) {
    return callback(new Error('必須為手機號碼格式'));
  }
  return callback();
};

export const validPassword = (rule, value, callback) => {
  if (!value || !value.match(/^(?=.*\d)(?=.*[a-zA-Z])(.{8,})$/)) {
    return callback(new Error('必須符合英數8~16位'));
  }
  return callback();
};

export const validNumber = (rule, value, callback) => {
  if (!value) {
    return callback();
  }
  if (!value.toString().match(/^\d+$/)) {
    return callback(new Error('必須為數字'));
  }
  return callback();
};

export const validIdNumber = (rule, value, callback) => {
  value = value.trim();

  let verification = value.match('^[A-Z][12]\\d{8}$');
  if (!verification) {
    callback(new Error('必須為身份證字號格式'));
  }

  let conver = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
  let weights = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];

  value = String(conver.indexOf(value[0]) + 10) + value.slice(1);

  let checkSum = 0;
  for (let i = 0; i < value.length; i++) {
    let c = parseInt(value[i]);
    let w = weights[i];
    checkSum += c * w;
  }
  if (checkSum % 10 == 0) {
    callback();
  } else {
    callback(new Error('必須為身份證字號格式'));
  }
};

export const required = {
  required: true,
  message: '此為必填欄位',
  trigger: 'blur',
};
export const url = { validator: validUrl, trigger: 'blur' };
export const special = { validator: validSpecial, trigger: 'blur' };
export const email = { validator: validEmail, trigger: 'blur' };
export const phone = { validator: validPhone, trigger: 'blur' };
export const password = { validator: validPassword, trigger: 'blur' };
export const number = { validator: validNumber, trigger: 'blur' };
export const idNumber = { validator: validIdNumber, trigger: 'blur' };
