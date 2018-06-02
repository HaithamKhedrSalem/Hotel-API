const HotelAPIController = require('../../service/apiController');
const testControllers  = require('../testControllers.js');
const HotelAPI = require('../../service/api');


test('Test filter by date range.', () => {
    var hotelsList = JSON.parse(
        JSON.stringify(testControllers.HOTELSLISTTEST));
    var hotelAPIController = new HotelAPIController();
    hotelAPIController.convertJSONHotelsToObjects(hotelsList);
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'start_date': '10-10-2020', 'end_date': '15-10-2020'});
    HotelAPI.filter(hotelsList, filterQuery);
    expect(hotelsList.hotels.length).toEqual(4);
});

test('Test filter by date range2.', () => {
    var hotelsList = JSON.parse(
        JSON.stringify(testControllers.HOTELSLISTTEST));
    var hotelAPIController = new HotelAPIController();
    hotelAPIController.convertJSONHotelsToObjects(hotelsList);
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'start_date': '10-12-2020', 'end_date': '20-12-2020'});
    HotelAPI.filter(hotelsList, filterQuery);
    expect(hotelsList.hotels.length).toEqual(3);
});

test('Test filter by price range and date range.', () => {
    var hotelsList = JSON.parse(
        JSON.stringify(testControllers.HOTELSLISTTEST));
    var hotelAPIController = new HotelAPIController();
    hotelAPIController.convertJSONHotelsToObjects(hotelsList);
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'start_date': '10-12-2020', 'end_date': '20-12-2020',
         'max_price': 100, 'min_price': 50});
    HotelAPI.filter(hotelsList, filterQuery);
    expect(hotelsList.hotels.length).toEqual(2);
});
