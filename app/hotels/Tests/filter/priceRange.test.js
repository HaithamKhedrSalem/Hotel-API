const HotelAPIController = require('../../service/apiController');
const testControllers  = require('../testControllers.js');
const HotelAPI = require('../../service/api');


test('Test filter by price range with min and max price.', () => {
    var hotelsList = JSON.parse(
        JSON.stringify(testControllers.HOTELSLISTTEST));
    var hotelAPIController = new HotelAPIController();
    hotelAPIController.convertJSONHotelsToObjects(hotelsList);
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'min_price': 100, 'max_price': 200});
    HotelAPI.filter(hotelsList, filterQuery);
    expect(hotelsList.hotels.length).toEqual(3);
});

test('Test filter by price range without max_price.', () => {
    var hotelsList = JSON.parse(
        JSON.stringify(testControllers.HOTELSLISTTEST));
    var hotelAPIController = new HotelAPIController();
    hotelAPIController.convertJSONHotelsToObjects(hotelsList);
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'min_price': 80, 'max_price': null});
    HotelAPI.filter(hotelsList, filterQuery);
    expect(hotelsList.hotels.length).toEqual(5);
});

test('Test filter by price range with zero min_price.', () => {
    var hotelsList = JSON.parse(
        JSON.stringify(testControllers.HOTELSLISTTEST));
    var hotelAPIController = new HotelAPIController();
    hotelAPIController.convertJSONHotelsToObjects(hotelsList);
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'min_price': 0, 'max_price': 100});
    HotelAPI.filter(hotelsList, filterQuery);
    expect(hotelsList.hotels.length).toEqual(3);
});

test('Test filter by price range with out max and date range.', () => {
    var hotelsList = JSON.parse(
        JSON.stringify(testControllers.HOTELSLISTTEST));
    var hotelAPIController = new HotelAPIController();
    hotelAPIController.convertJSONHotelsToObjects(hotelsList);
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'start_date': '10-12-2020', 'end_date': '20-12-2020',
         'max_price': null, 'min_price': 50});
    HotelAPI.filter(hotelsList, filterQuery);
    expect(hotelsList.hotels.length).toEqual(3);
});

test('Test filter by name and price range.', () => {
    var hotelsList = JSON.parse(
        JSON.stringify(testControllers.HOTELSLISTTEST));
    var hotelAPIController = new HotelAPIController();
    hotelAPIController.convertJSONHotelsToObjects(hotelsList);
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'name': 'Golden Tulip', 'min_price': 50, 'max_price': 150});
    HotelAPI.filter(hotelsList, filterQuery);
    expect(hotelsList.hotels.length).toEqual(1);
});
