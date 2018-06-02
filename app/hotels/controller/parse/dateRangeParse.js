const HotelError = require('../../hotelsError');
const StringDateConverter = require('../utlis/dateConverter');
const Parsing = require('./parse');


class DateRangeParse extends Parsing{

  static parse(filterQuery){
    /**
     * Parse start date and end date from string to Date objects.
     *
     * @filterQuery  Decorated object which contains date range.  
     */
    var startDate = filterQuery.getStartDate();
    var endDate = filterQuery.getEndDate();
    if(startDate == null &&  endDate != null || startDate != null && endDate == null){
      throw new HotelError.DateError('Missing start or end date.');
    }
    if(startDate != null && endDate != null){
      startDate = new Date(
        StringDateConverter.ISOFormat(startDate));
      endDate = new Date(
        StringDateConverter.ISOFormat(endDate));
      filterQuery.setStartDate(startDate);
      filterQuery.setEndDate(endDate);
    }
  }
}

module.exports = DateRangeParse
