# Hotel API (Nodejs 9.1)

## Setup
  - Pull the repo and cd to the directory.
  - Run `sudo docker build -t tajawal .`
  - Run `sudo docker run --name tajawal -p 8080:8080 tajawal`

## Architecture
  - `HotelAPIController` is responsible for fetch all hotels.
  - `ParsingDecorator` is responsible for parsing price and date range to valid data. It is an implementation of `Decorator` design pattern where `ParsingDecorator` decorate `Query`. `PriceRangeParse` and `DateRangeParse` extend `ParsingDecorator` and implement `parse` method to parse the price range and date range.
  - `ValidationDecorator` is responsible for validating all the url parameters. It is an implementation of `Decorator` design pattern where `ValidationDecorator` decorate `Query`. `PriceRangeValidation`, `DateRangeValidation` and `SortValidation` extend `ValidationDecorator` and implement the `validate` method which validate the price and date ranges and the sort parameters.
  - `Filter` is responsible for filtering the hotels list according to the passed parameters in the query url. It is an implementation of the `Chain of Responsiblity` design pattern.
  - `Sort` is responsible for sorting the hotels list according to the the sort parameters in the query url. It is an implementation of `strategy design pattern` wherer `HotelNameSort` and `HotelPriceSort` are the two strategies.
  - `HotelProbertySortFactory` is responsible for creating one of the two sort strategies depending on the sort parameters.

## API documenation
 - http://localhost:8080/hotels will return all the available hotels.
    #### Sucess Response
    ```
    {"status_code":200, "data":{"hotels":[]}}
    ```
    #### Error Response
    ```
    {
    "err_msg": "", "err_name": "", "status_code": 400
    }
    ```
 - Only `name`, `city`, `min_price`, `max_price`, `start_date`, `end_date`, `sort_by` and `sort_type` options are valid to be provided in the URL query if anything else is provided the API will ignore it.
 - Filter by `name` http://localhost:8080/hotels?name=Golden%20Tulip will return `Golden Tulip` and if you search with `Tulip Golden`, `Gold`, `Tulip` or `Golden` will also return the same result of `Golden Tulip`.Can search by reversed or partial hotel name.
 - Filter by `city` http://localhost:8080/hotels?city=london will return `Le Meridien` and you can search with partial or reversed city if contains two words.
 - Filter by price range using `min_price` and `max_price` http://localhost:8080/hotels?min_price=100&max_price=200 will return hotels in this range. Note that If `min_price` or `max_price` is not numeric or negative values or `min_price` value is larger than the `max_price` this will return error.
 - Filter by price range using only `min_price` http://localhost:8080/hotels?min_price=100 will return hotels with price above that value.
 - Filter by price range using only `max_price` http://localhost:8080/hotels?max_price=200 will return hotels with price below that value.
 - Filter by date range using `start_date` and `end_date` http://localhost:8080/hotels?start_date=10-10-2020&end_date=20-10-2020 will return hotels in this range. Note that If one these two values is provided and the other is missing or the `end_date` is later the `end_date` this will return error.
 - Sorting by `name` or `price` by providing `sort_by=name` or `sort_by=price` and you can provide the type of sort which can be ascending(`sort_type=asc`) or descending sort(`sort_type=desc`)   http://localhost:8080/hotels?sort_by=name&sort_type='asc' and  http://localhost:8080/hotels?sort_by=price&sort_type='desc'
Only available options to `sort_by` are `price` and `name` and for `sort_type` are `asc` and `desc` if anything else is provided it will return this error JSON. If `sort_by` is provided and `sort_type` is not the default value is `desc`.

## UnitTest - (Open New Terminal)
 - Run `sudo docker exec tajawal jest` to run all the unittests.
 - Run `sudo docker exec tajawal jest --coverage` to get the unittest coverage.

## CodeClimate:
 [![Maintainability](https://api.codeclimate.com/v1/badges/71e70cef44de36422b0a/maintainability)](https://codeclimate.com/github/HaithamKhedrSalem/Hotel-API/maintainability)

## Travis
 [![Build Status](https://travis-ci.org/HaithamKhedrSalem/Hotel-API.svg?branch=master)](https://travis-ci.org/HaithamKhedrSalem/Hotel-API)