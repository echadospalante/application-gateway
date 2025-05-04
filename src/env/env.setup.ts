import * as Joi from 'joi';

export interface EnvSetup {
  PORT: number;
  APP_NAME: string;
  USERS_MANAGEMENT_HOST: string;
  VENTURES_MANAGEMENT_HOST: string;
  JWT_TOKEN_SECRET: string;
  JWT_TOKEN_EXPIRATION: string;
  COOKIE_EXPIRATION: number;
}

const {
  PORT,
  APP_NAME,
  USERS_MANAGEMENT_HOST,
  VENTURES_MANAGEMENT_HOST,
  JWT_TOKEN_SECRET,
  JWT_TOKEN_EXPIRATION,
  COOKIE_EXPIRATION,
  ANALYTICS_HOST,
  APPRAISALS_HOST,
} = process.env;

export const environment = () => ({
  PORT,
  APP_NAME,
  USERS_MANAGEMENT_HOST,
  VENTURES_MANAGEMENT_HOST,
  JWT_TOKEN_SECRET,
  JWT_TOKEN_EXPIRATION,
  COOKIE_EXPIRATION,
  ANALYTICS_HOST,
  APPRAISALS_HOST,
});

export const JoiValidationSchema = Joi.object<EnvSetup>({
  // --------------------------------------------------------------
  // APPLICATION
  PORT: Joi.number().required().min(1).max(65535),
  APP_NAME: Joi.string().required(),
  // --------------------------------------------------------------
  // ROUTES
  USERS_MANAGEMENT_HOST: Joi.string().required().uri(),
  VENTURES_MANAGEMENT_HOST: Joi.string().required().uri(),
  // --------------------------------------------------------------
  // JWT
  JWT_TOKEN_SECRET: Joi.string().required(),
  JWT_TOKEN_EXPIRATION: Joi.string().required(),
  COOKIE_EXPIRATION: Joi.number().integer().required().min(1),
});
