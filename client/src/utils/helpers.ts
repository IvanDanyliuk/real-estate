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

type InitialData = {
  _id: string | number,
  primaryKey: number,
  secondaryKey: number,
};

type Options = {
  label: string, 
  value: string | number,
};

export const fillEmptyArrayData = (initialData: InitialData[], options: Options[]) => {
  const dataMap = new Map(initialData.map(item => [item._id, item]));
  const filledData = options.map(item => {
    const itemFound = dataMap.get(item.value);
    if(itemFound) {
      return {
        ...itemFound,
        _id: item.label
      }
    } else {
      return { _id: item.label, primaryKey: 0, secondaryKey: 0 };
    }
  });
  return filledData;
};

export const getDaysFromDate = (inputDate: string | Date) => {
  const givenDate = new Date(inputDate);
  const today = new Date();

  givenDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - givenDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};