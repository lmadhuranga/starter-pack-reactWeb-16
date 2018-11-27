import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NewMoviePage from './Pages/NewMoviePage';
import MoviePage from './Pages/MoviePage';
import EditMoviePage from './Pages/EditMoviePage';
import MoviesPage from './Pages/MoviesPage';
import Navgation from './Pages/Navgation';
import Error from './Pages/Error';

class App extends Component {
 
  render() {
    
    return (
      <BrowserRouter>
        <div>
          <Navgation/>
          <Switch> 
            <Route path='/' exact component={MoviesPage} />
            <Route path='/view/:id' component={MoviePage} />
            <Route path='/new' component={NewMoviePage} />
            <Route path='/edit/:id' component={EditMoviePage} />
            <Route  component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
 
export default App;
