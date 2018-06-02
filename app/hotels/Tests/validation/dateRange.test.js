const DateRangeValidation = require('../../controller/validation/dateRangeValidation');
const DateRangeParse = require('../../controller/parse/dateRangeParse');
const HotelAPIController = require('../../service/apiController');
const HotelError = require('../../hotelsError');


test('Test validate date range with correct values', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'start_date': '10-2-2020', 'end_date': '20-2-2020'});
    DateRangeParse.parse(filterQuery);
    DateRangeValidation.validate(filterQuery);
    expect(filterQuery.getStartDate().getMonth() +1).toEqual(2);
    expect(filterQuery.getStartDate().getDate()).toEqual(10);
});

test('Test validate date range with invalid start date', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'start_date': '10-20-2020', 'end_date': '20-2-2020'});
    DateRangeParse.parse(filterQuery);
    expect(() => DateRangeValidation.validate(filterQuery)).toThrow(
        HotelError.DateError);
});

test('Test validate date range with invalid end date', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'start_date': '10-2-2020', 'end_date': '20-20-2020'});
    DateRangeParse.parse(filterQuery);
    expect(() => DateRangeValidation.validate(filterQuery)).toThrow(
        HotelError.DateError);
});

test('Test validate date range with start_date > end_date', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'start_date': '20-2-2020', 'end_date': '10-2-2020'});
    DateRangeParse.parse(filterQuery);
    expect(() => DateRangeValidation.validate(filterQuery)).toThrow(
        HotelError.DateError);
});