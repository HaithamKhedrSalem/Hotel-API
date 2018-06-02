const HotelError = require('../../hotelsError');
const Validation = require('./validation');


class DateRangeValidation extends Validation{

  static validate(filterQuery){
    /**
     * Validate start date and end date after parsing.
     *
     * @filterQuery  Decorated object which contains parsed dates.  
     */
    var startDate = filterQuery.getStartDate();
    var endDate = filterQuery.getEndDate();
    if(startDate != null && endDate != null){
      if(isNaN(startDate.valueOf())){
        throw new HotelError.DateError('Invalid start date value');
      }
      if(isNaN(endDate.valueOf())){
        throw new HotelError.DateError('Invalid end date value');
      }
      if(startDate > endDate){
        throw new HotelError.DateError('Invalid date range values');
      }
    }
  }
}


module.exports = DateRangeValidation
