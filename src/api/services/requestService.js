import { httpResponse } from '../helpers';
import server from '../server';
import errorService from './errorService';

export default (request) =>
  new Promise((resolve, reject) => {
    const token = localStorage.getItem('token') || '';
    server({
      ...request,
      'Content-Type':  'application/json',
      headers: {
        authorization: token
      }
    })
      .then(response => {
        if ([200, 201].includes(response.status)) {
          const data = response.data;
          resolve(httpResponse(200, data));
        } else {
          const error = `${response.message || `Something went wrong `}`;
          reject(
            httpResponse(400, {
              message: error,
            }),
          );
        }
      })
      .catch(errorService(reject));
  });
