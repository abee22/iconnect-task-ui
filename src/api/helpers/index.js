const httpResponse = (status, data) => {
  if (status === 500) {
    return { response: { status, data } };
  }
  return { status, data, statusText: 'OK' };
};

export {
  httpResponse,
};
