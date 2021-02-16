import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { useContext } from "react";

// CSS imports
import "semantic-ui-css/semantic.min.css";
import "./App.css";

// Page imports
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import UserProfile from "./pages/UserProfile";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

// Component exports
import MenuBar from "./components/MenuBar";

function App() {
     return (
          <AuthProvider>
               <Router>
                    <MenuBar />
                    <Container>
                         <Route exact path="/" component={Home} />
                         <Route exact path="/login" component={Login} />
                         <Route exact path="/register" component={Register} />
                         <Route
                              exact
                              path="/posts/:postId"
                              component={SinglePost}
                         />
                         <Route
                              exact
                              path="/user/:username"
                              component={UserProfile}
                         />
                    </Container>
               </Router>
          </AuthProvider>
     );
}

export default App;
