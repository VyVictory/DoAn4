import NavBar from "../components/NavBar";
import { Outlet } from 'react-router-dom';
const Layout = () => {
    return (
        <div className="relative h-screen">
            <NavBar />
            <Outlet />
        </div>
    );
};
export default Layout;