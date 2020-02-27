import React from 'react';
import './styles/styles.scss';
import { Stats } from './components/Stats';
import { SignUp } from './components/SignUp';
import { LogIn } from './components/LogIn';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { ResetPass } from './components/ResetPass';


const App: React.FC = () => {

  

  return (
    <BrowserRouter>
      <ul>
        <li><Link to='/' >Signup</Link></li>
        <li><Link to='/stats' >Stats</Link></li>
        <li><Link to='/login' >Login</Link></li>
        <li><Link to='/reset' >Reset password</Link></li>
      </ul>

      <Switch>
        <Route exact path='/' >
          <SignUp />
        </Route>
        <Route path='/stats' >
          <Stats />
        </Route>
        <Route path='/login' >
          <LogIn/>
        </Route>
        <Route path='/reset' >
          <ResetPass/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
