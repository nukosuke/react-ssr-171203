import * as React from "react";
import { Switch, Route, Link } from "react-router-dom";

export default class Application extends React.Component<any, any> {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/1">page 1</Link></li>
          <li><Link to="/1">page 2</Link></li>
          <li><Link to="/1">page 3</Link></li>
        </ul>
        <Switch>
          <Route path="/1" component={() => (<div>page 1</div>)} />
          <Route path="/2" component={() => (<div>page 2</div>)} />
          <Route path="/3" component={() => (<div>page 3</div>)} />
        </Switch>
      </div>
    );
  }
}
