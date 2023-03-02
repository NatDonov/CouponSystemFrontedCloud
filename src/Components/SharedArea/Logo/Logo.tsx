import "./Logo.css";
import couponLogo from "../../../Assets/Images/couponlogo.svg";

function Logo(): JSX.Element {
    return (
        <div className="Logo">
			<img src={couponLogo} alt="img" />
        </div>
    );
}

export default Logo;
