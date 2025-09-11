const saveObjectLocalData = (key: string, objectData: object) => {
  const object = {...objectData, dataTime: Date.now()};
  localStorage.setItem(key, JSON.stringify(object));
};

const getObjectLocalData = (key: string) => {
  return localStorage.getItem(key);
};

export default {
  saveObjectLocalData,
  getObjectLocalData,
};