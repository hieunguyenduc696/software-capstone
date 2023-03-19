export const kebabCaseToPascalCase = (text: string) => {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
};

export const clearAndUpper = (text: string) => {
  return text.replace(/-/, " ").toUpperCase();
};

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat().format(number);
};
