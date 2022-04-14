import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import TableCoins from "./components/TableCoins";

function App() {

  let { id } = useParams();
  console.log(id);
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const coinList = "/";
  const top10List = "/top10";
  const getData = async () => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      );
      setCoins(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Router>
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand m-3" href="#">CC Rankings</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to={coinList}>Coin List</Link>
            </li>
            <li className="nav-item">
             <Link className="nav-link" to={top10List}>Top 10 Coins</Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
          <input
              type="text"
              placeholder="Search Coin"
              className="form-control mr-sm-2"
              autoFocus
              onChange={(e) => setSearch(e.target.value)}
            />
            </form>
        </div>
      </nav>
        
        <div className="container">
          <div className="row">
            

            <TableCoins coins={coins} search={search} />
          </div>
        </div>
    </div>
  </Router>
  );
}

export default App;
