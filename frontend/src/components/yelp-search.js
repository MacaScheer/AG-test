import React from 'react';
import axios from 'axios';

class ParkingSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerms: "",
            searchResults: [],
        }

        this.addToSearch = this.addToSearch.bind(this);
        this.runSearch = this.runSearch.bind(this);
        this.orderResultsByScore = this.orderResultsByScore.bind(this);
    }

    addToSearch() {
        return e => {
            this.setState({
                searchTerms: e.currentTarget.value
            })
        }
    }
    async runSearch(e) {
        e.preventDefault();
        let dataWithScores;
        await axios.get(`/api/resources/${this.state.searchTerms}`).then(res => {
            dataWithScores = res.data.yelpSearchResults.businesses.map(business => {
                return this.createScore(business);
            });
        })
        return this.orderResultsByScore(dataWithScores);
    }
    /*  THINGS TO RETRIEVE:
          address, 
          image if available, 
          star rating, 
          review count, 
          link to the Yelp page.
    */

    createScore(business) {
        let score = (business.review_count * business.rating) / (business.review_count + 1);
        business["score"] = score;
        return business
    }

    orderResultsByScore(data) {
        let sorted = data.sort((a, b) => {
            return a.score - b.score
        })
        this.setState({
            searchResults: sorted
        })
    }


    render() {
        const parkingResults = this.state.searchResults.map((res, idx) => {
            return (
                <div key={idx}>
                    <a href={res.url} key={res.url}>
                        <img key={res.id} src={res.image_url} alt="" style={{ width: "500px", objectFit: "contain" }} />
                        <div key={res.location.address1}>ADDRESS: {res.location.address1}
                            <div key={res.location.city}>{res.location.city}</div>
                            <div key={res.location.zipcode}>{res.location.zipcode}</div>
                        </div>
                        <div key={res.distance}>RATING: {res.rating}</div>
                        <div key={res.coordinates.lattitude}>REVIEW COUNT: {res.review_count}</div>
                        <div key={res.coordinates.longitude}>SCORE: {res.score}</div>
                    </a>
                </div>
            )
        });
        return (
            <div>
                <h1>Mac's Yelp Parking Search</h1>
                <form
                    onSubmit={this.runSearch}>
                    <input placeholder="Search By City"
                        type="text"
                        onChange={this.addToSearch()}
                        value={this.state.searchTerms}>
                    </input>
                </form>
                <ul>
                    {parkingResults}
                </ul>
            </div>
        );
    }
}

export default ParkingSearch;
