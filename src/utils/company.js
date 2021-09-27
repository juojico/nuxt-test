export const companyCategory = {
  info: {
    label: '公司資訊',
    value: 'info',
  },
  about: {
    label: '公司介紹',
    value: 'description',
  },
  product: {
    label: '服務項目',
    value: 'services',
  },
  welfare: {
    label: '福利制度',
    value: 'benefits',
  },
  vacancies: {
    label: '最新職缺',
    value: 'vacancies',
  },
};

export const companyMenu = Object.values(companyCategory);

export const getCompanyLabel = key => {
  if (key) return companyCategory[key].label;
  return '';
};
