export const officeEmailValidation = (rule: any, value: any) => {
  if (/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@diagonal.software/.test(value)) {
    return Promise.resolve();
  } else {
    return Promise.reject('Provide office email');
  }
};

export const isNumeric = (rule: any, value: any) => {
  if (/^[0-9]*$/.test(value)) {
    // allow numeric values, an empty string, or a minus sign
    return Promise.resolve();
  }
  return Promise.reject('Input must be numeric'); // reject if input is not numeric
};

export const formatDecimalPoint = (value: number): any => {
  if (!value && value !== 0) return;
  return Number(value).toFixed(2);
};
