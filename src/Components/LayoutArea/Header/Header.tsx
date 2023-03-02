import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Logo from "../../SharedArea/Logo/Logo";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
			<Logo/>
            <h1>Welcome to coupons site</h1>
            <AuthMenu/>
        </div>
    );
}

export default Header;
