const HotelAPIController = require('../../service/apiController');
const testControllers  = require('../testControllers.js');
const HotelProbertySortFactory = require('../../controller/sort/sortFactory');
const HotelNameSort = require('../../controller/sort/nameSort');
const HotelsSort = require('../../controller/sort/sort');


test('Test create sort name class by sort factory.', () => {
    var hotelAPIController = new HotelAPIController();
    var filterQuery = hotelAPIController.convertQueryToObject({'sort_by': 'name'});
    var hotelProbertySort = HotelProbertySortFactory.
        createHotelPropertySort(filterQuery);
    expect(hotelProbertySort instanceof HotelNameSort).
      toEqual(true);
});

test('Test asc sorting by hotel name.', () => {
    var hotelsList = JSON.parse(
        JSON.stringify(testControllers.HOTELSLISTTEST));
    var hotelAPIController = new HotelAPIController();
    hotelAPIController.convertJSONHotelsToObjects(hotelsList);
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'sort_by': 'name', 'sort_type': 'asc'});
    var hotelProbertySort = HotelProbertySortFactory.
        createHotelPropertySort(filterQuery);
    var hotelsSort = new HotelsSort.HotelsList();
    hotelsSort.setSortStrategy(hotelProbertySort);
    hotelsSort.sort(hotelsList, filterQuery);
    expect(hotelsList.hotels[0].name).toEqual('Concorde Hotel');
    expect(hotelsList.hotels[1].name).toEqual("Golden Tulip");
    expect(hotelsList.hotels[2].name).toEqual('Le Meridien');
    expect(hotelsList.hotels[3].name).toEqual("Media One Hotel");
    expect(hotelsList.hotels[4].name).toEqual("Novotel Hotel");
    expect(hotelsList.hotels[5].name).toEqual("Rotana Hotel");
});

test('Test desc sorting by hotel name.', () => {
    var hotelsList = JSON.parse(
        JSON.stringify(testControllers.HOTELSLISTTEST));
    var hotelAPIController = new HotelAPIController();
    hotelAPIController.convertJSONHotelsToObjects(hotelsList);
    var filterQuery = hotelAPIController.convertQueryToObject(
        {'sort_by': 'name', 'sort_type': 'desc'});
    var hotelProbertySort = HotelProbertySortFactory.
        createHotelPropertySort(filterQuery);
    var hotelsSort = new HotelsSort.HotelsList();
    hotelsSort.setSortStrategy(hotelProbertySort);
    hotelsSort.sort(hotelsList, filterQuery);
    expect(hotelsList.hotels[0].name).toEqual("Rotana Hotel");
    expect(hotelsList.hotels[1].name).toEqual("Novotel Hotel");
    expect(hotelsList.hotels[2].name).toEqual("Media One Hotel");
    expect(hotelsList.hotels[3].name).toEqual('Le Meridien');
    expect(hotelsList.hotels[4].name).toEqual("Golden Tulip");
    expect(hotelsList.hotels[5].name).toEqual('Concorde Hotel');
});