class Query{

  setCity(city){
    this.city = city;
  }

  getCity(){
    return this.city;
  }

  setName(name){
    this.name = name;
  }

  getName(){
    return this.name;
  }

  setMinPrice(minPrice){
    this.minPrice = minPrice;
  }

  getMinPrice(){
    return this.minPrice;
  }

  setMaxPrice(maxPrice){
    this.maxPrice = maxPrice;
  }

  getMaxPrice(){
    return this.maxPrice;
  }

  setStartDate(startDate){
    this.startDate = startDate;
  }

  getStartDate(){
    return this.startDate;
  }

  setEndDate(endDate){
    this.endDate = endDate;
  }

  getEndDate(){
    return this.endDate;
  }

  setSortBy(sortBy){
    this.sortBy = sortBy;
  }

  getSortBy(){
    return this.sortBy;
  }

  setSortType(sortType){
    this.sortType = sortType;
  }

  getSortType(){
    return this.sortType;
  }

}

module.exports = Query;
