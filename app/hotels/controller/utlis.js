const HotelError = require('../hotelsError');

class StringDateConverter{
  static ISOFormat(dateString){
    /**
     * Convert the string date value to ISO date format.
     *
     * @dateString       The date string value.
     */
    var splitedDate = dateString.split("-");
    if(splitedDate.length != 3){
      throw new HotelError.DateError('Invalid date format.')
    }
    var day = splitedDate[0];
    splitedDate[0] = splitedDate[1];
    splitedDate[1] = day;
    return splitedDate.join('-');
  }
};

class SortObjectList{
  static propertySort(field, sortType, primer){
    /**
     * Sort list of objs according to field in the object
     *.
     *
     * @field       The object field by which the list should be sorted.
     * @sortType    Detemine in which order the list should be sorted( asc or desc).
     * @primer      Function should be applied on the passed field in all objects.
     */
    var key = primer ? 
      function(obj) {return primer(obj[field])} : 
      function(obj) {return obj[field]};
    var reverse = (sortType == 'asc') ? 1 : -1;
    return function (obj1, obj2) {
      return obj1 = key(obj1), obj2 = key(obj2), reverse * (
        (obj1 > obj2) - (obj2 > obj1));
     }
  }
}

module.exports = {
  StringDateConverter: StringDateConverter, SortObjectList: SortObjectList}
