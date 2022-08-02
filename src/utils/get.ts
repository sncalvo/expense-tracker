export const get = (object: any, path: string) => {
  const keys = path.split('.').filter((key) => key.length);

  return keys.reduce((dive, key) => dive && dive[key], object);
};
