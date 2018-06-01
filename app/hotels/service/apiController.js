const url = require('url');
const sync_request = require('sync-request');

const Hotel = require('../model/hotel.js');
const Query = require('../model/query.js');


class HotelAPIController{

  constructor(){
    this.url = "https://api.myjson.com/bins/tl0bp";
  }

  getQueryFromUrl(req){
    /**
     * Get the query parameters from the url.
     *
     * @req       The request object which contains the url.
     */
    var url_parts = url.parse(req.url, true);
    return url_parts.query;
  }

  fetchAllHotels(url){
    /**
     * Fetch all the available hotels list from this endpoint.
     *
     * @url       The rquested url.
     */
    var response = sync_request('GET', this.url);
    return JSON.parse(response.getBody('utf8'))
  }

  convertJSONHotelsToObjects(data){
    /**
     * Convert and wrap the json of hotels to list of hotel objects.
     *
     * @data       Josn data.
     */
    if ('hotels' in data && Array.isArray(data['hotels'])){
      data.hotels.forEach(function(hotel, index){
        var hotelObject = new Hotel();
        hotelObject.setCity(hotel.city);
        hotelObject.setPrice(hotel.price);
        hotelObject.setName(hotel.name);
        hotelObject.setAvailability(hotel.availability);
        data.hotels[index] = hotelObject;
      });
    }
  }

  convertHotelsObjectsToJson(hotelsDictList){
    /**
     * Convert hotel objects to json.
     *
     * @hotelsDictList       hotel objects list.
     */
    hotelsDictList.hotels.forEach(function(hotelObject, index){
      var hotel = {};
      hotel.name = hotelObject.getName();
      hotel.city = hotelObject.getCity();
      hotel.price = hotelObject.getPrice();
      hotel.availability = hotelObject.getAvailability()
      hotelsDictList.hotels[index] = hotel;
    });
  }

  convertQueryToObject(query){
    /**
     * Convert url query parameters to Query object.
     *
     * @query       URL query parameters.
     */
    var queryObject = new Query()
    queryObject.setCity(query.city || null);
    queryObject.setName(query.name || null);
    queryObject.setMinPrice(query.min_price || null);
    queryObject.setMaxPrice(query.max_price || null);
    queryObject.setStartDate(query.start_date || null);
    queryObject.setEndDate(query.end_date || null);
    queryObject.setSortBy(query.sort_by || null);
    queryObject.setSortType(query.sort_type || null);
    return queryObject;
  }
}

module.exports = HotelAPIController;
