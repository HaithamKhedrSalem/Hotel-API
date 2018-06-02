const HotelAPIController = require('../../service/apiController');
const HotelError = require('../../hotelsError');
const DateRangeParse = require('../../controller/parse/dateRangeParse');


test('Test parse date range with correct values', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'start_date': '10-2-2020', 'end_date': '20-2-2020'});
    DateRangeParse.parse(filterQuery);
    var startDate = filterQuery.getStartDate();
    var endDate = filterQuery.getEndDate();
    expect(startDate).toEqual(new Date('2-10-2020'));
    expect(endDate).toEqual(new Date('2-20-2020'));
    expect(startDate.getMonth() +1).toEqual(2);
    expect(endDate.getMonth() +1).toEqual(2);
    expect(startDate.getDate()).toEqual(10);
    expect(endDate.getDate()).toEqual(20);
});

test('Test parse date range with missing start date', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'end_date': '20-2-2020'});
    expect(() => DateRangeParse.parse(filterQuery)).toThrow(HotelError.DateError);
});

test('Test parse date range with missing end date', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'start_date': '20-2-2020'});
    expect(() => DateRangeParse.parse(filterQuery)).toThrow(HotelError.DateError);
});

test('Test parse date range with invalid date format', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'start_date': '20-2-2020', 'end_date': '20-2020'});
    expect(() => DateRangeParse.parse(filterQuery)).toThrow(HotelError.DateError);
});
