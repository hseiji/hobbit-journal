import NavbarComp from "./components/navbar/NavbarComp";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/home/Home";
import NewPost from "./components/newpost/NewPost";
import { 
  HashRouter as Router, 
  Switch, 
  Route 
} from 'react-router-dom';
import Login from "./pages/login/Login";
import ViewPost from "./pages/viewpost/ViewPost";
import { useContext } from "react";
import { Context } from "./components/context/Context";

function App() {
  const { user } = useContext(Context)
  return (
    <div>
      <Router>
        <NavbarComp/>
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route exact path="/newpost"><NewPost/></Route>
          <Route path="/posts/:postId"><ViewPost/></Route>
          <Route exact path="/login">{user? <Home/> : <Login/>}</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
