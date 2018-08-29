

module.exports = {
  regularSearch(req, res) {
    console.log('regularSearch function reached')
    const yelp = require('yelp-fusion');
    const yelpFusionAPIKey = process.env.REACT_APP_YELP_API_KEY;
    const searchRequest = {
      term: req.query.term,
      location: req.query.location,
      limit: req.query.limit,
    };
    const client = yelp.client(yelpFusionAPIKey);

    client.search(searchRequest)
    .then(response => {
      const returnedResults = response.jsonBody.businesses;
      const jsonified = JSON.stringify(returnedResults, null, 4);
      const parsed = JSON.parse(jsonified);
      return res.json(parsed)
    }).catch(err => {
      console.log('Restaurant search error', err);
    })
  }
}