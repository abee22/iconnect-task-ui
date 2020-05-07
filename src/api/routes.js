import UserController from './controllers/UserController';

const routes = {
  get: {},
  post: {}
};

// GET
routes.get['/me'] = UserController.getMyData;

// POST
routes.post['/signup'] = UserController.signup;
routes.post['/login'] = UserController.login;


export default routes;
