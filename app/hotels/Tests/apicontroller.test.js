const HotelAPIController = require('../service/apiController');
const testControllers  = require('./testControllers.js');


test('Test invalid fetch all hotels.', () => {
    var hotelAPIController = new HotelAPIController();
    var hotelsList = hotelAPIController.fetchAllHotels();
    expect(hotelsList.hotels.length).toEqual(6);
});

test('Test convert json hotels to objects.', () => {
    var hotelAPIController = new HotelAPIController();
    var hotelsList = JSON.parse(
        JSON.stringify(testControllers.HOTELSLISTTEST));
    hotelAPIController.convertJSONHotelsToObjects(hotelsList);
    expect(hotelsList.hotels.length).toEqual(6);
    expect(hotelsList.hotels[0].constructor.name).toEqual('Hotel');
});


test('Test convert json query to Query object.', () => {
    var hotelAPIController = new HotelAPIController();
    var query = hotelAPIController.convertQueryToObject(
    	{'price': 100, 'name': 'golden'});
    expect(query.constructor.name).toEqual('Query');
});
