import { ApiDocs } from '../../../../../../config/swagger/swagger.config';

export const donationsApiDocs: ApiDocs = {
  apiTag: '/donations',
  endpoints: {
    getAllDonations: {
      summary: 'Get all donations info - [ADMIN]',
      description: 'This endpoint retrieves all donations.',
    },
    getAllBasicDonationsInfo: {
      summary: 'Get all donations basic info - [ANY]',
      description: 'This endpoint retrieves all donations.',
    },
    getDonationImage: {
      summary: 'Get a donation image - [ANY]',
      description: 'This endpoint retrieves a donation image.',
    },
    createDonation: {
      summary: 'Create a donation - [ADMIN]',
      description: 'This endpoint creates a donation.',
      // Body is a form-data
    },
    updateDonation: {
      summary: 'Update a donation - [ADMIN]',
      description: 'This endpoint updates a donation.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
    updateDonationImage: {
      summary: 'Update a donation image - [ADMIN]',
      description: 'This endpoint updates a donation image.',
    },
    deleteDonation: {
      summary: 'Delete a donation - [ADMIN]',
      description: 'This endpoint deletes a donation.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
    enableDonation: {
      summary: 'Enable a donation - [ADMIN]',
      description: 'This endpoint enables a donation.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
    disableDonation: {
      summary: 'Disable a donation - [ADMIN]',
      description: 'This endpoint disables a donation.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
  },
};
