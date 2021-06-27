import React, { Children, Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import MapList from "./pages/mapList.js";
import SingleMap from "./pages/singleMap.js";

import './static/css/base.css';
import './static/css/news.css';


class App extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render () {
    return (
    <Router>
    <div>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
    </div>
    <div>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Университет ИТМО</title>
    <header>
      <nav>
        <ul className="header__link_list d-flex">
          <li className="header__link">
              <Link to="/">Карты</Link>
            </li>
        </ul>
      </nav>
    </header>
    <main>
      <div className="container">
        <Switch>
          <Route path="/map/:id">
            <SingleMapPage />
          </Route>
          <Route path="/">
            <MapList />
          </Route>
        </Switch>
      </div>
    </main>

    <footer style={{backgroundImage: "url('" + this.props.host + "/static/img/footer_rectangle.png')"}}>
      <div className="container">
        <a href="/">
          <img src={this.props.host + "/static/img/logo.png"} width="200px" alt="" />
        </a>
        <div className="footer_content">
          <div>
            <p className="bold footer_contacts">Контакты</p>
            <div className="d-flex footer_information">
              <div>
                <p>Способы связи</p>
                <div className="d-flex">
                  <img className="icon" src={this.props.host + "/static/img/phone_logo.svg"} />
                  <p>+7 (914) 263 9094</p>
                </div>
                <div className="d-flex">
                  <img className="icon" src={this.props.host + "/static/img/mail_logo.svg"} />
                  <p>egorov_michil@mail.ru</p>
                </div>
              </div>
              <div>
                <p>Расположение</p>
                <div className="d-flex" style={{verticalAlign: 'top'}}>
                  <img className="icon" src={this.props.host + "/static/img/location_logo.svg"} />
                  <p>133333, г. Санкт-Петербург, Альпийский переулок, д.15, к2
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="footer_links_block">
            <p> Присоединяйся </p>
            <div className="footer_links">
              <img src={this.props.host + "/static/img/Button-S-Instagram-ic.svg"} />
              <img src={this.props.host + "/static/img/Button-S-Youtube-ic.svg"} />
              <img src={this.props.host + "/static/img/Button-S-Vk-ic.svg"} />
              <img src={this.props.host + "/static/img/Button-S-Telegram-ic.svg"} />
            </div>
          </div>
        </div>
      </div>
    </footer>

  </div>
  </Router>
  );
        }
}

function Home() {
  return <h2>Home</h2>;
}

function SingleMapPage() {
  const {id} = useParams()

  return <SingleMap mapId={id}/>;
}


function Users() {
  return <h2>Users</h2>;
}

export default App;
