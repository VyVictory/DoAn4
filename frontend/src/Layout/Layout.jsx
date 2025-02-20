import NavBar from "../components/NavBar";
import { Outlet } from 'react-router-dom';
import Login from "../components/Auth/Login";
const Layout = () => {

    return (
        <div className="relative h-screen">
            <NavBar />
            <Outlet />
        </div>
    );
};
export default Layout;