import { useEffect, useState } from "react";
import { LoginResponseModel } from "../../../Models/LoginResponseModel";
import store from "../../../Redux/Store";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {
    const [user, setUser] = useState<LoginResponseModel>(store.getState().authReducer.loginResponse);

    useEffect(() => {
        return store.subscribe(() => setUser(store.getState().authReducer.loginResponse));
    }, []);
    return (
        <div className="AuthMenu row">
			{(user?.token) ?
                <>Connected as {user.email}&nbsp;<CustomLink to="logout">Logout</CustomLink></> :
                <>Hello guest &nbsp; &nbsp;<CustomLink to="login">Login </CustomLink></>}
        </div>
    );
}

export default AuthMenu;
