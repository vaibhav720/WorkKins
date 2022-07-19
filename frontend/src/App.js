import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './pages/signupPages/Signup';
import PersonalDetails from './pages/detailsPage/PersonalDetails';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route path="/signup/" element={<SignUp />}/>
      <Route path="/personalDetails" element={<PersonalDetails />}/>
      
      <Route path="/home" element={<Home />}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
