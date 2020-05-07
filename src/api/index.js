import routes from './routes';

const router = method => (path, config = {}) => {
  const route = (routes[method] || {})[path];
  if (route) {
    return route(config.params);
  }
};

const routerWithPayload = method => (path, data, config = {}) => {
  const route = (routes[method] || {})[path];
  if (route) {
    return route(data, config.params);
  }
};

const get = router('get');
const post = routerWithPayload('post');

const Api = {
  get,
  post
};

export default Api;
