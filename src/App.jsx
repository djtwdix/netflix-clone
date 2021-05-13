import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./stylesheets/App.scss";
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import ProfileScreen from "./components/ProfileScreen";
import { auth } from "./firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./features/userSlice";
import { selectUser } from "./features/userSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log("user: ", user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(login({ uid: userAuth.uid, email: userAuth.email }));
      } else {
        dispatch(logout);
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        <Switch>
          {!user ? (
            <LoginScreen />
          ) : (
            <Route exact path="/">
              <HomeScreen />
            </Route>
          )}
          <Route path="/profile">
            <ProfileScreen />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
