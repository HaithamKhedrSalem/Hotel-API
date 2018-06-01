// routes/index.js
const hotelsRoutes = require('./hotelsAPI');
module.exports = function(app) {
  hotelsRoutes(app);
  // Other route groups could go here, in the future
};