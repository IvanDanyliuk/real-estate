type ArgObject = {
  [key: string]: any;
};

export const removeFalseyFields = (object: ArgObject) => {
  const res: any = {};
  Object.keys(object).forEach(key => {
    if(object[key]) {
      res[key] = object[key];
    }
  });
  return res;
};