// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import CreateEntryForm from "./components/createEntryPage";
import AllEntries from "./components/AllEntries/allEntries";
import Navigation from "./components/Navigation";
import MainPage from "./components/MainPage";
import EditEntryForm from "./components/editEntryPage";
import EntryDetail from "./components/entrydetails";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/' exact>
          <MainPage isLoaded={isLoaded} />
          </Route>
          <Route path='/entries/new'>
            <CreateEntryForm />
          </Route>
          <Route path='/edit/:entryId'>
            <EditEntryForm />
            {/* <EntryDetail /> */}
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/entries'>
            <AllEntries isLoaded={isLoaded} />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
