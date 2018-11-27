import React, { Component } from 'react';   
import { appConfig } from '../config/globel.conf';
import { Link } from 'react-router-dom';
const axios = require('axios');


const hostUrl = appConfig.company.host.url;

class MoviesList extends Component {

  constructor(){
    super();
    this.state = { 
      movies:[], 
      query: '', 
      results:[] 
    }
  }
  
  // Todo::need to move to service
  getMovies() { 
    axios.get(`${hostUrl}/movies`)
    .then(
      (result) => {
        // console.log('result',result.data);
          this.setState({movies : result.data});
      },
      
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    ) 
  }

  componentDidMount(){
    this.getMovies();
  }


  handleSearch() { 
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          // this.getHunters()
        }
      } 
    })
  }
  
  render() {
    let moviesItems = this.state.movies.map((movie)=>{
      let url = `/view/${movie.id}`;
      return <li key={movie.id}> <Link to={url} > {movie.name} </Link> </li>
    });

    return (
      <div className="MoviesList">
        <h1>Movies List</h1>
        <ul>
          {moviesItems}
        </ul>
      </div>
    );
  }
}
 
export default MoviesList;
