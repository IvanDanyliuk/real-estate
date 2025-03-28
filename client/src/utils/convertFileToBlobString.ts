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