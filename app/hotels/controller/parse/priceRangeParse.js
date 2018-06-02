const Parsing = require('./parse');


class PriceRangeParse extends Parsing{

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

module.exports = PriceRangeParse
