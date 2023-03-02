import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthAppState";
import { companyReducer } from "./CompanyAppState";
import { customerReducer } from "./CustomerAppState";

const reducers = combineReducers({customerReducer: customerReducer,authReducer:authReducer, companyReducer:companyReducer});
const store = createStore(reducers);


export default store;