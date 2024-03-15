const RegionController = require('../features/health/region.controller');

const registerRegionRoutes = (app) => {
app.post('/region-create', RegionController.createRegion);
}

module.exports = {registerRegionRoutes};