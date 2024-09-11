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
  DONATIONS_MANAGEMENT_URL: string;
  FEEDS_MANAGEMENT_URL: string;
  NEWS_MANAGEMENT_URL: string;
  NOTIFICATIONS_MANAGEMENT_URL: string;
  USERS_MANAGEMENT_URL: string;
  VENTURES_MANAGEMENT_URL: string;
  // --------------------------------------------------------------
  METRICS_PORT: string;
  // --------------------------------------------------------------
  JWT_TOKEN_SECRET: string;
  JWT_TOKEN_EXPIRATION: number;
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
  DONATIONS_MANAGEMENT_URL: Joi.string().required(),
  FEEDS_MANAGEMENT_URL: Joi.string().required(),
  NEWS_MANAGEMENT_URL: Joi.string().required(),
  NOTIFICATIONS_MANAGEMENT_URL: Joi.string().required(),
  USERS_MANAGEMENT_URL: Joi.string().required(),
  VENTURES_MANAGEMENT_URL: Joi.string().required(),
  // --------------------------------------------------------------
  METRICS_PORT: Joi.number().required().min(1).max(65535),
  // --------------------------------------------------------------
  JWT_TOKEN_SECRET: Joi.string().required(),
  JWT_TOKEN_EXPIRATION: Joi.number().required().min(1),
});
