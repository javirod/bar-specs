import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/auth")
    }

    const login = () => {
        navigate("/auth")
    }
    return <div className="navbar">
        <div className='navlinks'>
            <Link to="/"> Home</Link>
            <Link to="/wines"> Wines</Link>
            {cookies.access_token && <Link to="/create-specs"> Create Specs</Link>}
        </div>
        <div>
            {!cookies.access_token ? (<button id ="logout-btn" onClick={login}> Login/Sign Up</button>) : <button id ="logout-btn" onClick={logout}> Logout</button>}
        </div>
    </div>;
};