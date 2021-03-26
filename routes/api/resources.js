const express = require("express");
const router = express.Router();
const axios = require('axios');


router.get("/", (req, res) => res.json({ msg: "This is the resources route" }));

router.get("/:locations", async (req, res) => {
    let loc = req.params.locations
    const options = {
        method: 'GET',
        url: 'https://api.yelp.com/v3/businesses/search',
        params: { location: loc, term: 'parking' },
        headers: {
            Authorization: 'Bearer mi5qSSqdhmrNXBjLq5MBMwuqcS0q8aE4u52fwqrG8CkrBjjksgdV8ZblHdh4ThtDqQVFapfOwrCqadcTH4sJIMhQgEcWpc0bK_9ms_rJ1H-xMT1Amp4tmH_PhAg3X3Yx'
        }
    };
    let yelpSearchResults = await axios.request(options)
    res.json({ yelpSearchResults: yelpSearchResults.data })
})
module.exports = router;