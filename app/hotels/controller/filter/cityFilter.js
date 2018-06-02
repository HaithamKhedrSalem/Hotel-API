const Filter = require('./filter');


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


module.exports = HotelCityFilter
