const ParseValidation = require('../controller/validationParse');

const Hotel = require('./apiController');
const HotelFilter = require('../controller/filter');
const HotelSort = require('../controller/sort');

class HotelAPI{

  static filter(hotelsDictList, query){
    ParseValidation.PriceRangeParse.parse(query);
    ParseValidation.PriceRangeValidation.validate(query);
    ParseValidation.DateRangeParse.parse(query);
    ParseValidation.DateRangeValidation.validate(query);
    ParseValidation.SortValidation.validate(query);
    HotelFilter.filterPipeline.filter(hotelsDictList, query);
  }

  static sort(hotelsDictList, query){
    var hotelProbertySort = HotelSort.HotelProbertySortFactory.
      createHotelPropertySort(query);
    if(hotelProbertySort != null){
      var hotelSort = new HotelSort.HotelsList();
      hotelSort.setSortStrategy(hotelProbertySort);
      hotelSort.sort(hotelsDictList, query);
    }
  }
}

module.exports = HotelAPI;
