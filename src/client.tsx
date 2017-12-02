import * as React    from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Application from "./components/Application";

ReactDOM.hydrate(
  <BrowserRouter>
    <Application/>
  </BrowserRouter>,
  document.getElementById("react-root") // コンポーネントを吊るす対象
);
