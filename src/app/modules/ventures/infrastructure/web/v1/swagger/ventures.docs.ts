import { ApiDocs } from '../../../../../../config/swagger/swagger.config';

export const venturesApiDocs: ApiDocs = {
  apiTag: '/ventures',
  endpoints: {
    getVentureCategories: {
      summary: 'Get venture categories - [ANY]',
      description: 'This endpoint retrieves venture categories.',
    },
    getAllVentures: {
      summary: 'Get all ventures info - [ADMIN]',
      description: 'This endpoint retrieves all ventures.',
    },
    getAllBasicVenturesInfo: {
      summary: 'Get all ventures basic info - [ANY]',
      description: 'This endpoint retrieves all ventures.',
    },
    getVentureImage: {
      summary: 'Get a venture image - [ANY]',
      description: 'This endpoint retrieves a venture image.',
    },
    createVenture: {
      summary: 'Create a venture - [ADMIN]',
      description: 'This endpoint creates a venture.',
      // Body is a form-data
    },
    updateVenture: {
      summary: 'Update a venture - [ADMIN]',
      description: 'This endpoint updates a venture.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
    updateVentureImage: {
      summary: 'Update a venture image - [ADMIN]',
      description: 'This endpoint updates a venture image.',
    },
    deleteVenture: {
      summary: 'Delete a venture - [ADMIN]',
      description: 'This endpoint deletes a venture.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
    enableVenture: {
      summary: 'Enable a venture - [ADMIN]',
      description: 'This endpoint enables a venture.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
    disableVenture: {
      summary: 'Disable a venture - [ADMIN]',
      description: 'This endpoint disables a venture.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
  },
};
