**Question**

At K*ck we deal with data vendors all across the country. Please write a function that can take varying JSON data input sources representing a property on a MLS (multiple listing service) and send them to our fictional CRM endpoint. You should make an http post call to the CRM endpoint in the function for a customer with the id `762910`. The function should take in one of the MLS JSON input sources at a time. Keep in mind that the data sources will grow with each new city we add so try and think through the implications of this. The CRM endpoint is not real so you will need to mock out the test calls.

**API**

K*ck has a CRM that keeps track of the customers submitting their homes to us. Below is a fictional endpoint that creates a new record with the details about the houses a customer is interested in buying. For this example don't worry about authentication.

_Endpoint_

`POST https://kck-crm.io/customer/{:id}/properties`

_Payload_

* `mls_name` - (string, required) which mls the property belongs to
* `mls_id` - (number, required) a unique identifier within the mls supplied
* `street_address` - (string, required) the number and street name of the property
* `city` - (string, required) the name of the city the property is in
* `state` - (string, required) the name of the state the property is in
* `zip_code` - (number, required) a 5 digit value for zip code of the property
* `list_price` - (number, required) how much the property is listed for. This should be an integer, example 400000
* `list_date` - (number, required) a Unix timestamp indicating the date the property was listed on. example 1525143600
* `bedrooms` - (number) how many bedrooms the property has
* `full_baths` - (number) how many full bathrooms the property has
* `half_baths` - (number) how many half bathrooms the property has
* `size` - (number) how many square feet the property has