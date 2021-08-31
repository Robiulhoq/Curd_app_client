import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddUser from './Components/AddUser';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <AddUser></AddUser>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
