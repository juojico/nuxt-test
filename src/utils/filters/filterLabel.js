export const genderLabel = value => {
  return { male: '男', female: '女' }[value];
};

export const developStatusLabel = value => {
  return {
    strange: '陌生開發',
    hunter: '獵頭推薦',
    recommend: '內部推薦',
    self: '主動投遞',
    friend: '朋友推薦',
  }[value];
};

export const workStatusLabel = value => {
  return { incumbent: '在職中', unemployed: '待業' }[value];
};

export const interviewStatusLabel = value => {
  if (!value) return '待面試';
  return {
    quit: '失約',
    done: '赴約',
    cancel: '取消',
    change: '改約',
  }[value];
};

export const typeLabel = value => {
  return {
    0: '電話訪談',
    1: '電子郵件',
    2: '社群平台',
  }[value];
};

export const acceptInterviewLabel = value => {
  return {
    reject: '未接受邀約',
    agree: '接受邀約',
  }[value];
};

export const sourceNameLabel = value => {
  return {
    '104': '104',
    Hunter: '獵人頭',
    Linkedin: 'Linkedin',
  }[value];
};

export const onboardStatusLabel = value => {
  if (!value) return '尚未報到';
  return {
    notyet: '尚未報到',
    done: '完成報到',
    quit: '逾時未到',
  }[value];
};

export const onboardDocumentLabel = value => {
  return {
    resume: '求職者履歷',
    portfolio: '作品集',
    resignation: '離職證明',
  }[value];
};

export const familySurviveStatusLabel = value => {
  if (value == null) return '';
  return {
    0: '存',
    1: '歿',
  }[value];
};

export const articleCategoryLabel = value => {
  if (value == null) return '';
  return {
    0: '產業趨勢',
    1: '求職指南',
    2: '經營管理',
  }[value];
};

export const isPublishStatusLabel = value => {
  if (value == null) return '';
  return {
    0: '不刊登',
    1: '刊登',
  }[value];
};

export const jobStatusLabel = value => {
  if (value == null) return '';
  return {
    0: '關閉',
    1: '開啟',
  }[value];
};

export const jobTypeLabel = value => {
  if (value == null) return '-';
  return {
    0: '全職',
    1: '約聘/派遣',
    2: '實習',
    3: '兼職',
    4: '遠端工作',
    5: '短期工讀',
  }[value];
};

export const nationalityLabel = value => {
  return {
    native: '本國',
    foreign: '外國',
  }[value];
};

export const marriageLabel = value => {
  return {
    single: '未婚',
    married: '已婚',
    divorced: '离婚',
    other: '其他',
  }[value];
};

export const isSpecialStatusLabel = value => {
  if (value == null) return '';
  return {
    0: '否',
    1: '是',
  }[value];
};

export const workShiftLabel = value => {
  if (value == null) return '';
  return {
    0: '早班',
    1: '晚班',
    2: '假日班',
    3: '中班',
  }[value];
};

export const identityLabel = value => {
  if (value == null) return '';
  return {
    0: '不拘',
    1: '上班族',
    2: '學生',
    3: '應屆畢業生',
    4: '原住民',
    5: '外籍人士',
    6: '二度就業',
    7: '身心障礙',
    8: '研發替代役',
  }[value];
};

export const educationLabel = value => {
  if (value == null) return '不拘';
  return {
    0: '不拘',
    1: '高中以下',
    2: '高中以上',
    3: '專科以上',
    4: '大學以上',
    5: '碩士以上',
    6: '博士以上）',
  }[value];
};

export const holidaySystemLabel = value => {
  if (value == null) return '-';
  return {
    0: '-',
    1: '週休二日',
    2: '排班休',
    3: '依公司規定',
  }[value];
};

export const workTimeTypeLabel = value => {
  if (value == null) return '-';
  return {
    0: '-',
    1: '日班',
    2: '晚班',
    3: '大夜班',
    4: '假日班',
  }[value];
};

export const referralMoneyStatusLabel = value => {
  if (value == null) return '';
  return {
    0: '未結算',
    1: '結算中',
    2: '已結算',
    3: '結算失敗',
  }[value];
};

export const referralStatusLabel = value => {
  if (value == null) return '';
  return {
    0: '-',
    1: '已提交',
    2: '試用中',
    3: '引薦成功',
    4: '引薦失敗',
  }[value];
};
export const languageLevelsLabel = value => {
  if (value == null) return '';
  return {
    0: '不拘',
    1: '略懂',
    2: '中等',
    3: '精通',
  }[value];
};