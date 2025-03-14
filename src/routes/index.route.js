module.exports = (app) => {
  const version = 'api/v1';
  app.use(version + 'device');
  app.use(version + 'sensor');
};
