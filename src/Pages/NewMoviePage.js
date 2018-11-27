import React, { Component } from 'react';
import { appConfig } from '../config/globel.conf';
import { Redirect } from 'react-router-dom';

const hostUrl = appConfig.company.host.url;
const axios = require('axios');

class NewMoviePage extends Component {

    constructor(){
        super(); 
        this.state = { 
            movie: {},
            qualities: [],
            redirectToReferrer: false
        }
    }

    handleSaveData(e) {
        e.preventDefault();
        axios.post(`${hostUrl}/movie`,
            {
                name:this.refs.name.value,
                path:this.refs.path.value,
                quality:this.refs.quality.value,
            }
        )
        .then((result) => {
            console.log('result',result);
                this.setState({ redirectToReferrer: true });
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
    }

    render(props) { 
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;

        let qualitiesList = this.state.qualities.map((row) => {
            return <option key={row.id} value={row.id}> {row.quality} </option>
        });

        return (
            <div className="movie-page">
                <h1>New Movie</h1>
                <form onSubmit={this.handleSaveData.bind(this)}>
                    <input type="text" ref="name" placeholder="Name" /> <br/>
                    <input type="text" ref="path" placeholder="Path" /> <br/>
                    <select ref="quality">
                        <option value="">Select Quality</option>
                        { qualitiesList }
                    </select>
                    <button type="submit">Done</button>
                </form>
            </div>
        );
        
    }
}


export default NewMoviePage;