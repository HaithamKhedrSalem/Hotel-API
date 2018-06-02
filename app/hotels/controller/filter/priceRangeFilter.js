const Filter = require('./filter');


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

module.exports = PriceRangeFilter
