import './App.css';

import React from 'react'
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomePage from './pages/HomePage/Homepage';
import Dashboard from './pages/dashboard/dashboard.page';

import { selectCurrentUser } from './redux/user/user.selector'

class App extends React.Component {
  render(){

    return (

        <Switch>
          <Route exact path='/' render= {()=> this.props.currentUser? (<Redirect to ='/dashboard'/>) : (<HomePage/>)} />
          <Route exact path = '/dashboard' component={Dashboard}/>
        </Switch>
      
    );
  }
  }

  const mapStateToProps = state => ({
    currentUser : selectCurrentUser(state)
  })

export default connect(mapStateToProps)(App);
