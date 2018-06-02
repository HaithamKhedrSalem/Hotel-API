const HotelAPIController = require('../../service/apiController');
const testControllers  = require('../testControllers.js');
const HotelAPI = require('../../service/api');


test('Test filter by hotel city.', () => {
    var hotelsList = JSON.parse(
        JSON.stringify(testControllers.HOTELSLISTTEST));
    var hotelAPIController = new HotelAPIController();
    hotelAPIController.convertJSONHotelsToObjects(hotelsList);
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'city': 'paris'});
    HotelAPI.filter(hotelsList, filterQuery);
    expect(hotelsList.hotels.length).toEqual(1);
    expect(hotelsList.hotels[0].getName()).toEqual('Golden Tulip');
});

test('Test filter by not matched name and city.', () => {
    var hotelsList = JSON.parse(
        JSON.stringify(testControllers.HOTELSLISTTEST));
    var hotelAPIController = new HotelAPIController();
    hotelAPIController.convertJSONHotelsToObjects(hotelsList);
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'name': 'Hotel Rotana', 'city': 'paris'});
    HotelAPI.filter(hotelsList, filterQuery);
    expect(hotelsList.hotels.length).toEqual(0);
});

test('Test filter by name city and price range.', () => {
    var hotelsList = JSON.parse(
        JSON.stringify(testControllers.HOTELSLISTTEST));
    var hotelAPIController = new HotelAPIController();
    hotelAPIController.convertJSONHotelsToObjects(hotelsList);
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'city': 'paris', 'min_price': 50,
         'max_price': 150, 'name': 'Tulip'});
    HotelAPI.filter(hotelsList, filterQuery);
    expect(hotelsList.hotels.length).toEqual(1);
});

test('Test filter by city and price range.', () => {
    var hotelsList = JSON.parse(
        JSON.stringify(testControllers.HOTELSLISTTEST));
    var hotelAPIController = new HotelAPIController();
    hotelAPIController.convertJSONHotelsToObjects(hotelsList);
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'city': 'paris', 'min_price': 50, 'max_price': 150});
    HotelAPI.filter(hotelsList, filterQuery);
    expect(hotelsList.hotels.length).toEqual(1);
});