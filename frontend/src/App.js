import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './pages/signupPages/Signup';
import PersonalDetails from './pages/detailsPage/PersonalDetails';
import Home from './pages/Home/Home';
import BasicHome from './pages/Basic/BasicHome';
import SignIn from './pages/signupPages/SignIn';
import News from './pages/Home/News';
import Problems from './pages/Home/Problems';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route path="/signup/" element={<SignUp />}/>
      <Route path="/signIn/" element={<SignIn />}/>
      <Route path="/personalDetails" element={<PersonalDetails />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/news" element={<News/>}/>
      <Route path="/problems" element={<Problems/>}/>
      <Route path="/" element={<BasicHome />}/>
      
      </Routes>
      </Router>
    </div>
  );
}

export default App;
