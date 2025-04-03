export const convertFileToString = (file: any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    ;}

    fileReader.onerror = (error: any) => {
      reject(error);
    };
  });
};

type ArgObject = {
  [key: string]: any;
}

export const removeFalseyFields = (object: ArgObject) => {
  const res: any = {};
  Object.keys(object).forEach(key => {
    if(object[key]) {
      res[key] = object[key];
    }
  });
  return res;
};