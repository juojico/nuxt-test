export const articleCategory = {
  story: {
    label: '經營管理',
    value: 'story',
    color: 'green',
  },
  trend: {
    label: '產業趨勢',
    value: 'trend',
    color: 'blue',
  },
  strategy: {
    label: '求職指南',
    value: 'strategy',
    color: 'pink',
  },
};

export const articleMenu = Object.values(articleCategory);

export const getLabel = key => {
  if (key) return articleCategory[key].label;
  return '';
};
