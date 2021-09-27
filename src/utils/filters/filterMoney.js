// 1234.567 => "1,234.57" maxDecimal:最多小數位數 minDecimal:最少小數位數
export const toMoney = (num, maxDecimal = 2, minDecimal = 2) => {
  return new Intl.NumberFormat('zh-Hans-CN', {
    maximumFractionDigits: maxDecimal,
    minimumFractionDigits: minDecimal > maxDecimal ? maxDecimal : minDecimal,
  }).format(num);
};

// 縮減金額
export const deMoney = (num, omit, maxDecimal = 2, minDecimal = 0) => {
  return toMoney(num / omit, maxDecimal, minDecimal);
};

export const toMoneyK = (num, maxDecimal = 2, minDecimal = 0) => {
  return deMoney(num, 1000, maxDecimal, minDecimal) + 'k';
};

export const toMoneyW = (num, maxDecimal = 2, minDecimal = 0) => {
  return deMoney(num, 10000, maxDecimal, minDecimal) + '萬';
};

// 數值範圍
export const formatMoneyRange = (
  numList,
  unit = 'k',
  maxDecimal = 2,
  minDecimal = 0,
) => {
  let digits = 1;

  if (['k', 'K', '千'].includes(unit)) digits = 1000;
  if (['w', 'W', '萬'].includes(unit)) digits = 10000;

  const formatNum = num =>
    num !== null ? deMoney(num, digits, maxDecimal, minDecimal) : '';

  const num1 = formatNum(numList[0]);
  const num2 = formatNum(numList[1]);

  if (num1 && num2) {
    return num1 + '-' + num2 + unit;
  }

  if (num1 && !num2) {
    return num1 + unit + '以上';
  }

  if (!num1 && num2) {
    return num2 + unit + '以下';
  }
};

export const formatMoney = num => {
  return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
};

export const formatMoneyK = num => {
  const newN = Math.round(num / 1000);
  return formatMoney(newN) + 'k';
};

export const formatMoneyW = num => {
  const newN = Math.round(num / 10000);
  return formatMoney(newN) + '萬';
};
