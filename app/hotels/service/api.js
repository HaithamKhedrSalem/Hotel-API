const DateRangeParse = require('../controller/parse/dateRangeParse');
const PriceRangeParse = require('../controller/parse/priceRangeParse');
const DateRangeValidation = require('../controller/validation/dateRangeValidation');
const PriceRangeValidation = require('../controller/validation/priceRangeValidation');
const SortValidation = require('../controller/validation/sortValidation');


const Hotel = require('./apiController');
const FilterPipeline = require('../controller/filter/pipeline');
const HotelProbertySortFactory = require('../controller/sort/sortFactory');
const HotelSort = require('../controller/sort/sort');


class HotelAPI{

  static filter(hotelsDictList, query){
    PriceRangeParse.parse(query);
    PriceRangeValidation.validate(query);
    DateRangeParse.parse(query);
    DateRangeValidation.validate(query);
    SortValidation.validate(query);
    FilterPipeline.filter(hotelsDictList, query);
  }

  static sort(hotelsDictList, query){
    var hotelProbertySort = HotelProbertySortFactory.
      createHotelPropertySort(query);
    if(hotelProbertySort != null){
      var hotelSort = new HotelSort.HotelsList();
      hotelSort.setSortStrategy(hotelProbertySort);
      hotelSort.sort(hotelsDictList, query);
    }
  }
}

module.exports = HotelAPI;
