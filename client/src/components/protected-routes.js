import { Outlet, Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const ProtectedRoutes = () => {
   const [cookies, setCookies] = useCookies(["access_token"]);
   
   const user = cookies.access_token;
   return user ? <Outlet/> : <Navigate to="/auth"/>;
}

export default ProtectedRoutes;