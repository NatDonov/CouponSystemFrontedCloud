import "./SocialMedia.css";
import { FaFacebook, FaLinkedin, FaWaze} from "react-icons/fa"; 

function SocialMedia(): JSX.Element {
    return (
        <div className="SocialMedia">
			<FaFacebook size={42} className="custom-image"/>
            <FaLinkedin size={42} className="custom-image"/>
            <FaWaze size={42} className="custom-image"/>
        </div>
    );
}

export default SocialMedia;
