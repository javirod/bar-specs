import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Home }from './pages/home';
import { Auth } from './pages/auth';
import { CreateSpecs } from './pages/create-specs';
import { Wines } from './pages/wines';
import { Navbar } from './components/navbar';
import ProtectedRoutes from './components/protected-routes';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes> 
          <Route path="/" element={<Home />}/>
          <Route path="/wines" element={<Wines />}/>
          <Route path="/auth" element={<Auth />}/>
          <Route element={<ProtectedRoutes />}>
            <Route path="/create-specs" element={<CreateSpecs />}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
