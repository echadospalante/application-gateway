import { ApiDocs } from '../../../../../../config/swagger/swagger.config';

export const authApiDocs: ApiDocs = {
  apiTag: '/auth',
  endpoints: {
    deleteAccount: {
      summary: 'Delete account by id - [ADMIN]',
      description: 'This endpoint deletes the user account',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
    refresh: {
      summary: 'Refresh token - [ANY]',
      description: 'This endpoint refreshes the authentication tokens',
    },
    login: {
      summary: 'Login a user',
      description: 'This endpoint logs in a user.',
    },
    register: {
      summary: 'Register a user',
      description: 'This endpoint registers a user.',
    },
    recoverSendEmail: {
      summary: 'Send recovery email',
      description: 'This endpoint sends a recovery email.',
    },
    recoverResetPassword: {
      summary: 'Reset password',
      description: 'This endpoint resets a password.',
    },
    changeUserRoles: {
      summary: 'Change user roles - [ADMIN]',
      description: 'This endpoint changes the user roles.',
    },
  },
};
