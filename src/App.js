import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './utils/PrivateRoute';
import Library from './components/library/Library';
import SignIn from './components/authentication/SignIn';
import SignUp from './components/authentication/SignUp';
import PassReset from './components/authentication/PassReset';
import Success from './components/authentication/Success';
import Failure from './components/authentication/Failure';
import PageNotFound from './components/authentication/PageNotFound';
import Search from './components/search/Search';
import ShelfBook from './components/library/ShelfBook';
import Shelf from './components/library/Shelf';
import Shelves from './components/library/Shelves';
import OnboardingQuiz from './components/authentication/OnboardingQuiz';
import BookCardRefactor from './components/Book/BookCardRefactor';
// History Util
import history from './utils/history';

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute exact path='/' component={Library} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/reset' component={PassReset} />
        <Route path='/quiz' component={OnboardingQuiz} />
        <Route path='/success' component={Success} />
        <Route path='/failure' component={Failure} />
        <Route path='/pagenotfound' component={PageNotFound} />
        <Route path='/card' component={BookCardRefactor} />
        <PrivateRoute path='/search' component={Search} />
        <PrivateRoute path='/book/:id' component={ShelfBook} />
        <PrivateRoute exact path='/shelf/:shelf' component={Shelf} />
        <PrivateRoute path='/myshelves' component={Shelves} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default App;
