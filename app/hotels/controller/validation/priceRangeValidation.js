const HotelError = require('../../hotelsError');
const Validation = require('./validation');


class PriceRangeValidation extends Validation{

  static validate(filterQuery){
    /**
     * Validate min price and max price values.
     *
     * @filterQuery  Decorated object which contains parsed prices range.  
     */
    var minPrice = filterQuery.getMinPrice();
    var maxPrice = filterQuery.getMaxPrice();
    if(typeof(minPrice) != "number" || isNaN(minPrice) || minPrice < 0){
      throw new HotelError.PriceError('Minimum price is not a valid number.');
    }
    if(maxPrice != null){
      if(typeof(maxPrice) != "number" || isNaN(maxPrice) || maxPrice < 0){
        throw new HotelError.PriceError('Maximum price is not a valid number.');
      }
      if(minPrice > maxPrice){
        throw new HotelError.PriceError('Invalid price range values');
      }
    }    
  }
}


module.exports = PriceRangeValidation
