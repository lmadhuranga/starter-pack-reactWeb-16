import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { appConfig } from '../config/globel.conf';
const hostUrl = appConfig.company.host.url;
const axios = require('axios');

class MoviePage extends Component {

  constructor(){
    super();
    this.state = { 
      movie:{}
    }
  }

  getMovie(movieId) { 
    axios.get(`${hostUrl}/movie/${movieId}`)
    .then(
      (result) => {
        // console.log('result',result.data);
          this.setState({movie : result.data});
      },
      
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    ) 
  }

  componentDidMount(props){
    let movieId = this.props.match.params.id;
    this.getMovie(movieId)
    
  }

  render(props) { 
     let editurl = `/edit/${this.state.movie.id}`
    return (
      <div className="movie-page">
        <h1>Movie : {this.state.movie.name} <Link to={editurl}>Edit</Link></h1>
        <ul>
          <li>Name : {this.state.movie.name}</li>
          <li>Path : {this.state.movie.path}</li>
          <li>Quality : {this.state.movie.quality}</li>
          <li>Downloads : {this.state.movie.downloads || 0}</li>
        </ul>
      </div>
    );
    
  }
}

export default MoviePage;