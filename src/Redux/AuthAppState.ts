
import { LoginResponseModel } from "../Models/LoginResponseModel";


export class AuthAppState{
    public loginResponse: LoginResponseModel = {id: 0, email:"", token:"", clientType:"", name:""};
    public constructor(){
        try{
            const storedUser = JSON.parse(localStorage.getItem("user") || "");
            if(storedUser){
                this.loginResponse = storedUser;
            }
        }catch(error){
            console.log(error)
        }
    }
}

export enum ActionType{
    LOGGED_IN = "LOGGED_IN",
    LOGGED_OUT = "LOGGED_OUT",
}


export interface UserAction {
    type: ActionType;
    payload?: any;
}


export function loggedIn(user: LoginResponseModel): UserAction {
    return {
        type: ActionType.LOGGED_IN,
        payload: user
    }
}

export function loggedOut(): UserAction {
    return {
        type: ActionType.LOGGED_OUT,
        payload: {}
    }
}

export function authReducer(currentState: AuthAppState = new AuthAppState(), action: UserAction): AuthAppState {
    const newState = { ...currentState } // copy
    switch (action.type) {
        case ActionType.LOGGED_IN: {
            newState.loginResponse = action.payload;
            localStorage.setItem("user", JSON.stringify(newState.loginResponse));
            break;
        }
        case ActionType.LOGGED_OUT: {
            newState.loginResponse = {id: 0,  email: "", token: "",  clientType:"", name:""};
            localStorage.removeItem("user");
            break;
        }

    }

    return newState;
}
