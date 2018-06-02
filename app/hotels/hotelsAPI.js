const Response = require('./response.js');
const HotelAPI = require('./service/api');
const HotelAPIController = require('./service/apiController');


module.exports = function(app) {
  app.get('/hotels', (req, response) => {
    try {
      var hotelAPIController = new HotelAPIController();
      var hotelsList = hotelAPIController.fetchAllHotels();
      hotelAPIController.convertJSONHotelsToObjects(hotelsList);
      var query = hotelAPIController.getQueryFromUrl(req);
      var queryObject = hotelAPIController.convertQueryToObject(query);
      HotelAPI.filter(hotelsList, queryObject);
      HotelAPI.sort(hotelsList, queryObject);
      hotelAPIController.convertHotelsObjectsToJson(hotelsList);
      var res = new Response.SuccessResponse(hotelsList);
      response.send(res.data);
    }
    catch(error){
      response.status(400);
      var res = new Response.ErrorResponse(error.message, error.name, 400);
      response.send(res.data)};
  });
};
