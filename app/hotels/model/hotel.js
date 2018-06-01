class Hotel{

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

  setPrice(price){
    this.price = price;
  }

  getPrice(){
    return this.price;
  }

  setAvailability(availability){
    this.availability = availability;
  }

  getAvailability(){
    return this.availability;
  }
}

module.exports = Hotel;
