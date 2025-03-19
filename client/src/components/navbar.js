import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const [menuOpen, setMenuOpen] = useState();
    const navigate = useNavigate();
    const menuRef = useRef(null);

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/auth")
    }

    const login = () => {
        navigate("/auth")
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
      }

    const mobileLogout = () => {
        toggleMenu();
        logout();
    }
    
    const mobileLogin = () => {
        toggleMenu();
        login();
    }

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef}>
            <div className="navbar">
                <div className="logo-links-container">
                    <div className="logo-container">
                        <img className='logo' src='/sf64.png' alt='Specfor Logo'></img>
                        <h2 className='logo-txt'>SPECFOR</h2>
                    </div>
                    <div className='navlinks'>
                        <Link to="/"> Home</Link>
                        <Link to="/wines"> Wines</Link>
                        {cookies.access_token && <Link to="/create-specs"> Create Specs</Link>}
                    </div>
                </div>
                <div>
                    {!cookies.access_token ? (<button id ="logout-btn" onClick={login}> Login/Sign Up</button>) : <button id ="logout-btn" onClick={logout}> Logout</button>}
                </div>
            </div>
            <div className='navbar-mobile'>
                <div className="logo-container">
                    <img className='logo' src='/sf64.png' alt='Specfor Logo'></img>
                    <h2 className='logo-txt'>SPECFOR</h2>
                </div>
                <div className="hamburger-menu">
                    <div className={menuOpen ? "hamburger-icon open" : "hamburger-icon"} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={menuOpen ? "hamburger-links open" : "hamburger-links"}>
                        <Link to="/" onClick={toggleMenu}> Home</Link>
                        <Link to="/wines" onClick={toggleMenu}> Wines</Link>
                        {cookies.access_token && <Link to="/create-specs" onClick={toggleMenu}> Create Specs</Link>}
                        {!cookies.access_token ? (<Link to="/auth" onClick={mobileLogin}> Login</Link>) : <Link to="/create-specs" onClick={mobileLogout}> Logout</Link>}
                    </div>
                </div>
            </div>
        </div>
    );
};