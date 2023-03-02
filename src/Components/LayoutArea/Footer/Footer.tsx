import SocialMedia from "../../SharedArea/SocialMedia/SocialMedia";
import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
			<p>&copy; Natali Donov</p>
            <SocialMedia/>
        </div>
    );
}

export default Footer;
