import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    return <div className="auth">
        {isLogin ? (
            <Login
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                loginMessage="Don't have an account?"
            />
            
        ) : (
            <Register
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                loginMessage="Already have an account?"
            />
        )}
    </div>
}; 

const Login = ({isLogin, setIsLogin, loginMessage}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [_, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            const response = await axios.post("https://bar-specs-be.onrender.com/login",{ username, password });

            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            navigate("/");
        } catch(err) {
            console.error(err);
        }
    };

    return (
        <Form 
            username={username} 
            setUsername={setUsername} 
            password={password} 
            setPassword={setPassword}
            label="Login"
            switchLabel="Register"
            onSubmit={onSubmit}
            loginMessage={loginMessage}
            isNewLogin={false}
            setIsLogin={setIsLogin}
        />
    );
};

const Register = ({isLogin, setIsLogin, loginMessage}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("https://bar-specs-be.onrender.com/auth/register",{ username, password });
            alert("Registration Completed! Now login.");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Form 
            username={username} 
            setUsername={setUsername} 
            password={password} 
            setPassword={setPassword}
            label="Register"
            switchLabel="Login"
            onSubmit={onSubmit}
            loginMessage={loginMessage}
            isNewLogin={true}
            setIsLogin={setIsLogin}
        />
    );
};

const Form = ({username, setUsername, password, setPassword, label, switchLabel, onSubmit, loginMessage, isNewLogin, setIsLogin}) => {
    return (
        <div className="auth-container">
            <div className="auth-box">
                <form onSubmit={onSubmit}>
                    <h2>{label}</h2>
                    <div className="form-group">
                        <label htmlFor="username"> Username: </label>
                        <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password"> Password: </label>
                        <input type="password" id="password" value={password}  onChange={(event) => setPassword(event.target.value)}/>
                        <p className="toggle-link">
                            {/* {loginMessage} <button className="login-btn" onClick={() => setIsLogin(isNewLogin)}>{label}</button> */}
                            {loginMessage} <span onClick={() => setIsLogin(isNewLogin)}>{switchLabel}</span>
                        </p>
                    </div>

                    <button type="submit"> {label}</button>
                </form>
            </div>
        </div>
    );

};