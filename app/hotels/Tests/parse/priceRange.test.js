const HotelAPIController = require('../../service/apiController');
const PriceRangeParse = require('../../controller/parse/priceRangeParse');


test('Test parse price range with correct values', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'min_price': '100', 'max_price': '200'});
    PriceRangeParse.parse(filterQuery);
    expect(filterQuery.getMinPrice()).toEqual(100);
    expect(filterQuery.getMaxPrice()).toEqual(200);
});

test('Test parse price range if no max_price', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'min_price': '100.5'});
    PriceRangeParse.parse(filterQuery);
    expect(filterQuery.getMinPrice()).toEqual(100.5);
    expect(filterQuery.getMaxPrice()).toEqual(null);
});


test('Test parse price range if no min_price', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'max_price': '200.2'});
    PriceRangeParse.parse(filterQuery);
    expect(filterQuery.getMinPrice()).toEqual(0);
    expect(filterQuery.getMaxPrice()).toEqual(200.2);
});

test('Test parse price range if no min_price and max_price', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject({});
    PriceRangeParse.parse(filterQuery);
    expect(filterQuery.getMinPrice()).toEqual(0);
    expect(filterQuery.getMaxPrice()).toEqual(null);
});
