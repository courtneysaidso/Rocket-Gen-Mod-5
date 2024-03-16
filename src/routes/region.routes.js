const RegionController = require('../features/health/region.controller');

const registerRegionRoutes = (app) => {
app.post('/region-create', RegionController.createRegion);
app.get('/region', RegionController.regionInfo);
app.get('/all-stars', RegionController.allStars);
}

module.exports = {registerRegionRoutes};