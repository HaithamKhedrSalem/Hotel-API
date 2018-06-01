const hotelsUtlis = require('./utlis');


class HotelsList{

  constructor() {
    this.hotelSortStrategy = new Sort();
  }

  setSortStrategy(hotelSortStrategy){
    /**
     * Set sort strategy.
     *
     * @hotelSortStrategy Price or name sort strategies.
    */ 
    this.hotelSortStrategy = hotelSortStrategy;
  }

  sort(data, query){
    this.hotelSortStrategy.sort(data, query);
  }
}


class Sort{

  sort(data, sortType){}
}


class HotelNameSort extends Sort{
  /**
   * Sort hotels list by name strategy.
  */
  sort(data, query){
    /**
     * Sort hotels list by name.
     *
     * @data        Hotel objects list.
     * @query       Query object which contain the sort type value.
     */
    data.hotels.sort(
      hotelsUtlis.SortObjectList.propertySort(
        'name', query.getSortType(), function(name){
        return name.toLowerCase()}));
  }
}


class HotelPriceSort extends Sort{
  /**
   * Sort hotels list by name strategy.
  */
  sort(data, query){
    /**
     * Sort hotels list by name.
     *
     * @data        Hotel objects list.
     * @query       Query object which contain the sort type value.
     */
    data.hotels.sort(
      hotelsUtlis.SortObjectList.propertySort(
        'price', query.getSortType(), parseFloat));    
  }
}


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


module.exports = {
  Sort: Sort,
  HotelProbertySortFactory: HotelProbertySortFactory,
  HotelsList: HotelsList,
  HotelPriceSort: HotelPriceSort,
  HotelNameSort: HotelNameSort
}
