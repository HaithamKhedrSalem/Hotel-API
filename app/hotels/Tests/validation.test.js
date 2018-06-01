const HotelAPIController = require('../service/apiController');
const ParseValidation = require('../controller/validationParse');
const HotelError = require('../hotelsError');


test('Test validate price range with correct values', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'min_price': 100.0, 'max_price': 200.2});
    ParseValidation.PriceRangeValidation.validate(filterQuery);
    expect(filterQuery.getMinPrice()).toEqual(100);
    expect(filterQuery.getMaxPrice()).toEqual(200.2);
});

test('Test validate price range with invalid min_price', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'min_price': 'asd', 'max_price': 200.2});
    expect(() => ParseValidation.PriceRangeValidation.validate(filterQuery)).
        toThrow(HotelError.PriceError);
});

test('Test validate price range with invalid max_price', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'min_price': 100.6, 'max_price': 'asd'});
    expect(() => ParseValidation.PriceRangeValidation.validate(filterQuery)).
        toThrow(HotelError.PriceError);
});

test('Test validate price range with negative value', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'min_price': -100.6, 'max_price': 200});
    expect(() => ParseValidation.PriceRangeValidation.validate(filterQuery)).
        toThrow(HotelError.PriceError);
});

test('Test validate price range with min_price > max_price', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'min_price': 200, 'max_price': 100});
    expect(() => ParseValidation.PriceRangeValidation.validate(filterQuery)).
        toThrow(HotelError.PriceError);
});

test('Test validate date range with correct values', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'start_date': '10-2-2020', 'end_date': '20-2-2020'});
    ParseValidation.DateRangeParse.parse(filterQuery);
    ParseValidation.DateRangeValidation.validate(filterQuery);
    expect(filterQuery.getStartDate().getMonth() +1).toEqual(2);
    expect(filterQuery.getStartDate().getDate()).toEqual(10);
});

test('Test validate date range with invalid start date', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'start_date': '10-20-2020', 'end_date': '20-2-2020'});
    ParseValidation.DateRangeParse.parse(filterQuery);
    expect(() => ParseValidation.DateRangeValidation.validate(filterQuery)).toThrow(
        HotelError.DateError);
});

test('Test validate date range with invalid end date', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'start_date': '10-2-2020', 'end_date': '20-20-2020'});
    ParseValidation.DateRangeParse.parse(filterQuery);
    expect(() => ParseValidation.DateRangeValidation.validate(filterQuery)).toThrow(
        HotelError.DateError);
});

test('Test validate date range with start_date > end_date', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'start_date': '20-2-2020', 'end_date': '10-2-2020'});
    ParseValidation.DateRangeParse.parse(filterQuery);
    expect(() => ParseValidation.DateRangeValidation.validate(filterQuery)).toThrow(
        HotelError.DateError);
});

test('Test validate sort parameters with correct values', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'sort_by': 'price', 'sort_type': 'desc'});
    ParseValidation.SortValidation.validate(filterQuery);
    expect(filterQuery.getSortBy()).toEqual('price');
    expect(filterQuery.getSortType()).toEqual('desc');
});

test('Test validate sort parameters with invalid sort_type', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'sort_by': 'price', 'sort_type': 'asd'});
    expect(() => ParseValidation.SortValidation.validate(filterQuery)).toThrow(
        HotelError.SortError);
});

test('Test validate sort parameters with invalid sort_by', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'sort_by': 'asd', 'sort_type': 'asc'});
    expect(() => ParseValidation.SortValidation.validate(filterQuery)).toThrow(
        HotelError.SortError);
});

test('Test validate sort parameters with missing sort_by', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'sort_type': 'asc'});
    expect(() => ParseValidation.SortValidation.validate(filterQuery)).toThrow(
        HotelError.SortError);
});
