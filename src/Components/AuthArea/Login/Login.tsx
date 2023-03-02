import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ClientType } from "../../../Models/ClientTypeModel";
import { LoginRequestModel } from "../../../Models/LoginRequestModel";
import { loggedIn } from "../../../Redux/AuthAppState";
import store from "../../../Redux/Store";
import notify, { SccMsg } from "../../../Services/NotificationService";
import loginWebApi from "../../../Services/WebApi/LoginWebApi";
import "./Login.css";

function Login(): JSX.Element {
  const navigate = useNavigate();

  const loginTimer = () => {
    setTimeout(() => {
      navigate("/logout");
    }, 3_600_000);
  };

  useEffect(()=> {
    const token = store.getState().authReducer.loginResponse.token;
    if (token) {
      navigate("/home");
    }
    // const token = store.getState().authReducer.loginResponse.token;
    // const clientType = store.getState().authReducer.loginResponse.clientType;
    // if (token && clientType === ClientType.ADMIN) {
    //   navigate("/home");
    // }
  }, [navigate])

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email pattern")
      .required("Email is required")
      .lowercase()
      .matches(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        "only valid email allow."
      ),

    password: yup
      .string()
      .min(3, "password length minimum is 3 letters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<LoginRequestModel>({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const postLogin = async (obj: LoginRequestModel) => {
    // const credentials = { email: obj.email, password: obj.password, clientType: obj.clientType };
    await loginWebApi
      .login(obj)
      .then((res) => {
        notify.success(SccMsg.LOGIN_SUCCESS);
        loginTimer();
        store.dispatch(loggedIn(res.data));
        navigate("/home");
      })
      .catch((err) => notify.error(err));

  };

  return (
    <div className="Login col">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(postLogin)}>
        {!errors.email ? (
          <label htmlFor="email">Email</label>
        ) : (
          <span>{errors.email.message}</span>
        )}
        <input {...register("email")} type="email" placeholder="email" />
        {!errors.password ? (
          <label htmlFor="password">Password</label>
        ) : (
          <span>{errors.password.message}</span>
        )}

        <input
          {...register("password")}
          type="password"
          placeholder="password"
        />
        <select
          {...register("clientType")}
          name="clientType"
          id="clientType"
          placeholder="clientType"
        >
          <option value="clientType" disabled>
            Client Type
          </option>
          <option value={ClientType.ADMINISTRATOR}>Admin</option>
          <option value={ClientType.COMPANY}>Company</option>
          <option value={ClientType.CUSTOMER}>Customer</option>
        </select>
        {/* <label htmlFor="ClientType">Choose a Client Type</label>
                <select required> 
                <option value="Administrator">Administrator</option>
                <option value="Company">Company</option>
                <option value="Customer">Customer</option>
            
                </select> */}

        <button disabled={!isValid}>Login</button>
      </form>
    </div>
  );
}

export default Login;
