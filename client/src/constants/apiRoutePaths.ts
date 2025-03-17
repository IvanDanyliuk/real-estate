// prefix: auth
export enum AUTH_ROUTES {
  register = '/register',
  login = '/login',
  refresh = '/refresh',
  logout = '/logout',
  verifyEmail = '/email/verify/:code',
  forgotPassword = '/password/forgot',
  resetPassword = '/password/reset',
};

// prefix: users
export enum USER_ROUTES {
  getUser = '/',
};

// prefix: sessions
export enum SESSION_ROUTES {
  getSessions = '/',
  deleteSession = '/:id',
};