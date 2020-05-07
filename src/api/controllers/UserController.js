import requestService from '../services/requestService';

const getMyData = () => {
  const request = {
    method: 'get',
    url: `/me`,
    params: {
      type: 'get_my_data'
    }
  };

  return requestService(request);
};

const signup = (data, query) => {
  const request = {
    method: 'post',
    url: `/signup`,
    params: {
      type: 'signup',
    },
    data
  };

  return requestService(request);
};

const login = (data, query) => {
  const request = {
    method: 'post',
    url: `/login`,
    params: {
      type: 'login',
    },
    data
  };

  return requestService(request);
};

export default {
  login,
  signup,
  getMyData
};
