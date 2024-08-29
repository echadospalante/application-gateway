import * as Joi from 'joi';

export interface EnvironmentSetup {
  // --------------------------------------------------------------
  // SERVER
  PORT: number;
  // --------------------------------------------------------------
  // APP
  APP_NAME: string;
  APP_WRITE_FILES: string;
  // --------------------------------------------------------------
  // ROUTES
  AUTH_MANAGEMENT_URL: string;
  DONATIONS_MANAGEMENT_URL: string;
  FEEDS_MANAGEMENT_URL: string;
  NEWS_MANAGEMENT_URL: string;
  NOTIFICATIONS_MANAGEMENT_URL: string;
  USERS_MANAGEMENT_URL: string;
  VENTURES_MANAGEMENT_URL: string;
  // --------------------------------------------------------------
  METRICS_PORT: string;
}

export const JoiValidationSchema = Joi.object<EnvironmentSetup>({
  // --------------------------------------------------------------
  // APPLICATION
  PORT: Joi.number().required().min(1).max(65535),
  APP_NAME: Joi.string().required(),
  APP_WRITE_FILES: Joi.boolean()
    .required()
    .truthy('yes')
    .falsy('no')
    .sensitive(true),
  // --------------------------------------------------------------
  // ROUTES
  AUTH_MANAGEMENT_URL: Joi.string().required(),
  DONATIONS_MANAGEMENT_URL: Joi.string().required(),
  FEEDS_MANAGEMENT_URL: Joi.string().required(),
  NEWS_MANAGEMENT_URL: Joi.string().required(),
  NOTIFICATIONS_MANAGEMENT_URL: Joi.string().required(),
  USERS_MANAGEMENT_URL: Joi.string().required(),
  VENTURES_MANAGEMENT_URL: Joi.string().required(),
  // --------------------------------------------------------------
  METRICS_PORT: Joi.number().required().min(1).max(65535),
  // --------------------------------------------------------------
});
