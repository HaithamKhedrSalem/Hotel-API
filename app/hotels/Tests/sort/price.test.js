const HotelAPIController = require('../../service/apiController');
const testControllers  = require('../testControllers.js');
const HotelProbertySortFactory = require('../../controller/sort/sortFactory');
const HotelPriceSort = require('../../controller/sort/priceSort');
const HotelsSort = require('../../controller/sort/sort');

test('Test create sort price class by sort factory.', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject({'sort_by': 'price'});
    var hotelProbertySort = HotelProbertySortFactory.
        createHotelPropertySort(filterQuery);
    expect(hotelProbertySort instanceof HotelPriceSort).
      toEqual(true);
});



test('Test asc sorting by price.', () => {
    var hotelsList = JSON.parse(
        JSON.stringify(testControllers.HOTELSLISTTEST));
    var hotelAPIController = new HotelAPIController();
    hotelAPIController.convertJSONHotelsToObjects(hotelsList);
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'sort_by': 'price', 'sort_type': 'asc'});
    var hotelProbertySort = HotelProbertySortFactory.
        createHotelPropertySort(filterQuery);
    var hotelsSort = new HotelsSort.HotelsList();
    hotelsSort.setSortStrategy(hotelProbertySort);
    hotelsSort.sort(hotelsList, filterQuery);
    expect(hotelsList.hotels[0].getPrice()).toEqual(79.4);
    expect(hotelsList.hotels[1].getPrice()).toEqual(80.6);
    expect(hotelsList.hotels[2].getPrice()).toEqual(89.6);
    expect(hotelsList.hotels[3].getPrice()).toEqual(102.2);
    expect(hotelsList.hotels[4].getPrice()).toEqual(109.6);
    expect(hotelsList.hotels[5].getPrice()).toEqual(111);
});

test('Test desc sorting by price.', () => {
    var hotelsList = JSON.parse(
        JSON.stringify(testControllers.HOTELSLISTTEST));
    var hotelAPIController = new HotelAPIController();
    hotelAPIController.convertJSONHotelsToObjects(hotelsList);
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'sort_by': 'price', 'sort_type': 'desc'});
    var hotelProbertySort = HotelProbertySortFactory.
        createHotelPropertySort(filterQuery);
    var hotelsSort = new HotelsSort.HotelsList();
    hotelsSort.setSortStrategy(hotelProbertySort);
    hotelsSort.sort(hotelsList, filterQuery);
    expect(hotelsList.hotels[0].getPrice()).toEqual(111);
    expect(hotelsList.hotels[1].getPrice()).toEqual(109.6);
    expect(hotelsList.hotels[2].getPrice()).toEqual(102.2);
    expect(hotelsList.hotels[3].getPrice()).toEqual(89.6);
    expect(hotelsList.hotels[4].getPrice()).toEqual(80.6);
    expect(hotelsList.hotels[5].getPrice()).toEqual(79.4);
});
