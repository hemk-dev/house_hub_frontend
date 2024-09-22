
import Navbar from "../../components/Navbar";


const UserPublicRoute = ({ component: Component }) => {
    return (
        <div>
            <Navbar />
            <div style={{ padding: "0", marginTop: "16vh" }}>
                <Component />
            </div>
        </div>
    );
};

export default UserPublicRoute;