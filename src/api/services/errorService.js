import { httpResponse } from '../helpers';

export default (reject) => error => {
  reject(httpResponse(500, error));
  return true;
};
