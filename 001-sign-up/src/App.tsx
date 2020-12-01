import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const SignUp = lazy(() => import('./pages/signup'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading ...</div>}>
        <Switch>
          <Route exact path="/" component={SignUp}  />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
