const now = new Date();

export const monthList = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

export const dayList = Array.from(Array(31), (_, i) => String(i + 1 + '일'));

export const yearList = Array.from(
  Array(now.getFullYear() - 1900 + 1),
  (_, i) => String(now.getFullYear() - i + '년')
);
