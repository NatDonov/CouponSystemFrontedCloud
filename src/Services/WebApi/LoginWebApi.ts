import axios, { AxiosResponse } from "axios";
import { LoginRequestModel } from "../../Models/LoginRequestModel";
import { LoginResponseModel } from "../../Models/LoginResponseModel";
import global from "../Config";

class LoginWebApi{

    private authApi=global.urls.auth;

    public login(loginRequest: LoginRequestModel): Promise<AxiosResponse<LoginResponseModel>> {
        return axios.post<LoginResponseModel>(this.authApi, loginRequest);
    }

}

const loginWebApi = new LoginWebApi();


export default loginWebApi;