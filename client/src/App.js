import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Home }from './pages/home';
import { Auth } from './pages/auth';
import { CreateSpecs } from './pages/create-specs';
import { SavedSpecs } from './pages/saved-specs';
import { Navbar }from './components/navbar'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes> 
          <Route path="/" element={<Home />}/>
          <Route path="/auth" element={<Auth />}/>
          <Route path="/create-specs" element={<CreateSpecs />}/>
          <Route path="/saved-specs" element={<SavedSpecs />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
