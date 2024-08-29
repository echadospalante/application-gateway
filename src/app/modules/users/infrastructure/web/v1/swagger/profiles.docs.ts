import { ApiDocs } from '../../../../../../config/swagger/swagger.config';

export const profileApiDocs: ApiDocs = {
  apiTag: '/profiles',
  endpoints: {
    getAllProfiles: {
      summary: 'Get all profiles info - [ADMIN]',
      description: 'This endpoint retrieves all profiles.',
    },
    getAllBasicProfilesInfo: {
      summary: 'Get all profiles basic info - [ANY]',
      description: 'This endpoint retrieves all profiles.',
    },
    getProfileImage: {
      summary: 'Get a profile image - [ANY]',
      description: 'This endpoint retrieves a profile image.',
    },
    createProfile: {
      summary: 'Create a profile - [ADMIN]',
      description: 'This endpoint creates a profile.',
      // Body is a form-data
    },
    updateProfile: {
      summary: 'Update a profile - [ADMIN]',
      description: 'This endpoint updates a profile.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
    updateProfileImage: {
      summary: 'Update a profile image - [ADMIN]',
      description: 'This endpoint updates a profile image.',
    },
    deleteProfile: {
      summary: 'Delete a profile - [ADMIN]',
      description: 'This endpoint deletes a profile.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
    enableProfile: {
      summary: 'Enable a profile - [ADMIN]',
      description: 'This endpoint enables a profile.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
    disableProfile: {
      summary: 'Disable a profile - [ADMIN]',
      description: 'This endpoint disables a profile.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
  },
};
