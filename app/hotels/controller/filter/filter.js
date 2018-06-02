class Filter {

  constructor(next) {
    this.next = {filter: function(hotelsList, query){}};
  }

  setNext(next){
    this.next = next;
    return next;
  }

  filter(hotelsList, query){}
}

module.exports = Filter
