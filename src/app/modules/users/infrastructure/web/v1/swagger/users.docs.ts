import { ApiDocs } from '../../../../../../config/swagger/swagger.config';

export const profileApiDocs: ApiDocs = {
  apiTag: '/profiles',
  endpoints: {
    getAllUsers: {
      summary: 'Get all users info - [ADMIN]',
      description: 'This endpoint retrieves all users.',
    },
    getAllBasicUsersInfo: {
      summary: 'Get all users basic info - [ANY]',
      description: 'This endpoint retrieves all users.',
    },
    getUserImage: {
      summary: 'Get a user image - [ANY]',
      description: 'This endpoint retrieves a user image.',
    },
    createUser: {
      summary: 'Create a user - [ADMIN]',
      description: 'This endpoint creates a user.',
      // Body is a form-data
    },
    updateUser: {
      summary: 'Update a user - [ADMIN]',
      description: 'This endpoint updates a user.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
    updateUserImage: {
      summary: 'Update a user image - [ADMIN]',
      description: 'This endpoint updates a user image.',
    },
    deleteUser: {
      summary: 'Delete a user - [ADMIN]',
      description: 'This endpoint deletes a user.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
    enableUser: {
      summary: 'Enable a user - [ADMIN]',
      description: 'This endpoint enables a user.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
    disableUser: {
      summary: 'Disable a user - [ADMIN]',
      description: 'This endpoint disables a user.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
  },
};
