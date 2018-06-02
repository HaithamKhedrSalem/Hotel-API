const HotelAPIController = require('../../service/apiController');
const testControllers  = require('../testControllers.js');
const HotelAPI = require('../../service/api');


test('Test filter by hotel name.', () => {
    var hotelsList = JSON.parse(
        JSON.stringify(testControllers.HOTELSLISTTEST));
    var hotelAPIController = new HotelAPIController();
    hotelAPIController.convertJSONHotelsToObjects(hotelsList);
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'name': 'Rotana Hotel'});
    HotelAPI.filter(hotelsList, filterQuery);
    expect(hotelsList.hotels.length).toEqual(1);
    expect(hotelsList.hotels[0].getCity()).toEqual('cairo');
});

test('Test filter by hotel with reversed name.', () => {
    var hotelsList = JSON.parse(
        JSON.stringify(testControllers.HOTELSLISTTEST));
    var hotelAPIController = new HotelAPIController();
    hotelAPIController.convertJSONHotelsToObjects(hotelsList);
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'name': 'Golden Tulip'});
    HotelAPI.filter(hotelsList, filterQuery);
    expect(hotelsList.hotels.length).toEqual(1);
    expect(hotelsList.hotels[0].getCity()).toEqual('paris');
});

test('Test filter by partial name.', () => {
    var hotelsList = JSON.parse(
        JSON.stringify(testControllers.HOTELSLISTTEST));
    var hotelAPIController = new HotelAPIController();
    hotelAPIController.convertJSONHotelsToObjects(hotelsList);
    var filterQuery = hotelAPIController.convertQueryToObject({'name': 'Tuli'});
    HotelAPI.filter(hotelsList, filterQuery);
    expect(hotelsList.hotels.length).toEqual(1);
});

test('Test filter by matched name and city.', () => {
    var hotelsList = JSON.parse(
        JSON.stringify(testControllers.HOTELSLISTTEST));
    var hotelAPIController = new HotelAPIController();
    hotelAPIController.convertJSONHotelsToObjects(hotelsList);
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'name': 'Hotel Rotana', 'city': 'cairo'});
    HotelAPI.filter(hotelsList, filterQuery);
    expect(hotelsList.hotels.length).toEqual(1);
});

