import { ApiDocs } from '../../../../../../config/swagger/swagger.config';

export const feedApiDocs: ApiDocs = {
  apiTag: '/feeds',
  endpoints: {
    getAllFeeds: {
      summary: 'Get all feeds info - [ADMIN]',
      description: 'This endpoint retrieves all feeds.',
    },
    getAllBasicFeedsInfo: {
      summary: 'Get all feeds basic info - [ANY]',
      description: 'This endpoint retrieves all feeds.',
    },
    getFeedImage: {
      summary: 'Get a feed image - [ANY]',
      description: 'This endpoint retrieves a feed image.',
    },
    createFeed: {
      summary: 'Create a feed - [ADMIN]',
      description: 'This endpoint creates a feed.',
      // Body is a form-data
    },
    updateFeed: {
      summary: 'Update a feed - [ADMIN]',
      description: 'This endpoint updates a feed.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
    updateFeedImage: {
      summary: 'Update a feed image - [ADMIN]',
      description: 'This endpoint updates a feed image.',
    },
    deleteFeed: {
      summary: 'Delete a feed - [ADMIN]',
      description: 'This endpoint deletes a feed.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
    enableFeed: {
      summary: 'Enable a feed - [ADMIN]',
      description: 'This endpoint enables a feed.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
    disableFeed: {
      summary: 'Disable a feed - [ADMIN]',
      description: 'This endpoint disables a feed.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
  },
};
