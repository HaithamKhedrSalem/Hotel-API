const PriceRangeValidation = require('../../controller/validation/priceRangeValidation');
const HotelAPIController = require('../../service/apiController');
const HotelError = require('../../hotelsError');


test('Test validate price range with correct values', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'min_price': 100.0, 'max_price': 200.2});
    PriceRangeValidation.validate(filterQuery);
    expect(filterQuery.getMinPrice()).toEqual(100);
    expect(filterQuery.getMaxPrice()).toEqual(200.2);
});

test('Test validate price range with invalid min_price', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'min_price': 'asd', 'max_price': 200.2});
    expect(() => PriceRangeValidation.validate(filterQuery)).
        toThrow(HotelError.PriceError);
});

test('Test validate price range with invalid max_price', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'min_price': 100.6, 'max_price': 'asd'});
    expect(() => PriceRangeValidation.validate(filterQuery)).
        toThrow(HotelError.PriceError);
});

test('Test validate price range with negative value', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'min_price': -100.6, 'max_price': 200});
    expect(() => PriceRangeValidation.validate(filterQuery)).
        toThrow(HotelError.PriceError);
});

test('Test validate price range with min_price > max_price', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'min_price': 200, 'max_price': 100});
    expect(() => PriceRangeValidation.validate(filterQuery)).
        toThrow(HotelError.PriceError);
});
