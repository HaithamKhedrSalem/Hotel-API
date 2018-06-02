const HotelNameSort = require('./nameSort');
const HotelPriceSort = require('./priceSort');


class HotelProbertySortFactory{
  /**
   * Factory class to create Sort objects.
  */
  static createHotelPropertySort(query){
    /**
     * Create Sort objects according to hotelProperty value.
     *
     * @query       Query object which contain the sort by value.
    */ 
    var sortBy = query.getSortBy()
    if(sortBy == 'price'){
      return new HotelPriceSort();
    }
    if(sortBy == 'name'){
      return new HotelNameSort();
    }
    return null;    
  }
}

module.exports = HotelProbertySortFactory
