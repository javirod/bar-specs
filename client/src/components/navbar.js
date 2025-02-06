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
    return <div className="navbar">
        <div className='navlinks'>
            <Link to="/"> Home</Link>
            {cookies.access_token && <Link to="/create-specs"> Create Specs</Link>}
            <Link to="/wines"> Wines</Link>
        </div>
        <div>
            {!cookies.access_token ? (<Link to="/auth"> Login/Register</Link>) : <button id ="logout-btn" onClick={logout}> Logout</button>}
        </div>
    </div>;
};