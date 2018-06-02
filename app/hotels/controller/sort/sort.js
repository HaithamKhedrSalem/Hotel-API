class HotelsList{

  constructor() {
    this.hotelSortStrategy = new Sort();
  }

  setSortStrategy(hotelSortStrategy){
    /**
     * Set sort strategy.
     *
     * @hotelSortStrategy Price or name sort strategies.
    */ 
    this.hotelSortStrategy = hotelSortStrategy;
  }

  sort(data, query){
    this.hotelSortStrategy.sort(data, query);
  }
}


class Sort{

  sort(data, sortType){}
}

module.exports = {
	HotelsList: HotelsList,
	Sort: Sort
}
