const Filter = require('./filter');
const HotelNameFilter = require('./nameFilter');
const HotelCityFilter = require('./cityFilter');
const DateRangeFilter = require('./priceRangeFilter');
const PriceRangeFilter = require('./dateRangeFilter');


class FilterPipeline{

  static filter(hotelsList, query){
    var nameFilter = new HotelNameFilter();
    var cityFilter = new HotelCityFilter();
    var priceFilter = new PriceRangeFilter();
    var dateFilter = new DateRangeFilter();

    nameFilter.setNext(cityFilter).setNext(priceFilter).
      setNext(dateFilter);
    nameFilter.filter(hotelsList, query);
  }
}

module.exports = FilterPipeline