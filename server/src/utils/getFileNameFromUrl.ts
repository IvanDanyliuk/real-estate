export const getFileNameFromUrl = (url: string) => {
  const parsedFileName = new URL(url).pathname.split("/").pop();
  if(parsedFileName) {
    return parsedFileName.split(".")[0];
  }
  return null;
};