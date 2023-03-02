import ShowCoupons from "../../CustomerServiceArea/ShowAllCoupons/ShowCoupons";
import ShowCustomerCoupons from "../../CustomerServiceArea/ShowCustomerCoupons/ShowCustomerCoupons";
import "./Home.css";
import coupons from "../../../Assets/Images/coup.jpg";

function Home(): JSX.Element {
    return (
        <div className="Home">
            {/* <img src="https://media.giphy.com/media/KGZXrh6WwasY28lg17/giphy.gif" alt="homepage" /> */}
            <img src={coupons} alt="homepage" />
        </div>
    );
}

export default Home;
