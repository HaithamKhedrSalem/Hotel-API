const HotelError = require('../../hotelsError');
const Validation = require('./validation');


class SortValidation extends Validation{

  static validate(filterQuery){
    /**
     * Validate sort parameters (sort_by and sort_type).
     *
     * @filterQuery  Decorated object which contains sort parameters.  
     */
    var sortBy = filterQuery.getSortBy();
    var sortType = filterQuery.getSortType();
    if(sortBy == null && sortType != null){
      throw new HotelError.SortError('Missing sort by parameter.');
    }
    if(sortBy != null && ['price', 'name'].indexOf(sortBy) < 0){
      throw new HotelError.SortError('Sort by parameter is not valid.');
    }
    if(sortType != null && ['asc', 'desc'].indexOf(sortType) < 0){
      throw new HotelError.SortError('Invalid sort type parameter.');
    }    
  }
}


module.exports = SortValidation
