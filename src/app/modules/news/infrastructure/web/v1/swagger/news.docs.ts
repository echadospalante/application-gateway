import { ApiDocs } from '../../../../../../config/swagger/swagger.config';

export const newsApiDocs: ApiDocs = {
  apiTag: '/news',
  endpoints: {
    getAllNotifications: {
      summary: 'Get all notifications info - [ADMIN]',
      description: 'This endpoint retrieves all notifications.',
    },
    getAllBasicNotificationsInfo: {
      summary: 'Get all notifications basic info - [ANY]',
      description: 'This endpoint retrieves all notifications.',
    },
    getNotificationImage: {
      summary: 'Get a notification image - [ANY]',
      description: 'This endpoint retrieves a notification image.',
    },
    createNotification: {
      summary: 'Create a notification - [ADMIN]',
      description: 'This endpoint creates a notification.',
      // Body is a form-data
    },
    updateNotification: {
      summary: 'Update a notification - [ADMIN]',
      description: 'This endpoint updates a notification.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
    updateNotificationImage: {
      summary: 'Update a notification image - [ADMIN]',
      description: 'This endpoint updates a notification image.',
    },
    deleteNotification: {
      summary: 'Delete a notification - [ADMIN]',
      description: 'This endpoint deletes a notification.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
    enableNotification: {
      summary: 'Enable a notification - [ADMIN]',
      description: 'This endpoint enables a notification.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
    disableNotification: {
      summary: 'Disable a notification - [ADMIN]',
      description: 'This endpoint disables a notification.',
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
      ],
    },
  },
};
