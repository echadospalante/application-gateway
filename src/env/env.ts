export const environment = () => ({
  // ---------------------------------------------------------------
  // SERVER
  PORT: process.env.PORT,
  // ---------------------------------------------------------------
  // APP
  APP_NAME: process.env.APP_NAME,
  APP_WRITE_FILES: process.env.APP_WRITE_FILES,
  // --------------------------------------------------------------
  // ROUTES
  DONATIONS_MANAGEMENT_URL: process.env.DONATIONS_MANAGEMENT_URL,
  FEEDS_MANAGEMENT_URL: process.env.FEEDS_MANAGEMENT_URL,
  NEWS_MANAGEMENT_URL: process.env.NEWS_MANAGEMENT_URL,
  NOTIFICATIONS_MANAGEMENT_URL: process.env.NOTIFICATIONS_MANAGEMENT_URL,
  USERS_MANAGEMENT_URL: process.env.USERS_MANAGEMENT_URL,
  VENTURES_MANAGEMENT_URL: process.env.VENTURES_MANAGEMENT_URL,
  // --------------------------------------------------------------
  METRICS_PORT: process.env.METRICS_PORT,
  // --------------------------------------------------------------
  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
  JWT_TOKEN_EXPIRATION: process.env.JWT_TOKEN_EXPIRATION,
});
