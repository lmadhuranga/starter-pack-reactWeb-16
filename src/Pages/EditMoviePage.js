import React, { Component } from 'react';
import { appConfig } from '../config/globel.conf';
import { Redirect } from 'react-router-dom';

const hostUrl = appConfig.company.host.url;
const axios = require('axios');

class EditMoviePage extends Component {

    constructor(){
        super(); 
        this.state = { 
            movie: {
                name:'',
                quality: '',
                path: '',
                downloads: 0
            },
            qualities: [],
            redirectToReferrer: false
        }

        this.handleInput = this.handleInput.bind(this)
    }

    handleInput(event){
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value; 
        this.setState( prevState => ({ 
            movie : { ...prevState.movie, [name]: value }
        }));
    }

    handleSaveData(e) {
        e.preventDefault();
        axios.put(`${hostUrl}/movie/${this.state.movie.id}`, 
            this.state.movie
        )
        .then((result) => {
                this.setState({ redirectToReferrer: true });
            } 
        )
    }

    getMovie(movieId) { 
        axios.get(`${hostUrl}/movie/${movieId}`)
        .then(
          (result) => {
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

    getQualities() { 
        axios.get(`${hostUrl}/qualities`)
        .then((result) => {
            this.setState({qualities : result.data});
        })
    }

    componentDidMount(){
        this.getQualities();
        let movieId = this.props.match.params.id;
        this.getMovie(movieId)
    }

    render(props) { 
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;

        let qualitiesList = this.state.qualities.map((row) => {
            return <option key={row.id} value={row.quality}> {row.quality}x </option>
        });

        return (
            <div className="movie-page">
                <h1>Update {this.state.movie.name} Movie</h1>
                <form onSubmit={this.handleSaveData.bind(this)}>
                    <input type="text" ref="name" value={this.state.movie.name} name="name" placeholder="Name" onChange={this.handleInput}/> <br/>
                    <input type="text" ref="path" value={this.state.movie.path} name="path" placeholder="Path" onChange={this.handleInput} /> <br/>
                    <select ref="quality" value={this.state.movie.quality} name="quality" onChange={this.handleInput} >
                        <option value="">Select Quality</option>
                        { qualitiesList }
                    </select> <br/>
                    <label>Downloads : {this.state.movie.downloads || 0}</label> <br/>
                    <button type="submit">Save </button>
                </form>
            </div>
        );
        
    }
}
export default EditMoviePage;