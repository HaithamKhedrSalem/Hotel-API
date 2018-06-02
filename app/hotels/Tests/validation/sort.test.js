const SortValidation = require('../../controller/validation/sortValidation');
const HotelAPIController = require('../../service/apiController');
const HotelError = require('../../hotelsError');


test('Test validate sort parameters with correct values', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'sort_by': 'price', 'sort_type': 'desc'});
    SortValidation.validate(filterQuery);
    expect(filterQuery.getSortBy()).toEqual('price');
    expect(filterQuery.getSortType()).toEqual('desc');
});

test('Test validate sort parameters with invalid sort_type', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'sort_by': 'price', 'sort_type': 'asd'});
    expect(() => SortValidation.validate(filterQuery)).toThrow(
        HotelError.SortError);
});

test('Test validate sort parameters with invalid sort_by', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'sort_by': 'asd', 'sort_type': 'asc'});
    expect(() => SortValidation.validate(filterQuery)).toThrow(
        HotelError.SortError);
});

test('Test validate sort parameters with missing sort_by', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'sort_type': 'asc'});
    expect(() => SortValidation.validate(filterQuery)).toThrow(
        HotelError.SortError);
});
