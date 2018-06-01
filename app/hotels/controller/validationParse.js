const hotelsUtlis = require('./utlis');
const HotelError = require('../hotelsError');


class ParsingDecorator{

  static parse(filterQuery){}
}


class ValidationDecorator{

  static validate(filterQuery){}
}


class PriceRangeParse extends ParsingDecorator{

  static parse(filterQuery){
    /**
     * Parse min price and max price from string to float.
     *
     * @filterQuery  Decorated object which contains prices range.  
     */
    var minPrice = filterQuery.getMinPrice();
    var maxPrice = filterQuery.getMaxPrice();
    if(minPrice != null && maxPrice != null){
      minPrice = parseFloat(minPrice);
      maxPrice = parseFloat(maxPrice);
    }
    else if(minPrice != null){
      minPrice = parseFloat(minPrice);
    }
    else if(maxPrice != null){
      minPrice = 0;
      maxPrice = parseFloat(maxPrice);
    }
    else{
      minPrice = 0;
    }
    filterQuery.setMinPrice(minPrice);
    filterQuery.setMaxPrice(maxPrice);
  }
}


class DateRangeParse extends ParsingDecorator{

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
        hotelsUtlis.StringDateConverter.ISOFormat(startDate));
      endDate = new Date(
        hotelsUtlis.StringDateConverter.ISOFormat(endDate));
      filterQuery.setStartDate(startDate);
      filterQuery.setEndDate(endDate);
    }
  }
}


class PriceRangeValidation extends ValidationDecorator{

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


class DateRangeValidation extends ValidationDecorator{

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


class SortValidation extends ValidationDecorator{

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

module.exports = {
  PriceRangeParse: PriceRangeParse,
  PriceRangeValidation: PriceRangeValidation,
  DateRangeParse: DateRangeParse,
  DateRangeValidation: DateRangeValidation,
  SortValidation: SortValidation
}
