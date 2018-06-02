const HotelError = require('../../hotelsError');


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


module.exports = StringDateConverter
