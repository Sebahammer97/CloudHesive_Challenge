import logo from "../logo.svg";
import "../App.css";
import { useHistory } from "react-router-dom";

// Components
import { Button } from "antd";

export default function Home() {
  let history = useHistory();

  return (
    <div className="App">
      <body className="App-body">
        <img src={logo} className="App-logo" alt="logo" />
        <p> Postcard React Challenge </p>

        <Button type="primary" onClick={() => history.push("/postcard/create")}>
          Create your Postcard
        </Button>

        <p>
          Made by Sebastian Hammerschmidt (
          <a className="link" href="https://github.com/Sebahammer97">
            SebaHammer97
          </a>
          )
        </p>
      </body>
    </div>
  );
}
