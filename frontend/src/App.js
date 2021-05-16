import React, { Children } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import MapList from "./pages/mapList.js";
import SingleMap from "./pages/singleMap.js";
import './App.css';


function App() {
  return (
    <Router>
      <div>
      <nav>
          <ul>
            <li>
              <Link to="/">Карты</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
          <Route path="/map/:id">
            <About />
          </Route>
          <Route path="/users/">
            <SingleMap />
          </Route>
          <Route path="/">
            <MapList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  const {id} = useParams()

  return <SingleMap mapId={id}/>;
}


function Users() {
  return <h2>Users</h2>;
}

export default App;
