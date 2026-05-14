export const mapErrors = (errors) => {
  const result = {};

  errors.forEach((err) => {
    result[err.path] = err.msg;
  });

  return result;
};
