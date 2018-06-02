const StringDateConverter = require('../utlis/dateConverter');
const Filter = require('./filter');


class DateRangeFilter extends Filter{

  filter(hotelsList, query){
    /**
     * Filter hotels list by date range.
     *
     * @query       Query object contains date range values.
     * @hotelsList  list of hotel objects.
     */
    var startDate = query.getStartDate();
    var endDate = query.getEndDate();
    if(startDate != null && endDate != null){
      hotelsList.hotels = hotelsList.hotels.filter(function(hotel){
        return hotel.getAvailability().some(function(range){
          var availabilityStartDate = new Date(
            StringDateConverter.ISOFormat(range.from))
          var availabilityEndDate = new Date(
            StringDateConverter.ISOFormat(range.to))
          return (startDate >= availabilityStartDate &&
            endDate <= availabilityEndDate);
        })
      });
    }
    this.next.filter(hotelsList, query);   
  }
}


module.exports = DateRangeFilter
