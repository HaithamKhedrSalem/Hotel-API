const hotelsUtlis = require('./utlis');

var filterPipeline = {
  filter: function(hotelsList, query){
    var nameFilter = new HotelNameFilter();
    var cityFilter = new HotelCityFilter();
    var priceFilter = new PriceRangeFilter();
    var dateFilter = new DateRangeFilter();

    nameFilter.setNext(cityFilter).setNext(priceFilter).
      setNext(dateFilter);
    nameFilter.filter(hotelsList, query);
  }
}


class Filter {

  constructor(next) {
    this.next = {filter: function(hotelsList, query){}};
  }

  setNext(next){
    this.next = next;
    return next;
  }

  filter(hotelsList, query){}
}


class HotelNameFilter extends Filter{

  filter(hotelsList, query){
    /**
     * Filter hotels list by name.
     *
     * @query       Query object contains name value.
     * @hotelsList  list of hotel objects.
     */
    var name = query.getName();
    if(name != null){
      name = name.toLowerCase();
      var splitedName = name.split(' ');
      hotelsList.hotels = hotelsList.hotels.filter(
        hotel => splitedName.some(
          word => (hotel.getName().toLowerCase().search(word) > -1) &&
          word != 'hotel') || name == 'hotel');
    }
    this.next.filter(hotelsList, query);   
    }
}


class HotelCityFilter extends Filter{

  filter(hotelsList, query){
    /**
     * Filter hotels list by city.
     *
     * @query       Query object contains city value.
     * @hotelsList  list of hotel objects.
     */
    var hotelCity = query.getCity();
    if(hotelCity != null){
      hotelCity = hotelCity.toLowerCase();
      var splitedCity = hotelCity.split(' ');
      hotelsList.hotels = hotelsList.hotels.filter(
        hotel => splitedCity.some(
          word => hotel.getCity().toLowerCase().search(word) > -1));
    }
    this.next.filter(hotelsList, query);
  }
}


class PriceRangeFilter extends Filter{

  filter(hotelsList, query){
    /**
     * Filter hotels list by price range.
     *
     * @query       Query object contains price range values.
     * @hotelsList  list of hotel objects.
     */
    var minPrice = query.getMinPrice();
    var maxPrice = query.getMaxPrice();
    if(maxPrice != null){
      hotelsList.hotels = hotelsList.hotels.filter(
        hotel => hotel.getPrice() >= minPrice && hotel.getPrice() <= maxPrice);
    }
    else{
      hotelsList.hotels = hotelsList.hotels.filter(
        hotel => hotel.getPrice() >= minPrice);
    }
    this.next.filter(hotelsList, query);   
  }
}


class DateRangeFilter extends Filter{

  filter(hotelsList, query){
    /**
     * Filter hotels list by date range.
     *
     * @query       Query object contains date range values.
     * @hotelsList  list of hotel objects.
     */
    var startDate = query.getStartDate();
    var endDate = query.getEndDate();
    if(startDate != null && endDate != null){
      hotelsList.hotels = hotelsList.hotels.filter(function(hotel){
        return hotel.getAvailability().some(function(range){
          var availabilityStartDate = new Date(
            hotelsUtlis.StringDateConverter.ISOFormat(range.from))
          var availabilityEndDate = new Date(
            hotelsUtlis.StringDateConverter.ISOFormat(range.to))
          return (startDate >= availabilityStartDate &&
            endDate <= availabilityEndDate);
        })
      });
    }
    this.next.filter(hotelsList, query);   
  }
}

module.exports = {
  filterPipeline: filterPipeline,
  HotelNameFilter: HotelNameFilter,
  HotelCityFilter: HotelCityFilter,
  DateRangeFilter: DateRangeFilter,
  PriceRangeFilter: PriceRangeFilter
}
