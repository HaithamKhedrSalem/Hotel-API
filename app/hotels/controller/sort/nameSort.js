const SortObjectList = require('../utlis/sort');
const HotelSort = require('./sort');


class HotelNameSort extends HotelSort.Sort{
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
      SortObjectList.propertySort(
        'name', query.getSortType(), function(name){
        return name.toLowerCase()}));
  }
}


module.exports = HotelNameSort
