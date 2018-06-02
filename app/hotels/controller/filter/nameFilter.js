const Filter = require('./filter');


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

module.exports = HotelNameFilter
