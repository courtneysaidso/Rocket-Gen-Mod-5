const HealthController = require('../features/health/health.controller');

const registerHealthRoutes = (app) => {
  app.get('/hello', HealthController.helloWorld);
}

module.exports = {registerHealthRoutes};