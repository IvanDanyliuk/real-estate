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

export const fillEmptyArrayData = (initialData: InitialData[], options: {label: string; value: string | number;}[]) => {
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
}