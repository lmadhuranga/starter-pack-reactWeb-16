import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';



class Navgation extends Component {
  
  render() {
     
    return (
      <div className="hunter">
        <NavLink to="/home">Home</NavLink> &nbsp;|&nbsp;
        <NavLink to="/new">New</NavLink> &nbsp;|&nbsp;
        <NavLink to="/">Movies</NavLink>
      </div>
    );
    
  }
}

export default Navgation;